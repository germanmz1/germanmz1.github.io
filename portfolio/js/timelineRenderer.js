// Timeline rendering module with Intersection Observer animations
const TimelineRenderer = (() => {
  const STAGGER_DELAY = 80; // ms between each group reveal
  let observer = null;

  function renderAllGroups(selector, lang = 'es') {
    const container = document.querySelector(selector);
    if (!container) return;

    container.innerHTML = '';
    const groups = TimelineData.getAllGroups();

    groups.forEach((group, index) => {
      const groupElement = createGroupElement(group, lang, index);
      container.appendChild(groupElement);
    });

    // Initialize Intersection Observer for animations
    initializeObserver();
    observeGroups(container);
  }

  function createGroupElement(group, lang, index) {
    const wrapper = document.createElement('div');
    wrapper.className = 'timeline-group-wrapper';
    wrapper.style.animationDelay = `${index * STAGGER_DELAY}ms`;

    const groupTitle = lang === 'es' ? group.titleEs : group.titleEn;

    wrapper.innerHTML = `
      <div class="timeline-group" data-group-id="${group.id}">
        <div class="timeline-group-header">
          <h3 class="timeline-group-title">${groupTitle}</h3>
          <div class="timeline-group-line"></div>
        </div>
        <div class="timeline-technologies">
          ${group.technologies.map((tech, idx) => createTechCard(tech, idx)).join('')}
        </div>
      </div>
    `;

    return wrapper;
  }

  function createTechCard(tech, index) {
    const levelClass = `level-${tech.level}`;
    return `
      <div class="timeline-tech-card ${levelClass}" style="animation-delay: ${index * 50}ms">
        <div class="tech-card-front">
          <span class="tech-name">${tech.name}</span>
          <span class="tech-years">${tech.years}</span>
        </div>
        <div class="tech-card-back">
          <span class="tech-level">${tech.level.charAt(0).toUpperCase() + tech.level.slice(1)}</span>
        </div>
      </div>
    `;
  }

  function initializeObserver() {
    if (observer) observer.disconnect();

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
  }

  function observeGroups(container) {
    const groups = container.querySelectorAll('.timeline-group-wrapper');
    groups.forEach(group => {
      observer.observe(group);
    });
  }

  function handleLanguageChange(newLang, selector) {
    renderAllGroups(selector, newLang);
  }

  function initLanguageListeners(selector) {
    document.addEventListener('lang:changed', (e) => {
      handleLanguageChange(e.detail.lang, selector);
    });
  }

  return {
    renderAllGroups,
    handleLanguageChange,
    initLanguageListeners
  };
})();

// Auto-initialize if DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    // Initialization will be handled by page-specific code
  });
}
