import { motion } from 'framer-motion'
import { Eye, DollarSign, ClipboardList } from 'lucide-react'

const problems = [
  {
    icon: Eye,
    title: 'Manual Monitoring Fails',
    body: 'A human safety officer can only watch one area at a time. Fatigue, distractions, and shift gaps create dangerous blind spots that put workers at risk every single day.',
    stat: '73%',
    statLabel: 'of incidents occur when no supervisor is watching',
    color: 'text-accent',
    bg: 'bg-accent/8',
    border: 'border-accent/20',
  },
  {
    icon: DollarSign,
    title: 'Incidents Are Catastrophically Costly',
    body: 'A single construction fatality costs upwards of $1.5M in direct costs, legal liability, and project delays — not counting the irreplaceable human loss. Prevention is infinitely cheaper.',
    stat: '$1.5M+',
    statLabel: 'average cost per construction fatality',
    color: 'text-warn',
    bg: 'bg-warn/8',
    border: 'border-warn/20',
  },
  {
    icon: ClipboardList,
    title: 'Compliance Is Getting Stricter',
    body: 'OSHA, ISO 45001, and regional safety regulations are tightening every year. Manual paper-based compliance tracking is slow, error-prone, and fails during inspections.',
    stat: '40%',
    statLabel: 'of construction firms fail safety audits annually',
    color: 'text-primary',
    bg: 'bg-primary/8',
    border: 'border-primary/20',
  },
]

export default function Problem() {
  return (
    <section className="py-24 relative" id="problem">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="font-mono text-xs text-primary mb-3 tracking-widest uppercase">The Problem</div>
          <h2 className="font-display font-800 text-4xl sm:text-5xl text-white leading-tight max-w-xl">
            The Cost of{' '}
            <span className="text-accent">Looking Away</span>
          </h2>
          <p className="text-light/60 mt-4 max-w-xl text-base leading-relaxed">
            Construction is the world's most dangerous industry. Existing safety monitoring is reactive, not preventive — waiting for accidents instead of stopping them.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`card-hover rounded-2xl p-6 bg-card relative overflow-hidden`}
            >
              {/* Icon */}
              <div className={`w-10 h-10 rounded-xl ${p.bg} border ${p.border} flex items-center justify-center mb-5`}>
                <p.icon className={`w-5 h-5 ${p.color}`} />
              </div>

              <h3 className="font-display font-700 text-white text-lg mb-3">{p.title}</h3>
              <p className="text-light/55 text-sm leading-relaxed mb-5">{p.body}</p>

              {/* Stat callout */}
              <div className={`border-t ${p.border} pt-4`}>
                <div className={`font-display font-800 text-3xl ${p.color} mb-0.5`}>{p.stat}</div>
                <div className="font-mono text-[11px] text-muted">{p.statLabel}</div>
              </div>

              {/* Decorative corner */}
              <div className={`absolute top-0 right-0 w-24 h-24 ${p.bg} rounded-full blur-2xl -z-0 opacity-50`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
