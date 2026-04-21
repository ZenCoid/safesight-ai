import { motion } from 'framer-motion'
import { Check, Zap } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    price: '$0',
    period: 'Free forever',
    desc: 'Perfect for evaluating SafeSight AI on a small site or proof-of-concept.',
    features: [
      '1 camera feed',
      'PPE detection (helmet, vest)',
      'Browser-based detection demo',
      'Email alerts (manual trigger)',
      'Community support',
    ],
    cta: 'Get Started Free',
    ctaHref: '#demo',
    highlight: false,
    tag: null,
  },
  {
    name: 'Professional',
    price: '$149',
    period: 'per month',
    desc: 'For active construction sites that need reliable, automated safety monitoring.',
    features: [
      'Up to 7 camera feeds',
      'PPE + fall detection',
      'Real-time automated alerts',
      'Severity-tiered notifications',
      'Shift reports & audit logs',
      'Snapshot evidence storage',
      'Priority email support',
    ],
    cta: 'Start 14-Day Trial',
    ctaHref: '#contact',
    highlight: true,
    tag: 'Most Popular',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact us',
    desc: 'For large construction firms, general contractors, and multi-site operations.',
    features: [
      'Unlimited cameras',
      'Custom PPE categories',
      'Multi-site dashboard',
      'SLA & uptime guarantee',
      'On-premise deployment',
      'API access & integrations',
      'Dedicated account manager',
    ],
    cta: 'Contact Sales',
    ctaHref: '#contact',
    highlight: false,
    tag: null,
  },
]

export default function Pricing() {
  return (
    <section className="py-24 relative" id="pricing">
      <div className="absolute inset-0 bg-surface/30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="font-mono text-xs text-primary mb-3 tracking-widest uppercase">Pricing</div>
          <h2 className="font-display font-800 text-4xl sm:text-5xl text-white leading-tight mb-4">
            Straightforward{' '}
            <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-light/60 text-base max-w-lg mx-auto">
            No hidden fees. No per-camera charges. No long-term contracts. Cancel anytime.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative rounded-2xl p-6 flex flex-col ${
                plan.highlight
                  ? 'bg-primary/8 border-2 border-primary/40 glow-primary'
                  : 'bg-card border border-border card-hover'
              }`}
            >
              {/* Tag */}
              {plan.tag && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-primary text-bg font-display font-700 text-xs px-4 py-1 rounded-full">
                  <Zap className="w-3 h-3" />
                  {plan.tag}
                </div>
              )}

              <div className="mb-5">
                <div className="font-mono text-xs text-muted uppercase tracking-widest mb-2">{plan.name}</div>
                <div className="flex items-end gap-2 mb-1">
                  <span className="font-display font-800 text-4xl text-white">{plan.price}</span>
                  <span className="font-mono text-xs text-muted mb-1.5">{plan.period}</span>
                </div>
                <p className="text-light/50 text-sm leading-relaxed">{plan.desc}</p>
              </div>

              <div className="space-y-2.5 mb-8 flex-grow">
                {plan.features.map(f => (
                  <div key={f} className="flex items-start gap-2.5">
                    <Check className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlight ? 'text-primary' : 'text-primary/60'}`} />
                    <span className="text-sm text-light/60">{f}</span>
                  </div>
                ))}
              </div>

              <a
                href={plan.ctaHref}
                className={`block text-center py-3 rounded-xl font-display font-700 text-sm transition-all duration-200 ${
                  plan.highlight
                    ? 'bg-primary text-bg hover:bg-primary/90 glow-primary'
                    : 'border border-border text-light hover:border-primary/40 hover:text-primary'
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center font-mono text-xs text-muted mt-8"
        >
          All plans include a 14-day free trial. No credit card required for Starter.
        </motion.p>
      </div>
    </section>
  )
}
