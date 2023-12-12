import config from '../../config.js';

const ACCOUNT_API = config.BACKEND_API_URL + '/accounts/';

export default class AuthService {

  static async getDetail() {
    return await fetch(ACCOUNT_API + 'detail', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      },
    });
  }

  static async delete() {
    return await fetch(ACCOUNT_API + 'delete', {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      },
    });
  }
}