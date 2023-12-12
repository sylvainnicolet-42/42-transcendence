import config from '../../config.js';

const HELLO_API = config.BACKEND_API_URL + '/hello';

export default class AuthService {

  static async hello() {
    return await fetch(HELLO_API, {
      method: 'GET',
    });
  }
}