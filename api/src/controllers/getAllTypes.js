const { Type } = require("../db");
const axios = require('axios');
const URL = `http://pokeapi.co/api/v2/type`;

const getAllTypes = async (req, res) => {
  try {
    const response = await axios.get(`${URL}`); // Solicitud a la API para obtener la lista de Types;
    const typesFromAPI = response.data.results.map((result) => result.name);

    const typesFromDB = await Type.findAll(); // `findAll` consulta y recupera datos desde una base de datos local (como base de datos SQL) de acuerdo con los criterios de búsqueda proporcionados;

    if (typesFromDB.length === 0) { // Verificar si la base de datos está vacía;
      await Type.bulkCreate(typesFromAPI.map((name) => ({ name }))); // `bulkCreate` inserta múltiples registros dentro de una base de datos local (como base de datos SQL) de manera útil frente a relaciones many-to-many;
    }

    return res.status(200).json(typesFromDB);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllTypes
};