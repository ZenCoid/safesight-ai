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
    <footer className="border-t border-border bg-surface/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative">
                <Shield className="w-6 h-6 text-primary" />
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-primary badge-pulse" />
              </div>
              <span className="font-display font-700 text-white text-lg">
                Safe<span className="text-primary">Sight</span>
                <span className="font-mono text-xs text-muted ml-1">AI</span>
              </span>
            </div>
            <p className="text-light/45 text-sm leading-relaxed max-w-xs">
              AI-powered construction site safety monitoring. Real-time PPE detection via your existing CCTV cameras. Zero cloud dependency.
            </p>

            {/* Tech badge row */}
            <div className="flex items-center gap-2 mt-5 flex-wrap">
              {['YOLOv11n', 'ONNX Runtime', 'Edge AI'].map(t => (
                <span
                  key={t}
                  className="font-mono text-[10px] text-muted border border-border rounded-full px-2.5 py-0.5"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(nav).map(([group, links]) => (
            <div key={group}>
              <div className="font-mono text-[10px] text-muted uppercase tracking-widest mb-4">{group}</div>
              <ul className="space-y-2.5">
                {links.map(l => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-light/45 hover:text-primary transition-colors duration-200"
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
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-xs text-muted">
            © {new Date().getFullYear()} SafeSight AI. All rights reserved.
          </p>
          <p className="font-mono text-xs text-muted">
            Built with YOLOv11n + ONNX Runtime · Runs entirely on-device
          </p>
        </div>
      </div>
    </footer>
  )
}
