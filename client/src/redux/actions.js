import { GET_ALL_POKEMONS, GET_ALL_TYPES, GET_POKEMON_DETAIL, CLEAN_POKEMON_DETAIL, SEARCH_POKEMON, SORT_POKEMON, FILTER_POKEMON } from "./actionsTypes"
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

export const postPokemon = (input) => {
    return async () => {
        try {
            const { data } = await axios.post(URLPokemon, input);
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export const searchPokemon = (name) => {
    return async (dispatch) => {
        try {
            const response = await axios(`${URLPokemon}/name?name=${name}`);
            const data = response.data;
            dispatch({ type: SEARCH_POKEMON, payload: data });
        } catch (error) {
            window.alert('Pokémon not found');
        }
    }
}

export const sortPokemon = (order) => {
    return { type: SORT_POKEMON, payload: order }
}

export const filterPokemon = (filter) => {
    return { type: FILTER_POKEMON, payload: filter }
}