import React from "react";
import { FaHeart } from "react-icons/fa";
import { ImCheckboxChecked } from "react-icons/im";

function MovieCard({title, posterPath, voteAverage, isFavorite,isWatched, onToggleFavorite, onToggleWatched, onClick}) {
    const imageURL = `https://image.tmdb.org/t/p/w500${posterPath}`;
    return (
        <div className="movie-card">
            <img src={imageURL} alt={`Poster of ${title}`} onClick={onClick}/>
            <h3>{title}</h3>
            <p>⭐️ {voteAverage}</p>
            <div className="movie-icons">
                <div className="favorite-icon">
                <FaHeart 
                    onClick={onToggleFavorite}
                    style={{color: isFavorite ? "red": "gray",cursor:"pointer"}}
                />
                </div>
                <div className="watched-icon">
                    <ImCheckboxChecked
                    onClick = {onToggleWatched}
                    style = {{color: isWatched ? "green":"gray",cursor: "pointer"}}
                />
                </div>
            </div>
        </div>
    );
}
export default MovieCard;
