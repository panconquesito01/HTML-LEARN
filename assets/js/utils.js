/* assets/js/utils.js */
window.$ = (selector, scope = document) => scope.querySelector(selector);
window.$$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

/**
 * Devuelve una versión “debounce” de la función dada.
 * Útil para limitar la frecuencia de handlers como resize o scroll.
 */
window.debounce = (fn, wait = 100) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), wait);
  };
};

/**
 * Helper para obtener JSON vía fetch.
 */
window.fetchJSON = (url) =>
  fetch(url).then((resp) => {
    if (!resp.ok) throw new Error(`Fetch error ${resp.status}`);
    return resp.json();
  });
