import React, { useEffect, useState } from "react";
import MovieCard from "./movieCard";

function MovieList({ searchTerm, mode, loadMoreCount, setLoadMoreCount }) {
  const [movies, setMovies] = useState([]);

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
      ></div>
      <div style={{ display: "flex" }}>
        <div className="movie-grid" style={{ flex: 1 }}>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
              voteAverage={movie.vote_average}
              onClick={() => setSelectedMovie(movie)}
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
    </main>
  );
}
export default MovieList;
