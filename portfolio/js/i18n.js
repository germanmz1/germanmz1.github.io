/**
 * i18n.js
 * Sistema de internacionalización (ES/EN)
 * Gestiona:
 * - Diccionarios de traducción
 * - Persistencia de idioma en localStorage
 * - Traducción dinámica de contenido
 */

const i18n = (() => {
  const STORAGE_KEY = 'portfolio-lang';
  const DEFAULT_LANG = 'es';
  const SUPPORTED_LANGS = ['es', 'en'];

  // Diccionario de todas las traducciones
  const translations = {
    es: {
      // Navegación
      'nav.home': 'Home',
      'nav.data': 'Data',
      'nav.software': 'Software',
      'nav.economics': 'Economía',

      // Página principal
      'home.title': 'Bienvenido a mi Portfolio',
      'home.subtitle': 'Acá vas a encontrar mis proyectos principales divididos por áreas de conocimiento.',
      'home.data_title': 'Data Science & Analysis',
      'home.data_desc': 'Data Science, Machine Learning y Análisis de Datos.',
      'home.software_title': 'Software Development',
      'home.software_desc': 'Desarrollo web y proyectos de programación general.',
      'home.economics_title': 'Economics',
      'home.economics_desc': 'Análisis financiero y proyectos de economía.',
      'home.view_projects': 'Ver proyectos',

      // Página Data Projects
      'data.title': 'Data Projects',
      'data.subtitle': 'Explorá mis modelos de Machine Learning y proyectos de análisis de datos.',
      'data.wine_title': 'Predicción de Calidad de Vinos',
      'data.wine_desc': 'Modelo de machine learning para predecir calidad de vinos usando Random Forest.',

      // Página Software Projects
      'software.title': 'Software Projects',
      'software.subtitle': 'Explora mis proyectos de desarrollo web y aplicaciones.',
      'software.expense_title': 'Expense Manager',
      'software.expense_desc': 'Aplicación web para tracking de gastos personales con categorización y reportes.',
      'software.other_title': 'Other Projects',
      'software.other_desc': 'Diversos proyectos experimentales y utilities desarrollados durante mi aprendizaje.',

      // Página Economics Projects
      'economics.title': 'Economics Projects',
      'economics.subtitle': 'Explora mis análisis económicos y proyectos de finanzas.',
      'economics.argentina_title': 'Análisis de Economía Argentina',
      'economics.argentina_desc': 'Estudio detallado de la economía argentina: inflación, tasas de cambio, y políticas fiscales.',
      'economics.corporate_title': 'Análisis Empresarial',
      'economics.corporate_desc': 'Análisis financiero de empresas, estados contables e indicadores de rendimiento.',
      'economics.macro_title': 'Macroeconomía Comparada',
      'economics.macro_desc': 'Comparación de indicadores macroeconómicos entre países y análisis regional.',
      'economics.thought_title': 'Pensamiento Económico',
      'economics.thought_desc': 'Historia y análisis de diferentes escuelas económicas y pensamiento económico.',

      // Footer
      'footer.copyright': '© German Martinez. Todos los derechos reservados.',

      // Buttons & UI
      'button.view_project': 'Ver proyecto',
      'aria.toggle_theme': 'Activar/desactivar modo oscuro',
      'aria.toggle_lang': 'Cambiar idioma',
    },
    en: {
      // Navigation
      'nav.home': 'Home',
      'nav.data': 'Data',
      'nav.software': 'Software',
      'nav.economics': 'Economics',

      // Home page
      'home.title': 'Welcome to my Portfolio',
      'home.subtitle': 'Here you will find my main projects divided by areas of knowledge.',
      'home.data_title': 'Data Science & Analysis',
      'home.data_desc': 'Data Science, Machine Learning and Data Analysis.',
      'home.software_title': 'Software Development',
      'home.software_desc': 'Web development and general programming projects.',
      'home.economics_title': 'Economics',
      'home.economics_desc': 'Financial analysis and economy projects.',
      'home.view_projects': 'View projects',

      // Data Projects page
      'data.title': 'Data Projects',
      'data.subtitle': 'Explore my Machine Learning models and data analysis projects.',
      'data.wine_title': 'Wine Quality Prediction',
      'data.wine_desc': 'ML model to predict wine quality using Random Forest. EDA and feature importance.',

      // Software Projects page
      'software.title': 'Software Projects',
      'software.subtitle': 'Explore my web development and application projects.',
      'software.expense_title': 'Expense Manager',
      'software.expense_desc': 'Web application for personal expense tracking with categorization and reports.',
      'software.other_title': 'Other Projects',
      'software.other_desc': 'Various experimental projects and utilities developed during my learning.',

      // Economics Projects page
      'economics.title': 'Economics Projects',
      'economics.subtitle': 'Explore my economic analysis and finance projects.',
      'economics.argentina_title': 'Argentine Economy Analysis',
      'economics.argentina_desc': 'Detailed study of Argentine economy: inflation, exchange rates, and fiscal policies.',
      'economics.corporate_title': 'Corporate Analysis',
      'economics.corporate_desc': 'Corporate financial analysis, accounting statements and performance metrics.',
      'economics.macro_title': 'Comparative Macroeconomics',
      'economics.macro_desc': 'Comparison of macroeconomic indicators between countries and regional analysis.',
      'economics.thought_title': 'Economic Thought',
      'economics.thought_desc': 'History and analysis of different economic schools and economic thinking.',

      // Footer
      'footer.copyright': '© German Martinez. All rights reserved.',

      // Buttons & UI
      'button.view_project': 'View project',
      'aria.toggle_theme': 'Toggle dark/light mode',
      'aria.toggle_lang': 'Change language',
    }
  };

  // Obtener idioma inicial
  const getInitialLang = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED_LANGS.includes(saved)) {
      return saved;
    }

    // Detectar idioma del navegador
    const browserLang = navigator.language.split('-')[0];
    if (SUPPORTED_LANGS.includes(browserLang)) {
      return browserLang;
    }

    return DEFAULT_LANG;
  };

  let currentLang = getInitialLang();

  return {
    /**
     * Inicializar i18n
     */
    init() {
      // Establecer lang en HTML
      document.documentElement.lang = currentLang;

      // Listener para cambios de idioma
      document.addEventListener('lang:toggle', () => this.toggle());

      // Listener para buttons de idioma (si existen)
      const langToggle = document.getElementById('lang-toggle');
      if (langToggle) {
        langToggle.addEventListener('click', () => this.toggle());
        this.updateLangToggle();
      }

      // Emitir evento de inicialización
      document.dispatchEvent(
        new CustomEvent('i18n:ready', { detail: { lang: currentLang } })
      );

      console.log(`✓ i18n initialized with language: ${currentLang}`);
    },

    /**
     * Traducir una clave
     * @param {string} key - Clave de traducción (ej: 'home.title')
     * @param {object} params - Parámetros para reemplazar (opcional)
     * @returns {string} Texto traducido
     */
    t(key, params = {}) {
      const text = translations[currentLang]?.[key] ?? key;

      // Reemplazar parámetros si existen
      let result = text;
      Object.keys(params).forEach((param) => {
        result = result.replace(`{{${param}}}`, params[param]);
      });

      return result;
    },

    /**
     * Obtener idioma actual
     * @returns {string} 'es' o 'en'
     */
    getCurrentLang() {
      return currentLang;
    },

    /**
     * Cambiar idioma
     * @param {string} lang - 'es' o 'en'
     */
    setLanguage(lang) {
      if (!SUPPORTED_LANGS.includes(lang)) {
        console.warn(`Idioma no soportado: ${lang}`);
        return;
      }

      currentLang = lang;
      document.documentElement.lang = lang;
      localStorage.setItem(STORAGE_KEY, lang);

      // Actualizar UI
      this.updateLangToggle();

      // Emitir evento
      document.dispatchEvent(
        new CustomEvent('lang:changed', { detail: { lang } })
      );

      console.log(`Language changed to: ${lang}`);
    },

    /**
     * Alternar idioma (ES ↔ EN)
     */
    toggle() {
      const newLang = currentLang === 'es' ? 'en' : 'es';
      this.setLanguage(newLang);
    },

    /**
     * Actualizar label del botón de idioma
     */
    updateLangToggle() {
      const langToggle = document.getElementById('lang-toggle');
      if (langToggle) {
        langToggle.textContent = currentLang === 'es' ? 'EN' : 'ES';
        langToggle.setAttribute('aria-label', this.t('aria.toggle_lang'));
      }
    },

    /**
     * Obtener todos los idiomas soportados
     * @returns {Array} Array de códigos de idioma
     */
    getSupportedLanguages() {
      return SUPPORTED_LANGS;
    },

    /**
     * Traducir elemento del DOM basado en atributo data-i18n
     * Uso: <h1 data-i18n="home.title"></h1>
     */
    translateDOM() {
      document.querySelectorAll('[data-i18n]').forEach((element) => {
        const key = element.getAttribute('data-i18n');
        element.textContent = this.t(key);
      });

      // También traducir aria-labels
      document.querySelectorAll('[data-i18n-aria]').forEach((element) => {
        const key = element.getAttribute('data-i18n-aria');
        element.setAttribute('aria-label', this.t(key));
      });

      console.log('DOM translated');
    }
  };
})();

// Auto-inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => i18n.init());
} else {
  i18n.init();
}
