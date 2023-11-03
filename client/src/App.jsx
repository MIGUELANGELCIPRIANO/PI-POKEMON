import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import Home from './page/homePage/Home';
import Landing from './page/landingPage/Landing';
import Detail from './page/detailPage/Detail';
import Create from './page/formPage/Create';

const App = () => {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !=='/' ? <NavBar/> : ''}
      <Routes>
        <Route path='' element={<Landing/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/detail/:id' element={<Detail/>}></Route>
        <Route path='/form' element={<Create/>}></Route>
      </Routes>
    </div>
  );
}

export default App;