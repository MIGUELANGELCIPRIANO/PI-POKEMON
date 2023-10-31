const { Pokemon, Type } = require('../db');

const postPokemon = async (req, res) => {
  try {
    const { name, image, hp, attack, defense, types } = req.body;

    if (!name || !image || !hp || !attack || !defense || !types ) {
      return res.status(404).json({ message: "Insufficient data or types" });
    }

    const newPokemon = await Pokemon.create({ // Crear el Pokémon en la base de datos;
      name,
      image,
      hp: parseInt(hp),
      attack: parseInt(attack),
      defense: parseInt(defense)
    });

    const typeRecords = await Type.findAll({ // Verificar si existen los Types en la base de datos;
      where: {
        name: types
      },
    });

    if (typeRecords.length === types.length) { // Verificar si los Types encontrados coinciden con types;

      await newPokemon.setTypes(typeRecords); // Relacionar los Types encontrados con el nuevo Pokémon;

      return res.status(200).json(newPokemon); // Retorna el Pokémon creado de la base de datos;
    }
    return res.status(404).json({ message: "One of the specified types does not exist" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  postPokemon,
}