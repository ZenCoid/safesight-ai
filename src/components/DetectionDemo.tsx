import { useEffect, useRef, useState, useCallback } from 'react';
import { Camera, X, Loader2, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import {
  loadModelWithProgress,
  detect,
  drawDetections,
  getStats,
  DetectionSmoother,
  type DetectionStats,
} from '../lib/detectionUtils';
import type { InferenceSession } from 'onnxruntime-web';

type DemoStatus = 'idle' | 'preloading' | 'ready' | 'loading' | 'running' | 'error';

export const DetectionDemo = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenRef = useRef<HTMLCanvasElement | null>(null);
  const offscreenCtxRef = useRef<CanvasRenderingContext2D | null>(null);
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
  const smootherRef = useRef(new DetectionSmoother());
  const facingModeRef = useRef<'user' | 'environment'>('user');
  const detectingRef = useRef(false);
  const lastVideoDimsRef = useRef({ w: 0, h: 0 });

  const [status, setStatus] = useState<DemoStatus>('idle');
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
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

  const stopCamera = useCallback(() => {
    isRunningRef.current = false;
    if (animFrameRef.current) { cancelAnimationFrame(animFrameRef.current); animFrameRef.current = 0; }
    if (videoRef.current) {
      const tracks = videoRef.current.srcObject as MediaStream;
      if (tracks) tracks.getTracks().forEach((t) => t.stop());
      videoRef.current.remove();
      videoRef.current = null;
    }
  }, []);

  const stopDemo = useCallback(() => {
    stopCamera();
    detectingRef.current = false;
    smootherRef.current.reset();
    lastDetectionsRef.current = [];
    lastVideoDimsRef.current = { w: 0, h: 0 };
    setStatus('ready');
    setStats({ total: 0, helmet: 0, noHelmet: 0 });
    setFps(0);
    setLatency(0);
  }, [stopCamera]);

  const startCameraStream = useCallback(async (mode: 'user' | 'environment') => {
    // Kill any existing camera
    if (videoRef.current) {
      const tracks = videoRef.current.srcObject as MediaStream;
      if (tracks) tracks.getTracks().forEach((t) => t.stop());
      videoRef.current.remove();
      videoRef.current = null;
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: mode },
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
  }, []);

  const runDetectionLoop = useCallback(() => {
    smootherRef.current.reset();
    isRunningRef.current = true;
    detectingRef.current = false;
    frameCountRef.current = 0;
    detectFrameRef.current = 0;
    lastStatsTimeRef.current = performance.now();
    lastDetectionsRef.current = [];
    lastVideoDimsRef.current = { w: 0, h: 0 };

    const runDetectionAsync = async () => {
      try {
        const offscreen = offscreenRef.current;
        if (!offscreen || !sessionRef.current) {
          detectingRef.current = false;
          return;
        }
        const result = await detect(sessionRef.current, offscreen);
        const smoothed = smootherRef.current.smooth(result.detections);
        lastDetectionsRef.current = smoothed;
        currentLatencyRef.current = result.latency;
      } catch (e) {
        // silent
      }
      detectingRef.current = false;
    };

    const renderLoop = () => {
      if (!isRunningRef.current) return;

      const canvas = canvasRef.current;
      const vid = videoRef.current;
      const offscreen = offscreenRef.current;
      if (!canvas || !vid || !offscreen) {
        animFrameRef.current = requestAnimationFrame(renderLoop);
        return;
      }
      if (vid.readyState < 2 || vid.videoWidth === 0) {
        animFrameRef.current = requestAnimationFrame(renderLoop);
        return;
      }

      const vw = vid.videoWidth;
      const vh = vid.videoHeight;

      if (lastVideoDimsRef.current.w !== vw || lastVideoDimsRef.current.h !== vh) {
        canvas.width = vw;
        canvas.height = vh;
        offscreen.width = vw;
        offscreen.height = vh;
        offscreenCtxRef.current = offscreen.getContext('2d', { willReadFrequently: true });
        lastVideoDimsRef.current = { w: vw, h: vh };
      }

      const octx = offscreenCtxRef.current || offscreen.getContext('2d')!;

      octx.save();
      if (facingModeRef.current === 'user') {
        octx.translate(vw, 0);
        octx.scale(-1, 1);
      }
      octx.drawImage(vid, 0, 0, vw, vh);
      octx.restore();

      drawDetections(canvas, offscreen, lastDetectionsRef.current);

      frameCountRef.current++;
      const now = performance.now();
      if (now - lastStatsTimeRef.current >= 1000) {
        setFps(frameCountRef.current);
        setLatency(currentLatencyRef.current);
        setStats(getStats(lastDetectionsRef.current));
        frameCountRef.current = 0;
        lastStatsTimeRef.current = now;
      }

      detectFrameRef.current++;
      if (detectFrameRef.current >= 3 && !detectingRef.current && sessionRef.current) {
        detectFrameRef.current = 0;
        detectingRef.current = true;
        runDetectionAsync();
      }

      animFrameRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameRef.current = requestAnimationFrame(renderLoop);
  }, []);

  const startDemo = useCallback(async () => {
    try {
      setStatus('loading');
      setError('');

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

      facingModeRef.current = 'user';
      setFacingMode('user');

      await startCameraStream('user');

      const offscreen = document.createElement('canvas');
      offscreenRef.current = offscreen;

      setStatus('running');
      runDetectionLoop();

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
  }, [startCameraStream, runDetectionLoop, stopDemo]);

  const flipCamera = useCallback(async () => {
    if (!isRunningRef.current || !sessionRef.current) return;

    try {
      isRunningRef.current = false;
      if (animFrameRef.current) { cancelAnimationFrame(animFrameRef.current); animFrameRef.current = 0; }

      const newMode = facingModeRef.current === 'user' ? 'environment' : 'user';
      facingModeRef.current = newMode;
      setFacingMode(newMode);

      await startCameraStream(newMode);
      runDetectionLoop();
    } catch (err: any) {
      try {
        facingModeRef.current = 'user';
        setFacingMode('user');
        await startCameraStream('user');
        runDetectionLoop();
      } catch (e) {
        stopDemo();
        setStatus('error');
        setError('Camera switch failed. Please try again.');
      }
    }
  }, [startCameraStream, runDetectionLoop, stopDemo]);

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
    <section ref={sectionRef} className="bg-dark-900">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="relative w-full bg-dark-950 border border-white/[0.04] rounded-lg overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

            {(status === 'idle' || status === 'preloading' || status === 'ready') && (
              <div className="relative z-10 flex flex-col items-center justify-center py-24 px-6">
                <div className={`w-20 h-20 rounded-2xl border flex items-center justify-center mb-8 transition-all duration-500 ${
                  status === 'ready'
                    ? 'bg-amber-500/15 border-amber-500/30'
                    : 'bg-white/[0.03] border-white/[0.06]'
                }`}>
                  {status === 'ready' ? (
                    <CheckCircle className="w-10 h-10 text-amber-500" />
                  ) : (
                    <Camera className="w-10 h-10 text-amber-500/60" />
                  )}
                </div>
                <h3 className="text-white text-xl font-semibold mb-2">Try the Live Demo</h3>
                <p className="text-dark-300 text-sm text-center mb-4 max-w-md leading-relaxed">
                  Your webcam will detect helmet compliance in real time. All processing runs locally in your browser — nothing is sent to any server.
                </p>

                {status === 'preloading' && (
                  <div className="mb-6">
                    <p className="text-dark-300 text-xs mb-2 text-center">Preparing AI model...</p>
                    <div className="w-48 h-1.5 bg-dark-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-300 rounded-full"
                        style={{ width: `${Math.min(loadingProgress, 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                {status === 'ready' && (
                  <p className="text-amber-400 text-xs mb-6 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    AI model loaded — ready to start instantly
                  </p>
                )}

                <button
                  onClick={startDemo}
                  disabled={status === 'preloading'}
                  className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all active:scale-[0.97] flex items-center gap-2 ${
                    status === 'ready'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-dark-950 hover:shadow-lg hover:shadow-amber-500/20'
                      : 'bg-dark-700 text-white hover:bg-dark-600'
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
                <Loader2 className="w-10 h-10 text-amber-500 animate-spin mb-6" />
                <p className="text-white text-sm font-medium mb-4">{loadingMsg}</p>
                <div className="w-64 h-2 bg-dark-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-300 rounded-full"
                    style={{ width: `${Math.min(loadingProgress, 100)}%` }}
                  />
                </div>
                <p className="text-dark-400 text-xs mt-2">{loadingProgress}%</p>
              </div>
            )}

            {status === 'running' && (
              <>
                <div className="relative w-full aspect-[4/3] md:aspect-[16/9] bg-black">
                  <canvas ref={canvasRef} className="w-full h-full object-contain" />
                </div>
                <div className="absolute left-0 w-full h-[1px] bg-amber-500/30 animate-scan-line shadow-[0_0_8px_rgba(245,158,11,0.4)] z-20 pointer-events-none" />
                <div className="absolute top-4 right-4 glass rounded-xl p-3 min-w-[160px] z-30">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white text-xs font-mono">Detected:</span>
                    <span className="text-white text-xs font-mono font-bold">{stats.total}</span>
                  </div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white text-xs font-mono">Helmet:</span>
                    <span className="text-green-400 text-xs font-mono font-bold">{stats.helmet}</span>
                  </div>
                  <div className="flex justify-between items-center mb-3 pb-2 border-b border-white/5">
                    <span className="text-white text-xs font-mono">No Helmet:</span>
                    <span className="text-red-400 text-xs font-mono font-bold">{stats.noHelmet}</span>
                  </div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-dark-400 text-[10px] font-mono">FPS:</span>
                    <span className="text-dark-400 text-[10px] font-mono">{fps}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-dark-400 text-[10px] font-mono">Latency:</span>
                    <span className="text-dark-400 text-[10px] font-mono">{latency}ms</span>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-30">
                  <button
                    onClick={stopDemo}
                    className="bg-red-500/80 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-red-500 transition-all flex items-center gap-1.5"
                  >
                    <X className="w-3 h-3" />
                    Stop Demo
                  </button>
                  <button
                    onClick={flipCamera}
                    className="glass text-white px-3 py-2 rounded-xl text-xs font-semibold hover:bg-white/10 transition-all flex items-center gap-1.5"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 transition-transform duration-300 ${facingMode === 'environment' ? 'rotate-180' : ''}`} />
                    <span className="hidden sm:inline">{facingMode === 'user' ? 'Back Camera' : 'Front Camera'}</span>
                  </button>
                </div>
              </>
            )}

            {status === 'error' && (
              <div className="relative z-10 flex flex-col items-center justify-center py-24 px-6">
                <AlertTriangle className="w-10 h-10 text-red-400 mb-6" />
                <p className="text-red-400 text-sm text-center max-w-md mb-6">{error}</p>
                <button
                  onClick={startDemo}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 text-dark-950 px-6 py-3 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-amber-500/20 transition-all active:scale-[0.97]"
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