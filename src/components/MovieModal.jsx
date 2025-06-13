import React, { useEffect, useState } from "react";

function MovieModal({ movie, onClose }) {
  const [details, setDetails] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
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
        const videoRes = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${apiKeyToUse}`,
            },
          }
        );
        const videoData = await videoRes.json();
        const youtubeTrailer = videoData.results.find((video) => {
          return video.type === "Trailer" && video.site === "YouTube";
        });
        if (youtubeTrailer) {
          setTrailerKey(youtubeTrailer.key);
        }
      } catch (err) {
        console.error("Failed to fetch movie details or trailer", err);
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
              {details.genres.map((g) => g.name).join(" , ")}
            </p>
            <p>
              <strong>Release Date: </strong>
              {details.release_date}
            </p>
            <p>
              <strong>Overview: </strong>
              {details.overview}
            </p>
            <div>
              {trailerKey && (
                <div className="trailer-container">
                  <h3> Offical Trailer</h3>
                  <iframe
                    className="Trailer"
                    frameborder="0"
                    wdith="100%"
                    height="415"
                    src={`https://www.youtube.com/embed/${trailerKey}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                    allowfullscreen
                    title={trailerKey.className}
                  ></iframe>
                </div>
              )}
            </div>
          </>
        ) : (
          <p>Loading Movie details...</p>
        )}
      </div>
    </div>
  );
}

export default MovieModal;
