/* assets/js/modules.js */

/**
 * Carga dinámicamente el HTML del módulo indicado,
 * actualiza el TOC y el enlace de historial.
 */
async function loadModule(name) {
  try {
    const resp = await fetch(`modulos/${name}.html`);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const html = await resp.text();
    document.querySelector('main#content').innerHTML = html;
    updateTOC();
    initSectionObserver();
    history.pushState({ module: name }, '', `modulos/${name}.html`);
  } catch (err) {
    console.error('Error cargando módulo:', err);
  }
}

/**
 * Construye dinámicamente el índice con enlaces a cada sección.
 */
function updateTOC() {
  const tocList = document.querySelector('.module-toc ul');
  if (!tocList) return;
  tocList.innerHTML = '';
  document.querySelectorAll('main#content section').forEach((sec) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${sec.id}`;
    a.textContent = sec.querySelector('h2').textContent;
    a.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById(sec.id).scrollIntoView({ behavior: 'smooth' });
    });
    li.appendChild(a);
    tocList.appendChild(li);
  });
}

/**
 * Observa las secciones en viewport y actualiza el TOC y URL.
 */
function initSectionObserver() {
  const options = { root: null, rootMargin: '0px', threshold: 0.5 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const selector = `.module-toc a[href="#${entry.target.id}"]`;
      const link = document.querySelector(selector);
      if (link) link.classList.toggle('active', entry.isIntersecting);
      if (entry.isIntersecting) {
        history.replaceState({}, '', `#${entry.target.id}`);
      }
    });
  }, options);
  document.querySelectorAll('main#content section').forEach((sec) =>
    observer.observe(sec)
  );
}

// Hacemos global la función para poder invocarla desde main.js
window.loadModule = loadModule;
