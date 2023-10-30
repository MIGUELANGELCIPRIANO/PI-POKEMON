const { Type } = require("../db");
const axios = require('axios');
const URL = `http://pokeapi.co/api/v2/type`;

const getAllTypes = async (req, res) => {
  try {
    const response = await axios.get(`${URL}`); // Solicitud a la API para obtener la lista de Types;
    const typesFromAPI = response.data.results.map((result) => result.name);

    const typesFromDB = await Type.findAll(); 

    if (typesFromDB.length === 0) { // Verificar si la base de datos está vacía;
      await Type.bulkCreate(typesFromAPI.map((name) => ({ name }))); // Inserta los Types de la API en la base de datos;
    }

    return res.status(200).json(typesFromDB); // Retorna la lista de Types de la base de datos;
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllTypes
};