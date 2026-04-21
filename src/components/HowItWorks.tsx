import { motion } from 'framer-motion'
import { Camera, Cpu, Bell, ArrowRight } from 'lucide-react'

const steps = [
  {
    num: '01',
    icon: Camera,
    title: 'Connect Your Cameras',
    body: 'Point SafeSight AI at any RTSP stream, DVR feed, IP camera, or webcam. No hardware changes. No new infrastructure. Works with your existing CCTV setup in minutes.',
    tag: 'RTSP / DVR / WebCam',
  },
  {
    num: '02',
    icon: Cpu,
    title: 'AI Analyzes Every Frame',
    body: 'Our YOLOv11n model — optimized with ONNX Runtime — runs entirely on your machine. Every frame is analyzed for PPE compliance and fall hazards in under 50ms.',
    tag: 'YOLOv11n · ONNX · Edge AI',
  },
  {
    num: '03',
    icon: Bell,
    title: 'Instant Alerts, No Delays',
    body: 'When a violation is detected, SafeSight AI immediately notifies your safety team via email with a timestamped snapshot. High-severity triggers instant alerts.',
    tag: 'Email · Snapshot · Reports',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24 relative" id="how-it-works">
      {/* BG */}
      <div className="absolute inset-0 bg-surface/30" />
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span className="font-mono text-xs text-amber-400 uppercase tracking-widest font-medium">How It Works</span>
          </div>
          <h2 className="font-display font-800 text-3xl sm:text-4xl lg:text-5xl text-white leading-tight max-w-lg">
            Up and Running in{' '}
            <span className="gradient-text-amber">Three Steps</span>
          </h2>
          <p className="text-dark-200 mt-4 max-w-xl text-base leading-relaxed">
            No complex setup. No cloud subscriptions. No hardware engineers. Just connect, detect, and protect.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-6 relative">
          {/* Connector line - desktop */}
          <div className="hidden lg:block absolute top-12 left-[calc(33.3%+0.5px)] right-[calc(33.3%+0.5px)] h-px">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
          </div>

          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="glass-card rounded-2xl p-6 relative"
            >
              {/* Step number + icon */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-700/10 border border-amber-500/20 flex items-center justify-center relative">
                  <s.icon className="w-5 h-5 text-amber-500" />
                  <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center font-mono text-[9px] font-bold text-dark-950">
                    {s.num.replace('0', '')}
                  </div>
                </div>
                <div className="font-mono text-xs text-dark-400">{s.num}</div>
              </div>

              <h3 className="font-display font-700 text-white text-xl mb-3">{s.title}</h3>
              <p className="text-dark-200 text-sm leading-relaxed mb-5">{s.body}</p>

              {/* Tech tag */}
              <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5">
                <span className="w-1 h-1 rounded-full bg-amber-500 inline-block" />
                <span className="font-mono text-[10px] text-amber-400 font-medium">{s.tag}</span>
              </div>

              {/* Arrow for desktop */}
              {i < 2 && (
                <div className="hidden lg:block absolute -right-3 top-12 z-10">
                  <div className="w-6 h-6 rounded-full bg-dark-900 border border-amber-500/20 flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-amber-500" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}