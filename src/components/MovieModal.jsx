import React, { useEffect, useState } from "react";

function MovieModal({ movie, onClose }) {
  const [details, setDetails] = useState(null);
  useEffect(() => {
    const apiKeyToUse = import.meta.env.VITE_APP_API_KEY;
    const fetchDetails = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}?language=en=US`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${apiKeyToUse}`,
            },
          }
        );
        const data = await res.json();
        setDetails(data);
      } catch (err) {
        console.error("Failed to fetch movie details", err);
      }
    };
    fetchDetails();
  }, [movie.id]);
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          X
        </button>
        {details ? (
          <>
            <h2>{details.title}</h2>
            <img
              src={`https://image.tmdb.org/t/p/w500${details.backdrop_path}`}
              alt={details.title}
              style={{ width: "100%" }}
            />
            <p>
              <strong>Runtime: </strong>
              {details.runtime}mins
            </p>
            <p>
              <strong>Genres: </strong>
              {details.genres.map((g) => g.name).join(",")}
            </p>
            <p>
              <strong>Release Date: </strong>
              {details.release_date}
            </p>
            <p>
              <strong>Overview:</strong>
              {details.overview}
            </p>
          </>
        ) : (
          <p>Loading ...</p>
        )}
      </div>
    </div>
  );
}

export default MovieModal;
