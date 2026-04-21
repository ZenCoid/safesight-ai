import { useEffect, useRef, useState } from 'react';
import ConstructionScene from './ConstructionScene';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Staggered fade-up on load
    const fadeEls = el.querySelectorAll('[data-fade]');
    fadeEls.forEach((child, i) => {
      const htmlEl = child as HTMLElement;
      htmlEl.style.opacity = '0';
      htmlEl.style.transform = 'translateY(24px)';
      htmlEl.style.filter = 'blur(6px)';
      htmlEl.style.transition = `opacity 0.7s ease ${i * 0.12}s, transform 0.7s ease ${i * 0.12}s, filter 0.7s ease ${i * 0.12}s`;
    });

    // Trigger after a tiny delay so transitions fire
    requestAnimationFrame(() => {
      fadeEls.forEach((child) => {
        const htmlEl = child as HTMLElement;
        htmlEl.style.opacity = '1';
        htmlEl.style.transform = 'translateY(0)';
        htmlEl.style.filter = 'blur(0)';
      });
    });

    setVisible(true);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-end overflow-hidden bg-[#060A13]"
      style={{ fontFamily: "'Sora', sans-serif" }}
    >
      {/* ── Subtle radial gradient background ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 20% 80%, rgba(34,197,94,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 20%, rgba(249,115,22,0.04) 0%, transparent 50%)',
        }}
      />

      {/* ── Hero content: anchored bottom-left ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-16 sm:pb-20 lg:pb-24 pt-32">
        <div className="max-w-2xl">
          {/* Badge */}
          <div data-fade className="mb-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide border border-[#22C55E]/20 bg-[#22C55E]/5 text-[#22C55E]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
              AI-Powered Safety Detection
            </span>
          </div>

          {/* Heading */}
          <h1
            data-fade
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Detect Safety{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#F59E0B]">
              Violations
            </span>{' '}
            Before They Happen
          </h1>

          {/* Description */}
          <p
            data-fade
            className="text-base sm:text-lg text-white/60 leading-relaxed max-w-lg mb-8"
          >
            Real-time PPE detection powered by YOLOv11n. Keep your construction
            site compliant and your workers safe — with zero hardware installs.
          </p>

          {/* CTA Buttons */}
          <div data-fade className="flex flex-wrap gap-4 mb-4">
            <a
              href="#early-access"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#F97316] hover:bg-[#EA580C] transition-colors duration-200 shadow-lg shadow-[#F97316]/20"
            >
              Join Early Access
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold text-white/80 border border-white/10 hover:bg-white/5 hover:text-white transition-all duration-200"
            >
              See How It Works
            </a>
          </div>

          {/* ── Animation preview box ── */}
          {visible && (
            <div data-fade className="mt-12">
              <ConstructionScene />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}