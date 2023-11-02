import './Landing.css';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="Landing">
      <h1>HENRY POKÉMON</h1>
      <Link to="/home">
        <button>Log In</button>
      </Link>
    </div>
  );
}

export default Landing;