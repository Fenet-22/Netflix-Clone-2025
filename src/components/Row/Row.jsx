import React, { useEffect, useState, useRef } from "react";
import "./Row.css";
import axios from "../utils/axios";

import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const [trailerUrl, setTrailerUrl] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const base_url = "https://image.tmdb.org/t/p/original/";
  const rowRef = useRef(null);

  // FETCH MOVIES
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  // CLICK TO OPEN TRAILER
  const playTrailer = (movie) => {
    movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
      .then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"));
        setModalVisible(true);
      })
      .catch(() => console.log("Trailer not found"));
  };

  // FIND HOVER POSITION ON SCREEN
  const handleHover = (event, movie) => {
    const rect = event.target.getBoundingClientRect();
    setHoverPos({
      x: rect.left + rect.width / 2 - 160, // center hover card
      y: rect.top - 190, // place above poster
    });
    setHoveredMovie(movie);
  };

  // SCROLL CONTROLS
  const scrollLeft = () => {
    rowRef.current.scrollBy({ left: -window.innerWidth / 2, behavior: "smooth" });
  };

  const scrollRight = () => {
    rowRef.current.scrollBy({ left: window.innerWidth / 2, behavior: "smooth" });
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
              className={`row-poster ${isLargeRow && "row-posterLarge"}`}
              src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
              alt={movie.name || movie.title}
              onMouseEnter={(e) => handleHover(e, movie)}
              onMouseLeave={() => setHoveredMovie(null)}
            />
          ))}
        </div>

        <ArrowForwardIosIcon className="row-arrow right" onClick={scrollRight} />
      </div>

      {/* HOVER CARD */}
      {hoveredMovie && (
        <div className="hover-card" style={{ top: hoverPos.y, left: hoverPos.x }}>
          <img
            className="hover-image"
            src={`${base_url}${hoveredMovie.backdrop_path}`}
            alt=""
          />

          <div className="hover-controls">
            <button className="hover-btn play" onClick={() => playTrailer(hoveredMovie)}>▶</button>
            <button className="hover-btn"></button>
            <button className="hover-btn"></button>
            <button className="hover-btn">⤢</button>
          </div>

          <h4 className="hover-title">
            {hoveredMovie?.name || hoveredMovie?.title}
          </h4>
        </div>
      )}

      {/* TRAILER MODAL */}
      {modalVisible && (
        <div className="modal" onClick={() => setModalVisible(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <YouTube videoId={trailerUrl} opts={opts} />
            <button className="modal-close" onClick={() => setModalVisible(false)}>✖</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Row;
