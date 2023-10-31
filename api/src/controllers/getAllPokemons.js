const { Pokemon } = require("../db");
const axios = require('axios');
const URL = `http://pokeapi.co/api/v2/pokemon`;

const getAllPokemons = async (req, res) => {
  try {
    const response = await axios.get(`${URL}?limit=151`); // Solicitud a la API para obtener la lista de Pokémons;

    const { results } = response.data;

    const pokemonsFromApi = await Promise.all( // Obtenemos todos los Pokémons de la API con los atributos del modelo;
      results.map(async (pokemon) => {
        const pokemonData = await axios.get(pokemon.url);

        return {
          id: pokemonData.data.id,
          name: pokemonData.data.name,
          image: pokemonData.data.sprites.front_default,
          hp: pokemonData.data.stats.find((stat) => stat.stat.name === "hp").base_stat,
          attack: pokemonData.data.stats.find((stat) => stat.stat.name === "attack").base_stat,
          defense: pokemonData.data.stats.find((stat) => stat.stat.name === "defense").base_stat,
          types: pokemonData.data.types.map((type) => type.type.name).join(" / "),
        };
      })
    );

    const pokemonsFromDB = await Pokemon.findAll(); // Obtenemos todos los Pokémons de la base de datos;

    const allPokemons = [...pokemonsFromDB, ...pokemonsFromApi]; 
    return res.status(200).json(allPokemons); // Retorna la lista de Pokémons de la API y de la base de datos;

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllPokemons
};