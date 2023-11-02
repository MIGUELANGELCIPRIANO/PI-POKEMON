import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import Home from './page/homePage/Home';
import Landing from './page/landingPage/Landing';
import Detail from './page/detailPage/Detail';
import Form from './page/formPage/Form';

const App = () => {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !=='/' ? <NavBar/> : ''}
      <Routes>
        <Route path='' element={<Landing/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/detail/:id' element={<Detail/>}></Route>
        <Route path='/form' element={<Form/>}></Route>
      </Routes>
    </div>
  );
}

export default App;