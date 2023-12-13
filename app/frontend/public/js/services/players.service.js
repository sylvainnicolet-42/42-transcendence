import config from '../../config.js';

const PLAYERS_API = config.BACKEND_API_URL + '/players/';

export default class PlayersService {

  static async getList() {
    return await fetch(PLAYERS_API + 'list', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      },
    });
  }
}