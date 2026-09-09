/**
 * SkillsRenderer
 * Renderiza dinámicamente las tarjetas de skills
 * - Grid 3col (desktop) → 1col (mobile)
 * - Hover reveal para más información
 * - Soporte para múltiples idiomas
 */

const SkillsRenderer = (() => {
  /**
   * Crear HTML para una tarjeta de skill
   * @param {Object} skill - Objeto del skill
   * @param {Object} category - Categoría del skill
   * @param {string} lang - Idioma actual
   */
  function createSkillCard(skill, category, lang) {
    const categoryTitle =
      lang === 'es' ? category.titleEs : category.titleEn;
      
    const iconHtml = skill.deviconClass
      ? `<i class="${skill.deviconClass} skill-icon"></i>`
      : `<span class="skill-icon">${skill.icon}</span>`;

    return `
      <div class="skill-badge" data-skill="${skill.name}" data-level="${skill.level}" title="${categoryTitle} - ${skill.level.toUpperCase()}">
        ${iconHtml}
        <span class="skill-label">${skill.name}</span>
      </div>
    `;
  }

  /**
   * Renderizar todos los skills en una sección
   * @param {string} selector - Selector del contenedor
   * @param {string} lang - Idioma
   */
  function renderAllSkills(selector, lang) {
    const container = document.querySelector(selector);
    if (!container) {
      console.warn(`[SkillsRenderer] Contenedor no encontrado: ${selector}`);
      return;
    }

    const allCategories = SkillsData.getAll();
    let html = '';

    allCategories.forEach((category) => {
      const categoryTitle =
        lang === 'es' ? category.titleEs : category.titleEn;
      const categoryDesc =
        lang === 'es' ? category.descEs : category.descEn;

      // Header de categoría
      html += `
        <div class="skills-category-group" data-category="${category.id}">
          <h3 class="skills-category-title">${categoryTitle}</h3>
          <p class="skills-category-desc">${categoryDesc}</p>
          <div class="skills-grid">
      `;

      // Skills de la categoría
      category.skills.forEach((skill) => {
        html += createSkillCard(skill, category, lang);
      });

      html += `
          </div>
        </div>
      `;
    });

    container.innerHTML = html;

    console.log(`✓ Renderizados ${SkillsData.getAllSkills().length} skills`);
  }

  /**
   * Renderizar una categoría específica
   * @param {string} categoryId - ID de la categoría
   * @param {string} selector - Selector del contenedor
   * @param {string} lang - Idioma
   */
  function renderCategory(categoryId, selector, lang) {
    const container = document.querySelector(selector);
    const category = SkillsData.getById(categoryId);

    if (!container || !category) {
      console.warn(
        `[SkillsRenderer] Contenedor o categoría no encontrado`
      );
      return;
    }

    const categoryTitle =
      lang === 'es' ? category.titleEs : category.titleEn;
    const categoryDesc =
      lang === 'es' ? category.descEs : category.descEn;

    let html = `
      <h3 class="skills-category-title">${categoryTitle}</h3>
      <p class="skills-category-desc">${categoryDesc}</p>
      <div class="skills-grid">
    `;

    category.skills.forEach((skill) => {
      html += createSkillCard(skill, category, lang);
    });

    html += '</div>';

    container.innerHTML = html;
  }

  /**
   * Re-renderizar cuando cambia el idioma
   * @param {string} newLang - Nuevo idioma
   * @param {string} selector - Selector del contenedor
   */
  function handleLanguageChange(newLang, selector) {
    renderAllSkills(selector, newLang);
  }

  /**
   * Inicializar listeners de idioma
   * @param {string} selector - Selector del contenedor
   */
  function initLanguageListeners(selector) {
    document.addEventListener('lang:changed', (e) => {
      handleLanguageChange(e.detail.lang, selector);
    });
  }

  return {
    createSkillCard,
    renderAllSkills,
    renderCategory,
    handleLanguageChange,
    initLanguageListeners
  };
})();
