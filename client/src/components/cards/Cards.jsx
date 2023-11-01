import './Cards.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { getAllPokemons } from '../../redux/actions';
import Card from '../card/Card';


const Cards = () => {
  const dispatch = useDispatch();
  const { allPokemons } = useSelector((state) => state); // Solicitud al reducer para obtener la propiedad allPokemons del state;

  useEffect(() => {
    dispatch(getAllPokemons()); // Se monta el componente realizando un dispatch a la action;
  }, []);

  return (
    <div className='Cards'>
      {
        allPokemons?.map((pokemon) => {
          return(
          <Card
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.image}
            types={pokemon.types}
          />)
        })
      }
    </div>
  );
}

export default Cards;