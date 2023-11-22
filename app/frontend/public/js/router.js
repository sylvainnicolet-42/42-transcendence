const routes = {
  '/': 'views/homepage.html',
  '#/play': 'views/play.html',
  '#/play-online': 'views/play-online.html',
  '#/create-a-tournament': 'views/create-a-tournament.html',
};

function render() {
  const path = window.location.hash || '/';
  const route = routes[path];

  if (route) {
    fetch(route)
      .then(response => response.text())
      .then(html => {
        document.getElementById('app').innerHTML = html;
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