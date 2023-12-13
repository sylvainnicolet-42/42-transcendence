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
    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }

    return await fetch(ACCOUNT_API + 'update', {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      },
      body: formData,
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

  static async deleteAvatar() {
    return await fetch(ACCOUNT_API + 'delete-avatar', {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      },
    });
  }
}