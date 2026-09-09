// Data layer for technology timeline
const TimelineData = {
  groups: [
    {
      id: 'analytics',
      titleEs: 'Data & Analytics',
      titleEn: 'Data & Analytics',
      order: 1,
      technologies: [
        { name: 'Excel', level: 'expert', years: '5+' },
        { name: 'Tableau', level: 'advanced', years: '3+' },
        { name: 'Power BI', level: 'advanced', years: '3+' }
      ]
    },
    {
      id: 'web-fundamentals',
      titleEs: 'Fundamentos Web',
      titleEn: 'Web Fundamentals',
      order: 2,
      technologies: [
        { name: 'HTML', level: 'expert', years: '5+' },
        { name: 'CSS', level: 'expert', years: '5+' },
        { name: 'JavaScript', level: 'expert', years: '4+' },
        { name: 'Python', level: 'advanced', years: '4+' },
        { name: 'Django', level: 'advanced', years: '2+' }
      ]
    },
    {
      id: 'data-science',
      titleEs: 'Ciencia de Datos',
      titleEn: 'Data Science',
      order: 3,
      technologies: [
        { name: 'R', level: 'advanced', years: '2+' },
        { name: 'NumPy', level: 'advanced', years: '2+' },
        { name: 'Pandas', level: 'advanced', years: '2+' },
        { name: 'Scikit-learn', level: 'advanced', years: '1+' },
        { name: 'SQL', level: 'expert', years: '4+' },
        { name: 'MySQL', level: 'advanced', years: '3+' }
      ]
    },
    {
      id: 'modern-stack',
      titleEs: 'Stack Moderno',
      titleEn: 'Modern Stack',
      order: 4,
      technologies: [
        { name: 'Machine Learning', level: 'advanced', years: '1+' },
        { name: 'TypeScript', level: 'advanced', years: '2+' },
        { name: 'Tailwind CSS', level: 'advanced', years: '2+' },
        { name: 'Prisma ORM', level: 'advanced', years: '1+' },
        { name: 'Python (ML)', level: 'expert', years: '2+' }
      ]
    }
  ],

  getAllGroups() {
    return this.groups.sort((a, b) => a.order - b.order);
  },

  getGroupById(groupId) {
    return this.groups.find(g => g.id === groupId);
  },

  getGroupByOrder(order) {
    return this.groups.find(g => g.order === order);
  },

  getAllTechnologies() {
    return this.groups.flatMap(g => 
      g.technologies.map(t => ({ ...t, groupId: g.id, groupTitle: g.titleEs }))
    );
  }
};
