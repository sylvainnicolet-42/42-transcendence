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
    script: 'js/views/tournaments/create.js'
  },
  '#/tournaments/edit/:id': {
    view: 'views/tournaments/edit.html',
    script: 'js/views/tournaments/edit.js'
  },
  '#/tournaments/detail/:id': {
    view: 'views/tournaments/detail.html',
    script: 'js/views/tournaments/detail.js'
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
  },
  '#/chat': {
    view: 'views/chat.html',
    script: 'js/views/chat/chat.js',
  },
}
