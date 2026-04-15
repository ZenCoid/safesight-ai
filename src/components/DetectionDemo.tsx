import { useEffect, useState } from 'react';
import { ScrollReveal } from './ScrollReveal';

export const DetectionDemo = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 md:py-28 px-6 md:px-16 lg:px-24 bg-background">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 className="text-foreground text-3xl md:text-4xl font-semibold mb-4">
            See it in action
          </h2>
          <p className="text-muted-foreground text-lg font-light mb-1 max-w-2xl">
            A simulated detection feed showing how SafeSight identifies PPE compliance.
          </p>
          <p className="text-muted-foreground/60 text-xs mb-8">
            Simulated demo. Actual performance depends on camera quality, angle, and lighting.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="relative w-full h-[400px] md:h-[500px] bg-hero-bg border border-border rounded-lg overflow-hidden">
            {/* Grid background for technical feel */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            
            {/* Worker 1 (Compliant) */}
            <div className="absolute left-[15%] bottom-[10%] w-[60px] h-[160px] md:w-[80px] md:h-[200px] flex flex-col items-center border-[2px] border-primary rounded-sm shadow-[0_0_8px_rgba(22,163,74,0.4)]">
              <div className="absolute -top-4 left-0 text-primary text-[9px] md:text-[10px] leading-tight flex justify-between bg-hero-bg/90 px-1 whitespace-nowrap">
                <span>[COMPLIANT]</span>
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 bg-muted rounded-full mt-2" />
              <div className="w-12 h-16 md:w-16 md:h-20 bg-muted rounded-t-lg mt-1" />
              <div className="w-12 h-14 md:w-16 md:h-20 bg-muted rounded-b-sm mt-1" />
            </div>

            {/* Worker 2 (Compliant - further back) */}
            <div className="absolute left-[40%] bottom-[30%] w-[40px] h-[110px] md:w-[50px] md:h-[130px] flex flex-col items-center border-[2px] border-primary rounded-sm shadow-[0_0_8px_rgba(22,163,74,0.3)]">
              <div className="absolute -top-4 left-0 text-primary text-[9px] leading-tight bg-hero-bg/90 px-1 whitespace-nowrap">
                [COMPLIANT]
              </div>
              <div className="w-5 h-5 md:w-6 md:h-6 bg-muted rounded-full mt-2" />
              <div className="w-8 h-10 md:w-10 md:h-12 bg-muted rounded-t-lg mt-1" />
              <div className="w-8 h-12 md:w-10 md:h-16 bg-muted rounded-b-sm mt-1" />
            </div>

            {/* Worker 3 (Violation - Missing Hard Hat) */}
            <div className="absolute left-[65%] bottom-[5%] w-[80px] h-[220px] md:w-[100px] md:h-[260px] flex flex-col items-center border-[2px] border-destructive rounded-sm animate-pulse-red shadow-[0_0_12px_rgba(239,68,68,0.6)]">
              <div className="absolute -top-4 left-0 text-destructive text-[10px] md:text-xs leading-tight font-bold bg-hero-bg/90 px-1 z-10 whitespace-nowrap">
                [MISSING: HARD HAT]
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-muted/60 rounded-full mt-3" />
              <div className="w-16 h-20 md:w-20 md:h-24 bg-muted rounded-t-lg mt-1" />
              <div className="w-16 h-24 md:w-20 md:h-28 bg-muted rounded-b-sm mt-1" />
            </div>

            {/* Worker 4 (Compliant - right) */}
            <div className="absolute right-[10%] bottom-[20%] w-[50px] h-[130px] md:w-[60px] md:h-[160px] flex flex-col items-center border-[2px] border-primary rounded-sm shadow-[0_0_8px_rgba(22,163,74,0.3)] hidden sm:flex">
              <div className="absolute -top-4 left-0 text-primary text-[9px] md:text-[10px] leading-tight bg-hero-bg/90 px-1 whitespace-nowrap">
                [COMPLIANT]
              </div>
              <div className="w-6 h-6 md:w-8 md:h-8 bg-muted rounded-full mt-2" />
              <div className="w-10 h-12 md:w-12 md:h-16 bg-muted rounded-t-lg mt-1" />
              <div className="w-10 h-14 md:w-12 md:h-18 bg-muted rounded-b-sm mt-1" />
            </div>

            {/* Scanning Line */}
            <div className="absolute left-0 w-full h-[1px] bg-primary/40 animate-scan-line shadow-[0_0_8px_rgba(22,163,74,0.6)] z-20" />

            {/* Stats Overlay */}
            <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-none border border-border rounded p-3 min-w-[140px] z-30">
              <div className="flex justify-between items-center mb-1">
                <span className="text-foreground text-xs font-mono">Workers:</span>
                <span className="text-foreground text-xs font-mono font-bold">4</span>
              </div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-foreground text-xs font-mono">Compliant:</span>
                <span className="text-primary text-xs font-mono font-bold">3</span>
              </div>
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-border/50">
                <span className="text-foreground text-xs font-mono">Violations:</span>
                <span className="text-destructive text-xs font-mono font-bold animate-pulse">1</span>
              </div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-muted-foreground text-[10px] font-mono">Latency:</span>
                <span className="text-muted-foreground text-[10px] font-mono">187ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-[10px] font-mono">Live:</span>
                <span className="text-muted-foreground text-[10px] font-mono">{time}</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
