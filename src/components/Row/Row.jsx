import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import "./Row.css";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  // SIMPLE + WORKING TRAILER FUNCTION
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl(""); // close trailer if already open
    } else {
      const movieName =
        movie?.title ||
        movie?.name ||
        movie?.original_name ||
        movie?.original_title;

      movieTrailer(movieName)
        .then((url) => {
          const params = new URLSearchParams(new URL(url).search);
          setTrailerUrl(params.get("v"));
        })
        .catch((error) => console.log("Trailer not found:", movieName));
    }
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row-posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row-poster ${isLargeRow && "row-posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>

      {/* Trailer appears BELOW the row */}
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
