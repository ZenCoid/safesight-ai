import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const stats = [
  { val: 0, label: 'Fatal Incidents With Real-Time Monitoring', suffix: '', prefix: '', note: 'Target goal' },
  { val: 99.2, label: 'Detection Accuracy', suffix: '%', prefix: '', note: 'YOLOv11n benchmark' },
  { val: 50, label: 'Alert Response Time', suffix: 'ms', prefix: '<', note: 'Edge inference' },
  { val: 2.5, label: 'Construction Deaths per Day (Global)', suffix: 'K', prefix: '', note: 'ILO statistics' },
]

function Counter({ target, suffix, prefix }: { target: number; suffix: string; prefix: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const animated = useRef(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !animated.current) {
        animated.current = true
        const dur = 1800
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1)
          const ease = 1 - Math.pow(1 - p, 3)
          setVal(+(target * ease).toFixed(1))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target])

  return (
    <div ref={ref} className="font-display font-800 text-4xl sm:text-5xl text-white tabular-nums">
      {prefix}{Number.isInteger(target) ? Math.round(val) : val}{suffix}
    </div>
  )
}

const techMarquee = [
  'YOLOv11n', 'ONNX Runtime', 'Computer Vision', 'PPE Detection',
  'Fall Detection', 'Real-Time Inference', 'Browser-Native AI',
  'RTSP Streams', 'Instant Alerts', 'Zero Cloud Dependency',
  'YOLOv11n', 'ONNX Runtime', 'Computer Vision', 'PPE Detection',
  'Fall Detection', 'Real-Time Inference', 'Browser-Native AI',
  'RTSP Streams', 'Instant Alerts', 'Zero Cloud Dependency',
]

export default function Stats() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="absolute inset-0 bg-surface/50" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Stats bento grid */}
        <div className="bento-grid grid-cols-2 lg:grid-cols-4 mb-16">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bento-cell text-center py-8"
            >
              <Counter target={s.val} suffix={s.suffix} prefix={s.prefix} />
              <div className="font-body text-sm text-dark-200 mt-2 leading-tight">{s.label}</div>
              <div className="font-mono text-[10px] text-dark-400 mt-1">{s.note}</div>
            </motion.div>
          ))}
        </div>

        {/* Marquee */}
        <div className="marquee-container overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {techMarquee.map((t, i) => (
              <span key={i} className="inline-flex items-center gap-3 mx-5 font-mono text-xs text-dark-400">
                <span className="w-1 h-1 rounded-full bg-amber-500/40 inline-block" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}