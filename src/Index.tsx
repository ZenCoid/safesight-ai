import { useRef } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { DetectionSection } from './components/DetectionSection';
import { DetectionDemo } from './components/DetectionDemo';
import { TechnologySection } from './components/TechnologySection';
import { PrivacySection } from './components/PrivacySection';
import { PricingSection } from './components/PricingSection';
import { FAQSection } from './components/FAQSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { MobileStickyCTA } from './components/MobileStickyCTA';
import { useFastScroll } from './hooks/useFastScroll';

export default function Index() {
  useFastScroll();
  const ctaRef = useRef<HTMLElement | null>(null);

  return (
    <div className="bg-background min-h-screen font-sora antialiased overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <DetectionSection />
      <DetectionDemo />
      <TechnologySection />
      <PrivacySection />
      <PricingSection />
      <FAQSection />
      <CTASection ref={ctaRef} />
      <Footer />
      <MobileStickyCTA ctaRef={ctaRef} />
    </div>
  );
}
