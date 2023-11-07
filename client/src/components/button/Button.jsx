import './Button.css';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllPokemons } from '../../redux/actions';

const Button = ({ path, text }) => {
    const dispatch = useDispatch();
    return (
        <Link to={path}>
            <button onClick={() => {
                if(path === '/home'){
                    dispatch(getAllPokemons());
                }
            }}>{text}</button>
        </Link>
    );
}

export default Button;