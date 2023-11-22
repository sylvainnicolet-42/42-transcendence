const routes = {
  '/': 'Homepage',
  '/search-a-game': 'Search a game',
  '/create-a-tournament': 'Create a tournament',
  '/join-a-tournament': 'Join a tournament',
};

function render() {
  const path = window.location.pathname;
  document.getElementById('app').innerHTML = routes[path] || '404 Page Not Found';
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