import { forwardRef } from 'react';
import { ScrollReveal } from './ScrollReveal';

export const CTASection = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref} className="py-20 md:py-28 px-6 md:px-16 lg:px-24 bg-background">
      <div className="max-w-xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-foreground text-3xl md:text-4xl font-semibold mb-4">
            Get early access to SafeSight
          </h2>
          <p className="text-muted-foreground text-lg font-light mb-8">
            We are onboarding early adopters now. Leave your email and we will reach out when your spot opens.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="your@email.com" 
              className="bg-secondary border border-border rounded-sm px-4 py-3 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary w-full"
              required
            />
            <button type="submit" className="bg-orange text-orange-foreground px-6 py-3 rounded-sm text-sm font-semibold hover:brightness-110 transition-all active:scale-[0.97] shrink-0">
              Join Early Access
            </button>
          </form>
          <p className="text-muted-foreground/60 text-xs mt-6">
            No spam. No sales calls. Just an email when we are ready for you.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
});

CTASection.displayName = "CTASection";
