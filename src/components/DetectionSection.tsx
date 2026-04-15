import { ScrollReveal } from './ScrollReveal';

export const DetectionSection = () => {
  const categories = [
    { name: "Hard Hats", desc: "Most commonly missed item on sites." },
    { name: "High-Vis Vests", desc: "Required in all active work zones." },
    { name: "Safety Goggles", desc: "Eye protection for dust, debris, and chemical exposure." },
    { name: "Work Gloves", desc: "Hand protection for handling and grip tasks." },
    { name: "Safety Harnesses", desc: "Fall protection at height — the deadliest risk." },
    { name: "Steel-Toed Boots", desc: "Foot protection against crush and puncture injuries." }
  ];

  return (
    <section className="py-20 md:py-28 px-6 md:px-16 lg:px-24 bg-background">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 className="text-foreground text-3xl md:text-4xl font-semibold mb-4">
            Six categories. Checked every frame.
          </h2>
          <p className="text-muted-foreground text-lg font-light mb-12 max-w-2xl">
            SafeSight monitors the PPE items most commonly linked to construction injuries.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="bg-secondary border border-border rounded-lg p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {categories.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-3 hover:bg-white/5 rounded-md transition-colors">
                  <div className="w-2 h-2 rounded-full bg-primary mt-[0.4rem] shrink-0" />
                  <div>
                    <div className="text-foreground text-sm font-medium">{item.name}</div>
                    <div className="text-muted-foreground text-xs font-light mt-1">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
