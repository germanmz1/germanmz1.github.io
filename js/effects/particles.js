/**
 * ParticlesCanvas
 * Sistema de partículas animadas en canvas
 * - Animación puramente procedural
 * - Sin interacción con cursor
 * - Respeta prefers-reduced-motion
 * Uso: new ParticlesCanvas('canvas-id')
 */

class ParticlesCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.animationId = null;
    this.prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Setup
    this.resizeCanvas();
    this.initParticles();
    this.setupEventListeners();

    // Inicia animación solo si no hay preferencia de reducción
    if (!this.prefersReducedMotion) {
      this.animate();
    }
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  setupEventListeners() {
    window.addEventListener('resize', () => this.resizeCanvas());

    // Respeta cambios de preferencia en tiempo real
    window
      .matchMedia('(prefers-reduced-motion: reduce)')
      .addEventListener('change', (e) => {
        this.prefersReducedMotion = e.matches;
        if (!this.prefersReducedMotion) {
          this.animate();
        } else {
          cancelAnimationFrame(this.animationId);
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
      });
  }

  initParticles() {
    const particleCount = Math.floor(
      (this.canvas.width * this.canvas.height) / 10000
    );
    this.particles = [];

    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        life: Math.random() * 0.5 + 0.5,
      });
    }
  }

  animate() {
    if (this.prefersReducedMotion) return;

    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Obtener color de acento desde CSS
    const accentColor = getComputedStyle(document.documentElement).getPropertyValue(
      '--color-accent'
    );

    for (let particle of this.particles) {
      // Actualizar posición
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= 0.002;

      // Wrap around edges
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;

      // Reset vida cuando se agote
      if (particle.life <= 0) {
        particle.life = Math.random() * 0.5 + 0.5;
      }

      // Dibujar partícula
      this.ctx.fillStyle = `hsla(200, 100%, 50%, ${particle.opacity * particle.life})`;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fill();
    }

    // Conectar partículas cercanas (connection lines)
    this.drawConnections();

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  drawConnections() {
    const maxDistance = 120;

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const p1 = this.particles[i];
        const p2 = this.particles[j];
        const distance = Math.hypot(p2.x - p1.x, p2.y - p1.y);

        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.2;
          this.ctx.strokeStyle = `hsla(200, 100%, 50%, ${opacity})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }
    }
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// Auto-init si existe canvas#particles
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('particles-canvas')) {
      window.particlesCanvas = new ParticlesCanvas('particles-canvas');
    }
  });
} else {
  if (document.getElementById('particles-canvas')) {
    window.particlesCanvas = new ParticlesCanvas('particles-canvas');
  }
}
