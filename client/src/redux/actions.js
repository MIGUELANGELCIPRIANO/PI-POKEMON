import { GET_ALL_POKEMONS, GET_POKEMON_DETAIL, CLEAN_POKEMON_DETAIL, GET_ALL_TYPES } from "./actionsTypes"
import axios from "axios";

const URLPokemon = `http://localhost:3001/pokemons`;
const URLTypes = `http://localhost:3001/types`;

export const getAllPokemons = () => {
    return async (dispatch) => {
        try {
            const response = await axios(`${URLPokemon}`);
            const data = response.data;
            dispatch({ type: GET_ALL_POKEMONS, payload: data });
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export const getPokemonDetail = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios(`${URLPokemon}/${id}`);
            const data = response.data;
            dispatch({ type: GET_POKEMON_DETAIL, payload: data });
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export const cleanPokemonDetail = () => {
    return { type: CLEAN_POKEMON_DETAIL }
}

export const getAllTypes = () => {
    return async (dispatch) => {
        try {
            const response = await axios(`${URLTypes}`);
            const data = response.data;
            dispatch({ type: GET_ALL_TYPES, payload: data });
        } catch (error) {
            throw new Error(error.message);
        }
    }
}