import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: 'Does SafeSight AI work with my existing cameras?',
    a: 'Yes. SafeSight AI connects to any RTSP stream, DVR system, IP camera, or webcam. If your camera has a network connection, it works. No hardware replacement or new infrastructure needed.',
  },
  {
    q: 'Does my video footage go to the cloud?',
    a: 'Never. SafeSight AI runs entirely on your local machine using ONNX Runtime. No frames leave your site. Your footage is processed on-device — zero cloud dependency, full data sovereignty.',
  },
  {
    q: 'What PPE violations can it detect?',
    a: 'Currently: helmets (hard hats) and workers without PPE. Fall detection is also included. We are continuously expanding — high-vis vests, safety harnesses, restricted zone entry, and more are on the roadmap.',
  },
  {
    q: 'How accurate is the detection?',
    a: 'Our YOLOv11n model achieves 99.2% accuracy in construction site benchmarks. Real-world accuracy depends on camera angle, lighting, and distance but consistently exceeds 95% in typical conditions.',
  },
  {
    q: 'What happens when a violation is detected?',
    a: 'SafeSight AI immediately sends an email alert with a timestamped snapshot to your designated safety officer. High-severity events trigger instant alerts; low-severity events are batched into shift-end reports to avoid alert fatigue.',
  },
  {
    q: 'What hardware do I need?',
    a: 'A mid-range laptop or desktop running Windows, macOS, or Linux. No GPU required — our ONNX-optimized model runs efficiently on Intel/AMD CPUs. Minimum recommended: 8GB RAM, quad-core CPU.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-24 relative" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="font-mono text-xs text-primary mb-3 tracking-widest uppercase">FAQ</div>
          <h2 className="font-display font-800 text-4xl sm:text-5xl text-white leading-tight">
            Common Questions
          </h2>
          <p className="text-light/60 mt-4 text-base">
            Everything you need to know before deploying SafeSight AI on your site.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className={`rounded-2xl bg-card overflow-hidden transition-all duration-300 ${
                open === i ? 'border border-primary/30' : 'border border-border'
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-start justify-between p-5 text-left gap-4 group"
              >
                <span className={`font-display font-600 text-base leading-snug transition-colors duration-200 ${
                  open === i ? 'text-primary' : 'text-white group-hover:text-primary'
                }`}>
                  {f.q}
                </span>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200 ${
                  open === i ? 'bg-primary text-bg' : 'bg-card border border-border text-muted'
                }`}>
                  {open === i
                    ? <Minus className="w-3 h-3" />
                    : <Plus className="w-3 h-3" />
                  }
                </div>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-light/55 text-sm leading-relaxed border-t border-border/50 pt-4">
                      {f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
