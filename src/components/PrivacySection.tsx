import { ScrollReveal } from './ScrollReveal';

export const PrivacySection = () => {
  return (
    <section className="py-20 md:py-28 px-6 md:px-16 lg:px-24 bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 className="text-foreground text-3xl md:text-4xl font-semibold mb-4">
            Privacy-first by design
          </h2>
          <p className="text-muted-foreground text-lg font-light mb-12 max-w-2xl">
            Camera-based AI raises legitimate privacy concerns. Here is how SafeSight handles them.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <ScrollReveal>
            <div className="bg-secondary border border-border rounded-lg p-6 flex items-start gap-4 h-full">
              <div className="w-5 h-5 rounded-full border border-primary flex items-center justify-center shrink-0 mt-0.5">
                <div className="w-1.5 h-3 border-b-2 border-r-2 border-primary rotate-45 -translate-y-[2px]" />
              </div>
              <div>
                <h3 className="text-foreground font-medium mb-1">No facial recognition.</h3>
                <p className="text-muted-foreground text-sm font-light">SafeSight detects equipment on bodies, not faces or identities. It cannot identify individual workers.</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-secondary border border-border rounded-lg p-6 flex items-start gap-4 h-full">
              <div className="w-5 h-5 rounded-full border border-primary flex items-center justify-center shrink-0 mt-0.5">
                <div className="w-1.5 h-3 border-b-2 border-r-2 border-primary rotate-45 -translate-y-[2px]" />
              </div>
              <div>
                <h3 className="text-foreground font-medium mb-1">Video stays on-site.</h3>
                <p className="text-muted-foreground text-sm font-light">All processing happens on edge hardware at your location. Footage is never uploaded to external servers.</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-secondary border border-border rounded-lg p-6 flex items-start gap-4 h-full">
              <div className="w-5 h-5 rounded-full border border-primary flex items-center justify-center shrink-0 mt-0.5">
                <div className="w-1.5 h-3 border-b-2 border-r-2 border-primary rotate-45 -translate-y-[2px]" />
              </div>
              <div>
                <h3 className="text-foreground font-medium mb-1">Regulatory compliant.</h3>
                <p className="text-muted-foreground text-sm font-light">Designed with GDPR, OSHA, and regional privacy regulations in mind.</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-secondary border border-border rounded-lg p-6 flex items-start gap-4 h-full">
              <div className="w-5 h-5 rounded-full border border-primary flex items-center justify-center shrink-0 mt-0.5">
                <div className="w-1.5 h-3 border-b-2 border-r-2 border-primary rotate-45 -translate-y-[2px]" />
              </div>
              <div>
                <h3 className="text-foreground font-medium mb-1">Anonymous by default.</h3>
                <p className="text-muted-foreground text-sm font-light">No biometric data is collected, stored, or transmitted. The system sees gear, not people.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
