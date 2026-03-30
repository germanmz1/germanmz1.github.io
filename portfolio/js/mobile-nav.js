/**
 * MobileNav
 * Gestiona hamburger menu para mobile
 * - Toggle hamburger button
 * - Abre/cierra drawer (full-screen)
 * - Maneja keyboard (Esc para cerrar)
 * - Locks scroll cuando drawer está abierto
 */

const MobileNav = (() => {
  const DRAWER_OPEN_CLASS = 'nav-drawer-open';
  let isOpen = false;

  return {
    /**
     * Inicializa el sistema de nav móvil
     */
    init() {
      const hamburger = document.getElementById('hamburger-menu');
      const drawer = document.getElementById('nav-drawer');
      const navLinks = drawer ? drawer.querySelectorAll('a') : [];

      if (!hamburger) return; // No existe button, skip

      // Toggle hamburger click
      hamburger.addEventListener('click', () => this.toggleDrawer());

      // Close drawer on link click
      navLinks.forEach((link) => {
        link.addEventListener('click', () => this.closeDrawer());
      });

      // Close drawer on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen) {
          this.closeDrawer();
        }
      });

      // Close drawer on outside click (on overlay)
      const overlay = document.getElementById('nav-overlay');
      if (overlay) {
        overlay.addEventListener('click', () => this.closeDrawer());
      }

      // Respeta prefers-reduced-motion
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      if (prefersReduced) {
        document.documentElement.style.setProperty(
          '--mobile-nav-transition',
          'none'
        );
      }
    },

    /**
     * Activa/desactiva el drawer
     */
    toggleDrawer() {
      isOpen ? this.closeDrawer() : this.openDrawer();
    },

    /**
     * Abre el drawer
     */
    openDrawer() {
      isOpen = true;
      document.documentElement.classList.add(DRAWER_OPEN_CLASS);
      document.body.style.overflow = 'hidden'; // Previene scroll

      const hamburger = document.getElementById('hamburger-menu');
      if (hamburger) {
        hamburger.setAttribute('aria-expanded', 'true');
      }
    },

    /**
     * Cierra el drawer
     */
    closeDrawer() {
      isOpen = false;
      document.documentElement.classList.remove(DRAWER_OPEN_CLASS);
      document.body.style.overflow = ''; // Restaura scroll

      const hamburger = document.getElementById('hamburger-menu');
      if (hamburger) {
        hamburger.setAttribute('aria-expanded', 'false');
      }
    },

    /**
     * Obtiene estado actual
     */
    isDrawerOpen() {
      return isOpen;
    }
  };
})();

// Auto-init en DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => MobileNav.init());
} else {
  MobileNav.init();
}
