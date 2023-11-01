import './Home.css';
import { Routes, Route } from 'react-router-dom';
import Cards from '../../components/cards/Cards';

const Home = () => {
  return (
    <div className='Home'>
      <Routes>
        <Route path='' element={<Cards/>}></Route>
      </Routes>
    </div>
  );
}

export default Home;