import { ScrollReveal } from './ScrollReveal';

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-28 px-6 md:px-16 lg:px-24 bg-background">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 className="text-foreground text-3xl md:text-4xl font-semibold mb-4">
            How it works
          </h2>
          <p className="text-muted-foreground text-lg font-light mb-16 max-w-2xl">
            Three steps from camera to alert. No new hardware, no complicated setup.
          </p>
        </ScrollReveal>

        <div className="border-l-[3px] border-primary ml-4 md:ml-6 space-y-12 pb-4 pt-1">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 -ml-6 md:-ml-8">
              <div className="text-primary text-[2.5rem] md:text-5xl font-bold bg-background py-1 px-2 shrink-0 self-start mt-[-0.5rem] leading-none">
                01
              </div>
              <div className="ml-6 md:ml-0 md:pt-1">
                <h3 className="text-foreground text-lg font-semibold mt-1">
                  Point your existing cameras at the work zone.
                </h3>
                <p className="text-muted-foreground text-sm font-light mt-2 max-w-xl">
                  SafeSight connects to any IP camera on your site. Analog cameras with an encoder work too. No new hardware needed.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 -ml-6 md:-ml-8">
              <div className="text-primary text-[2.5rem] md:text-5xl font-bold bg-background py-1 px-2 shrink-0 self-start mt-[-0.5rem] leading-none">
                02
              </div>
              <div className="ml-6 md:ml-0 md:pt-1">
                <h3 className="text-foreground text-lg font-semibold mt-1">
                  AI detects PPE compliance in real time.
                </h3>
                <p className="text-muted-foreground text-sm font-light mt-2 max-w-xl">
                  YOLOv11n identifies six equipment categories — hard hats, vests, goggles, gloves, harnesses, and boots. Each frame is processed in under 200 milliseconds.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 -ml-6 md:-ml-8">
              <div className="text-primary text-[2.5rem] md:text-5xl font-bold bg-background py-1 px-2 shrink-0 self-start mt-[-0.5rem] leading-none">
                03
              </div>
              <div className="ml-6 md:ml-0 md:pt-1">
                <h3 className="text-foreground text-lg font-semibold mt-1">
                  Get alerted the moment something is wrong.
                </h3>
                <p className="text-muted-foreground text-sm font-light mt-2 max-w-xl">
                  Alerts go to your phone, dashboard, or existing safety system. Configurable thresholds — choose which violations trigger immediate action and which are logged for review.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
