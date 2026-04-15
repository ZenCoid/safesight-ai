import { ScrollReveal } from './ScrollReveal';

export const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 md:py-28 px-6 md:px-16 lg:px-24 bg-background">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 className="text-foreground text-3xl md:text-4xl font-semibold mb-4">
            Simple pricing
          </h2>
          <p className="text-muted-foreground text-lg font-light mb-12 max-w-2xl">
            Plans designed for different site sizes. All plans are currently early access.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ScrollReveal>
            <div className="bg-secondary border border-border rounded-lg p-8 flex flex-col h-full">
              <h3 className="text-foreground text-xl font-medium mb-4">Starter</h3>
              <div className="mb-6 flex items-end gap-1">
                <span className="text-foreground text-4xl font-bold">$49</span>
                <span className="text-muted-foreground text-sm mb-1">/month</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {["Up to 4 cameras", "Email alerts", "Basic dashboard", "Email support"].map((ft, i) => (
                  <li key={i} className="text-muted-foreground text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {ft}
                  </li>
                ))}
              </ul>
              <button className="bg-orange text-orange-foreground w-full py-3 rounded-sm text-sm font-semibold hover:brightness-110 transition-all active:scale-[0.97]">
                Join Early Access
              </button>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-secondary border border-border rounded-lg p-8 flex flex-col h-full">
              <h3 className="text-foreground text-xl font-medium mb-4">Professional</h3>
              <div className="mb-6 flex items-end gap-1">
                <span className="text-foreground text-4xl font-bold">$199</span>
                <span className="text-muted-foreground text-sm mb-1">/month</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {["Up to 16 cameras", "SMS + email alerts", "Full dashboard with analytics", "REST API access", "Priority support"].map((ft, i) => (
                  <li key={i} className="text-muted-foreground text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {ft}
                  </li>
                ))}
              </ul>
              <button className="bg-orange text-orange-foreground w-full py-3 rounded-sm text-sm font-semibold hover:brightness-110 transition-all active:scale-[0.97]">
                Join Early Access
              </button>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-secondary border border-border rounded-lg p-8 flex flex-col h-full">
              <h3 className="text-foreground text-xl font-medium mb-4">Enterprise</h3>
              <div className="mb-6 flex items-end gap-1">
                <span className="text-foreground text-4xl font-bold">Custom</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {["Unlimited cameras", "Dedicated support engineer", "Custom integrations", "SLA agreement", "On-premise deployment option"].map((ft, i) => (
                  <li key={i} className="text-muted-foreground text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {ft}
                  </li>
                ))}
              </ul>
              <button className="bg-orange text-orange-foreground w-full py-3 rounded-sm text-sm font-semibold hover:brightness-110 transition-all active:scale-[0.97]">
                Join Early Access
              </button>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <p className="text-muted-foreground/60 text-xs mt-8 text-center max-w-2xl mx-auto">
            Pricing reflects planned general availability. Early access participants receive founding-member pricing.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};
