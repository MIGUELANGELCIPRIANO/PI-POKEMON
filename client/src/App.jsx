import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './page/homePage/Home';
import Landing from './page/landingPage/Landing';
import Detail from './page/detailPage/Detail';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='' element={<Landing/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/detail/:id' element={<Detail/>}></Route>
      </Routes>
    </div>
  );
}

export default App;