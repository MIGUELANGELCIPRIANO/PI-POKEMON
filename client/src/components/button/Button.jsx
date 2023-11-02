import './Button.css';
import { Link } from 'react-router-dom';

const Button = ({ path, text }) => {
    return (
        <Link to={path}>
            <button>{text}</button>
        </Link>
    );
}

export default Button;