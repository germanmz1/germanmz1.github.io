/**
 * NavBlobEffect
 * Efecto de blob simplificado en nav items
 * - Desktop: hover effect con scale + background shift
 * - Mobile: color change only
 * - Sin morphing SVG (performance first)
 */

const NavBlobEffect = (() => {
  const isMobile = () => window.innerWidth < 768;
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  return {
    init() {
      if (prefersReducedMotion) {
        // Sin efectos, early return
        return;
      }

      const navLinks = document.querySelectorAll('nav #main-nav a, nav a');
      
      navLinks.forEach((link) => {
        if (isMobile()) {
          // Mobile: solo color change en hover (via CSS)
          link.classList.add('nav-blob-mobile');
        } else {
          // Desktop: efecto blob con GSAP
          link.classList.add('nav-blob-desktop');
          
          link.addEventListener('mouseenter', () => {
            if (!isMobile()) {
              gsap.to(link, {
                scale: 1.08,
                duration: 0.3,
                overwrite: 'auto'
              });
            }
          });

          link.addEventListener('mouseleave', () => {
            if (!isMobile()) {
              gsap.to(link, {
                scale: 1,
                duration: 0.3,
                overwrite: 'auto'
              });
            }
          });
        }
      });

      // Listener para resize
      window.addEventListener('resize', () => {
        const nowMobile = isMobile();
        navLinks.forEach((link) => {
          if (nowMobile) {
            link.classList.remove('nav-blob-desktop');
            link.classList.add('nav-blob-mobile');
          } else {
            link.classList.remove('nav-blob-mobile');
            link.classList.add('nav-blob-desktop');
          }
        });
      });
    }
  };
})();

// Auto-init
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => NavBlobEffect.init());
} else {
  NavBlobEffect.init();
}
