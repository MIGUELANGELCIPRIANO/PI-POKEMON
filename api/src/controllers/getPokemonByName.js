const { Pokemon } = require("../db");
const axios = require('axios');
const { Op } = require("sequelize");
const URL = `http://pokeapi.co/api/v2/pokemon`;

const getPokemonByName = async (req, res) => {
    try {
        const { name } = req.query;
        const lowercaseName = name.toLowerCase();

        const pokemonsFromDB = await Pokemon.findAll({ // Buscamos el Pokémon en la base de datos;
            where: {
                name: {
                    [Op.iLike]: `%${lowercaseName}%`
                    // [Op.iLike] busca registros cuyo campo coincida con el valor proporcionado sin distinción entre mayúsculas o minúsculas;
                }
            }
        });

        const pokemonsFromApi = []; // Buscamos el Pokémon en la API;
        try {
            const response = await axios.get(`${URL}/${lowercaseName}`);

            if (response.data) {
                const pokemonData = response.data;

                const pokemonFound = {
                    id: pokemonData.id,
                    name: pokemonData.name,
                    image: pokemonData.sprites.front_default,
                    hp: pokemonData.stats.find((stat) => stat.stat.name === "hp").base_stat,
                    attack: pokemonData.stats.find((stat) => stat.stat.name === "attack").base_stat,
                    defense: pokemonData.stats.find((stat) => stat.stat.name === "defense").base_stat,
                    types: pokemonData.types.map((type) => type.type.name),
                };
                pokemonsFromApi.push(pokemonFound);
            }
        } catch (error) { }

        const allPokemons = [...pokemonsFromDB, ...pokemonsFromApi];

        if (allPokemons.length === 0) {
            return res.status(404).json({ message: "Pokemon Not Found" });
        }
        return res.status(200).json(allPokemons);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getPokemonByName
};