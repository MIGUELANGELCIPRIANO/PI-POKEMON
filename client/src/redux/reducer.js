import { GET_ALL_POKEMONS, GET_ALL_TYPES, GET_POKEMON_DETAIL, CLEAN_POKEMON_DETAIL, SEARCH_POKEMON, SORT_POKEMON, FILTER_POKEMON } from "./actionsTypes.js"


const initialState = {
    allPokemons: [],
    allPokemonsBackup: [],
    pokemonDetail: {},
    allTypes: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POKEMONS:
            return {
                ...state,
                allPokemons: action.payload,
                allPokemonsBackup: action.payload,
                pokemonOrder: action.payload
            }
        case GET_ALL_TYPES:
            return {
                ...state,
                allTypes: action.payload
            }
        case GET_POKEMON_DETAIL:
            return {
                ...state,
                pokemonDetail: action.payload
            }
        case CLEAN_POKEMON_DETAIL:
            return {
                ...state,
                pokemonDetail: {}
            }
        case SEARCH_POKEMON:
            return {
                ...state,
                allPokemons: action.payload
            }
        case SORT_POKEMON:
            return {
                ...state,
                allPokemons: action.payload === 'Pokédex'
                    ? state.allPokemonsBackup
                    : action.payload === 'A'
                        ? [...state.allPokemons].sort((pokemonA, pokemonB) => pokemonA.name.localeCompare(pokemonB.name))
                        : action.payload === 'Z'
                            ? [...state.allPokemons].sort((pokemonA, pokemonB) => pokemonB.name.localeCompare(pokemonA.name))
                            : action.payload === 'Highest'
                                ? [...state.allPokemons].sort((pokemonA, pokemonB) => pokemonB.attack - pokemonA.attack)
                                : action.payload === 'Lowest'
                                    ? [...state.allPokemons].sort((pokemonA, pokemonB) => pokemonA.attack - pokemonB.attack)
                                    : state.allPokemonsBackup
            }
        case FILTER_POKEMON:
            return {
                ...state,
                allPokemons: action.payload === 'API'
                    ? state.allPokemonsBackup.filter((pokemon) => !isNaN(pokemon.id))
                    : action.payload === 'DB'
                        ? state.allPokemonsBackup.filter((pokemon) => isNaN(pokemon.id))
                        : action.payload !== 'AllTypes'
                            ? state.allPokemonsBackup.filter((pokemon) => pokemon.types.includes(action.payload))
                            : state.allPokemonsBackup
            }
        default:
            return { ...state }
    }
}

export default reducer; 