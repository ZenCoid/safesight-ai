import { motion } from 'framer-motion'
import { Zap, Lock, Layers, RefreshCw } from 'lucide-react'

const techStack = [
  { name: 'YOLOv11n', desc: 'Object detection model', category: 'AI Core' },
  { name: 'ONNX Runtime', desc: 'Edge inference engine', category: 'Inference' },
  { name: 'OpenCV', desc: 'Frame processing', category: 'Vision' },
  { name: 'RTSP / DVR', desc: 'Camera protocol support', category: 'Input' },
  { name: 'FastAPI', desc: 'Backend API layer', category: 'Backend' },
  { name: 'WebSocket', desc: 'Real-time stream relay', category: 'Streaming' },
  { name: 'SQLite', desc: 'Incident log storage', category: 'Storage' },
  { name: 'SMTP / Gmail', desc: 'Alert delivery', category: 'Alerts' },
]

const advantages = [
  {
    icon: Zap,
    title: 'Edge-First Architecture',
    body: 'Everything runs on your hardware. No frames leave your site. Our ONNX-optimized model delivers sub-50ms inference even on mid-range CPUs — no GPU required.',
  },
  {
    icon: Lock,
    title: 'Zero Cloud Dependency',
    body: 'Your footage never touches our servers. SafeSight AI processes everything locally, giving you full data sovereignty and eliminating network latency.',
  },
  {
    icon: Layers,
    title: 'Multi-Camera Parallel Processing',
    body: 'Monitor up to 7 camera streams simultaneously with our threaded architecture and intelligent frame scheduling. Scale to your entire site without performance degradation.',
  },
  {
    icon: RefreshCw,
    title: 'Continuous Model Improvement',
    body: 'Built on YOLOv11n — the latest generation of YOLO. Future model updates are drop-in compatible. Your system gets smarter without hardware upgrades.',
  },
]

export default function Technology() {
  return (
    <section className="py-24 relative overflow-hidden" id="technology">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="font-mono text-xs text-primary mb-3 tracking-widest uppercase">Technology</div>
          <h2 className="font-display font-800 text-4xl sm:text-5xl text-white leading-tight max-w-xl">
            Enterprise-Grade AI,{' '}
            <span className="gradient-text">Site-Level Simplicity</span>
          </h2>
          <p className="text-light/60 mt-4 max-w-xl text-base leading-relaxed">
            SafeSight AI is built on the same computer vision stack used by autonomous vehicles and medical imaging systems — packaged for construction safety.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Tech stack pills */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="font-mono text-xs text-muted mb-4 uppercase tracking-widest">Stack</div>
            <div className="flex flex-wrap gap-3">
              {techStack.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.04 }}
                  className="card-hover rounded-xl px-4 py-3 bg-card cursor-default"
                >
                  <div className="font-display font-700 text-white text-sm">{t.name}</div>
                  <div className="font-mono text-[10px] text-muted mt-0.5">{t.desc}</div>
                  <div className="font-mono text-[10px] text-primary/60 mt-0.5">{t.category}</div>
                </motion.div>
              ))}
            </div>

            {/* Architecture diagram */}
            <div className="mt-8 p-4 bg-card rounded-2xl border border-border font-mono text-xs">
              <div className="text-muted mb-3 text-[10px] uppercase tracking-widest">System Flow</div>
              <div className="space-y-2">
                {[
                  { label: 'RTSP/DVR Input', color: 'text-light/60', arrow: true },
                  { label: 'Frame Decoder (OpenCV)', color: 'text-light/60', arrow: true },
                  { label: 'YOLOv11n → ONNX Inference', color: 'text-primary', arrow: true },
                  { label: 'Violation Detector + Deduplication', color: 'text-primary', arrow: true },
                  { label: 'Alert Engine (SMTP)', color: 'text-accent', arrow: false },
                ].map((row, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-current opacity-50 shrink-0" style={{ color: row.color.replace('text-', '') === 'primary' ? '#00E5AA' : row.color.replace('text-', '') === 'accent' ? '#FF5C00' : '#B8D0DC' }} />
                    <span className={row.color}>{row.label}</span>
                    {row.arrow && <span className="text-muted ml-auto">↓</span>}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Advantage cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {advantages.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-hover rounded-2xl p-5 bg-card"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/8 border border-primary/20 flex items-center justify-center mb-4">
                  <a.icon className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-display font-700 text-white text-base mb-2">{a.title}</h3>
                <p className="text-light/50 text-xs leading-relaxed">{a.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
