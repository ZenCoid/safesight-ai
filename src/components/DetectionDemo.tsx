import { useEffect, useRef, useState, useCallback } from 'react';
import { Camera, X, Loader2, AlertTriangle } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import {
  loadModel,
  detect,
  drawDetections,
  getStats,
  type DetectionStats,
} from '../lib/detectionUtils';
import type { InferenceSession } from 'onnxruntime-web';

type DemoStatus = 'idle' | 'loading' | 'running' | 'error';

export const DetectionDemo = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sessionRef = useRef<InferenceSession | null>(null);
  const animFrameRef = useRef<number>(0);
  const isRunningRef = useRef(false);
  const frameCountRef = useRef(0);
  const lastStatsTimeRef = useRef(0);
  const currentLatencyRef = useRef(0);

  const [status, setStatus] = useState<DemoStatus>('idle');
  const [error, setError] = useState('');
  const [stats, setStats] = useState<DetectionStats>({ total: 0, helmet: 0, noHelmet: 0 });
  const [fps, setFps] = useState(0);
  const [latency, setLatency] = useState(0);
  const [loadingMsg, setLoadingMsg] = useState('');

  const stopDemo = useCallback(() => {
    isRunningRef.current = false;
    if (animFrameRef.current) { cancelAnimationFrame(animFrameRef.current); animFrameRef.current = 0; }
    if (videoRef.current) {
      const tracks = videoRef.current.srcObject as MediaStream;
      if (tracks) tracks.getTracks().forEach((t) => t.stop());
      videoRef.current.remove();
      videoRef.current = null;
    }
    if (sessionRef.current) { sessionRef.current.release(); sessionRef.current = null; }
    setStatus('idle');
    setStats({ total: 0, helmet: 0, noHelmet: 0 });
    setFps(0);
    setLatency(0);
  }, []);

  const startDemo = useCallback(async () => {
    try {
      setStatus('loading');
      setError('');
      setLoadingMsg('Loading AI model... (this may take a moment)');

      const session = await loadModel('/best.onnx');
      sessionRef.current = session;

      setLoadingMsg('Accessing camera...');

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' },
        audio: false,
      });

      // Create video element directly in JS - no React involved
      const video = document.createElement('video');
      video.setAttribute('playsinline', '');
      video.setAttribute('autoplay', '');
      video.muted = true;
      video.srcObject = stream;
      document.body.appendChild(video);
      videoRef.current = video;

      // Wait for video to actually be ready
      await new Promise<void>((resolve, reject) => {
        const onReady = () => {
          video.removeEventListener('loadeddata', onReady);
          resolve();
        };
        video.addEventListener('loadeddata', onReady);
        setTimeout(() => reject(new Error('Video load timeout')), 10000);
      });

      await video.play();

      // Verify video is actually playing
      if (video.readyState < 2 || video.videoWidth === 0) {
        throw new Error('Video is not playing. readyState=' + video.readyState + ' videoWidth=' + video.videoWidth);
      }

      console.log('Video is live:', video.videoWidth, 'x', video.videoHeight, 'readyState:', video.readyState);

      const offscreen = document.createElement('canvas');
      offscreenRef.current = offscreen;

      setStatus('running');
      isRunningRef.current = true;
      frameCountRef.current = 0;
      lastStatsTimeRef.current = performance.now();

      // Start detection loop
      const processFrame = async () => {
        if (!isRunningRef.current) return;

        const canvas = canvasRef.current;
        if (!canvas || !video || !offscreenRef.current || !sessionRef.current) return;
        if (video.readyState < 2 || video.videoWidth === 0) {
          animFrameRef.current = requestAnimationFrame(processFrame);
          return;
        }

        const vw = video.videoWidth;
        const vh = video.videoHeight;
        canvas.width = vw;
        canvas.height = vh;
        offscreenRef.current.width = vw;
        offscreenRef.current.height = vh;

        const octx = offscreenRef.current.getContext('2d')!;
        octx.drawImage(video, 0, 0, vw, vh);

        try {
          const result = await detect(sessionRef.current, offscreenRef.current);
          drawDetections(canvas, offscreenRef.current!, result.detections);

          frameCountRef.current++;
          currentLatencyRef.current = result.latency;
          const now = performance.now();
          if (now - lastStatsTimeRef.current >= 1000) {
            setFps(frameCountRef.current);
            setLatency(currentLatencyRef.current);
            setStats(getStats(result.detections));
            frameCountRef.current = 0;
            lastStatsTimeRef.current = now;
          }
        } catch (e) {
          console.error('Frame error:', e);
        }

        if (isRunningRef.current) {
          animFrameRef.current = requestAnimationFrame(processFrame);
        }
      };
      animFrameRef.current = requestAnimationFrame(processFrame);

    } catch (err: any) {
      console.error('Demo failed:', err);
      stopDemo();
      setStatus('error');
      setError(
        err.name === 'NotAllowedError'
          ? 'Camera access denied. Please allow camera permissions and try again.'
          : err.name === 'NotFoundError'
          ? 'No camera found on this device.'
          : `Something went wrong: ${err.message || 'Unknown error'}`
      );
    }
  }, [stopDemo]);

  useEffect(() => {
    return () => {
      isRunningRef.current = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (videoRef.current) {
        const tracks = videoRef.current.srcObject as MediaStream;
        if (tracks) tracks.getTracks().forEach((t) => t.stop());
        videoRef.current.remove();
      }
      if (sessionRef.current) sessionRef.current.release();
    };
  }, []);

  return (
    <section className="py-20 md:py-28 px-6 md:px-16 lg:px-24 bg-background">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 className="text-foreground text-3xl md:text-4xl font-semibold mb-4">
            Live Detection Demo
          </h2>
          <p className="text-muted-foreground text-lg font-light mb-1 max-w-2xl">
            Real-time helmet detection powered by YOLOv11n — running entirely in your browser.
          </p>
          <p className="text-muted-foreground/60 text-xs mb-8">
            Uses your webcam. No data is sent to any server — all processing happens locally via ONNX Runtime.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="relative w-full bg-hero-bg border border-border rounded-lg overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

            {status === 'idle' && (
              <div className="relative z-10 flex flex-col items-center justify-center py-24 px-6">
                <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-8">
                  <Camera className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-foreground text-xl font-semibold mb-2">Try the Live Demo</h3>
                <p className="text-muted-foreground text-sm text-center mb-8 max-w-md leading-relaxed">
                  Your webcam will detect helmet compliance in real time. All processing runs locally in your browser — nothing is sent to any server.
                </p>
                <button
                  onClick={startDemo}
                  className="bg-orange text-orange-foreground px-8 py-3 rounded-sm text-sm font-semibold hover:brightness-110 transition-all active:scale-[0.97] flex items-center gap-2"
                >
                  <Camera className="w-4 h-4" />
                  Start Live Demo
                </button>
              </div>
            )}

            {status === 'loading' && (
              <div className="relative z-10 flex flex-col items-center justify-center py-24 px-6">
                <Loader2 className="w-10 h-10 text-primary animate-spin mb-6" />
                <p className="text-foreground text-sm font-medium">{loadingMsg}</p>
              </div>
            )}

            {status === 'running' && (
              <>
                <div className="relative w-full aspect-[4/3] md:aspect-[16/9] bg-black">
                  <canvas ref={canvasRef} className="w-full h-full object-contain" />
                </div>
                <div className="absolute left-0 w-full h-[1px] bg-primary/40 animate-scan-line shadow-[0_0_8px_rgba(22,163,74,0.6)] z-20 pointer-events-none" />
                <div className="absolute top-4 right-4 bg-background/90 border border-border rounded p-3 min-w-[160px] z-30">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-foreground text-xs font-mono">Detected:</span>
                    <span className="text-foreground text-xs font-mono font-bold">{stats.total}</span>
                  </div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-foreground text-xs font-mono">Helmet:</span>
                    <span className="text-primary text-xs font-mono font-bold">{stats.helmet}</span>
                  </div>
                  <div className="flex justify-between items-center mb-3 pb-2 border-b border-border/50">
                    <span className="text-foreground text-xs font-mono">No Helmet:</span>
                    <span className="text-destructive text-xs font-mono font-bold">{stats.noHelmet}</span>
                  </div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-muted-foreground text-[10px] font-mono">FPS:</span>
                    <span className="text-muted-foreground text-[10px] font-mono">{fps}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-[10px] font-mono">Latency:</span>
                    <span className="text-muted-foreground text-[10px] font-mono">{latency}ms</span>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 z-30">
                  <button
                    onClick={stopDemo}
                    className="bg-destructive/90 text-white px-4 py-2 rounded-sm text-xs font-semibold hover:brightness-110 transition-all flex items-center gap-1.5"
                  >
                    <X className="w-3 h-3" />
                    Stop Demo
                  </button>
                </div>
              </>
            )}

            {status === 'error' && (
              <div className="relative z-10 flex flex-col items-center justify-center py-24 px-6">
                <AlertTriangle className="w-10 h-10 text-destructive mb-6" />
                <p className="text-destructive text-sm text-center max-w-md mb-6">{error}</p>
                <button
                  onClick={startDemo}
                  className="bg-orange text-orange-foreground px-6 py-3 rounded-sm text-sm font-semibold hover:brightness-110 transition-all active:scale-[0.97]"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};