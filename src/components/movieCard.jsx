import React from "react";

function MovieCard({title, posterPath, voteAverage, onClick}) {
    const imageURL = `https://image.tmdb.org/t/p/w500${posterPath}`;
    return (
        <div className="movie-card">
            <img src={imageURL} alt={`Poster of ${title}`} onClick={onClick}/>
            <h3>{title}</h3>
            <p>⭐️ {voteAverage}</p>
        </div>
    );
}
export default MovieCard;
