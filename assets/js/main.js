/* assets/js/main.js */
document.addEventListener('DOMContentLoaded', () => {
  // Toggle menú móvil
  const toggleBtn = document.querySelector('.header__toggle');
  const nav = document.querySelector('.nav');
  toggleBtn.addEventListener('click', () => {
    nav.classList.toggle('nav--hidden');
  });

  // Clic en tarjetas de módulos
  document.querySelectorAll('.modules__card').forEach((card) => {
    card.addEventListener('click', () => {
      const mod = card.dataset.module;
      if (mod) window.loadModule(mod);
    });
  });

  // Animaciones de entrada con GSAP
  gsap.from('.hero__title', { opacity: 0, y: -50, duration: 1 });
  gsap.from('.hero__subtitle', { opacity: 0, y: 50, duration: 1, delay: 0.5 });
  gsap.from('.modules__card', {
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 1,
    stagger: 0.2,
  });

  // Historial back/forward
  window.addEventListener('popstate', (e) => {
    const state = e.state;
    if (state && state.module) {
      window.loadModule(state.module);
    } else {
      window.location.href = 'index.html';
    }
  });
});
