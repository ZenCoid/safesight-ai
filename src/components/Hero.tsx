import { motion } from 'framer-motion'
import { ChevronRight, Play } from 'lucide-react'

const DetectionCanvas = () => (
  <div className="relative w-full max-w-[540px] mx-auto">
    {/* Camera frame */}
    <div className="relative rounded-2xl overflow-hidden border border-border bg-card scanline-container" style={{ aspectRatio: '16/10' }}>
      {/* Dark bg with grid */}
      <div className="absolute inset-0 grid-bg-sm opacity-60" />

      {/* Simulated construction scene silhouettes */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 540 338" preserveAspectRatio="xMidYMid slice">
        {/* Ground */}
        <rect x="0" y="260" width="540" height="78" fill="rgba(14,22,32,0.9)" />
        {/* Building structure */}
        <rect x="60" y="80" width="8" height="180" fill="rgba(30,50,70,0.8)" />
        <rect x="200" y="60" width="8" height="200" fill="rgba(30,50,70,0.8)" />
        <rect x="60" y="80" width="148" height="8" fill="rgba(30,50,70,0.8)" />
        <rect x="60" y="160" width="148" height="8" fill="rgba(25,45,65,0.6)" />
        {/* Worker 1 - compliant (helmet) */}
        <g opacity="0.85">
          <ellipse cx="130" cy="218" rx="10" ry="12" fill="rgba(40,70,90,0.9)" />
          <rect x="122" y="228" width="16" height="28" fill="rgba(40,70,90,0.9)" />
          <rect x="118" y="232" width="8" height="20" fill="rgba(35,60,80,0.8)" />
          <rect x="134" y="232" width="8" height="20" fill="rgba(35,60,80,0.8)" />
          {/* Helmet */}
          <ellipse cx="130" cy="210" rx="12" ry="7" fill="rgba(255, 180, 0, 0.85)" />
        </g>
        {/* Worker 2 - no helmet */}
        <g opacity="0.85">
          <ellipse cx="340" cy="215" rx="10" ry="12" fill="rgba(40,70,90,0.9)" />
          <rect x="332" y="225" width="16" height="28" fill="rgba(40,70,90,0.9)" />
          <rect x="328" y="229" width="8" height="20" fill="rgba(35,60,80,0.8)" />
          <rect x="344" y="229" width="8" height="20" fill="rgba(35,60,80,0.8)" />
        </g>
        {/* Scaffold */}
        <rect x="380" y="100" width="6" height="160" fill="rgba(25,45,65,0.7)" />
        <rect x="450" y="100" width="6" height="160" fill="rgba(25,45,65,0.7)" />
        <rect x="380" y="140" width="76" height="6" fill="rgba(25,45,65,0.7)" />
        <rect x="380" y="200" width="76" height="6" fill="rgba(25,45,65,0.7)" />
      </svg>

      {/* Compliant detection box - green */}
      <motion.svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 540 338"
      >
        <motion.rect
          x="110" y="196" width="42" height="68"
          fill="none"
          stroke="#00E5AA"
          strokeWidth="1.5"
          strokeDasharray="400"
          initial={{ strokeDashoffset: 400, opacity: 0 }}
          animate={{ strokeDashoffset: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
        />
        <motion.rect
          x="108" y="194" width="4" height="4"
          fill="#00E5AA"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        />
        <motion.rect
          x="148" y="194" width="4" height="4"
          fill="#00E5AA"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        />
        <motion.rect
          x="108" y="260" width="4" height="4"
          fill="#00E5AA"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        />
        <motion.rect
          x="148" y="260" width="4" height="4"
          fill="#00E5AA"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        />
      </motion.svg>

      {/* Violation detection box - red/orange */}
      <motion.svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 540 338"
      >
        <motion.rect
          x="320" y="192" width="42" height="65"
          fill="rgba(255,92,0,0.05)"
          stroke="#FF5C00"
          strokeWidth="1.5"
          strokeDasharray="400"
          initial={{ strokeDashoffset: 400, opacity: 0 }}
          animate={{ strokeDashoffset: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.2, ease: 'easeOut' }}
        />
        <motion.rect
          x="318" y="190" width="4" height="4"
          fill="#FF5C00"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        />
        <motion.rect
          x="358" y="190" width="4" height="4"
          fill="#FF5C00"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        />
        <motion.rect
          x="318" y="253" width="4" height="4"
          fill="#FF5C00"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        />
        <motion.rect
          x="358" y="253" width="4" height="4"
          fill="#FF5C00"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        />
      </motion.svg>

      {/* Labels */}
      <motion.div
        className="absolute font-mono text-[10px] text-primary bg-primary/10 border border-primary/30 px-1.5 py-0.5 rounded"
        style={{ top: '56%', left: '21%' }}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.9 }}
      >
        Worker — PPE ✓ 98%
      </motion.div>

      <motion.div
        className="absolute font-mono text-[10px] text-accent bg-accent/10 border border-accent/30 px-1.5 py-0.5 rounded"
        style={{ top: '54%', left: '59%' }}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.3 }}
      >
        NO HELMET ⚠ 95%
      </motion.div>

      {/* HUD overlay */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary badge-pulse" />
          <span className="font-mono text-[10px] text-primary">CAM_01 LIVE</span>
        </div>
        <span className="font-mono text-[10px] text-muted">
          {new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </span>
        <span className="font-mono text-[10px] text-accent">1 VIOLATION</span>
      </div>

      {/* Bottom stats bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-bg/80 backdrop-blur-sm border-t border-border px-3 py-1.5 flex items-center justify-between">
        <span className="font-mono text-[10px] text-muted">YOLOv11n · ONNX · 43ms</span>
        <span className="font-mono text-[10px] text-primary">2 workers detected</span>
      </div>
    </div>

    {/* Alert popup */}
    <motion.div
      className="absolute -bottom-4 -right-4 bg-accent/90 text-white text-xs font-mono px-3 py-2 rounded-lg shadow-lg border border-accent/50"
      initial={{ opacity: 0, scale: 0.8, x: 20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ delay: 2.6, type: 'spring', stiffness: 200 }}
    >
      <div className="font-display font-700 text-sm">⚠ Alert Sent</div>
      <div className="text-accent/80 text-[10px]">Site manager notified</div>
    </motion.div>

    {/* Decorative glow */}
    <div className="absolute inset-0 -z-10 blur-3xl opacity-20 bg-gradient-to-br from-primary via-transparent to-accent rounded-full scale-110" />
  </div>
)

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden grid-bg">
      {/* Radial gradient center */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(0,229,170,0.06) 0%, transparent 60%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-primary/8 border border-primary/20 rounded-full px-4 py-1.5 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary badge-pulse" />
              <span className="font-mono text-xs text-primary">YOLOv11n · Real-Time Detection · Browser-Native</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-5xl sm:text-6xl lg:text-[4.2rem] leading-[1.05] font-800 text-white mb-6"
            >
              The AI Safety{' '}
              <span className="block gradient-text">Supervisor That</span>
              <span className="block">Never Blinks.</span>
            </motion.h1>

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-light/70 text-lg leading-relaxed mb-8 max-w-[480px]"
            >
              SafeSight AI monitors your construction site 24/7, instantly detecting PPE violations and fall hazards via existing CCTV cameras — before they become accidents.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <a
                href="#demo"
                className="flex items-center gap-2 px-6 py-3 bg-primary text-bg font-display font-700 rounded-xl hover:bg-primary/90 transition-all duration-200 glow-primary text-sm"
              >
                <Play className="w-4 h-4" />
                Try Live Demo
              </a>
              <a
                href="#how-it-works"
                className="flex items-center gap-2 px-6 py-3 border border-border text-light font-display font-600 rounded-xl hover:border-primary/40 hover:text-primary transition-all duration-200 text-sm"
              >
                See How It Works
                <ChevronRight className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-x-8 gap-y-4"
            >
              {[
                { val: '99.2%', label: 'Detection Accuracy' },
                { val: '<50ms', label: 'Response Time' },
                { val: '7 Cams', label: 'Simultaneous Feeds' },
              ].map(s => (
                <div key={s.label}>
                  <div className="font-display font-700 text-primary text-xl">{s.val}</div>
                  <div className="font-body text-xs text-muted">{s.label}</div>
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
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent" />
    </section>
  )
}
