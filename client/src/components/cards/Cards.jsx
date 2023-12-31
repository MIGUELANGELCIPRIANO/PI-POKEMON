import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPokemons, getAllTypes, sortPokemon, filterPokemon } from '../../redux/actions';
import Pagination from '../../page/pagination/Pagination';
import Card from '../card/Card';
import styles from './Cards.module.css';


const Cards = ({ currentPage, setCurrentPage }) => {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.allPokemons);
  const allTypes = useSelector((state) => state.allTypes);

  const pokemonsPerPage = 12;

  const indexOfLastPokemons = currentPage * pokemonsPerPage;
  const indexOfFirstPokemons = indexOfLastPokemons - pokemonsPerPage;
  const currentPokemons = allPokemons ? allPokemons.slice(indexOfFirstPokemons, indexOfLastPokemons) : [];

  const paginate = (pageNumber) => { setCurrentPage(pageNumber) };

  useEffect(() => {
    setCurrentPage(1);
  }, [allPokemons]);

  useEffect(() => {
    dispatch(getAllPokemons());
    dispatch(getAllTypes());
  }, []);

  const handleOrder = (event) => {
    dispatch(sortPokemon(event.target.value));
  }

  const handleFilter = (event) => {
    dispatch(filterPokemon(event.target.value));
  }

  return (
    <div className='Cards'>


      {allPokemons.length > 0 ? <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(allPokemons.length / pokemonsPerPage)}
        onPageChange={paginate}
      /> : null}


      <select onChange={handleOrder}>
        <option value='Pokédex'>Pokédex</option>
        <option value='A'>A-Z</option>
        <option value='Z'>Z-A</option>
        <option value='Highest'>Highest attack</option>
        <option value='Lowest'>Lowest Attack</option>
      </select>


      <select onChange={handleFilter}>
        <option value='AllTypes'>All Types</option>
        <option value='API'>Originals</option>
        <option value='DB'>Created</option>
        {
          allTypes?.map((type) => {
            return (
              <option key={type.name} value={type.name}>{type.name}</option>
            )
          })
        }
      </select>


      <h1>Pokémon First Generation</h1>
      <div className={styles.cardsContainer}>
      {
        currentPokemons?.map((pokemon) => {
          return (
              <Card
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.image}
                types={pokemon.types.split().map((type, index) => (
                  <span key={index}>{type}</span>
                ))}
              />
              )
            })
          }
          </div>
    </div>
  );
}

export default Cards;