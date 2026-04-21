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
    body: 'Our model weights, architecture, and detection logic are fully auditable. No black-box surprises.',
  },
  {
    icon: Lock,
    title: 'Compliance Ready',
    body: "Designed to meet GDPR's data minimization principles and OSHA's electronic recordkeeping standards right out of the box.",
  },
]

export default function Privacy() {
  return (
    <section className="py-24 relative" id="privacy">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span className="font-mono text-xs text-amber-400 uppercase tracking-widest font-medium">Privacy</span>
            </div>
            <h2 className="font-display font-800 text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-5">
              Your Site.{' '}
              <span className="gradient-text-amber">Your Data.</span>
              <br />Always.
            </h2>
            <p className="text-dark-200 text-base leading-relaxed mb-8 max-w-md">
              Unlike cloud-based safety systems, SafeSight AI never needs to see your footage to work. Every detection decision is made on your hardware, in real time, with zero network dependency.
            </p>

            {/* Data flow diagram */}
            <div className="glass-card rounded-2xl p-5">
              <div className="text-dark-400 mb-4 font-mono text-[10px] uppercase tracking-widest">Data Flow</div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="px-3 py-2 bg-dark-700 border border-white/[0.04] rounded-lg text-dark-200 text-sm font-medium">Camera Feed</div>
                  <div className="flex-1 flex items-center">
                    <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-amber-500/30" />
                    <div className="w-2 h-2 rounded-full bg-amber-500 mx-2" />
                    <div className="flex-1 h-px bg-gradient-to-l from-white/10 to-amber-500/30" />
                  </div>
                  <div className="px-3 py-2 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-400 text-sm font-medium">Your Machine</div>
                </div>
                <div className="flex items-center gap-3 pl-8">
                  <div className="w-px h-6 bg-dark-600" />
                  <span className="font-mono text-[11px] text-dark-400">ONNX inference — local only</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-3 py-2 bg-dark-700 border border-white/[0.04] rounded-lg text-dark-400 text-sm opacity-30 line-through">Cloud Server</div>
                  <span className="text-red-400 text-sm font-medium ml-2">✕ Never reached</span>
                </div>
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
                className="glass-card rounded-2xl p-5"
              >
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/15 flex items-center justify-center mb-4">
                  <p.icon className="w-4 h-4 text-amber-500" />
                </div>
                <h3 className="font-display font-700 text-white text-sm mb-2">{p.title}</h3>
                <p className="text-dark-300 text-xs leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}