import React, { Suspense } from 'react';

const Spline = React.lazy(() => import('@splinetool/react-spline'));

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-end bg-hero-bg overflow-hidden">
      <div className="absolute inset-0">
        <Suspense fallback={<div className="absolute inset-0 bg-hero-bg" />}>
          <Spline
            scene="https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode"
            className="w-full h-full"
          />
        </Suspense>
      </div>

      <div className="absolute inset-0 bg-black/40 z-[1] pointer-events-none" />

      <div className="relative z-10 pointer-events-none w-full max-w-[90%] sm:max-w-md lg:max-w-2xl px-6 md:px-10 pb-10 md:pb-12 pt-32">
        <h1 
          className="text-foreground text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1.1] tracking-[-0.04em] mb-2 md:mb-4 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          AI that watches <br />
          <span className="text-primary">your job site.</span>
        </h1>

        <p 
          className="text-foreground/80 text-[clamp(1rem,2vw,1.5rem)] font-light mb-3 md:mb-6 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          Detects missing safety gear on your workers in real time using existing CCTV cameras.
        </p>

        <p 
          className="text-muted-foreground text-[clamp(0.875rem,1.5vw,1.125rem)] font-light mb-4 md:mb-8 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.55s" }}
        >
          Real-time PPE detection across six categories using your existing CCTV cameras. Alerts in under 200ms.
        </p>

        <div 
          className="flex flex-wrap gap-3 font-bold opacity-0 animate-fade-up pointer-events-auto"
          style={{ animationDelay: "0.7s" }}
        >
          <button className="bg-orange text-orange-foreground px-6 py-3 md:px-8 md:py-4 text-sm font-semibold rounded-sm cursor-pointer hover:brightness-110 transition-all active:scale-[0.97]">
            Join Early Access
          </button>
          <button className="bg-white/10 text-foreground border border-white/10 px-6 py-3 md:px-8 md:py-4 text-sm font-semibold rounded-sm cursor-pointer hover:bg-white/20 transition-all active:scale-[0.97]">
            See How It Works
          </button>
        </div>

        <p 
          className="text-muted-foreground/50 text-[10px] md:text-xs font-light mt-4 md:mt-6 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.85s" }}
        >
          Currently in early development. Join the waitlist below.
        </p>
      </div>
    </section>
  );
};
