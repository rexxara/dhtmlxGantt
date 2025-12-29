/**
 * Vite Vanilla JS dev loader
 */
(() => {
  const origin = '<%- ORIGIN %>';
  const fragment = document.createDocumentFragment();
  const createModuleScriptElement = (src) => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = `${origin}${src}`;
    return script;
  };
  const paths = ['/Forguncy/@vite/client', '/Forguncy/src/<%- MAIN %>'];
  paths.forEach((path) => fragment.appendChild(createModuleScriptElement(path)));
  document.head.appendChild(fragment);
})();
