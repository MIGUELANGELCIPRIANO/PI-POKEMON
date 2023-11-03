import { GET_ALL_POKEMONS, GET_POKEMON_DETAIL, CLEAN_POKEMON_DETAIL, GET_ALL_TYPES } from "./actionsTypes.js"


const initialState = {
    allPokemons: [],
    pokemonDetail: {},
    allTypes: []
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_POKEMONS:
            return {
                ...state,
                allPokemons: action.payload
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
        case GET_ALL_TYPES:
            return {
                ...state,
                allTypes: action.payload
            }
        default:
            return {...state}
    }
}

export default reducer; 