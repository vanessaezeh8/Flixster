import React from "react";

function Sidebar({favorites, watched, allMovies}) {
    const favMovies = allMovies.filter((m) => favorites.includes(m.id));
    const watchedMovies = allMovies.filter((m) => watched.includes(m.id));
    return (
        <div className="sidebar">
            <h3>Favorites</h3>
            {favMovies.map((m)=> <p key={m.id}>{m.title}</p>)}
            <h3>Watched</h3>
            {watchedMovies.map((m)=> <p key={m.id}>{m.title}</p>)}
        </div>
    );
};
export default Sidebar