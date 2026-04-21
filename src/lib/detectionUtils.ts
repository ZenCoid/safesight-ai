import * as ort from 'onnxruntime-web';

// ===== Types =====

export interface Detection {
  bbox: [number, number, number, number];
  classId: number;
  confidence: number;
  label: string;
}

export interface DetectionResult {
  detections: Detection[];
  latency: number;
}

export interface DetectionStats {
  total: number;
  helmet: number;
  noHelmet: number;
}

// ===== Constants =====
// Matched with CCTV backend tuning — strict Helmet, lenient No Helmet

const INPUT_SIZE = 640;

// Class-specific confidence thresholds (same as backend detector.py)
const CLASS_THRESHOLDS: Record<number, number> = {
  0: 0.35,  // Helmet — strict to avoid cap/cloth false positives
  1: 0.20,  // No Helmet — lenient to catch all violations
  2: 0.25,  // Worker — moderate
};
const DEFAULT_THRESHOLD = 0.20;

const IOU_THRESHOLD = 0.45;
const CLASS_LABELS = ['helmet', 'no_helmet', 'worker'];
const CLASS_COLORS = ['#16a34a', '#ef4444', '#3b82f6'];

// Temporal smoothing config (same as backend)
const SMOOTHING_BUFFER_SIZE = 3;
const SMOOTHING_MIN_HITS = 2;
const SMOOTHING_IOU = 0.15;

// ===== ONNX Setup =====

let initialized = false;

function initONNX(): void {
  if (initialized) return;
  ort.env.wasm.wasmPaths = 'https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/';
  ort.env.wasm.numThreads = 1;
  initialized = true;
}

// ===== Model Loading with Progress =====

export async function loadModelWithProgress(
  modelPath: string,
  onProgress?: (progress: number) => void
): Promise<ort.InferenceSession> {
  initONNX();

  if (onProgress) {
    try {
      const response = await fetch(modelPath);
      if (!response.ok) throw new Error(`Failed to fetch model: ${response.status}`);
      const contentLength = response.headers.get('content-length');
      const total = contentLength ? parseInt(contentLength, 10) : 0;
      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      const chunks: Uint8Array[] = [];
      let received = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        received += value.length;
        if (total > 0) {
          onProgress(Math.max(0.1, (received / total) * 0.9));
        }
      }

      const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
      const modelData = new Uint8Array(totalLength);
      let offset = 0;
      for (const chunk of chunks) {
        modelData.set(chunk, offset);
        offset += chunk.length;
      }

      onProgress(0.95);
      const session = await ort.InferenceSession.create(modelData.buffer as ArrayBuffer);
      onProgress(1);
      return session;
    } catch (fetchError: any) {
      // Fallback to normal loading if fetch fails (e.g., CORS issues)
      console.warn('Progress loading failed, falling back:', fetchError);
      onProgress(0.5);
      const session = await ort.InferenceSession.create(modelPath);
      onProgress(1);
      return session;
    }
  }

  return await ort.InferenceSession.create(modelPath);
}

// Keep old loadModel for backwards compat
export async function loadModel(modelPath: string): Promise<ort.InferenceSession> {
  return loadModelWithProgress(modelPath);
}

// ===== NMS =====

function calculateIoU(a: number[], b: number[]): number {
  const x1 = Math.max(a[0], b[0]);
  const y1 = Math.max(a[1], b[1]);
  const x2 = Math.min(a[2], b[2]);
  const y2 = Math.min(a[3], b[3]);
  const intersection = Math.max(0, x2 - x1) * Math.max(0, y2 - y1);
  const areaA = (a[2] - a[0]) * (a[3] - a[1]);
  const areaB = (b[2] - b[0]) * (b[3] - b[1]);
  const union = areaA + areaB - intersection;
  return union > 0 ? intersection / union : 0;
}

function nms(boxes: number[][], scores: number[], threshold: number): number[] {
  const indices = scores.map((_, i) => i).sort((a, b) => scores[b] - scores[a]);
  const kept: number[] = [];
  while (indices.length > 0) {
    const current = indices.shift()!;
    kept.push(current);
    for (let i = indices.length - 1; i >= 0; i--) {
      if (calculateIoU(boxes[current], boxes[indices[i]]) >= threshold) {
        indices.splice(i, 1);
      }
    }
  }
  return kept;
}

// ===== Preprocessing (optimized with cached resources) =====

// Cache preprocess canvas + tensor buffer to avoid 5MB allocation + DOM createElement every call
let _preprocessCanvas: HTMLCanvasElement | null = null;
let _preprocessCtx: CanvasRenderingContext2D | null = null;
let _tensorBuffer: Float32Array | null = null;

function ensurePreprocessCache(): {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  data: Float32Array;
} {
  if (!_preprocessCanvas) {
    _preprocessCanvas = document.createElement('canvas');
    _preprocessCanvas.width = INPUT_SIZE;
    _preprocessCanvas.height = INPUT_SIZE;
    // willReadFrequently: true keeps canvas in CPU memory for faster getImageData()
    _preprocessCtx = _preprocessCanvas.getContext('2d', { willReadFrequently: true })!;
    // Pre-allocate the 640*640*3 float32 tensor data (~4.9MB) — reused across calls
    _tensorBuffer = new Float32Array(3 * INPUT_SIZE * INPUT_SIZE);
  }
  return { canvas: _preprocessCanvas, ctx: _preprocessCtx!, data: _tensorBuffer! };
}

function preprocess(source: HTMLCanvasElement): {
  tensor: ort.Tensor;
  scale: number;
  padX: number;
  padY: number;
} {
  const { canvas, ctx, data } = ensurePreprocessCache();

  const srcW = source.width;
  const srcH = source.height;
  const scale = Math.min(INPUT_SIZE / srcW, INPUT_SIZE / srcH);
  const newW = Math.round(srcW * scale);
  const newH = Math.round(srcH * scale);
  const padX = (INPUT_SIZE - newW) / 2;
  const padY = (INPUT_SIZE - newH) / 2;

  ctx.fillStyle = 'rgb(114, 114, 114)';
  ctx.fillRect(0, 0, INPUT_SIZE, INPUT_SIZE);
  ctx.drawImage(source, 0, 0, srcW, srcH, padX, padY, newW, newH);

  const imageData = ctx.getImageData(0, 0, INPUT_SIZE, INPUT_SIZE);
  const pixels = imageData.data;
  const channelSize = INPUT_SIZE * INPUT_SIZE;
  for (let i = 0; i < channelSize; i++) {
    data[i] = pixels[i * 4] / 255.0;
    data[i + channelSize] = pixels[i * 4 + 1] / 255.0;
    data[i + 2 * channelSize] = pixels[i * 4 + 2] / 255.0;
  }

  return { tensor: new ort.Tensor('float32', data, [1, 3, INPUT_SIZE, INPUT_SIZE]), scale, padX, padY };
}

// ===== Inference =====

export async function detect(
  session: ort.InferenceSession,
  source: HTMLCanvasElement
): Promise<DetectionResult> {
  const startTime = performance.now();
  const { tensor, scale, padX, padY } = preprocess(source);

  const inputName = session.inputNames[0];
  const results = await session.run({ [inputName]: tensor });
  const outputName = session.outputNames[0];
  const output = results[outputName];
  const outData = output.data as Float32Array;
  const dims = output.dims;
  const numChannels = dims[1];
  const numAnchors = dims[2];
  const numClasses = numChannels - 4;
  const imgW = source.width;
  const imgH = source.height;

  const boxes: number[][] = [];
  const scores: number[] = [];
  const classIds: number[] = [];

  for (let i = 0; i < numAnchors; i++) {
    let bestProb = 0;
    let bestClass = 0;
    for (let c = 0; c < numClasses; c++) {
      const prob = outData[(4 + c) * numAnchors + i];
      if (prob > bestProb) { bestProb = prob; bestClass = c; }
    }

    // Class-specific threshold (same strategy as backend)
    const threshold = CLASS_THRESHOLDS[bestClass] ?? DEFAULT_THRESHOLD;
    if (bestProb < threshold) continue;

    const cx = outData[0 * numAnchors + i];
    const cy = outData[1 * numAnchors + i];
    const w = outData[2 * numAnchors + i];
    const h = outData[3 * numAnchors + i];
    const x1 = (cx - w / 2 - padX) / scale;
    const y1 = (cy - h / 2 - padY) / scale;
    const x2 = (cx + w / 2 - padX) / scale;
    const y2 = (cy + h / 2 - padY) / scale;

    boxes.push([
      Math.max(0, Math.min(imgW, x1)),
      Math.max(0, Math.min(imgH, y1)),
      Math.max(0, Math.min(imgW, x2)),
      Math.max(0, Math.min(imgH, y2)),
    ]);
    scores.push(bestProb);
    classIds.push(bestClass);
  }

  const kept = nms(boxes, scores, IOU_THRESHOLD);
  const detections: Detection[] = kept.map((idx) => ({
    bbox: boxes[idx] as [number, number, number, number],
    classId: classIds[idx],
    confidence: scores[idx],
    label: CLASS_LABELS[classIds[idx]] || `class_${classIds[idx]}`,
  }));

  return { detections, latency: Math.round(performance.now() - startTime) };
}

// ===== Temporal Smoothing (matches backend logic) =====

export class DetectionSmoother {
  private buffer: Detection[][] = [];

  smooth(detections: Detection[]): Detection[] {
    this.buffer.push(detections);
    if (this.buffer.length > SMOOTHING_BUFFER_SIZE) {
      this.buffer.shift();
    }

    const bufferSize = this.buffer.length;
    const minHits = bufferSize < 3 ? 1 : SMOOTHING_MIN_HITS;

    // For each detection in current frame, check if it appeared in previous frames
    return detections.filter((det) => {
      let hits = 1; // current frame counts
      for (let f = 0; f < bufferSize - 1; f++) {
        for (const prev of this.buffer[f]) {
          if (prev.classId === det.classId && calculateIoU(det.bbox, prev.bbox) >= SMOOTHING_IOU) {
            hits++;
            break;
          }
        }
      }
      return hits >= minHits;
    });
  }

  reset(): void {
    this.buffer = [];
  }
}

// ===== Drawing =====

export function drawDetections(
  canvas: HTMLCanvasElement,
  source: HTMLCanvasElement,
  detections: Detection[]
): void {
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(source, 0, 0, canvas.width, canvas.height);

  for (const det of detections) {
    const [x1, y1, x2, y2] = det.bbox;
    const color = CLASS_COLORS[det.classId] || '#ffffff';
    const isHelmet = det.classId === 0;
    const label = isHelmet
      ? `HELMET ${(det.confidence * 100).toFixed(0)}%`
      : det.classId === 2
        ? `WORKER ${(det.confidence * 100).toFixed(0)}%`
        : `NO HELMET ${(det.confidence * 100).toFixed(0)}%`;

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.setLineDash([]);
    ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);

    const cl = Math.min(15, (x2 - x1) * 0.2, (y2 - y1) * 0.2);
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(x1, y1 + cl); ctx.lineTo(x1, y1); ctx.lineTo(x1 + cl, y1); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x2 - cl, y1); ctx.lineTo(x2, y1); ctx.lineTo(x2, y1 + cl); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x1, y2 - cl); ctx.lineTo(x1, y2); ctx.lineTo(x1 + cl, y2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x2 - cl, y2); ctx.lineTo(x2, y2); ctx.lineTo(x2, y2 - cl); ctx.stroke();

    ctx.font = 'bold 11px monospace';
    const tw = ctx.measureText(label).width;
    ctx.fillStyle = color;
    ctx.fillRect(x1, y1 - 18, tw + 8, 16);
    ctx.fillStyle = '#ffffff';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, x1 + 4, y1 - 10);
  }
}

// ===== Stats =====

export function getStats(detections: Detection[]): DetectionStats {
  return {
    total: detections.length,
    helmet: detections.filter((d) => d.classId === 0).length,
    noHelmet: detections.filter((d) => d.classId === 1).length,
  };
}