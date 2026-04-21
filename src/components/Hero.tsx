import { motion } from 'framer-motion'
import { ChevronRight, Play, Shield, Zap, Eye } from 'lucide-react'

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L14.09 8.26L20 9.27L15.55 13.97L16.91 20L12 16.9L7.09 20L8.45 13.97L4 9.27L9.91 8.26L12 2Z" fill="currentColor" />
    </svg>
  )
}

const DetectionCanvas = () => (
  <div className="relative w-full max-w-[520px] mx-auto">
    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-dark-800 scanline-container shadow-2xl shadow-black/50" style={{ aspectRatio: '16/10' }}>
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg-dense opacity-40" />

      {/* Construction scene */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 540 338" preserveAspectRatio="xMidYMid slice">
        <rect x="0" y="260" width="540" height="78" fill="rgba(22,22,22,0.95)" />
        <rect x="60" y="80" width="8" height="180" fill="rgba(40,40,40,0.8)" />
        <rect x="200" y="60" width="8" height="200" fill="rgba(40,40,40,0.8)" />
        <rect x="60" y="80" width="148" height="8" fill="rgba(40,40,40,0.8)" />
        <rect x="60" y="160" width="148" height="8" fill="rgba(35,35,35,0.6)" />
        {/* Worker 1 - compliant */}
        <g opacity="0.85">
          <ellipse cx="130" cy="218" rx="10" ry="12" fill="rgba(50,50,50,0.9)" />
          <rect x="122" y="228" width="16" height="28" fill="rgba(50,50,50,0.9)" />
          <rect x="118" y="232" width="8" height="20" fill="rgba(45,45,45,0.8)" />
          <rect x="134" y="232" width="8" height="20" fill="rgba(45,45,45,0.8)" />
          <ellipse cx="130" cy="210" rx="12" ry="7" fill="rgba(245,158,11,0.7)" />
        </g>
        {/* Worker 2 - no helmet */}
        <g opacity="0.85">
          <ellipse cx="340" cy="215" rx="10" ry="12" fill="rgba(50,50,50,0.9)" />
          <rect x="332" y="225" width="16" height="28" fill="rgba(50,50,50,0.9)" />
          <rect x="328" y="229" width="8" height="20" fill="rgba(45,45,45,0.8)" />
          <rect x="344" y="229" width="8" height="20" fill="rgba(45,45,45,0.8)" />
        </g>
        {/* Scaffold */}
        <rect x="380" y="100" width="6" height="160" fill="rgba(35,35,35,0.7)" />
        <rect x="450" y="100" width="6" height="160" fill="rgba(35,35,35,0.7)" />
        <rect x="380" y="140" width="76" height="6" fill="rgba(35,35,35,0.7)" />
        <rect x="380" y="200" width="76" height="6" fill="rgba(35,35,35,0.7)" />
      </svg>

      {/* Green detection box */}
      <motion.svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 540 338">
        <motion.rect
          x="110" y="196" width="42" height="68"
          fill="none" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="400"
          initial={{ strokeDashoffset: 400, opacity: 0 }}
          animate={{ strokeDashoffset: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
        />
        <motion.rect x="108" y="194" width="4" height="4" fill="#22c55e" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} />
        <motion.rect x="148" y="194" width="4" height="4" fill="#22c55e" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} />
        <motion.rect x="108" y="260" width="4" height="4" fill="#22c55e" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} />
        <motion.rect x="148" y="260" width="4" height="4" fill="#22c55e" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} />
      </motion.svg>

      {/* Red detection box */}
      <motion.svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 540 338">
        <motion.rect
          x="320" y="192" width="42" height="65"
          fill="rgba(239,68,68,0.05)" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="400"
          initial={{ strokeDashoffset: 400, opacity: 0 }}
          animate={{ strokeDashoffset: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.2, ease: 'easeOut' }}
        />
        <motion.rect x="318" y="190" width="4" height="4" fill="#ef4444" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }} />
        <motion.rect x="358" y="190" width="4" height="4" fill="#ef4444" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }} />
        <motion.rect x="318" y="253" width="4" height="4" fill="#ef4444" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }} />
        <motion.rect x="358" y="253" width="4" height="4" fill="#ef4444" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }} />
      </motion.svg>

      {/* Labels */}
      <motion.div
        className="absolute font-mono text-[10px] text-green-400 bg-green-500/10 border border-green-500/30 px-1.5 py-0.5 rounded"
        style={{ top: '56%', left: '21%' }}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.9 }}
      >
        Worker — PPE ✓ 98%
      </motion.div>
      <motion.div
        className="absolute font-mono text-[10px] text-red-400 bg-red-500/10 border border-red-500/30 px-1.5 py-0.5 rounded"
        style={{ top: '54%', left: '59%' }}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.3 }}
      >
        NO HELMET ⚠ 95%
      </motion.div>

      {/* HUD */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 badge-pulse" />
          <span className="font-mono text-[10px] text-amber-400">CAM_01 LIVE</span>
        </div>
        <span className="font-mono text-[10px] text-dark-300">
          {new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </span>
        <span className="font-mono text-[10px] text-red-400">1 VIOLATION</span>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-dark-950/80 backdrop-blur-sm border-t border-white/5 px-3 py-1.5 flex items-center justify-between">
        <span className="font-mono text-[10px] text-dark-300">YOLOv11n · ONNX · 43ms</span>
        <span className="font-mono text-[10px] text-amber-400">2 workers detected</span>
      </div>
    </div>

    {/* Alert popup */}
    <motion.div
      className="absolute -bottom-4 -right-4 bg-red-500/90 backdrop-blur text-white text-xs font-mono px-3 py-2 rounded-xl shadow-xl border border-red-500/30"
      initial={{ opacity: 0, scale: 0.8, x: 20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ delay: 2.6, type: 'spring', stiffness: 200 }}
    >
      <div className="font-display font-700 text-sm">⚠ Alert Sent</div>
      <div className="text-red-200 text-[10px]">Site manager notified</div>
    </motion.div>

    {/* Decorative glow */}
    <div className="absolute inset-0 -z-10 blur-[80px] opacity-15 bg-gradient-to-br from-amber-500 via-transparent to-amber-700 rounded-full scale-110" />
  </div>
)

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden noise">
      {/* Aurora blobs */}
      <div className="aurora-blob aurora-blob-1" />
      <div className="aurora-blob aurora-blob-2" />
      <div className="aurora-blob aurora-blob-3" />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Copy */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 glass rounded-full px-4 py-2 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 badge-pulse" />
              <span className="font-mono text-[11px] text-amber-400 font-medium">YOLOv11n · Real-Time Detection · Browser-Native</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.08] font-800 text-white mb-6 tracking-tight"
            >
              The AI Safety{' '}
              <span className="relative inline-block">
                <span className="gradient-text-amber">Supervisor</span>
                <SparklesIcon className="absolute -top-3 -right-4 w-4 h-4 text-amber-400 sparkle sparkle-1" />
                <SparklesIcon className="absolute -bottom-1 -right-6 w-3 h-3 text-amber-300 sparkle sparkle-3" />
              </span>
              {' '}That Never Blinks
            </motion.h1>

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-dark-200 text-lg leading-relaxed mb-10 max-w-[480px]"
            >
              SafeSight AI monitors your construction site 24/7, instantly detecting PPE violations and fall hazards via existing CCTV — before they become accidents.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-14"
            >
              <a href="#demo" className="btn-primary px-6 py-3.5 text-[15px]">
                <Play className="w-4 h-4" />
                Try Live Demo
              </a>
              <a href="#how-it-works" className="btn-secondary px-6 py-3.5 text-[15px]">
                See How It Works
                <ChevronRight className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-x-10 gap-y-4"
            >
              {[
                { val: '99.2%', label: 'Detection Accuracy', icon: Zap },
                { val: '<50ms', label: 'Response Time', icon: Eye },
                { val: '7 Cams', label: 'Simultaneous Feeds', icon: Shield },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    <s.icon className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                  <div>
                    <div className="font-display font-700 text-white text-lg leading-none">{s.val}</div>
                    <div className="font-body text-xs text-dark-300 mt-0.5">{s.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Detection visualization */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <DetectionCanvas />
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-dark-950 to-transparent" />
    </section>
  )
}