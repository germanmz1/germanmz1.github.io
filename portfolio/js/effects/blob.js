/**
 * BlobButton
 * SVG blob morphing button con GSAP
 * - Morphing entre 3-4 formas blob
 * - Hover effect en desktop
 * - Mobile: color change only (sin morph)
 * - Respeta prefers-reduced-motion
 * 
 * Uso: new BlobButton('blob-svg-button')
 */

class BlobButton {
  constructor(elementId) {
    this.btn = document.getElementById(elementId);
    if (!this.btn) return;

    this.svg = this.btn.querySelector('svg');
    this.path = this.svg ? this.svg.querySelector('path') : null;
    
    if (!this.path) return;

    this.prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    this.isHovering = false;
    this.isMobile = window.innerWidth < 768;
    this.animationTimeline = null;

    this.setupEventListeners();
    this.initAnimation();
  }

  setupEventListeners() {
    // Hover effects (desktop only)
    if (!this.isMobile && !this.prefersReducedMotion) {
      this.btn.addEventListener('mouseenter', () => this.onHover());
      this.btn.addEventListener('mouseleave', () => this.onHoverEnd());
    }

    // Mobile fallback: color change only
    if (this.isMobile) {
      this.btn.addEventListener('mousedown', () => {
        this.btn.style.transform = 'scale(0.95)';
      });
      this.btn.addEventListener('mouseup', () => {
        this.btn.style.transform = 'scale(1)';
      });
    }

    // Resize listener
    window.addEventListener('resize', () => {
      const wasMobile = this.isMobile;
      this.isMobile = window.innerWidth < 768;
      
      if (wasMobile !== this.isMobile) {
        // Cambió de mobile a desktop o vice versa
        this.resetAnimation();
        this.initAnimation();
      }
    });
  }

  initAnimation() {
    if (this.prefersReducedMotion) return;

    // Blob shapes (SVG path data)
    const shapes = [
      'M150,50 Q250,0 350,50 Q400,150 350,250 Q250,300 150,250 Q100,150 150,50 Z',
      'M150,80 Q280,20 380,60 Q420,140 370,250 Q260,310 130,280 Q80,180 150,80 Z',
      'M160,60 Q300,10 390,80 Q410,170 360,280 Q240,320 120,260 Q70,160 160,60 Z',
      'M140,70 Q260,30 380,90 Q430,160 380,260 Q250,300 140,240 Q60,170 140,70 Z',
    ];

    // Timeline de animación suave entre shapes
    this.animationTimeline = gsap.timeline({ repeat: -1, paused: this.isMobile });

    shapes.forEach((shape, index) => {
      this.animationTimeline.to(
        this.path,
        {
          attr: { d: shape },
          duration: 3,
          ease: 'sine.inOut',
        },
        index === 0 ? 0 : '-=1.5' // Overlap transitions
      );
    });
  }

  onHover() {
    if (this.prefersReducedMotion || !this.animationTimeline) return;

    this.isHovering = true;
    // Acelera la animación en hover
    this.animationTimeline.timeScale(1.5);
  }

  onHoverEnd() {
    if (this.prefersReducedMotion || !this.animationTimeline) return;

    this.isHovering = false;
    // Vuelve a velocidad normal
    this.animationTimeline.timeScale(1);
  }

  resetAnimation() {
    if (this.animationTimeline) {
      this.animationTimeline.kill();
      this.animationTimeline = null;
    }
  }

  destroy() {
    this.resetAnimation();
  }
}

// Auto-init si existe elemento #blob-cta-button
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('blob-cta-button')) {
      window.blobButton = new BlobButton('blob-cta-button');
    }
  });
} else {
  if (document.getElementById('blob-cta-button')) {
    window.blobButton = new BlobButton('blob-cta-button');
  }
}
