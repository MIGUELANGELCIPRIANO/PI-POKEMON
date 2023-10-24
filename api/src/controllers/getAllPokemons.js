const { Pokemon } = require("../db");
const axios = require ('axios')
const URL = `http://pokeapi.co/api/v2/pokemon`

const getAllPokemons = async (req, res) => {
  try {
    const response = await axios.get(`${URL}?limit=50`);

    if (!response) {
        return res.status(404).send(error.message);
    }
    
    const { results } = response.data;
    
    const allPokemons = await Promise.all(
        results.map(async (pokemon) => {
          const pokemonData = await axios.get(pokemon.url);
  
          return {
            id: pokemonData.data.id,
            name: pokemonData.data.name,
            image: pokemonData.data.sprites.front_default,
            hp: pokemonData.data.stats.find((stat) => stat.stat.name === "hp").base_stat,
            attack: pokemonData.data.stats.find((stat) => stat.stat.name === "attack").base_stat,
            defense: pokemonData.data.stats.find((stat) => stat.stat.name === "defense").base_stat,
          };
        })
      );
      return res.status(200).json(allPokemons);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { 
    getAllPokemons
};