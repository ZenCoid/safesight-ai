import { motion } from 'framer-motion'
import { Server, Shield, Eye, Lock } from 'lucide-react'

const points = [
  {
    icon: Server,
    title: 'On-Device Processing',
    body: 'All AI inference runs locally on your machine via ONNX Runtime. No video data is ever uploaded, transmitted, or stored externally.',
  },
  {
    icon: Shield,
    title: 'No Third-Party Sharing',
    body: 'We do not sell, share, or analyze your footage. Your construction site data belongs entirely to you. Always.',
  },
  {
    icon: Eye,
    title: 'Transparent by Design',
    body: 'Our model weights, architecture, and detection logic are fully auditable. No black-box surprises — you see exactly what SafeSight AI sees.',
  },
  {
    icon: Lock,
    title: 'Compliance Ready',
    body: "Designed to meet GDPR's data minimization principles and OSHA's electronic recordkeeping standards right out of the box.",
  },
]

export default function Privacy() {
  return (
    <section className="py-24 relative border-t border-border" id="privacy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="font-mono text-xs text-primary mb-3 tracking-widest uppercase">Privacy</div>
            <h2 className="font-display font-800 text-4xl sm:text-5xl text-white leading-tight mb-5">
              Your Site.{' '}
              <span className="gradient-text">Your Data.</span>
              <br />Always.
            </h2>
            <p className="text-light/60 text-base leading-relaxed mb-8 max-w-md">
              Unlike cloud-based safety systems, SafeSight AI never needs to see your footage to work. Every detection decision is made on your hardware, in real time, with zero network dependency.
            </p>

            {/* Visual: data flow diagram */}
            <div className="bg-card border border-border rounded-2xl p-5 font-mono text-xs">
              <div className="text-muted text-[10px] uppercase tracking-widest mb-4">Data Flow</div>
              <div className="flex items-center gap-3 mb-3">
                <div className="px-3 py-1.5 bg-surface border border-border rounded-lg text-light/60">Camera Feed</div>
                <span className="text-primary">→</span>
                <div className="px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-lg text-primary">Your Machine</div>
              </div>
              <div className="flex items-center gap-3 mb-3 pl-8">
                <div className="w-px h-6 bg-border" />
                <span className="text-[10px] text-muted">ONNX inference — local only</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="px-3 py-1.5 bg-surface border border-border rounded-lg text-light/60 opacity-30 line-through">Cloud Server</div>
                <span className="text-accent text-sm">✕ Never reached</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Privacy cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {points.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-hover rounded-2xl p-5 bg-card"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/8 border border-primary/20 flex items-center justify-center mb-4">
                  <p.icon className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-display font-700 text-white text-base mb-2">{p.title}</h3>
                <p className="text-light/50 text-xs leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
