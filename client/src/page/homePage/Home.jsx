import './Home.css';
import Cards from '../../components/cards/Cards';
import SearchBar from '../../components/searchBar/SearchBar';

const Home = () => {
  return (
    <div className='Home'>
      <SearchBar/>
      <Cards/>
    </div>
  );
}

export default Home;