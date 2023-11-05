const { Pokemon, Type } = require("../db");
const axios = require('axios');
const { Op } = require("sequelize");
const URL = `http://pokeapi.co/api/v2/pokemon`;

const getPokemonByName = async (req, res) => {
    try {
        const { name } = req.query;
        const lowercaseName = name.toLowerCase();

        const pokemonsFromDB = await Pokemon.findAll({
            where: {
                name: { [Op.iLike]: `%${lowercaseName}%` },
            },
            include: [
                {
                  model: Type,
                  through: { attributes: [] },
                },
            ]
        });

        const allPokemons = [];

        pokemonsFromDB.forEach((dbPokemon) => {
            const pokemonFromDBFiltered = {
                id: dbPokemon.id,
                name: dbPokemon.name,
                image: dbPokemon.image,
                hp: dbPokemon.hp,
                attack: dbPokemon.attack,
                defense: dbPokemon.defense,
                types: dbPokemon.types.map((type) => type.name).join(' / ')
            };
            allPokemons.push(pokemonFromDBFiltered);
        });

        let pokemonFromApi = null;

        const response = await axios.get(`${URL}/${lowercaseName}`);

        if (response.data) {
            const pokemonData = response.data;

            pokemonFromApi = {
                id: pokemonData.id,
                name: pokemonData.name,
                image: pokemonData.sprites.front_default,
                hp: pokemonData.stats.find((stat) => stat.stat.name === "hp").base_stat,
                attack: pokemonData.stats.find((stat) => stat.stat.name === "attack").base_stat,
                defense: pokemonData.stats.find((stat) => stat.stat.name === "defense").base_stat,
                types: pokemonData.types.map((type) => type.type.name).join(" / "),
            };
        }

        if (pokemonFromApi) {
            allPokemons.push(pokemonFromApi);
        }

        if (allPokemons.length === 0) {
            return res.status(404).json({ message: "Pokémon not found" });
        }
        return res.status(200).json(allPokemons);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getPokemonByName
};