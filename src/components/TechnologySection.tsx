import { ScrollReveal } from './ScrollReveal';

export const TechnologySection = () => {
  return (
    <section id="technology" className="py-20 md:py-28 px-6 md:px-16 lg:px-24 bg-background">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 className="text-foreground text-3xl md:text-4xl font-semibold mb-12">
            Built on proven technology
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ScrollReveal>
            <div>
              <h3 className="text-foreground text-base font-semibold">YOLOv11n</h3>
              <p className="text-muted-foreground text-sm font-light mt-1">
                Real-time object detection, optimized for edge hardware.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div>
              <h3 className="text-foreground text-base font-semibold">Edge Computing</h3>
              <p className="text-muted-foreground text-sm font-light mt-1">
                Runs on-site. No cloud dependency. Video never leaves your premises.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div>
              <h3 className="text-foreground text-base font-semibold">REST API</h3>
              <p className="text-muted-foreground text-sm font-light mt-1">
                Connects to your existing safety management stack via webhooks.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div>
              <h3 className="text-foreground text-base font-semibold">Docker / K8s</h3>
              <p className="text-muted-foreground text-sm font-light mt-1">
                Deploy on cloud, on-premise, or hybrid infrastructure.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
