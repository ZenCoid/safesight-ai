import { ScrollReveal } from './ScrollReveal';

export const ProblemSection = () => {
  return (
    <section id="problem" className="py-20 md:py-28 px-6 md:px-16 lg:px-24 bg-background">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 className="text-foreground text-3xl md:text-4xl font-semibold mb-4">
            Construction has a safety problem.
          </h2>
          <p className="text-muted-foreground text-lg font-light mb-12 max-w-2xl">
            Most injuries on job sites come down to one thing: someone was not wearing their protective equipment.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ScrollReveal>
            <div className="bg-secondary border border-border rounded-lg p-6 md:p-8 h-full flex flex-col justify-center">
              <div className="text-primary text-4xl md:text-5xl font-bold">2.78M</div>
              <div className="text-muted-foreground text-sm mt-2">
                Fatal and non-fatal workplace injuries annually worldwide.
              </div>
              <div className="text-muted-foreground/50 text-xs mt-1">
                Source: International Labour Organization
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-secondary border border-border rounded-lg p-6 md:p-8 h-full flex flex-col justify-center">
              <div className="text-primary text-4xl md:text-5xl font-bold">$171B</div>
              <div className="text-muted-foreground text-sm mt-2">
                Global economic cost of workplace injuries each year.
              </div>
              <div className="text-muted-foreground/50 text-xs mt-1">
                Source: National Safety Council
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-secondary border border-border rounded-lg p-6 md:p-8 h-full flex flex-col justify-center">
              <div className="text-primary text-4xl md:text-5xl font-bold">60%</div>
              <div className="text-muted-foreground text-sm mt-2">
                Of construction site injuries linked to PPE non-compliance.
              </div>
              <div className="text-muted-foreground/50 text-xs mt-1">
                Source: OSHA
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
