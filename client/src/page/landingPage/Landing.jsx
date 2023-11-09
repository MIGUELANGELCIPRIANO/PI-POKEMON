import { Link } from 'react-router-dom';
import styles from './Landing.module.css';

const Landing = () => {
  return (
    <div className={styles.image}>
      <h1>HENRY POKÉMON</h1>
      <Link to="/home">
        <button>Log In</button>
      </Link>
    </div>
  );
}

export default Landing;