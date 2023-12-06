import config from '../../config.js';

const TOURNAMENTS_API = config.BACKEND_API_URL + '/tournaments/';

export default class TournamentsService {
  static async getList() {
    try {
      const response = await fetch(TOURNAMENTS_API + 'list/');

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  }
}