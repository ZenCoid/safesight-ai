import { useEffect, useRef, useState, useCallback } from 'react';
import { Camera, X, Loader2, AlertTriangle, CheckCircle } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import {
  loadModelWithProgress,
  detect,
  drawDetections,
  getStats,
  type DetectionStats,
} from '../lib/detectionUtils';
import type { InferenceSession } from 'onnxruntime-web';

type DemoStatus = 'idle' | 'preloading' | 'ready' | 'loading' | 'running' | 'error';

export const DetectionDemo = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sessionRef = useRef<InferenceSession | null>(null);
  const animFrameRef = useRef<number>(0);
  const isRunningRef = useRef(false);
  const frameCountRef = useRef(0);
  const detectFrameRef = useRef(0);
  const lastStatsTimeRef = useRef(0);
  const currentLatencyRef = useRef(0);
  const lastDetectionsRef = useRef<any[]>([]);
  const preloadedRef = useRef(false);
  const preloadingRef = useRef(false);

  const [status, setStatus] = useState<DemoStatus>('idle');
  const [error, setError] = useState('');
  const [stats, setStats] = useState<DetectionStats>({ total: 0, helmet: 0, noHelmet: 0 });
  const [fps, setFps] = useState(0);
  const [latency, setLatency] = useState(0);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Pre-load model when section scrolls into view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !preloadedRef.current && !preloadingRef.current) {
            preloadModel();
          }
        });
      },
      { rootMargin: '400px 0px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const preloadModel = async () => {
    preloadingRef.current = true;
    setStatus('preloading');
    setLoadingProgress(0);

    try {
      const session = await loadModelWithProgress('/best_quant.onnx', (progress) => {
        setLoadingProgress(Math.round(progress * 100));
      });
      sessionRef.current = session;

      // Pre-warm: run one dummy inference so WASM is fully ready
      try {
        const warmup = document.createElement('canvas');
        warmup.width = 640;
        warmup.height = 640;
        const wctx = warmup.getContext('2d')!;
        wctx.fillStyle = '#333';
        wctx.fillRect(0, 0, 640, 640);
        await detect(session, warmup);
      } catch (e) {
        // warmup failure is non-critical
      }

      preloadedRef.current = true;
      preloadingRef.current = false;
      setStatus('ready');
    } catch (err: any) {
      preloadingRef.current = false;
      sessionRef.current = null;
      setStatus('idle');
      console.warn('Pre-load failed, will retry on click:', err.message);
    }
  };

  const stopDemo = useCallback(() => {
    isRunningRef.current = false;
    if (animFrameRef.current) { cancelAnimationFrame(animFrameRef.current); animFrameRef.current = 0; }
    if (videoRef.current) {
      const tracks = videoRef.current.srcObject as MediaStream;
      if (tracks) tracks.getTracks().forEach((t) => t.stop());
      videoRef.current.remove();
      videoRef.current = null;
    }
    setStatus('ready');
    setStats({ total: 0, helmet: 0, noHelmet: 0 });
    setFps(0);
    setLatency(0);
  }, []);

  const startDemo = useCallback(async () => {
    try {
      setStatus('loading');
      setError('');

      // If model not pre-loaded, load it now
      if (!sessionRef.current) {
        setLoadingMsg('Loading AI model...');
        setLoadingProgress(0);
        const session = await loadModelWithProgress('/best_quant.onnx', (progress) => {
          setLoadingProgress(Math.round(progress * 100));
        });
        sessionRef.current = session;
      }

      setLoadingMsg('Accessing camera...');
      setLoadingProgress(95);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' },
        audio: false,
      });

      const video = document.createElement('video');
      video.setAttribute('playsinline', '');
      video.setAttribute('autoplay', '');
      video.muted = true;
      video.srcObject = stream;
      document.body.appendChild(video);
      videoRef.current = video;

      await new Promise<void>((resolve, reject) => {
        const onReady = () => {
          video.removeEventListener('loadeddata', onReady);
          resolve();
        };
        video.addEventListener('loadeddata', onReady);
        setTimeout(() => reject(new Error('Video load timeout')), 10000);
      });

      await video.play();

      if (video.readyState < 2 || video.videoWidth === 0) {
        throw new Error('Video not playing');
      }

      const offscreen = document.createElement('canvas');
      offscreenRef.current = offscreen;

      setStatus('running');
      isRunningRef.current = true;
      frameCountRef.current = 0;
      detectFrameRef.current = 0;
      lastStatsTimeRef.current = performance.now();
      lastDetectionsRef.current = [];

      const processFrame = async () => {
        if (!isRunningRef.current) return;

        const canvas = canvasRef.current;
        const vid = videoRef.current;
        if (!canvas || !vid || !offscreenRef.current) return;
        if (vid.readyState < 2 || vid.videoWidth === 0) {
          animFrameRef.current = requestAnimationFrame(processFrame);
          return;
        }

        const vw = vid.videoWidth;
        const vh = vid.videoHeight;
        canvas.width = vw;
        canvas.height = vh;
        offscreenRef.current.width = vw;
        offscreenRef.current.height = vh;

        const octx = offscreenRef.current.getContext('2d')!;
        octx.drawImage(vid, 0, 0, vw, vh);

        frameCountRef.current++;
        detectFrameRef.current++;

        // Run detection every 4 frames for smooth video
        if (detectFrameRef.current >= 4 && sessionRef.current) {
          detectFrameRef.current = 0;
          try {
            const result = await detect(sessionRef.current, offscreenRef.current);
            lastDetectionsRef.current = result.detections;
            currentLatencyRef.current = result.latency;
          } catch (e) {
            // silent
          }
        }

        drawDetections(canvas, offscreenRef.current, lastDetectionsRef.current);

        const now = performance.now();
        if (now - lastStatsTimeRef.current >= 1000) {
          setFps(frameCountRef.current);
          setLatency(currentLatencyRef.current);
          setStats(getStats(lastDetectionsRef.current));
          frameCountRef.current = 0;
          lastStatsTimeRef.current = now;
        }

        if (isRunningRef.current) {
          animFrameRef.current = requestAnimationFrame(processFrame);
        }
      };
      animFrameRef.current = requestAnimationFrame(processFrame);

    } catch (err: any) {
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
    <section ref={sectionRef} className="py-20 md:py-28 px-6 md:px-16 lg:px-24 bg-background">
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

            {(status === 'idle' || status === 'preloading' || status === 'ready') && (
              <div className="relative z-10 flex flex-col items-center justify-center py-24 px-6">
                <div className={`w-20 h-20 rounded-full border flex items-center justify-center mb-8 transition-all duration-500 ${
                  status === 'ready'
                    ? 'bg-primary/20 border-primary/40'
                    : 'bg-primary/10 border-primary/20'
                }`}>
                  {status === 'ready' ? (
                    <CheckCircle className="w-10 h-10 text-primary" />
                  ) : (
                    <Camera className="w-10 h-10 text-primary" />
                  )}
                </div>
                <h3 className="text-foreground text-xl font-semibold mb-2">Try the Live Demo</h3>
                <p className="text-muted-foreground text-sm text-center mb-4 max-w-md leading-relaxed">
                  Your webcam will detect helmet compliance in real time. All processing runs locally in your browser — nothing is sent to any server.
                </p>

                {status === 'preloading' && (
                  <div className="mb-6">
                    <p className="text-muted-foreground text-xs mb-2 text-center">Preparing AI model...</p>
                    <div className="w-48 h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-300 rounded-full"
                        style={{ width: `${Math.min(loadingProgress, 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                {status === 'ready' && (
                  <p className="text-primary text-xs mb-6 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    AI model loaded — ready to start instantly
                  </p>
                )}

                <button
                  onClick={startDemo}
                  disabled={status === 'preloading'}
                  className={`px-8 py-3 rounded-sm text-sm font-semibold transition-all active:scale-[0.97] flex items-center gap-2 ${
                    status === 'ready'
                      ? 'bg-orange text-orange-foreground hover:brightness-110'
                      : 'bg-secondary text-foreground hover:bg-white/10'
                  }`}
                >
                  {status === 'preloading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <Camera className="w-4 h-4" />
                      Start Live Demo
                    </>
                  )}
                </button>
              </div>
            )}

            {status === 'loading' && (
              <div className="relative z-10 flex flex-col items-center justify-center py-24 px-6">
                <Loader2 className="w-10 h-10 text-primary animate-spin mb-6" />
                <p className="text-foreground text-sm font-medium mb-4">{loadingMsg}</p>
                <div className="w-64 h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300 rounded-full"
                    style={{ width: `${Math.min(loadingProgress, 100)}%` }}
                  />
                </div>
                <p className="text-muted-foreground/60 text-xs mt-2">{loadingProgress}%</p>
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