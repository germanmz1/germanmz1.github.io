/**
 * ComponentLoader
 * Sistema para cargar componentes HTML dinámicamente
 * Características:
 * - Fetch con error handling
 * - Cachéo de componentes
 * - Eventos para desacoplamiento
 * - Fallback UI si falla
 */

const ComponentLoader = (() => {
  // Diccionario de componentes y sus rutas
  const components = {
    header: 'components/header.html',
    footer: 'components/footer.html',
    'project-card': 'components/project-card.html'
  };

  // Cache para evitar múltiples fetches
  const cache = new Map();

  /**
   * Cargar un componente
   * @param {string} name - Nombre del componente
   * @param {string} selector - Selector CSS del elemento destino
   * @returns {Promise} Promesa que se resuelve cuando carga
   */
  async function load(name, selector) {
    if (!components[name]) {
      console.error(`[ComponentLoader] Componente no registrado: ${name}`);
      return null;
    }

    const element = document.querySelector(selector);
    if (!element) {
      console.warn(
        `[ComponentLoader] Elemento no encontrado para: ${selector}`
      );
      return null;
    }

    try {
      // Verificar cache
      let html;
      if (cache.has(name)) {
        console.log(`[ComponentLoader] Usando cache para: ${name}`);
        html = cache.get(name);
      } else {
        // Fetch del componente
        const response = await fetch(components[name]);

        if (!response.ok) {
          throw new Error(
            `HTTP error! status: ${response.status} para ${components[name]}`
          );
        }

        html = await response.text();
        cache.set(name, html); // Guardar en cache
      }

      // Insertar HTML
      element.innerHTML = html;

      // Emitir evento para que otros módulos se enteren
      document.dispatchEvent(
        new CustomEvent(`component:${name}:loaded`, {
          detail: { element }
        })
      );

      console.log(`✓ Componente cargado: ${name}`);
      return element;
    } catch (error) {
      console.error(`[ComponentLoader] Error cargando ${name}:`, error.message);

      // Mostrar fallback UI
      element.innerHTML = `
        <div style="
          padding: 20px;
          background: #fee;
          border: 1px solid #fcc;
          border-radius: 8px;
          color: #c00;
          text-align: center;
          font-family: sans-serif;
        ">
          <strong>Error cargando componente: ${name}</strong>
          <p>${error.message}</p>
        </div>
      `;

      // Emitir evento de error
      document.dispatchEvent(
        new CustomEvent(`component:${name}:error`, {
          detail: { error }
        })
      );

      return null;
    }
  }

  /**
   * Cargar múltiples componentes en paralelo
   * @param {Array} loadList - Array de {name, selector}
   * @returns {Promise} Promesa que espera a todos
   */
  async function loadMultiple(loadList) {
    const promises = loadList.map((item) => load(item.name, item.selector));
    return Promise.all(promises);
  }

  /**
   * Registrar un nuevo componente
   * @param {string} name - Nombre del componente
   * @param {string} path - Ruta relativa del archivo
   */
  function register(name, path) {
    components[name] = path;
  }

  /**
   * Limpiar cache (útil para desarrollo)
   */
  function clearCache() {
    cache.clear();
    console.log('[ComponentLoader] Cache limpiado');
  }

  return {
    load,
    loadMultiple,
    register,
    clearCache,
    getComponents: () => components
  };
})();
