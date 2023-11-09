const axios = require('axios');

const { Pokemon, Type } = require('../db');

const postPokemon = async (req, res) => {
  try {
    const { name, image, hp, attack, defense, types } = req.body;

    if (!name || !image || !hp || !attack || !defense || !types) {
      return res.status(400).json({ message: "Insufficient data or types" });
    }

    const typesArray = types.split(" / ").map((type) => type.trim()); // Convertir los Types en un array si se proporcionan como una cadena de texto eliminando espacios;

    const pokemonApi = `https://pokeapi.co/api/v2/pokemon/${name}`; // Verificar si ya existe un Pokémon con el mismo nombre en la API;

    try {
      const response = await axios.get(pokemonApi);
      if (response.status === 200) {
        return res.status(400).json({ message: "The Pokémon's name already exists" });
      }
    } catch (error) {
      if (error.response && error.response.status === 404) { // Continuar con la verificación en la base de datos;
      } else {
        throw error;
      }
    }

    const pokemonDB = await Pokemon.findOne({ // Verificar si ya existe un Pokémon con el mismo nombre en la base de datos;
      where: {
        name: name,
      },
    });

    if (pokemonDB) {
      return res.status(400).json({ message: "The Pokémon's name already exists" });
    }

    const newPokemon = await Pokemon.create({ // `create` inserta un nuevo registro dentro de una base de datos local (como base de datos SQL);
      name,
      image,
      hp: parseInt(hp),
      attack: parseInt(attack),
      defense: parseInt(defense),
    });

    const typeRecords = await Type.findAll({ // Verificar si existen los Types en la base de datos;
      where: {
        name: typesArray,
      },
    });

    if (typeRecords.length === typesArray.length) { 
      await newPokemon.setTypes(typeRecords); // Relacionar los Types encontrados con el nuevo Pokémon;

      const pokemonWithTypes = await Pokemon.findOne({ 
        where: { id: newPokemon.id },
        include: [
          {
            model: Type,
            through: { attributes: [] },
          },
        ],
      });

      return res.status(200).json({
        id: pokemonWithTypes.id,
        name: pokemonWithTypes.name,
        image: pokemonWithTypes.image,
        hp: pokemonWithTypes.hp,
        attack: pokemonWithTypes.attack,
        defense: pokemonWithTypes.defense,
        types: pokemonWithTypes.types.map((type) => type.name).join(" / "),
      });
    }
    return res.status(400).json({ message: "One of the specified types does not exist"  });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  postPokemon,
};
