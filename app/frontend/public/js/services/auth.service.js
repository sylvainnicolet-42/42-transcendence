import config from '../../config.js';

const AUTH_API = config.BACKEND_API_URL + '/auth/';

export default class AuthService {

  static async login(user) {
    try {
      console.log(AUTH_API + 'token/');
      const response = await fetch(AUTH_API + 'token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response}`);
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  }
}