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

  static async update(data) {
    return await fetch(ACCOUNT_API + 'update', {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
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