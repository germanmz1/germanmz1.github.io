/**
 * ProjectFilter
 * Sistema de filtrado de proyectos con animación slide + reflow
 * - Renderiza dinámicamente botones de filtro basados en tags
 * - Anima cards con slide out/in
 * - Se integra con ProjectRenderer
 */

const ProjectFilter = (() => {
  let currentFilter = 'all';
  let category = null;
  let allProjects = [];

  return {
    /**
     * Inicializar sistema de filtros
     * @param {string} projectCategory - 'datascience', 'software', 'economics'
     * @param {string} filterContainerId - ID del contenedor de filtros
     * @param {string} projectContainerId - ID del contenedor de proyectos
     */
    init(projectCategory, filterContainerId, projectContainerId) {
      category = projectCategory;
      allProjects = ProjectsData.getByCategory(category);

      const filterContainer = document.getElementById(filterContainerId);
      const projectContainer = document.getElementById(projectContainerId);

      if (!filterContainer || !projectContainer) {
        console.warn('[ProjectFilter] Contenedor no encontrado');
        return;
      }

      // Extraer tags únicos de todos los proyectos
      const allTags = new Set();
      allProjects.forEach((project) => {
        project.tags.forEach((tag) => allTags.add(tag));
      });

      // Crear botones de filtro
      const filterHTML = `
        <button class="filter-btn active" data-filter="all">
          ${i18n ? i18n.t('filters.all') || 'All' : 'All'} (${allProjects.length})
        </button>
        ${Array.from(allTags)
          .map((tag) => {
            const count = allProjects.filter((p) =>
              p.tags.includes(tag)
            ).length;
            return `<button class="filter-btn" data-filter="${tag}">${tag} (${count})</button>`;
          })
          .join('')}
      `;

      filterContainer.innerHTML = filterHTML;

      // Event listeners para botones
      filterContainer.querySelectorAll('.filter-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const filter = e.target.getAttribute('data-filter');
          this.applyFilter(filter, projectContainerId);
        });
      });

      // Escuchar cambios de idioma
      document.addEventListener('lang:changed', (e) => {
        this.handleLanguageChange(e.detail.lang, projectContainerId);
      });

      console.log(`✓ Filtros inicializados para categoría: ${category}`);
    },

    /**
     * Aplicar filtro y animar transición
     * @param {string} filter - Tag o 'all'
     * @param {string} projectContainerId - ID del contenedor
     */
    applyFilter(filter, projectContainerId) {
      if (currentFilter === filter) return;

      currentFilter = filter;
      const projectContainer = document.getElementById(projectContainerId);
      const filterContainer = projectContainer
        ? projectContainer.parentElement.querySelector('[id$="-filters"]')
        : null;

      if (!projectContainer) return;

      // Actualizar botones activos
      if (filterContainer) {
        filterContainer.querySelectorAll('.filter-btn').forEach((btn) => {
          btn.classList.toggle(
            'active',
            btn.getAttribute('data-filter') === filter
          );
        });
      }

      // Filtrar proyectos
      let filteredProjects = allProjects;
      if (filter !== 'all') {
        filteredProjects = allProjects.filter((p) => p.tags.includes(filter));
      }

      // Animar slide out
      const lang =
        typeof i18n !== 'undefined' ? i18n.getCurrentLang() : 'es';
      const currentCards = projectContainer.querySelectorAll(
        '.project-card'
      );

      // Slide out de cards actuales
      currentCards.forEach((card, index) => {
        card.style.animation = `slideOut 0.3s ease-in ${
          index * 0.05
        }s forwards`;
      });

      // Renderizar nuevos proyectos después de slide out
      setTimeout(() => {
        const cardsHTML = filteredProjects
          .map((project) => ProjectRenderer.createProjectCard(project, lang))
          .join('');

        projectContainer.innerHTML = cardsHTML;

        // Slide in de nuevas cards
        projectContainer.querySelectorAll('.project-card').forEach((card, index) => {
          card.style.animation = `slideIn 0.4s ease-out ${
            index * 0.05
          }s forwards`;
        });

        console.log(
          `✓ Filtrado a "${filter}": ${filteredProjects.length} proyectos`
        );
      }, 300);
    },

    /**
     * Manejar cambios de idioma
     * @param {string} lang - Idioma nuevo
     * @param {string} projectContainerId - ID del contenedor
     */
    handleLanguageChange(lang, projectContainerId) {
      const projectContainer = document.getElementById(projectContainerId);
      if (!projectContainer) return;

      // Re-renderizar cards con nuevo idioma
      const filteredProjects =
        currentFilter === 'all'
          ? allProjects
          : allProjects.filter((p) => p.tags.includes(currentFilter));

      const cardsHTML = filteredProjects
        .map((project) => ProjectRenderer.createProjectCard(project, lang))
        .join('');

      projectContainer.innerHTML = cardsHTML;
    },

    /**
     * Resetear filtros
     */
    reset() {
      currentFilter = 'all';
    }
  };
})();
