import { GET_ALL_POKEMONS, GET_POKEMON_DETAIL } from "./actionsTypes"
import axios from "axios";

const URL = `http://localhost:3001/pokemons`;

export const getAllPokemons = () => {
    return async (dispatch) => {
        try {
            const response = await axios(`${URL}`);
            const data = response.data;
            dispatch({ type: GET_ALL_POKEMONS, payload: data });
        } catch (error) {
            throw new Error(error.message);
        }
    };
}

export const getPokemonDetail = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios(`${URL}/${id}`);
            const data = response.data;
            dispatch({ type: GET_POKEMON_DETAIL, payload: data });
        } catch (error) {
            throw new Error(error.message);
        }
    };
}