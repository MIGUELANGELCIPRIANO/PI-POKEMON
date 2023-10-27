const { Pokemon, Type } = require('../db');
const axios = require('axios')
const URL = `http://pokeapi.co/api/v2/pokemon`


const postPokemon = async (req, res) => {
  try {
    const { name, hp, attack, defense, types } = req.body;

    if (!name || !hp || !attack || !defense || !types ) {
      return res.status(400).json({ message: "Faltan datos o tipos insuficientes" });
    }

    const newPokemon = await Pokemon.create({ // Crear el Pokémon en la base de datos;
      name,
      hp: parseInt(hp),
      attack: parseInt(attack),
      defense: parseInt(defense),
    });

    // const typeRecords = await Type.findAll({ // Buscar y relacionar los tipos con el Pokémon;
    //   where: {
    //     name: types,
    //   },
    // });

    // if (typeRecords.length === types.length) {

    //   await newPokemon.setTypes(typeRecords); // Relacionar los tipos encontrados con el nuevo Pokémon;

      return res.status(201).json(newPokemon);
    // }
    // return res.status(400).json({ message: "Alguno de los tipos especificados no existe" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  postPokemon,
}