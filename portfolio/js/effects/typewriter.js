/**
 * TypewriterEffect
 * Efecto de máquina de escribir para texto
 * - Revela letra por letra
 * - Cursor parpadeante (opcional)
 * - Respeta prefers-reduced-motion (muestra todo instantáneamente)
 * 
 * Uso: new TypewriterEffect('element-id', 'texto a animar', { speed: 50 })
 */

class TypewriterEffect {
  constructor(elementId, text, options = {}) {
    this.element = document.getElementById(elementId);
    if (!this.element) return;

    this.fullText = text;
    this.displayedText = '';
    this.currentIndex = 0;
    this.speed = options.speed || 75; // ms per character
    this.delay = options.delay || 200; // delay antes de empezar
    this.showCursor = options.showCursor !== false; // default: true
    this.onComplete = options.onComplete || null;

    this.prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    this.timeoutId = null;
    this.cursorSpan = null;

    this.init();
  }

  init() {
    // Limpiar elemento
    this.element.textContent = '';
    this.element.style.minHeight = '1.2em'; // Prevenir layout shift

    // Crear cursor si es necesario
    if (this.showCursor && !this.prefersReducedMotion) {
      this.cursorSpan = document.createElement('span');
      this.cursorSpan.className = 'typewriter-cursor';
      this.cursorSpan.textContent = '|';
      this.element.appendChild(this.cursorSpan);
    }

    // Si prefers-reduced-motion está activo, mostrar todo instantáneamente
    if (this.prefersReducedMotion) {
      this.element.textContent = this.fullText;
      if (this.onComplete) {
        this.onComplete();
      }
      return;
    }

    // Empezar animación con delay
    this.timeoutId = setTimeout(() => this.type(), this.delay);
  }

  type() {
    if (this.currentIndex < this.fullText.length) {
      this.displayedText += this.fullText[this.currentIndex];
      this.currentIndex++;

      // Actualizar texto (remover viejo output)
      if (this.cursorSpan) {
        this.cursorSpan.remove();
      }

      this.element.textContent = this.displayedText;

      // Recrear cursor
      if (this.showCursor && this.currentIndex < this.fullText.length) {
        this.cursorSpan = document.createElement('span');
        this.cursorSpan.className = 'typewriter-cursor';
        this.cursorSpan.textContent = '|';
        this.element.appendChild(this.cursorSpan);
      }

      // Próximo carácter
      this.timeoutId = setTimeout(() => this.type(), this.speed);
    } else {
      // Animación completa
      if (this.cursorSpan) {
        this.cursorSpan.remove();
      }
      if (this.onComplete) {
        this.onComplete();
      }
    }
  }

  destroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}

// CSS para el cursor (inyectar en página o en CSS)
const typewriterCursorCSS = `
.typewriter-cursor {
  display: inline-block;
  width: 2px;
  background: var(--color-accent);
  margin-left: 2px;
  animation: blink 0.7s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .typewriter-cursor {
    animation: none;
    opacity: 0;
  }
}
`;

// Inyectar CSS si no existe
if (!document.querySelector('style[data-typewriter]')) {
  const style = document.createElement('style');
  style.setAttribute('data-typewriter', 'true');
  style.textContent = typewriterCursorCSS;
  document.head.appendChild(style);
}
