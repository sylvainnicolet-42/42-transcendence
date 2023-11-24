import config from '../../config.js';

const POKEMON_API = config.POKEMON_API;

export default class PokemonService {
  static async getFirstGeneration() {
    try {
      const response = await fetch(`${POKEMON_API}?limit=151`);

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      throw error;
    }
  }
}