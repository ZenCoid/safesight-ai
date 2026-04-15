import { useEffect } from 'react';

export function useFastScroll() {
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (!link) return;
      
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      
      const targetId = href.substring(1);
      
      if (!targetId) {
        // Just href="#" - scroll to top
        e.preventDefault();
        window.history.pushState(null, '', window.location.pathname);
        smoothScrollTo(0, 600);
        return;
      }
      
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        e.preventDefault();
        window.history.pushState(null, '', href);
        const yOffset = -80; // Account for fixed navbar
        const y = targetElement.getBoundingClientRect().top + window.scrollY + yOffset;
        smoothScrollTo(y, 600);
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, []);
}

function smoothScrollTo(targetY: number, duration: number) {
  const startY = window.scrollY;
  const difference = targetY - startY;
  const startTime = performance.now();

  function step(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // easeOutQuart
    const easeProgress = 1 - Math.pow(1 - progress, 4);

    window.scrollTo(0, startY + difference * easeProgress);

    if (elapsed < duration) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}
