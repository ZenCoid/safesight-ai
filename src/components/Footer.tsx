export const Footer = () => {
  return (
    <footer className="bg-hero-bg border-t border-border py-12 md:py-16 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="col-span-1">
            <div className="text-foreground text-lg font-semibold tracking-tight">
              SafeSight <span className="text-primary">AI</span>
            </div>
            <p className="text-muted-foreground text-sm font-light mt-2 max-w-xs">
              AI-powered PPE detection for construction sites.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-foreground font-medium mb-1 relative left-[-2px]">Product</h4>
            {["Features", "How It Works", "Pricing", "Technology"].map(link => (
              <a key={link} href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-muted-foreground text-sm hover:text-foreground transition-colors w-max relative left-[-2px]">
                {link}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-foreground font-medium mb-1 relative left-[-2px]">Company</h4>
            {["About", "Contact", "Careers"].map(link => (
              <a key={link} href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-muted-foreground text-sm hover:text-foreground transition-colors w-max relative left-[-2px]">
                {link}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-foreground font-medium mb-1 relative left-[-2px]">Legal</h4>
            {["Privacy Policy", "Terms of Service"].map(link => (
              <a key={link} href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-muted-foreground text-sm hover:text-foreground transition-colors w-max relative left-[-2px]">
                {link}
              </a>
            ))}
            <a href="mailto:hello@safesight.ai" className="text-primary text-sm mt-2 w-max relative left-[-2px]">
              hello@safesight.ai
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex justify-between items-center flex-wrap gap-4">
          <div className="text-muted-foreground text-xs">
            © 2025 SafeSight AI. All rights reserved.
          </div>
          <div className="flex gap-4">
            {["X (Twitter)", "LinkedIn", "GitHub"].map(social => (
              <a key={social} href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
