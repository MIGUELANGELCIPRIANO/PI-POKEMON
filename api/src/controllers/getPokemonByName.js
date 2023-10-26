// const { Pokemon } = require("../db");
const axios = require('axios')
const URL = `http://pokeapi.co/api/v2/pokemon`

const getPokemonByName = async (req, res) => {
    try {
        const { name } = req.query;
        const lowercaseName = name.toLowerCase();
        const response = await axios.get(`${URL}/${lowercaseName}`);

        const pokemonData = response.data;
            
            const pokemonByName = {
                id: pokemonData.id,
                name: pokemonData.name,
                image: pokemonData.sprites.front_default,
                hp: pokemonData.stats.find((stat) => stat.stat.name === "hp").base_stat,
                attack: pokemonData.stats.find((stat) => stat.stat.name === "attack").base_stat,
                defense: pokemonData.stats.find((stat) => stat.stat.name === "defense").base_stat,
                types: pokemonData.types.map((type) => type.type.name),
            };
            return res.status(200).json(pokemonByName);
        } catch (error) {
        return res.status(404).json({ message: "Pokemon no encontrado" });
    }
}

module.exports = {
    getPokemonByName
};