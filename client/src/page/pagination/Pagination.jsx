const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className={style.container}>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={style.button}
            >
                &#8249;
            </button>
            <span className={style.text}>
                {currentPage} de {totalPages}
            </span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={style.button}
            >
                &#8250;
            </button>
        </div>
    );
};

export default Pagination;

// CARDS / HOME ?
//? import Pagination from '../../page/pagination/Pagination';

// cosnt Cards / Home = ({ currentPage, setCurrentPage }) => {
    
// const PokesPerPage = 12;

// const indexOfLastPokes = currentPage * PokesPerPage;
// const indexOfFirstPokes = indexOfLastPokes - PokesPerPage;
// const currentPokes = allPokemons ? allPokemons.slice(indexOfFirstPokes, indexOfLastPokes) : [];

// const paginate = (pageNumber) => {
//   setCurrentPage(pageNumber);
// };

//return ( 
          {/* {allPokemons.length>0 ? <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(allPokemons.length / PokesPerPage)}
          onPageChange={paginate}
         />: null} */}
// )
// }

// APP ?
//? import { useState } from 'react';

//const App = () => {
//? const [currentPage, setCurrentPage] = useState(1);
// return (
//     <div className="App">
//       {location.pathname !=='/' ? <NavBar/> : ''}
//       <Routes>
//         <Route path='' element={<Landing/>}></Route>
//?         <Route path='/home' element={<Home currentPage={currentPage} setCurrentPage={setCurrentPage}/>}></Route>
//         <Route path='/detail/:id' element={<Detail/>}></Route>
//         <Route path='/form' element={<Create/>}></Route>
//       </Routes>
//     </div>
//   );
// }
