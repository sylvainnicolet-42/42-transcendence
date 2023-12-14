import config from '../../config.js';

const USERS_API = config.BACKEND_API_URL + '/users/';

export default class UsersService {

  static async getBlockedUsers() {
    return await fetch(USERS_API + 'block/list', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      },
    });
  }

  static async blockUser(id) {
    return await fetch(USERS_API + 'block/' + id, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      },
    });
  }

  static async unblockUser(id) {
    return await fetch(USERS_API + 'unblock/' + id, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      },
    });
  }
}