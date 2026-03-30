/**
 * main.js
 * Punto de entrada principal de la aplicación
 * Orquesta la inicialización de todos los módulos
 */

// Log de estado de módulos
console.log('=== Portfolio App Initializing ===');

// 1. Verificar disponibilidad de módulos
const modules = {
  ProjectsData: typeof ProjectsData !== 'undefined',
  SkillsData: typeof SkillsData !== 'undefined',
  ThemeManager: typeof ThemeManager !== 'undefined',
  i18n: typeof i18n !== 'undefined',
  ComponentLoader: typeof ComponentLoader !== 'undefined',
  ProjectRenderer: typeof ProjectRenderer !== 'undefined',
  SkillsRenderer: typeof SkillsRenderer !== 'undefined',
  ProjectFilter: typeof ProjectFilter !== 'undefined',
  ParticlesCanvas: typeof ParticlesCanvas !== 'undefined',
  BlobButton: typeof BlobButton !== 'undefined',
  TypewriterEffect: typeof TypewriterEffect !== 'undefined',
  NavBlobEffect: typeof NavBlobEffect !== 'undefined'
};

Object.entries(modules).forEach(([name, available]) => {
  console.log(`${available ? '✓' : '✗'} ${name}`);
});

// 2. Inicializar componentes
if (modules.ComponentLoader) {
  // Los componentes se cargan solo si existen en HTML
  if (document.getElementById('header')) {
    ComponentLoader.load('header', '#header').catch(() => {
      console.log('Header component not needed (inline HTML present)');
    });
  }
  if (document.getElementById('footer')) {
    ComponentLoader.load('footer', '#footer').catch(() => {
      console.log('Footer component not needed (inline HTML present)');
    });
  }
}

// 3. Listeners para eventos de cambio
if (modules.i18n) {
  document.addEventListener('lang:changed', (e) => {
    console.log(`Language changed to: ${e.detail.lang}`);
    // Re-traducir DOM si fue modificado dinámicamente
    i18n.translateDOM();
  });
}

if (modules.ThemeManager) {
  document.addEventListener('theme:changed', (e) => {
    console.log(`Theme changed to: ${e.detail.theme}`);
  });
}

// 4. Log final
console.log('=== Portfolio App Ready ===');
console.log(`Current language: ${modules.i18n ? i18n.getCurrentLang() : 'N/A'}`);
console.log(`Current theme: ${modules.ThemeManager ? ThemeManager.getCurrentTheme() : 'N/A'}`);
console.log(`Total projects: ${modules.ProjectsData ? ProjectsData.getAll().length : 'N/A'}`);

