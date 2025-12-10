import React, { useEffect, useState } from "react";
import "./Row.css";
import axios from "../utils/axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: { autoplay: 1 },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl(null);
      setModalVisible(false);
      return;
    }

    movieTrailer(movie?.title || movie?.name || movie?.original_name)
      .then((url) => {
        if (!url) return;
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"));
        setModalVisible(true);
      })
      .catch(() => console.log("Trailer not found"));
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

      {/* MODAL */}
      {modalVisible && (
        <div className="modal" onClick={() => setModalVisible(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <YouTube videoId={trailerUrl} opts={opts} />
            <button className="modal-close" onClick={() => setModalVisible(false)}>
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Row;
