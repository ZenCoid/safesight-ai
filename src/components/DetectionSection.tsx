import { motion } from 'framer-motion'
import { Cpu, Wifi, Lock } from 'lucide-react'
import { DetectionDemo } from './DetectionDemo'

const features = [
  { icon: Cpu, label: 'Runs 100% in your browser via ONNX Runtime WASM' },
  { icon: Wifi, label: 'No video data sent to any server — fully local processing' },
  { icon: Lock, label: 'Your webcam feed never leaves your device' },
]

export default function DetectionSection() {
  return (
    <section className="py-24 relative overflow-hidden" id="demo">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span className="font-mono text-xs text-amber-400 uppercase tracking-widest font-medium">Live Demo</span>
          </div>
          <h2 className="font-display font-800 text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-4">
            See It Work{' '}
            <span className="gradient-text-amber">Right Now</span>
          </h2>
          <p className="text-dark-200 text-base max-w-xl mx-auto leading-relaxed">
            Enable your webcam and watch SafeSight AI detect whether you're wearing a helmet in real time. The exact same AI running on real construction sites.
          </p>
        </motion.div>

        {/* Feature badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {features.map(f => (
            <div
              key={f.label}
              className="flex items-center gap-2 glass rounded-full px-4 py-2"
            >
              <f.icon className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="font-mono text-[11px] text-dark-200">{f.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Demo component */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-white/[0.06] bg-dark-800 overflow-hidden shadow-2xl shadow-black/30 glow-amber"
        >
          <DetectionDemo />
        </motion.div>
      </div>
    </section>
  )
}