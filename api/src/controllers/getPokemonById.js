const { Pokemon, Type } = require("../db");
const axios = require('axios');
const URL = `http://pokeapi.co/api/v2/pokemon`;

const getPokemonById = async (req, res) => {
    try {
        const { id } = req.params; 

        if (id.length > 4) { // Verificar si el id proporcionado correponde a una `versión 4 de identificador único universal` (UUIDV4);
            const pokemonFromDB = await Pokemon.findOne({ // `findOne` consulta y recupera un solo registro desde una base de datos local (como base de datos SQL) de acuerdo al criterio de búsqueda proporcionado en el objeto `where`;
                where: { id: id },
                include: [ // `include` array de objetos que define las relaciones que se deben incluir en la consulta;
                    {
                      model: Type,
                      through: { attributes: [] }, // `through: { attributes: [] }` elimina cualquier atributo adicional de la tabla de unión en relaciones many-to-many; 
                    },
                  ],
            });
            if (pokemonFromDB) {
                const pokemonFromDBFiltered = {
                    id: pokemonFromDB.id,
                    name: pokemonFromDB.name,
                    image: pokemonFromDB.image,
                    hp: pokemonFromDB.hp,
                    attack: pokemonFromDB.attack,
                    defense: pokemonFromDB.defense,
                    types: pokemonFromDB.types.map((type)=>type.name).join(" / ")
                };
                return res.status(200).json(pokemonFromDBFiltered);
            }  
        };

        const response = await axios.get(`${URL}/${id}`); // Solicitud a la API para obtener el Pokémon por id;

        if (response.data) {
            const pokemonData = response.data;

            const pokemonFromApi = {
                id: pokemonData.id,
                name: pokemonData.name,
                image: pokemonData.sprites.front_default,
                hp: pokemonData.stats.find((stat) => stat.stat.name === "hp").base_stat,
                attack: pokemonData.stats.find((stat) => stat.stat.name === "attack").base_stat,
                defense: pokemonData.stats.find((stat) => stat.stat.name === "defense").base_stat,
                types: pokemonData.types.map((type) => type.type.name).join(" / "),
            };
            return res.status(200).json(pokemonFromApi);
        }
        return res.status(404).json({ message: "Pokémon not found" });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getPokemonById
};