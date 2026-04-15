import { useEffect, useState } from 'react';

export const MobileStickyCTA = ({ ctaRef }: { ctaRef: React.RefObject<HTMLElement | null> }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (ctaRef.current) {
        const ctaTop = ctaRef.current.getBoundingClientRect().top;
        if (ctaTop < window.innerHeight + 300) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ctaRef]);

  return (
    <div 
      className={`fixed bottom-4 left-4 right-4 z-40 md:hidden transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <button className="w-full bg-orange text-orange-foreground py-3 rounded-sm text-sm font-semibold shadow-lg hover:brightness-110 active:scale-[0.97] transition-all">
        Join Early Access
      </button>
    </div>
  );
};
