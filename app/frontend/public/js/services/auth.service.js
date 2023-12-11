import config from '../../config.js';

const AUTH_API = config.BACKEND_API_URL + '/auth/';

export default class AuthService {

  static async register(user) {
    return await fetch(AUTH_API + 'register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
  }

  static async login(user) {
    return await fetch(AUTH_API + 'token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
  }

  static async verifyToken(token) {
    return await fetch(AUTH_API + 'token/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });
  }
}