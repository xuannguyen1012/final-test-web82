
import React from 'react';
import './modal.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
const MoviePopup = ({ moviez, onClose }) => {
    if (!moviez) return null; 

    return (
        <div className="modal-overlay" onClick={onClose}>
            <img src={moviez.image} width="340px" height="420px"></img>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className='content'>
                <button className="close-button" onClick={onClose}>X</button>
                <h3>{moviez.name}</h3>
                <div style={{display: "flex"}}>
                    <p style={{marginRight: "4px"}}>{moviez.time} min</p>
                    <p>{moviez.year}</p> 
                </div>
                <p style={{fontSize: "22px"}}>{moviez.introduce}</p>
                <button className="btn">
                    <FontAwesomeIcon icon={faPlay} />
                    <h4>PLAY MOVIE</h4>
                </button>
            </div>    
        </div>
        </div>
    );
};

export default MoviePopup;
