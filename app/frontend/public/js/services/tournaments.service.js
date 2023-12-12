import config from '../../config.js';

const TOURNAMENTS_API = config.BACKEND_API_URL + '/tournaments/';

export default class TournamentsService {

  static async create(tournament) {
    return await fetch(TOURNAMENTS_API + 'create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      },
      body: JSON.stringify(tournament),
    });
  }

  static async update(id, tournament) {
    return await fetch(TOURNAMENTS_API + 'update/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      },
      body: JSON.stringify(tournament),
    });
  }

  static async getDetail(id) {
    return await fetch(TOURNAMENTS_API + 'detail/' + id, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      },
    });
  }

  static async delete(id) {
    return await fetch(TOURNAMENTS_API + 'delete/' + id, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      },
    });
  }

  static async getList() {
    return await fetch(TOURNAMENTS_API + 'list', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      },
    });
  }
}