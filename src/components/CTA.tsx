import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-32 relative overflow-hidden lamp" id="contact">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="aurora-blob aurora-blob-1" style={{ opacity: 0.5 }} />
      <div className="aurora-blob aurora-blob-2" style={{ opacity: 0.4 }} />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 badge-pulse" />
            <span className="font-mono text-xs text-amber-400 font-medium">No credit card · No setup fee · No lock-in</span>
          </div>

          <h2 className="font-display font-800 text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.08] mb-6 tracking-tight">
            Stop Reacting.
            <br />
            <span className="gradient-text-amber">Start Preventing.</span>
          </h2>

          <p className="text-dark-200 text-lg max-w-xl mx-auto mb-12 leading-relaxed">
            Every day without AI safety monitoring is a day of exposure. Try SafeSight AI live in your browser right now — no signup required.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <motion.a
              href="#demo"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary px-8 py-4 text-base"
            >
              <Play className="w-5 h-5" />
              Try Live Demo Free
            </motion.a>
            <motion.a
              href="mailto:hello@safesightai.com"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="btn-secondary px-8 py-4 text-base"
            >
              Contact Sales
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-3">
            {[
              '14-day free trial',
              'No hardware changes',
              'Works in 15 minutes',
              'Cancel anytime',
            ].map(t => (
              <div key={t} className="flex items-center gap-2 font-mono text-xs text-dark-400">
                <span className="w-1 h-1 rounded-full bg-amber-500/40 inline-block" />
                {t}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}