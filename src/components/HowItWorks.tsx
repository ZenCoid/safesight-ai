import { motion } from 'framer-motion'
import { Camera, Cpu, Bell } from 'lucide-react'

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
    body: 'Our YOLOv11n model — optimized with ONNX Runtime — runs entirely on your machine. Every frame is analyzed for PPE compliance (helmets, vests) and fall hazards in under 50ms.',
    tag: 'YOLOv11n · ONNX · Edge AI',
  },
  {
    num: '03',
    icon: Bell,
    title: 'Instant Alerts, No Delays',
    body: "When a violation is detected, SafeSight AI immediately notifies your safety team via email with a timestamped snapshot. High-severity events trigger instant alerts. Low-severity events are batched into shift reports.",
    tag: 'Email · Snapshot · Shift Reports',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24 relative" id="how-it-works">
      {/* BG stripe */}
      <div className="absolute inset-0 bg-surface/40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="font-mono text-xs text-primary mb-3 tracking-widest uppercase">How It Works</div>
          <h2 className="font-display font-800 text-4xl sm:text-5xl text-white leading-tight max-w-lg">
            Up and Running in{' '}
            <span className="gradient-text">Three Steps</span>
          </h2>
          <p className="text-light/60 mt-4 max-w-xl text-base leading-relaxed">
            No complex setup. No cloud subscriptions. No hardware engineers. Just connect, detect, and protect.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-10 left-[calc(33.3%+16px)] right-[calc(33.3%+16px)] h-px bg-gradient-to-r from-primary/30 via-primary/60 to-primary/30" />

          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative"
            >
              {/* Step number circle */}
              <div className="relative w-20 h-20 mb-6">
                <div className="w-20 h-20 rounded-full border border-primary/30 bg-primary/8 flex items-center justify-center">
                  <s.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center font-mono text-[10px] font-bold text-bg">
                  {s.num.replace('0', '')}
                </div>
              </div>

              <div className="font-mono text-xs text-muted mb-2">{s.num}</div>
              <h3 className="font-display font-700 text-white text-xl mb-3">{s.title}</h3>
              <p className="text-light/55 text-sm leading-relaxed mb-4">{s.body}</p>

              {/* Tech tag */}
              <div className="inline-flex items-center gap-1 bg-primary/8 border border-primary/20 rounded-full px-3 py-1">
                <span className="w-1 h-1 rounded-full bg-primary inline-block" />
                <span className="font-mono text-[10px] text-primary">{s.tag}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
