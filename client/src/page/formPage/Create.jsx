import './Create.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import validations from './validations';
import { getAllTypes } from '../../redux/actions';
import Button from '../../components/button/Button';

const Create = () => {
  const [input, setInput] = useState({ // Rastrear los valores ingresados por campo;
    name: '',
    image: '',
    hp: '',
    attack: '',
    defense: '',
    types: '',
  });

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const allTypes = useSelector((state) => state.allTypes); // Obtener los types de estado;

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'types') {
      setInput({
        ...input,
        types: [... input.types, value]
      })
      return
    }
    setInput({
      ...input,
      [name]: value,
    });
    setErrors(validations(input));
  }
 console.log(input);

    useEffect(() => { // Cargar los types cuando se monta el componente;
      dispatch(getAllTypes());
    }, []);

    const handleSubmit = (event) => {
      event.preventDefault();
      // dispatch(createPokemon(input));
    }

    return (
      <form onSubmit={handleSubmit}>
        <h1>Create your Pokémon!</h1>

        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="name"
          value={input.name}
          onBlur={handleChange}
          onChange={handleChange}
        />
        {errors.name && <p>{errors.name}</p>}
        <br />

        <label htmlFor="image">Image URL: </label>
        <input
          type="text"
          name="image"
          value={input.image}
          onBlur={handleChange}
          onChange={handleChange}
        />
        {errors.image && <p>{errors.image}</p>}
        <br />

        <label htmlFor="hp">HP: </label>
        <input
          type="number"
          name="hp"
          value={input.hp}
          onChange={handleChange}
        />
        {errors.hp && <p>{errors.hp}</p>}
        <br />

        <label htmlFor="attack">Attack: </label>
        <input
          type="number"
          name="attack"
          value={input.attack}
          onBlur={handleChange}
          onChange={handleChange}
        />
        {errors.attack && <p>{errors.attack}</p>}
        <br />

        <label htmlFor="defense">Defense: </label>
        <input
          type="number"
          name="defense"
          value={input.defense}
          onBlur={handleChange}
          onChange={handleChange}
        />
        {errors.defense && <p>{errors.defense}</p>}
        <br />

        <label htmlFor="types">Types: </label>
        <select
          name="types"
          value={input.types}
          onBlur={handleChange}
          onChange={handleChange}
        >
          <option value=""></option>
          {allTypes.map((type) => (
            <option key={type.id} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>

        {errors.types && <p>{errors.types}</p>}
        <br />

        <Button type='submit' path='/home' text="Create Pokémon"></Button>
      </form>
    );
}

export default Create