import './Cards.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { getAllPokemons } from '../../redux/actions';
import Card from '../card/Card';


const Cards = () => {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.allPokemons);

  useEffect(() => {
    dispatch(getAllPokemons());
  }, []);

  return (
    <div className='Cards'>
    <h1>Pokémon First Generation</h1>
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