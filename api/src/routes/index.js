const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getAllPokemons } = require('../controllers/getAllPokemons');
// const { getPokemonById } = require('../controllers/getPokemonById');
// const { getPokemonByName } = require('../controllers/getPokemonByName');
// const { postPokemon } = require('../controllers/postPokemon');
// const { getAllTypes } = require('../controllers/getAllTypes');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/pokemon', getAllPokemons); 

// router.get('pokemon/:id', getPokemonById);

// router.get('pokemon/:name', getPokemonByName);

// router.post('pokemon', postPokemon);

// router.get('type', getAllTypes);

module.exports = router;