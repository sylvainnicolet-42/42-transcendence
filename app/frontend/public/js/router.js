const routes = {
  '/': 'views/homepage.html',
  '/play': 'views/play.html',
  '/play-online': 'views/play-online.html',
  '/create-a-tournament': 'views/create-a-tournament.html',
};

function render() {
  const path = window.location.pathname;
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

  window.addEventListener('popstate', render); // Handle back,forward button

  // Wait for DOM content to load
  document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', e => {
      if (e.target.matches('[data-link]')) {
        e.preventDefault(); // Prevent browser from following the link
        history.pushState(null, '', e.target.href); // Change the URL without refreshing the page
        render();
      }
    });

    render();
  });
}

export { initRouter };