import React, { useEffect, useState } from "react";
import MovieCard from "./movieCard";
import MovieModal from "./MovieModal";

function MovieList({ searchTerm, mode, loadMoreCount, setLoadMoreCount }) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [sortOption, setSortOption] = useState("default");
  const [favorites, setFavorites] = useState([]);
  const [watched, setWatched] = useState([]);
  const [viewMode, setViewMode] = useState("all");

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
  }, [searchTerm, mode, loadMoreCount]);

  const sortedMovie = [...movies].sort((a, b) => {
    if (sortOption === "title") return a.title.localeCompare(b.title);
    if (sortOption === "release_date")
      return new Date(b.release_date) - new Date(a.release_date);
    if (sortOption === "vote") return b.vote_average - a.vote_average;
    return 0;
  });

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const toggleWatched = (id) => {
    setWatched((prev) =>
      prev.includes(id) ? prev.filter((wid) => wid !== id) : [...prev, id]
    );
  };

  const filteredMovies =
    viewMode === "favorites"
      ? sortedMovie.filter((m) => favorites.includes(m.id))
      : viewMode == "watched"
      ? sortedMovie.filter((m) => watched.includes(m.id))
      : sortedMovie;

  return (
    <main>
      <div
        className="controls"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginBottom: "1rem",
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
          <button onClick={() => setViewMode("all")}>All</button>
          <button onClick={() => setViewMode("favorites")}>Favorites</button>
          <button onClick={() => setViewMode("watched")}>Watched</button>
        </div>
      </div>
      <div>
        <div className="movie-grid" style={{ flex: 1 }}>
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
              voteAverage={movie.vote_average}
              onClick={() => setSelectedMovie(movie)}
              isFavorite={favorites.includes(movie.id)}
              isWatched={watched.includes(movie.id)}
              onToggleFavorite={() => toggleFavorite(movie.id)}
              onToggleWatched={() => toggleWatched(movie.id)}
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
