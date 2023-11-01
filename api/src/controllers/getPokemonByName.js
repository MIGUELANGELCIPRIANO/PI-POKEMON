const { Pokemon, Type } = require("../db");
const axios = require('axios');
const { Op } = require("sequelize");
const URL = `http://pokeapi.co/api/v2/pokemon`;

const getPokemonByName = async (req, res) => {
    try {
        const { name } = req.query;
        const lowercaseName = name.toLowerCase();

        const pokemonsFromDB = await Pokemon.findAll({ // Verificar si existe el Pokémon en la base de datos;
            where: {
                name: { [Op.iLike]: `%${lowercaseName}%` }, // `[Op.iLike]` busca registros cuyo campo coincida con el valor proporcionado sin distinción entre mayúsculas o minúsculas;
            },
            include: [ // Incluir los types asociados al Pokémon que coincide con el criterio de búsqueda;
                {
                  model: Type,
                  through: { attributes: [] }, // `through` hace referencia a la tabla de relación y `{ attributes: [] }` evita traer atributos adicionales de dicha tabla;
                },
            ]
        });

        const pokemonsFromApi = [];
        try {
            const response = await axios.get(`${URL}/${lowercaseName}`); // Solicitud a la API para obtener el Pokémon por name;

            if (response.data) {
                const pokemonData = response.data;

                const pokemonFound = {
                    id: pokemonData.id,
                    name: pokemonData.name,
                    image: pokemonData.sprites.front_default,
                    hp: pokemonData.stats.find((stat) => stat.stat.name === "hp").base_stat,
                    attack: pokemonData.stats.find((stat) => stat.stat.name === "attack").base_stat,
                    defense: pokemonData.stats.find((stat) => stat.stat.name === "defense").base_stat,
                    types: pokemonData.types.map((type) => type.type.name).join(" / "),
                };
                pokemonsFromApi.push(pokemonFound);
            }
        } catch (error) { }

        const allPokemons = [...pokemonsFromDB, ...pokemonsFromApi]; 

        if (allPokemons.length === 0) {
            return res.status(404).json({ message: "Pokémon not found" });
        }
        return res.status(200).json(allPokemons); // Retorna la lista de Pokémons de la API y de la base de datos que coincidan con name;

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getPokemonByName
};