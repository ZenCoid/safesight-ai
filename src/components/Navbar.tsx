import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Menu, X, Shield } from 'lucide-react';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = ["Features", "How It Works", "Pricing", "FAQ"];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 flex flex-row justify-between items-center px-8 lg:px-16 py-5 transition-all duration-300 ${
          scrolled ? 'bg-background border-b border-border' : 'bg-transparent'
        }`}
      >
        <div className="text-foreground text-xl font-semibold tracking-tight flex items-center gap-2">
          <Shield className="text-primary w-6 h-6" />
          <span>SafeSight <span className="text-primary">AI</span></span>
        </div>
        
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="hidden md:inline-flex">
          <Button variant="navCta" className="px-6 text-xs text-orange-foreground border-none">
            Join Early Access
          </Button>
        </div>

        <button 
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-background flex flex-col pt-20 px-8">
          <button 
            className="absolute top-6 right-8 text-foreground"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={24} />
          </button>
          
          <div className="flex flex-col gap-8 mt-10">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-2xl text-foreground font-semibold uppercase tracking-widest"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link}
              </a>
            ))}
            <Button variant="navCta" className="mt-8 text-xs py-4 text-orange-foreground border-none" onClick={() => setMobileMenuOpen(false)}>
              Join Early Access
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
