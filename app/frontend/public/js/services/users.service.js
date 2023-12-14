import config from '../../config.js';

const USERS_API = config.BACKEND_API_URL + '/users/';

export default class UsersService {

  static async getList() {
    return await fetch(USERS_API + 'list', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      },
    });
  }

  static async getDetail(id) {
    return await fetch(USERS_API + 'detail/' + id, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      },
    });
  }

  static async doFriendRequest(id) {
    return await fetch(USERS_API + 'friend-requests/' + id, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      },
    });
  }

  static async getFriendRequestsSent() {
    return await fetch(USERS_API + 'friend-requests/sent', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      },
    });
  }

  static async getFriendRequestsReceived() {
    return await fetch(USERS_API + 'friend-requests/received', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      },
    });
  }

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

  static async isBlocked(id) {
    const response = await this.getBlockedUsers();
    if (!response.ok) {
      return response;
    }
    const blockedUsers = await response.json();

    id = parseInt(id);
    const test = blockedUsers.some(user => user.id === id);
    console.log(test);
    return test;
  }
}