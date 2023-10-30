const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getAllPokemons } = require('../controllers/getAllPokemons');
const { getPokemonById } = require('../controllers/getPokemonById');
const { getPokemonByName } = require('../controllers/getPokemonByName');
const { postPokemon } = require('../controllers/postPokemon');
const { getAllTypes } = require('../controllers/getAllTypes');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/pokemons/name', getPokemonByName);

router.get('/pokemons/:id', getPokemonById);

router.post('/pokemons', postPokemon);

router.get('/pokemons', getAllPokemons); 

router.get('/types', getAllTypes);

module.exports = router;