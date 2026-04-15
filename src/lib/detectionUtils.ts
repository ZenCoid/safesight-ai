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

const INPUT_SIZE = 640;
const CONF_THRESHOLD = 0.35;
const IOU_THRESHOLD = 0.45;
const CLASS_LABELS = ['helmet', 'no_helmet'];
const CLASS_COLORS = ['#16a34a', '#ef4444'];

// ===== ONNX Setup =====

let initialized = false;

function initONNX(): void {
  if (initialized) return;
  ort.env.wasm.wasmPaths = 'https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/';
  ort.env.wasm.numThreads = 1;
  initialized = true;
}

// ===== Model Loading =====

export async function loadModel(modelPath: string): Promise<ort.InferenceSession> {
  initONNX();
  return await ort.InferenceSession.create(modelPath);
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

// ===== Preprocessing =====

function preprocess(source: HTMLCanvasElement): {
  tensor: ort.Tensor;
  scale: number;
  padX: number;
  padY: number;
} {
  const srcW = source.width;
  const srcH = source.height;
  const scale = Math.min(INPUT_SIZE / srcW, INPUT_SIZE / srcH);
  const newW = Math.round(srcW * scale);
  const newH = Math.round(srcH * scale);
  const padX = (INPUT_SIZE - newW) / 2;
  const padY = (INPUT_SIZE - newH) / 2;

  const canvas = document.createElement('canvas');
  canvas.width = INPUT_SIZE;
  canvas.height = INPUT_SIZE;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = 'rgb(114, 114, 114)';
  ctx.fillRect(0, 0, INPUT_SIZE, INPUT_SIZE);
  ctx.drawImage(source, 0, 0, srcW, srcH, padX, padY, newW, newH);

  const imageData = ctx.getImageData(0, 0, INPUT_SIZE, INPUT_SIZE);
  const pixels = imageData.data;
  const channelSize = INPUT_SIZE * INPUT_SIZE;
  const data = new Float32Array(3 * channelSize);
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
    if (bestProb < CONF_THRESHOLD) continue;

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

// ===== Drawing (now draws video frame + boxes) =====

export function drawDetections(
  canvas: HTMLCanvasElement,
  source: HTMLCanvasElement,
  detections: Detection[]
): void {
  const ctx = canvas.getContext('2d')!;
  // Draw the video frame first
  ctx.drawImage(source, 0, 0, canvas.width, canvas.height);

  for (const det of detections) {
    const [x1, y1, x2, y2] = det.bbox;
    const color = CLASS_COLORS[det.classId] || '#ffffff';
    const isHelmet = det.classId === 0;
    const label = isHelmet
      ? `HELMET ${(det.confidence * 100).toFixed(0)}%`
      : `NO HELMET ${(det.confidence * 100).toFixed(0)}%`;

    // Box
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.setLineDash([]);
    ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);

    // Corner accents
    const cl = Math.min(15, (x2 - x1) * 0.2, (y2 - y1) * 0.2);
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(x1, y1 + cl); ctx.lineTo(x1, y1); ctx.lineTo(x1 + cl, y1); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x2 - cl, y1); ctx.lineTo(x2, y1); ctx.lineTo(x2, y1 + cl); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x1, y2 - cl); ctx.lineTo(x1, y2); ctx.lineTo(x1 + cl, y2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x2 - cl, y2); ctx.lineTo(x2, y2); ctx.lineTo(x2, y2 - cl); ctx.stroke();

    // Label
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