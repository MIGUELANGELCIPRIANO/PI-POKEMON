import './Detail.css';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPokemonDetail } from '../../redux/actions';

const Detail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { pokemonDetail } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getPokemonDetail(params?.id)); // Se monta el componente realizando un dispatch a la action;
  }, [params?.id]);

  return (
    <div className='Detail'>
      <h2>{pokemonDetail?.name}</h2>
      <img src={pokemonDetail?.image} alt={pokemonDetail?.name} />
      <p>hp: {pokemonDetail?.hp}</p>
      <p>attack: {pokemonDetail?.attack}</p>
      <p>defense: {pokemonDetail?.defense}</p>
      <p>{pokemonDetail?.types}</p>
    </div>
  );
}

export default Detail;