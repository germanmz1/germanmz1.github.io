/**
 * SkillsData
 * Datos de tecnologías y skills ordenados por categoría/timeline
 * Estructura: categorías de aprendizaje histórico
 */

const SkillsData = {
  categories: [
    {
      id: 'data-analytics',
      titleEs: 'Data & Analytics',
      titleEn: 'Data & Analytics',
      descEs: 'Herramientas de análisis y visualización de datos',
      descEn: 'Data analysis and visualization tools',
      skills: [
        { name: 'Excel', level: 'expert', icon: '📊' },
        { name: 'Tableau', level: 'advanced', icon: '📈' },
        { name: 'Power BI', level: 'advanced', icon: '⚡' }
      ]
    },
    {
      id: 'web-fundamentals',
      titleEs: 'Web Fundamentals',
      titleEn: 'Web Fundamentals',
      descEs: 'Desarrollo web front-end básico',
      descEn: 'Front-end web development basics',
      skills: [
        { name: 'HTML', level: 'expert', deviconClass: 'devicon-html5-plain colored' },
        { name: 'CSS', level: 'expert', deviconClass: 'devicon-css3-plain colored' },
        { name: 'JavaScript', level: 'advanced', deviconClass: 'devicon-javascript-plain colored' },
        { name: 'Python', level: 'advanced', deviconClass: 'devicon-python-plain colored' },
        { name: 'Django', level: 'intermediate', deviconClass: 'devicon-django-plain colored' }
      ]
    },
    {
      id: 'data-science',
      titleEs: 'Data Science',
      titleEn: 'Data Science',
      descEs: 'Análisis y machine learning',
      descEn: 'Analysis and machine learning',
      skills: [
        { name: 'R', level: 'advanced', deviconClass: 'devicon-r-original colored' },
        { name: 'NumPy', level: 'advanced', deviconClass: 'devicon-numpy-original colored' },
        { name: 'Pandas', level: 'advanced', deviconClass: 'devicon-pandas-original colored' },
        { name: 'Scikit-learn', level: 'intermediate', deviconClass: 'devicon-scikitlearn-original colored' },
        { name: 'SQL', level: 'expert', deviconClass: 'devicon-sqldeveloper-plain colored' },
        { name: 'MySQL', level: 'advanced', deviconClass: 'devicon-mysql-plain colored' }
      ]
    },
    {
      id: 'modern-stack',
      titleEs: 'Modern Stack',
      titleEn: 'Modern Stack',
      descEs: 'Tecnologías y frameworks modernos',
      descEn: 'Modern technologies and frameworks',
      skills: [
        { name: 'Machine Learning', level: 'advanced', icon: '🧠' },
        { name: 'TypeScript', level: 'intermediate', deviconClass: 'devicon-typescript-plain colored' },
        { name: 'Tailwind', level: 'intermediate', deviconClass: 'devicon-tailwindcss-plain colored' },
        { name: 'Prisma ORM', level: 'intermediate', deviconClass: 'devicon-prisma-original colored' },
        { name: 'Python', level: 'advanced', deviconClass: 'devicon-python-plain colored' }
      ]
    }
  ],

  /**
   * Obtener todas las categorías
   */
  getAll() {
    return this.categories;
  },

  /**
   * Obtener categoría por ID
   */
  getById(id) {
    return this.categories.find((cat) => cat.id === id);
  },

  /**
   * Obtener skills de una categoría
   */
  getSkillsByCategory(categoryId) {
    const category = this.getById(categoryId);
    return category ? category.skills : [];
  },

  /**
   * Obtener todas las skills (planas)
   */
  getAllSkills() {
    return this.categories.flatMap((cat) => cat.skills);
  },

  /**
   * Obtener skill por nombre
   */
  getSkillByName(name) {
    return this.getAllSkills().find((skill) => skill.name === name);
  }
};
