import { motion } from 'framer-motion'
import { Zap, Lock, Layers, RefreshCw, ArrowDown } from 'lucide-react'

const techStack = [
  { name: 'YOLOv11n', desc: 'Object detection', category: 'AI Core' },
  { name: 'ONNX Runtime', desc: 'Edge inference', category: 'Inference' },
  { name: 'OpenCV', desc: 'Frame processing', category: 'Vision' },
  { name: 'RTSP / DVR', desc: 'Camera support', category: 'Input' },
  { name: 'FastAPI', desc: 'Backend API', category: 'Backend' },
  { name: 'WebSocket', desc: 'Stream relay', category: 'Streaming' },
  { name: 'SQLite', desc: 'Log storage', category: 'Storage' },
  { name: 'SMTP', desc: 'Alert delivery', category: 'Alerts' },
]

const advantages = [
  {
    icon: Zap,
    title: 'Edge-First Architecture',
    body: 'Everything runs on your hardware. No frames leave your site. Sub-50ms inference on mid-range CPUs — no GPU required.',
    span: 'col-span-1 md:col-span-2',
  },
  {
    icon: Lock,
    title: 'Zero Cloud Dependency',
    body: 'Your footage never touches our servers. Full data sovereignty and zero network latency.',
    span: 'col-span-1',
  },
  {
    icon: Layers,
    title: 'Multi-Camera Processing',
    body: 'Monitor up to 7 streams simultaneously with threaded architecture and intelligent frame scheduling.',
    span: 'col-span-1',
  },
  {
    icon: RefreshCw,
    title: 'Drop-In Model Updates',
    body: 'Built on YOLOv11n — future model updates are drop-in compatible. Your system gets smarter without hardware upgrades.',
    span: 'col-span-1 md:col-span-2',
  },
]

export default function Technology() {
  return (
    <section className="py-24 relative overflow-hidden" id="technology">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="absolute inset-0 dot-pattern opacity-30" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span className="font-mono text-xs text-amber-400 uppercase tracking-widest font-medium">Technology</span>
          </div>
          <h2 className="font-display font-800 text-3xl sm:text-4xl lg:text-5xl text-white leading-tight max-w-xl">
            Enterprise-Grade AI,{' '}
            <span className="gradient-text-amber">Site-Level Simplicity</span>
          </h2>
          <p className="text-dark-200 mt-4 max-w-xl text-base leading-relaxed">
            Built on the same computer vision stack used by autonomous vehicles — packaged for construction safety.
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Tech stack - full width bento cell */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 glass-card rounded-2xl p-6"
          >
            <div className="font-mono text-[10px] text-dark-400 uppercase tracking-widest mb-5">Tech Stack</div>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {techStack.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-xl px-3 py-2.5 bg-white/[0.02] border border-white/[0.04] hover:border-amber-500/20 transition-all cursor-default"
                >
                  <div className="font-display font-600 text-white text-[13px]">{t.name}</div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-mono text-[10px] text-dark-400">{t.desc}</span>
                    <span className="font-mono text-[9px] text-amber-500/60">{t.category}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Architecture diagram */}
            <div className="bg-dark-950/60 rounded-xl p-4 border border-white/[0.04]">
              <div className="text-dark-400 mb-3 font-mono text-[10px] uppercase tracking-widest">System Flow</div>
              <div className="space-y-2.5">
                {[
                  { label: 'RTSP/DVR Input', color: 'text-dark-200', dot: 'bg-dark-400' },
                  { label: 'Frame Decoder (OpenCV)', color: 'text-dark-200', dot: 'bg-dark-400' },
                  { label: 'YOLOv11n → ONNX Inference', color: 'text-amber-400', dot: 'bg-amber-500' },
                  { label: 'Violation Detector + Deduplication', color: 'text-amber-400', dot: 'bg-amber-500' },
                  { label: 'Alert Engine (SMTP)', color: 'text-red-400', dot: 'bg-red-500' },
                ].map((row, i, arr) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full ${row.dot} shrink-0`} />
                    <span className={`font-mono text-xs ${row.color}`}>{row.label}</span>
                    {i < arr.length - 1 && (
                      <div className="flex-1 flex justify-end">
                        <ArrowDown className="w-3 h-3 text-dark-500" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Advantage cards - right side */}
          {advantages.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className={`glass-card rounded-2xl p-5 ${a.span}`}
            >
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/15 flex items-center justify-center mb-4">
                <a.icon className="w-4 h-4 text-amber-500" />
              </div>
              <h3 className="font-display font-700 text-white text-sm mb-2">{a.title}</h3>
              <p className="text-dark-200 text-xs leading-relaxed">{a.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}