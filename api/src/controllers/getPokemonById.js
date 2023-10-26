// const { Pokemon } = require("../db");
const axios = require('axios')
const URL = `http://pokeapi.co/api/v2/pokemon`

const getPokemonById = async (req, res) => {
    try {
        const { id } = req.params;

        // const pokemonFromDB = await Pokemon.findOne({ // Buscamos el Pokémon en la base de datos;
        //     where: { id: id },
        // });

        // if (pokemonFromDB) {
        //     return res.status(200).json(pokemonFromDB);
        // }

        const response = await axios.get(`${URL}/${id}`);
        const pokemonData = response.data;

            const pokemonFromApi = {
                id: pokemonData.id,
                name: pokemonData.name,
                image: pokemonData.sprites.front_default,
                hp: pokemonData.stats.find((stat) => stat.stat.name === "hp").base_stat,
                attack: pokemonData.stats.find((stat) => stat.stat.name === "attack").base_stat,
                defense: pokemonData.stats.find((stat) => stat.stat.name === "defense").base_stat,
                types: pokemonData.types.map((type) => type.type.name),
            };
            return res.status(200).json(pokemonFromApi);
    } catch (error) {
        return res.status(404).json({ message: "Pokemon no encontrado" });
    }
}

module.exports = {
    getPokemonById
};