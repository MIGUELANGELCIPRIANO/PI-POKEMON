const { Pokemon, Type } = require("../db");
const axios = require('axios');
const { Op } = require("sequelize");
const URL = `http://pokeapi.co/api/v2/pokemon`;
const getPokemonByName = async (req, res) => {
    try {
        const { name } = req.query;
        const lowercaseName = name.toLowerCase();

        const pokemonsFromDB = await Pokemon.findAll({ // `findAll` consulta y recupera datos desde una base de datos local (como base de datos SQL) de acuerdo con los criterios de búsqueda proporcionados;
            where: {
                name: { [Op.iLike]: `%${lowercaseName}%` }, // `[Op.iLike]` busca registros cuyo campo coincida con el valor proporcionado sin distinción entre mayúsculas o minúsculas;
            },
            include: [ // `include` array de objetos que define las relaciones que se deben incluir en la consulta;
                {
                    model: Type,
                    through: { attributes: [] }, // `through: { attributes: [] }` elimina cualquier atributo adicional de la tabla de unión en relaciones many-to-many; 
                },
            ]
        });

        const allPokemons = [];

        pokemonsFromDB.forEach((pokemon) => {
            const pokemonFromDBFiltered = {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.image,
                hp: pokemon.hp,
                attack: pokemon.attack,
                defense: pokemon.defense,
                types: pokemon.types.map((type) => type.name).join(' / ')
            };
            allPokemons.push(pokemonFromDBFiltered);
        });

        let pokemonFromApi = null;

        try {
            const response = await axios.get(`${URL}/${lowercaseName}`); // Solicitud a la API para obtener el Pokémon por name;

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
        } catch (error) {}

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