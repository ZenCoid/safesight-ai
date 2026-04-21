import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ConstructionScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      tlRef.current?.kill();
    };
  }, []);

  function startAnimation() {
    if (tlRef.current) return;

    // ── Set all animated elements to hidden state ──
    gsap.set('[data-cs]', { opacity: 0 });
    gsap.set('[data-cs="worker"]', { x: -40 });
    gsap.set('[data-cs="helmet"]', { scale: 0.5, transformOrigin: '401px 236px' });
    gsap.set('[data-cs="label"]', { x: 20 });
    gsap.set('[data-cs="scan"]', { attr: { x: -30 } });

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 2.5,
      defaults: { ease: 'power2.out' },
    });

    // ── Phase 1: Construction scene fades in ──
    tl.to('[data-cs="building"]', {
      opacity: 1,
      duration: 0.6,
      stagger: 0.15,
    })
      .to('[data-cs="crane"]', { opacity: 1, duration: 0.4 }, '-=0.3')

      // ── Phase 2: Worker walks in from left ──
      .to('[data-cs="worker"]', { opacity: 1, x: 0, duration: 0.7 }, '-=0.1')

      // ── Phase 3: Helmet materializes with green glow ──
      .to(
        '[data-cs="helmet"]',
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' },
        '+=0.3'
      )
      .to('[data-cs="helmet-glow"]', { opacity: 0.8, duration: 0.25 }, '-=0.15')
      .to('[data-cs="helmet-glow"]', { opacity: 0, duration: 0.4 }, '+=0.15')

      // ── Phase 4: AI scan line sweeps across ──
      .to('[data-cs="scan"]', { opacity: 0.5, duration: 0.1 }, '+=0.2')
      .to('[data-cs="scan"]', {
        attr: { x: 830 },
        duration: 1.2,
        ease: 'none',
      })
      .to('[data-cs="scan"]', { opacity: 0, duration: 0.15 })

      // ── Phase 5: Detection results appear ──
      .to('[data-cs="detect-box"]', { opacity: 1, duration: 0.3 }, '+=0.15')
      .to('[data-cs="label"]', { opacity: 1, x: 0, duration: 0.35 }, '-=0.15')
      .to('[data-cs="badge"]', { opacity: 1, duration: 0.3 }, '-=0.2')

      // ── Hold so user can see the result ──
      .to({}, { duration: 2.5 })

      // ── Fade everything out for next loop ──
      .to(
        '[data-cs="detect-box"], [data-cs="label"], [data-cs="badge"]',
        { opacity: 0, duration: 0.3 }
      )
      .to(
        '[data-cs="helmet"], [data-cs="helmet-glow"]',
        { opacity: 0, duration: 0.3 },
        '-=0.2'
      )
      .to(
        '[data-cs="worker"]',
        { opacity: 0, x: -20, duration: 0.35 },
        '-=0.2'
      )
      .to(
        '[data-cs="building"], [data-cs="crane"]',
        { opacity: 0, duration: 0.4 },
        '-=0.25'
      )
      // Reset scan position for next loop
      .set('[data-cs="scan"]', { attr: { x: -30 } });

    tlRef.current = tl;
  }

  return (
    <div ref={containerRef} className="w-full max-w-3xl mx-auto">
      <div className="relative rounded-2xl border border-white/10 overflow-hidden bg-[#060A13] shadow-2xl shadow-black/50">
        {/* ── Window chrome bar (terminal look) ── */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.03] border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E]/70" />
          </div>
          <span className="text-[10px] text-white/30 font-mono ml-2 tracking-wider">
            SafeSight AI — Live Detection
          </span>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
            <span className="text-[10px] text-[#22C55E]/60 font-mono font-medium tracking-wider">
              SCANNING
            </span>
          </div>
        </div>

        {/* ── SVG Animation Scene ── */}
        <svg
          viewBox="0 0 800 450"
          className="w-full block"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="cs-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0a1628" />
              <stop offset="100%" stopColor="#060A13" />
            </linearGradient>
            <filter id="cs-glow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="cs-scan-glow">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ── Static: dark sky background ── */}
          <rect width="800" height="450" fill="url(#cs-sky)" />

          {/* ── Static: subtle AI grid overlay ── */}
          <g opacity="0.05">
            {Array.from({ length: 21 }).map((_, i) => (
              <line
                key={`gv${i}`}
                x1={i * 40}
                y1="0"
                x2={i * 40}
                y2="450"
                stroke="#22C55E"
                strokeWidth="0.5"
              />
            ))}
            {Array.from({ length: 12 }).map((_, i) => (
              <line
                key={`gh${i}`}
                x1="0"
                y1={i * 40}
                x2="800"
                y2={i * 40}
                stroke="#22C55E"
                strokeWidth="0.5"
              />
            ))}
          </g>

          {/* ── Static: ground plane ── */}
          <rect x="0" y="350" width="800" height="100" fill="#0d1117" />
          <line
            x1="0"
            y1="350"
            x2="800"
            y2="350"
            stroke="#1e293b"
            strokeWidth="0.5"
          />

          {/* ════════════════════════════════════════ */}
          {/*          ANIMATED ELEMENTS              */}
          {/* ════════════════════════════════════════ */}

          {/* Buildings (3 groups, staggered) */}
          <g data-cs="building">
            <rect
              x="60"
              y="170"
              width="90"
              height="180"
              fill="#111827"
              stroke="#1e293b"
              strokeWidth="0.5"
            />
            {[0, 1, 2, 3].map((r) =>
              [0, 1, 2].map((c) => (
                <rect
                  key={`b1-${r}-${c}`}
                  x={72 + c * 22}
                  y={185 + r * 30}
                  width="14"
                  height="10"
                  rx="1"
                  fill="#1e293b"
                />
              ))
            )}
          </g>
          <g data-cs="building">
            <rect
              x="610"
              y="130"
              width="110"
              height="220"
              fill="#0f172a"
              stroke="#1e293b"
              strokeWidth="0.5"
            />
            {[0, 1, 2, 3, 4].map((r) =>
              [0, 1, 2, 3].map((c) => (
                <rect
                  key={`b2-${r}-${c}`}
                  x={622 + c * 24}
                  y={145 + r * 32}
                  width="15"
                  height="12"
                  rx="1"
                  fill="#1e293b"
                />
              ))
            )}
          </g>
          <g data-cs="building">
            <rect
              x="730"
              y="220"
              width="50"
              height="130"
              fill="#111827"
              stroke="#1e293b"
              strokeWidth="0.5"
            />
          </g>

          {/* Crane */}
          <g data-cs="crane">
            <rect x="300" y="70" width="8" height="280" fill="#374151" />
            <rect x="200" y="68" width="220" height="8" fill="#374151" />
            <line x1="304" y1="68" x2="230" y2="35" stroke="#4b5563" strokeWidth="1.5" />
            <line x1="304" y1="68" x2="420" y2="68" stroke="#4b5563" strokeWidth="1.5" />
            <line x1="370" y1="76" x2="370" y2="140" stroke="#6b7280" strokeWidth="0.5" />
            <rect x="364" y="138" width="12" height="8" rx="2" fill="#6b7280" />
          </g>

          {/* Worker (yellow safety vest, hardhat area, boots) */}
          <g data-cs="worker">
            {/* Legs */}
            <rect x="385" y="312" width="14" height="33" rx="4" fill="#1e293b" />
            <rect x="403" y="312" width="14" height="33" rx="4" fill="#1e293b" />
            {/* Boots */}
            <rect x="382" y="340" width="20" height="10" rx="3" fill="#78350f" />
            <rect x="400" y="340" width="20" height="10" rx="3" fill="#78350f" />
            {/* Body / safety vest */}
            <rect x="380" y="267" width="42" height="50" rx="6" fill="#F59E0B" />
            {/* Vest reflective stripes */}
            <rect x="380" y="280" width="42" height="3" fill="#FBBF24" />
            <rect x="380" y="300" width="42" height="3" fill="#FBBF24" />
            {/* Arms */}
            <rect x="362" y="274" width="18" height="10" rx="4" fill="#F59E0B" />
            <rect x="422" y="274" width="18" height="10" rx="4" fill="#F59E0B" />
            {/* Neck */}
            <rect x="393" y="258" width="16" height="12" rx="3" fill="#D4A574" />
            {/* Head */}
            <circle cx="401" cy="248" r="16" fill="#D4A574" />
          </g>

          {/* Helmet (yellow hard hat) */}
          <g data-cs="helmet">
            <ellipse cx="401" cy="240" rx="20" ry="8" fill="#F59E0B" />
            <path d="M381,240 Q381,224 401,222 Q421,224 421,240" fill="#F59E0B" />
            <rect x="381" y="236" width="40" height="5" rx="2" fill="#D97706" />
          </g>

          {/* Helmet glow pulse (green ring) */}
          <ellipse
            data-cs="helmet-glow"
            cx="401"
            cy="236"
            rx="28"
            ry="18"
            fill="none"
            stroke="#22C55E"
            strokeWidth="2"
            filter="url(#cs-glow)"
          />

          {/* AI scan line (vertical green bar that sweeps left→right) */}
          <rect
            data-cs="scan"
            x="-30"
            y="0"
            width="4"
            height="450"
            fill="#22C55E"
            filter="url(#cs-scan-glow)"
          />

          {/* Detection bounding box with corner accents */}
          <g data-cs="detect-box">
            <rect
              x="378"
              y="222"
              width="46"
              height="54"
              rx="2"
              fill="none"
              stroke="#22C55E"
              strokeWidth="1.5"
            />
            {/* Top-left corner */}
            <path d="M378,233 L378,222 L389,222" fill="none" stroke="#22C55E" strokeWidth="3" />
            {/* Top-right corner */}
            <path d="M413,222 L424,222 L424,233" fill="none" stroke="#22C55E" strokeWidth="3" />
            {/* Bottom-left corner */}
            <path d="M378,265 L378,276 L389,276" fill="none" stroke="#22C55E" strokeWidth="3" />
            {/* Bottom-right corner */}
            <path d="M413,276 L424,276 L424,265" fill="none" stroke="#22C55E" strokeWidth="3" />
          </g>

          {/* Detection label: "Helmet 98.2%" */}
          <g data-cs="label">
            <rect x="430" y="222" width="128" height="24" rx="4" fill="#22C55E" />
            <text
              x="494"
              y="239"
              textAnchor="middle"
              fill="white"
              fontSize="12"
              fontFamily="monospace"
              fontWeight="bold"
            >
              Helmet 98.2%
            </text>
          </g>

          {/* PPE Compliant badge */}
          <g data-cs="badge">
            <rect
              x="430"
              y="252"
              width="110"
              height="22"
              rx="4"
              fill="#22C55E"
              fillOpacity="0.12"
              stroke="#22C55E"
              strokeWidth="1"
            />
            <text
              x="485"
              y="267"
              textAnchor="middle"
              fill="#22C55E"
              fontSize="10"
              fontFamily="monospace"
            >
              PPE Compliant
            </text>
          </g>

          {/* ── Static: bottom info bar (always visible) ── */}
          <rect x="0" y="418" width="800" height="32" fill="#060A13" fillOpacity="0.85" />
          <line x1="0" y1="418" x2="800" y2="418" stroke="#1e293b" strokeWidth="0.5" />
          <text x="15" y="439" fill="#4b5563" fontSize="10" fontFamily="monospace">
            FPS: 30 | Model: YOLOv11n | Threshold: 0.35
          </text>
          <text x="785" y="439" textAnchor="end" fill="#4b5563" fontSize="10" fontFamily="monospace">
            Objects: 1
          </text>
        </svg>
      </div>
    </div>
  );
}