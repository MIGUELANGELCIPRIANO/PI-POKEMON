import './Card.css';
import { Link } from 'react-router-dom';

const Card = ({ id, name, image, types }) => {
  return (
    <div className="Card">
      <h2>{name}</h2>
      <Link to={`/detail/${id}`}>
        <img src={image} alt={name} />
      </Link>
      <p>{types}</p>
    </div>
  );
}

export default Card;