import React, { useEffect, useState, useRef } from "react";
import "./Row.css";
import axios from "../utils/axios";

import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const base_url = "https://image.tmdb.org/t/p/original/";
  const rowRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
      setModalVisible(false);
      return;
    }

    movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
      .then((url) => {
        if (!url) return;

        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"));
        setModalVisible(true);
      })
      .catch(() => console.log("Trailer not found"));
  };

  const scrollLeft = () => {
    rowRef.current.scrollBy({
      left: -window.innerWidth / 2,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    rowRef.current.scrollBy({
      left: window.innerWidth / 2,
      behavior: "smooth",
    });
  };

  const opts = {
    height: "400",
    width: "100%",
    playerVars: { autoplay: 1 },
  };

  return (
    <div className="row">
      <h2 className="row-title">{title}</h2>

      <div className="row-wrapper">
        <ArrowBackIosIcon className="row-arrow left" onClick={scrollLeft} />

        <div className="row-posters" ref={rowRef}>
          {movies.map((movie) => (
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              className={`row-poster ${isLargeRow && "row-posterLarge"}`}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name || movie.title}
            />
          ))}
        </div>

        <ArrowForwardIosIcon className="row-arrow right" onClick={scrollRight} />
      </div>

      {modalVisible && (
        <div className="modal" onClick={() => setModalVisible(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <YouTube videoId={trailerUrl} opts={opts} />
            <button className="modal-close">✖</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Row;
