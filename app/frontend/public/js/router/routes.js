export default {
  '/': {
    view: 'views/homepage.html'
  },
  '#/hello': {
    view: 'views/hello/hello.html',
    script: 'js/views/hello/hello.js',
  },
  '#/player-vs-player': {
    view: 'views/player-vs-player.html',
    script: 'js/views/local-pong.js',
  },
  '#/player-vs-computer': {
    view: 'views/player-vs-computer.html',
    auth: true
  },
  '#/player-vs-online': {
    view: 'views/player-vs-online.html',
    auth: true
  },

  // Tournaments
  '#/tournaments/create': {
    view: 'views/tournaments/create.html',
    script: 'js/views/tournaments/create.js',
    auth: true
  },
  '#/tournaments/edit/:id': {
    view: 'views/tournaments/edit.html',
    script: 'js/views/tournaments/edit.js',
    auth: true
  },
  '#/tournaments/detail/:id': {
    view: 'views/tournaments/detail.html',
    script: 'js/views/tournaments/detail.js',
    auth: true
  },
  '#/tournaments/list': {
    view: 'views/tournaments/list.html',
    script: 'js/views/tournaments/list.js',
    auth: true
  },

  // Ranking
  '#/ranking': {
    view: 'views/ranking/list.html',
    script: 'js/views/ranking/list.js',
    auth: true
  },

  // Chat
  '#/chat': {
    view: 'views/chat/chat.html',
    script: 'js/views/chat/chat.js',
    auth: true
  },

  // Friends
  '#/users/detail/:id': {
    view: 'views/users/detail.html',
    script: 'js/views/users/detail.js',
    auth: true
  },
  '#/users/friends': {
    view: 'views/users/friends.html',
    script: 'js/views/users/friends.js',
    auth: true
  },
  '#/users/search': {
    view: 'views/users/search.html',
    script: 'js/views/users/search.js',
    auth: true
  },
  '#/users/friends/requests': {
    view: 'views/users/requests.html',
    script: 'js/views/users/requests.js',
    auth: true
  },
  '#/users/blocked': {
    view: 'views/users/blocked.html',
    script: 'js/views/users/blocked.js',
    auth: true
  },


  // Authentication
  '#/login': {
    view: 'views/auth/login.html',
    script: 'js/views/auth/login.js',
  },
  '#/register': {
    view: 'views/auth/register.html',
    script: 'js/views/auth/register.js',
  },
  '#/register-success': {
    view: 'views/auth/register-success.html',
  },
  '#/not-authenticated': {
    view: 'views/auth/not-authenticated.html',
  },

  // Profile
  '#/profile/detail': {
    view: 'views/profile/detail.html',
    script: 'js/views/profile/detail.js',
    auth: true
  },
  '#/profile/edit': {
    view: 'views/profile/edit.html',
    script: 'js/views/profile/edit.js',
    auth: true
  },
}