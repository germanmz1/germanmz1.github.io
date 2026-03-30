/**
 * ThemeManager
 * Gestiona dark/light mode con:
 * - Persistencia en localStorage
 * - Respeto a prefers-color-scheme del sistema
 * - Evita "flash" de tema incorrecto en carga
 */

const ThemeManager = (() => {
  const STORAGE_KEY = 'portfolio-theme';
  const THEME_ATTR = 'data-theme';
  const LIGHT_THEME = 'light';
  const DARK_THEME = 'dark';

  // Determinar tema inicial sin flash
  const getInitialTheme = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? DARK_THEME : LIGHT_THEME;
  };

  return {
    /**
     * Inicializa el sistema de temas
     */
    init() {
      const theme = getInitialTheme();
      this.setTheme(theme, false); // false = no guardar en init

      // Listener para toggle button
      const themeToggle = document.getElementById('theme-toggle');
      if (themeToggle) {
        themeToggle.addEventListener('click', () => this.toggle());
        // Actualizar aria-pressed inicial
        const isDark = document.documentElement.classList.contains(DARK_CLASS);
        themeToggle.setAttribute('aria-pressed', isDark.toString());
      }

      // Listener para cambios de preferencia del sistema
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (e) => {
          // Solo si el usuario no ha guardado preferencia manual
          if (!localStorage.getItem(STORAGE_KEY)) {
            this.setTheme(e.matches ? DARK_THEME : LIGHT_THEME);
          }
        });
    },

    /**
     * Alterna entre tema claro y oscuro
     */
    toggle() {
      const currentTheme = document.documentElement.getAttribute(THEME_ATTR) || LIGHT_THEME;
      const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
      this.setTheme(newTheme, true);
    },

    /**
     * Establece el tema
     * @param {string} theme - 'light' o 'dark'
     * @param {boolean} persist - guardar en localStorage
     */
    setTheme(theme, persist = true) {
      const isDark = theme === DARK_THEME;

      // Aplicar atributo data-theme
      if (isDark) {
        document.documentElement.setAttribute(THEME_ATTR, DARK_THEME);
      } else {
        document.documentElement.removeAttribute(THEME_ATTR);
      }

      // Actualizar aria-pressed del botón
      const themeToggle = document.getElementById('theme-toggle');
      if (themeToggle) {
        themeToggle.setAttribute('aria-pressed', isDark.toString());
      }

      // Guardar preferencia si es solicitado
      if (persist) {
        localStorage.setItem(STORAGE_KEY, theme);
      }

      // Emitir evento para otros módulos
      document.dispatchEvent(
        new CustomEvent('theme:changed', { detail: { theme } })
      );
    },

    /**
     * Obtener tema actual
     * @returns {string} 'light' o 'dark'
     */
    getCurrentTheme() {
      return document.documentElement.getAttribute(THEME_ATTR) === DARK_THEME
        ? DARK_THEME
        : LIGHT_THEME;
    }
  };
})();

// Auto-inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => ThemeManager.init());
} else {
  ThemeManager.init();
}
