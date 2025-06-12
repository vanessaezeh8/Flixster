import React, { useEffect, useState } from "react";
import MovieCard from "./movieCard";
import MovieModal from "./MovieModal";
import Sidebar from "./sidebar";

function MovieList({ searchTerm, mode, loadMoreCount, setLoadMoreCount }) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [sortOption, setSortOption] = useState("default");
  const [genre, setGenre] = useState("all");
  const [favorites, setFavorites] = useState([]);
  const [watched, setWatched] = useState([]);
  const callMovieApi = async (url) => {
    const apiKeyToUse = import.meta.env.VITE_APP_API_KEY;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKeyToUse}`,
      },
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (loadMoreCount === 1) {
          setMovies([...json.results]);
        } else {
          setMovies([...movies, ...json.results]);
        }
      })
      .catch((err) => console.error(err));
  };
  const fetchMovies = async () => {
    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (loadMoreCount === 1) {
        setMovies(data.results || []);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...(data.results || [])]);
      }
    } catch (err) {
      console.error("error fetching movies:", err);
    }
  };
  useEffect(() => {
    let url = "";
    if (mode === "search" && searchTerm.trim() !== "") {
      const encodedeQuery = encodeURIComponent(searchTerm);
      url = `https://api.themoviedb.org/3/search/movie?query=${encodedeQuery}&language=en-US&page=${loadMoreCount}`;
    } else {
      url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${loadMoreCount}`;
    }
    if (loadMoreCount === 1) {
      setMovies([]);
    }
    callMovieApi(url);
  }, [mode, loadMoreCount]);
  const genreFilteredMovies =
    genre === "all"
      ? movies
      : movies.filter((movie) =>
          movie.genre_ids ? movie.genre_ids.includes(Number(genre)) : true
        );
  const filteredMovies = [...genreFilteredMovies].sort((a, b) => {
    if (sortOption === "title") return a.title.localeCompare(b.title);
    if (sortOption === "release_date")
      return new Date(b.release_date) - new Date(a.release_date);
    if (sortOption === "vote") return b.vote_average - a.vote_average;
    return 0;
  });
  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
    );
  };
  const toggleWatched = (id) =>{
    setWatched((prevWatched) =>
      prevWatched.includes(id)
      ? prevWatched.filter((watchedId) => watchedId !== id)
      : [...prevWatched, id]
    );
  };
  return (
    <main>
      <div
        className="controls"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <div>
          <label htmlFor="sort">Sort by: </label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="title">Title(A-Z)</option>
            <option value="release_date">Release Date(Newest-Oldest)</option>
            <option value="vote">Vote Average(High-Low)</option>
          </select>
        </div>
        <div>
          <label htmlFor="genre">Filter by Genre: </label>
          <select
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="all">All</option>
            <option value="28">Action</option>
            <option value="35">Comedy</option>
            <option value="18">Drama</option>
            <option value="27">Horror</option>
            <option value="10749">Romance</option>
          </select>
        </div>
      </div>
      <div style = {{display: "flex"}}>
        <Sidebar favorites = {favorites} watched={watched} allMovies={movies}/>
        <div className="movie-grid" style={{flex:1}}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            posterPath={movie.poster_path}
            voteAverage={movie.vote_average}
            onClick={() => setSelectedMovie(movie)}
            isFavorite = {favorites.includes(movie.id)}
            isWatched = {watched.includes(movie.id)}
            onToggleFavorite={() => toggleFavorite(movie.id)}
            onToggleWatched ={() => toggleWatched(movie.id)}
          />
        ))}
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <button
          onClick={() => {
            setLoadMoreCount(loadMoreCount + 1);
          }}
        >
          Load More
        </button>
      </div>
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </main>
  );
}
export default MovieList;
