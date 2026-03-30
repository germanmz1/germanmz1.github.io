/**
 * ProjectRenderer
 * Renderiza dinámicamente las tarjetas de proyectos desde ProjectsData
 * Características:
 * - Renderizado según idioma actual (i18n)
 * - Re-renderiza automáticamente cuando cambia idioma
 * - Template HTML para project-card
 * - Soporte para filtrado por categoría
 */

const ProjectRenderer = (() => {
  /**
   * Template para una tarjeta de proyecto
   * @param {Object} project - Objeto del proyecto desde ProjectsData
   * @param {string} lang - Idioma actual ('es' o 'en')
   * @returns {string} HTML de la tarjeta
   */
  function createProjectCard(project, lang) {
    const title = lang === 'es' ? project.titleEs : project.titleEn;
    const desc = lang === 'es' ? project.descEs : project.descEn;

    // Crear tags HTML
    const tagsHTML = project.tags
      .map((tag) => `<span class="tag">${tag}</span>`)
      .join('');

    // Crear stats HTML (si existen)
    const statsHTML = project.stats
      ? `<div class="project-stats">
          ${Object.entries(project.stats)
            .map(
              ([key, value]) =>
                `<div class="stat"><strong>${key}:</strong> ${value}</div>`
            )
            .join('')}
         </div>`
      : '';

    return `
      <article class="project-card" data-project-id="${project.id}">
        <h3 class="project-title">${title}</h3>
        <p class="project-description">${desc}</p>
        ${statsHTML}
        <div class="project-tags">${tagsHTML}</div>
        <a class="primary-button" href="${project.url}">
          ${lang === 'es' ? 'Ver proyecto' : 'View project'}
        </a>
      </article>
    `;
  }

  /**
   * Renderizar proyectos en una sección
   * @param {Array} projects - Array de proyectos a renderizar
   * @param {string} selector - Selector del contenedor
   * @param {string} lang - Idioma ('es' o 'en')
   */
  function renderProjects(projects, selector, lang) {
    const container = document.querySelector(selector);
    if (!container) {
      console.warn(`[ProjectRenderer] Contenedor no encontrado: ${selector}`);
      return;
    }

    if (projects.length === 0) {
      container.innerHTML = '<p>No projects available.</p>';
      return;
    }

    // Generar HTML de todas las tarjetas
    const cardsHTML = projects
      .map((project) => createProjectCard(project, lang))
      .join('');

    container.innerHTML = cardsHTML;

    console.log(
      `✓ Renderizados ${projects.length} proyectos en ${selector}`
    );
  }

  /**
   * Renderizar proyectos de una categoría
   * @param {string} category - 'datascience', 'software', 'economics'
   * @param {string} selector - Selector del contenedor
   * @param {string} lang - Idioma
   */
  function renderCategory(category, selector, lang) {
    const projects = ProjectsData.getByCategory(category);
    renderProjects(projects, selector, lang);
  }

  /**
   * Renderizar proyectos destacados
   * @param {string} selector - Selector del contenedor
   * @param {string} lang - Idioma
   */
  function renderFeatured(selector, lang) {
    const projects = ProjectsData.getFeatured();
    renderProjects(projects, selector, lang);
  }

  /**
   * Re-renderizar contenido cuando cambia el idioma
   * Busca todos los contenedores con data-project-category
   */
  function handleLanguageChange(newLang) {
    // Re-renderizar contenedores por categoría
    const categoryContainers = document.querySelectorAll(
      '[data-project-category]'
    );

    categoryContainers.forEach((container) => {
      const category = container.getAttribute('data-project-category');
      const projects = ProjectsData.getByCategory(category);

      // Actualizar cada tarjeta
      const cards = container.querySelectorAll('.project-card');
      cards.forEach((card, index) => {
        const project = projects[index];
        if (!project) return;

        const title = newLang === 'es' ? project.titleEs : project.titleEn;
        const desc = newLang === 'es' ? project.descEs : project.descEn;
        const buttonText =
          newLang === 'es' ? 'Ver proyecto' : 'View project';

        // Actualizar contenido
        card.querySelector('.project-title').textContent = title;
        card.querySelector('.project-description').textContent = desc;
        card
          .querySelector('.primary-button')
          .textContent = buttonText;
      });
    });

    console.log('[ProjectRenderer] Contenido actualizado para idioma:', newLang);
  }

  /**
   * Inicializar listeners de idioma
   */
  function initLanguageListeners() {
    document.addEventListener('lang:changed', (e) => {
      handleLanguageChange(e.detail.lang);
    });
  }

  return {
    createProjectCard,
    renderProjects,
    renderCategory,
    renderFeatured,
    handleLanguageChange,
    initLanguageListeners
  };
})();

// Auto-inicializar listeners cuando el módulo carga
// (Se ejecuta cuando el DOM está listo)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    ProjectRenderer.initLanguageListeners();
  });
} else {
  ProjectRenderer.initLanguageListeners();
}
