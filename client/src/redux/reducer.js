import { GET_ALL_POKEMONS, GET_POKEMON_DETAIL, CLEAN_POKEMON_DETAIL, } from "./actionsTypes.js"


const initialState = {
    allPokemons: [],
    pokemonDetail: {}
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_POKEMONS:
            return {
                ...state,
                allPokemons: action.payload // Actualización del initialState a partir del action type;
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
        default:
            return {...state}
    }
}

export default reducer; 