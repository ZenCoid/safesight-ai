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
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-surface/60 to-bg" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="font-mono text-xs text-primary mb-3 tracking-widest uppercase">Live Demo</div>
          <h2 className="font-display font-800 text-4xl sm:text-5xl text-white leading-tight mb-4">
            See It Work{' '}
            <span className="gradient-text">Right Now</span>
          </h2>
          <p className="text-light/60 text-base max-w-xl mx-auto leading-relaxed">
            Enable your webcam and watch SafeSight AI detect whether you're wearing a helmet in real time. The exact same AI running on real construction sites.
          </p>
        </motion.div>

        {/* Feature badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          {features.map(f => (
            <div
              key={f.label}
              className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2"
            >
              <f.icon className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="font-mono text-[11px] text-light/60">{f.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Demo component */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-border bg-card overflow-hidden glow-primary"
        >
          <DetectionDemo />
        </motion.div>
      </div>
    </section>
  )
}