import { useState } from 'react';
import Cards from '../../components/cards/Cards';
import SearchBar from '../../components/searchBar/SearchBar';


const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className='Home'>
      <SearchBar/>
      <Cards currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </div>
  );
}

export default Home;