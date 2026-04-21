import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-32 relative overflow-hidden" id="contact">
      {/* Backgrounds */}
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,229,170,0.07) 0%, transparent 70%)',
        }}
      />
      {/* Corner glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/8 border border-primary/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary badge-pulse" />
            <span className="font-mono text-xs text-primary">No credit card · No setup fee · No lock-in</span>
          </div>

          <h2 className="font-display font-800 text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.02] mb-6">
            Stop Reacting.<br />
            <span className="gradient-text">Start Preventing.</span>
          </h2>

          <p className="text-light/60 text-lg max-w-xl mx-auto mb-12 leading-relaxed">
            Every day without AI safety monitoring is a day of exposure. Try SafeSight AI live in your browser right now — no signup required.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <motion.a
              href="#demo"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2.5 px-8 py-4 bg-primary text-bg font-display font-700 rounded-xl hover:bg-primary/90 transition-all glow-primary text-base"
            >
              <Play className="w-5 h-5" />
              Try Live Demo Free
            </motion.a>
            <motion.a
              href="mailto:hello@safesightai.com"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2.5 px-8 py-4 border border-border text-light font-display font-600 rounded-xl hover:border-primary/40 hover:text-primary transition-all text-base"
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
              <div key={t} className="flex items-center gap-2 font-mono text-xs text-muted">
                <span className="w-1 h-1 rounded-full bg-primary/50 inline-block" />
                {t}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
