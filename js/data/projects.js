/**
 * ProjectsData
 * Single source of truth para todos los proyectos
 * Estructura normalizada para fácil renderizado e i18n
 */

const ProjectsData = {
  // =====================
  // DATA SCIENCE PROJECTS
  // =====================
  datascience: [
    {
      id: 'calidad-vinos',
      titleEs: 'Predicción de Calidad de Vinos',
      titleEn: 'Wine Quality Prediction',
      descEs:
        'Modelo de machine learning para predecir calidad de vinos usando Random Forest. Análisis exploratorio de datos y evaluación de importancia de features.',
      descEn:
        'ML model to predict wine quality using Random Forest. Exploratory data analysis and feature importance evaluation.',
      tags: ['Python', 'Machine Learning', 'EDA', 'Scikit-learn'],
      url: 'projects/data/data-science/calidad-vinos/index.html',
      date: '2023-06',
      featured: true,
      stats: {
        accuracy: '0.89',
        features: '11',
        samples: '1599'
      }
    },
    {
      id: 'Demografia',
      titleEs: 'Análisis Demográfico',
      titleEn: 'Demographic Analysis',
      descEs:
        'Estudio de tendencias demográficas con análisis temporal y geográfico.',
      descEn:
        'Study of demographic trends with temporal and geographic analysis.',
      tags: ['Python', 'Data Analysis', 'Visualization'],
      url: 'projects/data/data-science/demografia/index.html',
      date: '2023-07',
      featured: false
    },
    {
      id: 'ecommerce',
      titleEs: 'Análisis E-commerce',
      titleEn: 'E-commerce Analysis',
      descEs:
        'Análisis de datos de ventas online, comportamiento de usuarios y segmentación de clientes.',
      descEn:
        'Online sales data analysis, user behavior and customer segmentation.',
      tags: ['Python', 'Data Analysis', 'Customer Segmentation'],
      url: 'projects/data/data-science/ecommerce/index.html',
      date: '2023-08',
      featured: false
    },
    {
      id: 'analisis-riesgo',
      titleEs: 'Análisis de Riesgo',
      titleEn: 'Risk Analysis',
      descEs: 'Modelado de riesgos financieros con técnicas estadísticas avanzadas.',
      descEn: 'Financial risk modeling with advanced statistical techniques.',
      tags: ['Python', 'Statistics', 'Finance'],
      url: 'projects/data/data-science/analisis-riesgo/index.html',
      date: '2023-09',
      featured: false
    },
    {
      id: 'analisis-financiero',
      titleEs: 'Análisis Financiero',
      titleEn: 'Financial Analysis',
      descEs: 'Análisis de series temporales financieras y proyecciones.',
      descEn: 'Financial time series analysis and forecasting.',
      tags: ['Python', 'Time Series', 'Finance'],
      url: 'projects/data/data-science/analisis-financiero/index.html',
      date: '2023-10',
      featured: false
    },
    {
      id: 'economia',
      titleEs: 'Análisis Económico',
      titleEn: 'Economic Analysis',
      descEs: 'Estudio de indicadores económicos y correlaciones macroeconómicas.',
      descEn:
        'Economic indicators study and macroeconomic correlations analysis.',
      tags: ['Python', 'Economics', 'Data Analysis'],
      url: 'projects/data/data-science/economia/index.html',
      date: '2023-11',
      featured: false
    }
  ],

  // ====================
  // SOFTWARE PROJECTS
  // ====================
  software: [
    {
      id: 'gestor-gastos',
      titleEs: 'Gestor de Gastos',
      titleEn: 'Expense Manager',
      descEs:
        'Aplicación web para tracking de gastos personales con categorización y reportes.',
      descEn:
        'Web application for personal expense tracking with categorization and reports.',
      tags: ['JavaScript', 'HTML/CSS', 'Web App'],
      url: 'projects/software/gestor-gastos/index.html',
      date: '2023-05',
      featured: true,
      stats: {
        categories: '12',
        users: 'Personal'
      }
    },
    {
      id: 'otros',
      titleEs: 'Otros Proyectos',
      titleEn: 'Other Projects',
      descEs: 'Diversos proyectos experimentales y utilities.',
      descEn: 'Various experimental projects and utilities.',
      tags: ['JavaScript', 'Experiments'],
      url: 'projects/software/otros/index.html',
      date: '2023-12',
      featured: false
    }
  ],

  // =================
  // ECONOMICS PROJECTS
  // =================
  economics: [
    {
      id: 'economia-argentina',
      titleEs: 'Análisis de Economía Argentina',
      titleEn: 'Argentine Economy Analysis',
      descEs:
        'Estudio detallado de la economía argentina: inflación, tasas de cambio, y políticas fiscales.',
      descEn:
        'Detailed study of Argentine economy: inflation, exchange rates, and fiscal policies.',
      tags: ['Economics', 'Argentina', 'Analysis'],
      url: 'projects/economics/economia-argentina/index.html',
      date: '2023-04',
      featured: true
    },
    {
      id: 'empresas',
      titleEs: 'Análisis Empresarial',
      titleEn: 'Corporate Analysis',
      descEs: 'Análisis financiero de empresas, estados contables e indicadores.',
      descEn: 'Corporate financial analysis, accounting statements and metrics.',
      tags: ['Economics', 'Finance', 'Corporate'],
      url: 'projects/economics/empresas/index.html',
      date: '2023-05',
      featured: false
    },
    {
      id: 'macro-paises',
      titleEs: 'Macroeconomía Comparada',
      titleEn: 'Comparative Macroeconomics',
      descEs: 'Comparación de indicadores macroeconómicos entre países.',
      descEn: 'Comparison of macroeconomic indicators between countries.',
      tags: ['Economics', 'Macroeconomics', 'Comparative'],
      url: 'projects/economics/macro-paises/index.html',
      date: '2023-06',
      featured: false
    },
    {
      id: 'pensamiento-economico',
      titleEs: 'Pensamiento Económico',
      titleEn: 'Economic Thought',
      descEs: 'Historia y análisis de diferentes escuelas económicas.',
      descEn: 'History and analysis of different economic schools.',
      tags: ['Economics', 'Philosophy', 'History'],
      url: 'projects/economics/pensamiento-economico/index.html',
      date: '2023-07',
      featured: false
    }
  ],

  // =================
  // UTILITY METHODS
  // =================

  /**
   * Obtener todos los proyectos
   * @returns {Array} Array plano de todos los proyectos
   */
  getAll() {
    return [
      ...this.datascience,
      ...this.software,
      ...this.economics
    ];
  },

  /**
   * Obtener proyectos destacados
   * @returns {Array} Array de proyectos con featured: true
   */
  getFeatured() {
    return this.getAll().filter((p) => p.featured);
  },

  /**
   * Obtener un proyecto por ID
   * @param {string} id - ID del proyecto
   * @returns {Object|null} Proyecto o null
   */
  getById(id) {
    return this.getAll().find((p) => p.id === id) || null;
  },

  /**
   * Obtener proyectos por categoría
   * @param {string} category - 'datascience', 'software', 'economics'
   * @returns {Array} Array de proyectos
   */
  getByCategory(category) {
    const categories = {
      datascience: this.datascience,
      software: this.software,
      economics: this.economics
    };
    return categories[category] || [];
  },

  /**
   * Filtrar proyectos por tag
   * @param {string} tag - Tag a filtrar
   * @returns {Array} Array de proyectos
   */
  filterByTag(tag) {
    return this.getAll().filter((p) =>
      p.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
    );
  }
};
