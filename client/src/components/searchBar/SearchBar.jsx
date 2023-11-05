import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchPokemon } from '../../redux/actions';

const SearchBar = () => {
   const dispatch = useDispatch();
   const [name, setName] = useState('');

   const handleChange = (event) => {
      setName(event.target.value);
   }

   return (
      <div>
         <input onChange={handleChange} type='search' value={name}/>
         <button onClick={() => dispatch(searchPokemon(name))}>Search</button>
      </div>
   );
}

export default SearchBar;