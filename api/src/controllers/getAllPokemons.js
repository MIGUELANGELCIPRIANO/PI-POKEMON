const { Pokemon, Type } = require("../db");
const axios = require('axios');
const URL = `http://pokeapi.co/api/v2/pokemon`;

const pokemonData = async (pokemon) => {
  try {
    const response = await axios.get(pokemon.url); // Solicitud a la API para obtener los atributos solicitados para Pokémon; 
    return {
      id: response.data.id,
      name: response.data.name,
      image: response.data.sprites.front_default,
      hp: response.data.stats.find((stat) => stat.stat.name === "hp").base_stat,
      attack: response.data.stats.find((stat) => stat.stat.name === "attack").base_stat,
      defense: response.data.stats.find((stat) => stat.stat.name === "defense").base_stat,
      types: response.data.types.map((type) => type.type.name).join(" / "),
    };
  } catch (error) {
    return res.status(404).json({ message: "Pokémon data retrieval error" });
  }
};

const getAllPokemons = async (req, res) => {
  try {
    const response = await axios.get(`${URL}?limit=151`); // Solicitud a la API para obtener la lista de Pokémons;
    const { results } = response.data;

    const pokemonsFromApi = await Promise.all(results.map(pokemonData)); // `Promise.all` realiza múltiples solicitudes a la API de forma concurrente;

    const pokemonsFromDB = await Pokemon.findAll({ // `findAll` consulta y recupera datos desde una base de datos local (como base de datos SQL) de acuerdo con los criterios de búsqueda proporcionados;
      attributes: ["id", "name", "image", "hp", "attack", "defense"],
      include: [ // `include` array de objetos que define las relaciones que se deben incluir en la consulta;
        {
          model: Type, 
          attributes: ["name"],
          through: { attributes: [] } // `through: { attributes: [] }` elimina cualquier atributo adicional de la tabla de unión en relaciones many-to-many; 
        },
      ],
    });

    const pokemonsFromDBFiltered = pokemonsFromDB.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.image,
      hp: pokemon.hp,
      attack: pokemon.attack,
      defense: pokemon.defense,
      types: pokemon.types.map((type) => type.name).join(" / "),
    }));

    const allPokemons = [...pokemonsFromDBFiltered, ...pokemonsFromApi];

    return res.status(200).json(allPokemons);
    
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllPokemons,
};