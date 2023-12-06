import routes from './routes.js';
import { setRouteParams } from './routeParams.js';
import { isAuthenticated } from "../security/auth.js";

function render() {
  const path = window.location.hash || '/';
  let route = routes[path];

  // Check if the route is dynamic
  if (route === undefined) {
    const routeParts = path.split('/');

    // Get base route removing last part, join with /m add :id at the end
    const baseRoute = routeParts.slice(0, -1).join('/') + '/:id';

    // Check if the base route exists
    if (routes[baseRoute]) {
      route = routes[baseRoute];
      setRouteParams({ id: routeParts[routeParts.length - 1] });
    }
  }

  if (route) {

    // Check authentication
    if (route.auth && !isAuthenticated()) {
      window.location.hash = '#/not-authenticated';
      return;
    }

    fetch(route.view)
      .then(response => response.text())
      .then(html => {
        document.getElementById('app').innerHTML = html;
        if (route.script) {
          // Remove the previous script
          const oldScript = document.querySelector('script[data-script="route-script"]');
          if (oldScript) {
            oldScript.remove();
          }
          // Add the new script
          const script = document.createElement('script');
          script.type = 'module';
          script.dataset.script = 'route-script';
          script.src = `${route.script}?ts=${new Date().getTime()}`;
          document.head.appendChild(script);
        }
      });
  } else {
    document.getElementById('app').innerHTML = '404 Page Not Found';
  }
}

function initRouter() {
  window.addEventListener('hashchange', render); // Render the page when the hash changes

  document.body.addEventListener('click', e => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault(); // Prevent browser from following the link
      window.location.hash = e.target.getAttribute('href').substring(1); // Remove the # character
    }
  });

  render();
}

export { initRouter };