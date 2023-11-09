import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import validations from './validations';
import { getAllTypes, postPokemon } from '../../redux/actions';
import styles from './Create.module.css';

const Create = () => {
  const [input, setInput] = useState({
    name: '',
    image: '',
    hp: '',
    attack: '',
    defense: '',
    types: [],
  });


  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const allTypes = useSelector((state) => state.allTypes);
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(getAllTypes());
  }, []);


  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      const updatedTypes = [...input.types];
      if (checked) {
        updatedTypes.push(value);
      } else {
        const index = updatedTypes.indexOf(value);
        if (index !== -1) {
          updatedTypes.splice(index, 1);
        }
      }
      setInput({
        ...input,
        types: updatedTypes,
      });
    } else {
      setInput({
        ...input,
        [name]: value,
      });
    }
    setErrors(validations(input));
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    const typesFormat = input.types.join(' / ');
    const inputData = {
      ...input,
      types: typesFormat,
    };
    dispatch(postPokemon(inputData));
    navigate('/home');
  };


  return (
    <form onSubmit={handleSubmit}>

      <h1>Create your Pokémon!</h1>

      <div className={styles.inputContainer}>
      <label htmlFor="name">Name: </label>
      <input type="text" name="name" value={input.name} onChange={handleChange} />
      {errors.name && <p>{errors.name}</p>}

      <label htmlFor="image">Image URL: </label>
      <input type="text" name="image" value={input.image} onChange={handleChange} />
      {errors.image && <p>{errors.image}</p>}

      <label htmlFor="hp">HP: </label>
      <input type="text" name="hp" value={input.hp} onChange={handleChange} />
      {errors.hp && <p>{errors.hp}</p>}

      <label htmlFor="attack">Attack: </label>
      <input type="text" name="attack" value={input.attack} onChange={handleChange} />
      {errors.attack && <p>{errors.attack}</p>}

      <label htmlFor="defense">Defense: </label>
      <input type="text" name="defense" value={input.defense} onChange={handleChange} />
      {errors.defense && <p>{errors.defense}</p>}
      

      <label htmlFor="types">Types: </label>
      <div className={styles.typesContainer}>
      {allTypes?.map((type) => (
        <label key={type.id}> <input type="checkbox" name="types" value={type.name} checked={input.types.includes(type.name)} onChange={handleChange} /> {type.name} </label>
      ))}
      </div>
      {errors.types && <p>{errors.types}</p>}

      <button type="submit" disabled={!input.name || !/^[a-z]+$/.test(input.name) || errors.name || errors.image || errors.hp || errors.attack || errors.defense || input.types.length === 0 || input.types.length > 2}>Create Pokémon</button>
      </div>
    </form>
  );
};

export default Create;