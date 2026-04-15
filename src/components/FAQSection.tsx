import { useState } from 'react';
import { ScrollReveal } from './ScrollReveal';
import { Plus, Minus } from 'lucide-react';

const qa = [
  {q: "What PPE items does SafeSight detect?", a: "Six categories: hard hats, high-visibility vests, safety goggles, work gloves, safety harnesses, and steel-toed boots. Each category is detected independently, so a worker missing only a hard hat will trigger a specific 'Missing: Hard Hat' alert rather than a generic violation."},
  {q: "Do I need to install new cameras?", a: "No. SafeSight connects to any existing IP camera on your site. Analog cameras connected through an encoder also work. The system is designed to work with your current infrastructure."},
  {q: "How fast is the detection?", a: "In controlled testing, the system processes each frame in under 200 milliseconds. Real-world performance depends on camera resolution, lighting conditions, and the edge hardware you deploy. We are actively optimizing the model."},
  {q: "Where does video processing happen?", a: "All processing happens on edge hardware installed at your site. Video footage never leaves your premises. This keeps latency low and keeps your data private."},
  {q: "Is this a privacy risk for my workers?", a: "SafeSight detects equipment, not people. It does not perform facial recognition or store biometric data. Workers remain anonymous — the system only cares about whether they are wearing their safety gear."},
  {q: "Can it integrate with our existing safety systems?", a: "Yes. SafeSight provides a REST API and webhook support, so alerts can flow into your existing safety management platform, Slack, Microsoft Teams, or any system that accepts webhooks."},
  {q: "What happens when a violation is detected?", a: "You decide. Alerts can be sent via email, SMS, or webhook. You can configure which violations trigger immediate alerts and which are logged for periodic review. The system does not enforce anything — it informs your safety team."},
  {q: "How do I join the early access program?", a: "Enter your email in any of the 'Join Early Access' forms on this page. We will contact you when onboarding begins. Early access participants will also receive founding-member pricing on whichever plan they choose."}
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 md:py-28 px-6 md:px-16 lg:px-24 bg-background">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <h2 className="text-foreground text-3xl md:text-4xl font-semibold mb-12">
            Frequently asked questions
          </h2>
        </ScrollReveal>

        <div className="border-t border-border">
          {qa.map((item, i) => (
            <ScrollReveal key={i}>
              <div className="border-b border-border">
                <button
                  className="w-full py-6 flex justify-between items-center text-left focus:outline-none"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <span className="text-foreground font-medium pr-8">{item.q}</span>
                  {openIndex === i ? (
                    <Minus className="shrink-0 text-muted-foreground transition-transform duration-200" size={20} />
                  ) : (
                    <Plus className="shrink-0 text-muted-foreground transition-transform duration-200" size={20} />
                  )}
                </button>
                <div 
                  className="grid transition-all duration-200 ease-in-out" 
                  style={{ gridTemplateRows: openIndex === i ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden min-h-0">
                    <p className="pb-6 text-muted-foreground font-light text-sm">{item.a}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
