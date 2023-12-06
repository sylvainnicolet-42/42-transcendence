export default {
  '/': {
    view: 'views/homepage.html'
  },
  '#/player-vs-player': {
    view: 'views/player-vs-player.html',
  },
  '#/player-vs-computer': {
    view: 'views/player-vs-computer.html',
  },
  '#/player-vs-online': {
    view: 'views/player-vs-online.html',
  },
  '#/tournaments/create': {
    view: 'views/tournaments/create.html',
  },
  '#/tournaments/list': {
    view: 'views/tournaments/list.html',
    script: 'js/views/tournaments/list.js'
  },
  '#/login': {
    view: 'views/login.html',
  },
  '#/register': {
    view: 'views/register.html',
  },
  '#/profile': {
    view: 'views/auth/profile.html',
  },
  '#/profile/edit': {
    view: 'views/auth/edit-profile.html',
  }
}