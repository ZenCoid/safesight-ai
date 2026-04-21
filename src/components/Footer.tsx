import { Shield } from 'lucide-react'

const nav = {
  Product: [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Technology', href: '#technology' },
    { label: 'Live Demo', href: '#demo' },
    { label: 'Pricing', href: '#pricing' },
  ],
  Company: [
    { label: 'Privacy Policy', href: '#privacy' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: 'mailto:hello@safesightai.com' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] bg-surface/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center">
                <Shield className="w-3.5 h-3.5 text-dark-950" />
              </div>
              <span className="font-display font-700 text-white text-[15px] tracking-tight">
                SafeSight<span className="text-amber-500">.</span>
              </span>
            </div>
            <p className="text-dark-300 text-sm leading-relaxed max-w-xs">
              AI-powered construction site safety monitoring. Real-time PPE detection via your existing CCTV cameras. Zero cloud dependency.
            </p>

            {/* Tech badges */}
            <div className="flex items-center gap-2 mt-5 flex-wrap">
              {['YOLOv11n', 'ONNX Runtime', 'Edge AI'].map(t => (
                <span
                  key={t}
                  className="font-mono text-[10px] text-dark-400 glass rounded-full px-2.5 py-1"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(nav).map(([group, links]) => (
            <div key={group}>
              <div className="font-mono text-[10px] text-dark-400 uppercase tracking-widest mb-4">{group}</div>
              <ul className="space-y-2.5">
                {links.map(l => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-dark-300 hover:text-white transition-colors duration-200"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.04] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-xs text-dark-400">
            © {new Date().getFullYear()} SafeSight AI. All rights reserved.
          </p>
          <p className="font-mono text-xs text-dark-500">
            Built with YOLOv11n + ONNX Runtime · Runs entirely on-device
          </p>
        </div>
      </div>
    </footer>
  )
}