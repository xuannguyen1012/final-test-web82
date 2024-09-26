import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars,faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { data } from '../data.js'
import MoviePopup from './modal.jsx'
const Navbar = () => {

    const [movies] = useState(data);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const moviesPerPage = 4;

    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
        setPopupOpen(true);
    };

    const handleNext = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const currentMovies = movies.slice(currentPage * moviesPerPage, (currentPage + 1) * moviesPerPage);

    return (
        <>
       <div className="navbar">
        <div className="container">
          <div className="head">
            <FontAwesomeIcon icon={faBars} style={{marginLeft: "-124px"}} />
            <div className="movieui">
              <h1>MOVIE</h1>
              <div className="ui">
                <h1>UI</h1>
              </div>
            </div>
            <FontAwesomeIcon icon={faSearch} style={{marginRight: "-130px"}} />
          </div>
          <div className="line"></div>
          <h2>Most Popular Movies</h2>
          <div className="body">  
            <div className="map">
                {currentMovies.length > 0 ? (
                    currentMovies.map(movie => (
                        <div key={movie.ID} className="movie-card" onClick={() => handleMovieClick(movie)}>
                            <img src={movie.image} alt={movie.name} />
                            <h3>{movie.name}</h3>
                            <div className=''>
                                <p style={{marginRight: "4px"}}>{movie.time} min</p>
                                <p>{movie.year}</p>
                            </div>
                        </div>
                        ))
                    ) : (
                        <p>No movies available.</p>
                    )}
            </div>
                        {currentMovies.length === moviesPerPage && (
                            <button className="next-button" onClick={handleNext}>Next</button>
                        )}
                        {currentPage > 0 && (
                            <button className="prev-button" onClick={handlePrev}>Prev</button>
                        )}
                
          </div>
        </div>
      </div>
        {isPopupOpen && (
            <MoviePopup moviez={selectedMovie} onClose={() => setPopupOpen(false)} />
        )}
        </>
    )
}

export default Navbar;