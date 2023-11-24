import PokemonService from "../services/pokemon.service.js";

async function loadAndDisplayPokemons() {
  try {
    const pokemons = await PokemonService.getFirstGeneration();
    const container = document.getElementById('pokemons_container');
    const ol = document.createElement('ol');
    container.appendChild(ol);

    pokemons.forEach(pokemon => {
      const li = document.createElement('li');
      li.textContent = pokemon.name;
      ol.appendChild(li);
    });
  } catch (error) {
    console.error('Error while loading pokemons:', error);
  }
}

loadAndDisplayPokemons().then(() => console.log('Pokemons loaded!'));