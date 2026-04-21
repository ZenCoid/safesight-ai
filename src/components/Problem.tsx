import { motion } from 'framer-motion'
import { Eye, DollarSign, ClipboardList } from 'lucide-react'

const problems = [
  {
    icon: Eye,
    title: 'Manual Monitoring Fails',
    body: 'A human safety officer can only watch one area at a time. Fatigue, distractions, and shift gaps create dangerous blind spots that put workers at risk every single day.',
    stat: '73%',
    statLabel: 'of incidents occur when no supervisor is watching',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    accentBg: 'bg-red-500',
  },
  {
    icon: DollarSign,
    title: 'Incidents Are Catastrophically Costly',
    body: 'A single construction fatality costs upwards of $1.5M in direct costs, legal liability, and project delays — not counting the irreplaceable human loss.',
    stat: '$1.5M+',
    statLabel: 'average cost per construction fatality',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    accentBg: 'bg-amber-500',
  },
  {
    icon: ClipboardList,
    title: 'Compliance Is Getting Stricter',
    body: 'OSHA, ISO 45001, and regional safety regulations are tightening every year. Manual paper-based compliance tracking is slow, error-prone, and fails during inspections.',
    stat: '40%',
    statLabel: 'of construction firms fail safety audits annually',
    color: 'text-amber-300',
    bg: 'bg-amber-400/10',
    border: 'border-amber-400/20',
    accentBg: 'bg-amber-400',
  },
]

export default function Problem() {
  return (
    <section className="py-24 relative" id="problem">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span className="font-mono text-xs text-amber-400 uppercase tracking-widest font-medium">The Problem</span>
          </div>
          <h2 className="font-display font-800 text-3xl sm:text-4xl lg:text-5xl text-white leading-tight max-w-xl">
            The Cost of{' '}
            <span className="text-red-400">Looking Away</span>
          </h2>
          <p className="text-dark-200 mt-4 max-w-xl text-base leading-relaxed">
            Construction is the world's most dangerous industry. Existing safety monitoring is reactive, not preventive — waiting for accidents instead of stopping them.
          </p>
        </motion.div>

        {/* Bento Grid Cards */}
        <div className="bento-grid grid-cols-1 md:grid-cols-3">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bento-cell flex flex-col"
            >
              {/* Icon */}
              <div className={`w-10 h-10 rounded-xl ${p.bg} border ${p.border} flex items-center justify-center mb-5`}>
                <p.icon className={`w-5 h-5 ${p.color}`} />
              </div>

              <h3 className="font-display font-700 text-white text-lg mb-3">{p.title}</h3>
              <p className="text-dark-200 text-sm leading-relaxed mb-6 flex-grow">{p.body}</p>

              {/* Stat callout */}
              <div className={`border-t ${p.border} pt-5 mt-auto`}>
                <div className={`font-display font-800 text-3xl ${p.color} mb-1`}>{p.stat}</div>
                <div className="font-mono text-[11px] text-dark-400">{p.statLabel}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}