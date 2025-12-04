import React, { useEffect, useState, useRef } from "react";
import "./Row.css";
import axios from "../utils/axios";

import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [hoveredMovie, setHoveredMovie] = useState(null); // movie object
  const [hoverPos, setHoverPos] = useState({ left: 0, top: 0 });
  const [hoverTrailerId, setHoverTrailerId] = useState(null); // for autoplay preview
  const [trailerUrl, setTrailerUrl] = useState(""); // main modal trailer id
  const [modalVisible, setModalVisible] = useState(false); // main trailer modal
  const [infoModalVisible, setInfoModalVisible] = useState(false); // more-info modal
  const [likedSet, setLikedSet] = useState(() => new Set());
  const [savedSet, setSavedSet] = useState(() => new Set());

  const base_url = "https://image.tmdb.org/t/p/original/";
  const rowRef = useRef(null);

  // Fetch movies
  useEffect(() => {
    let cancelled = false;
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      if (!cancelled) setMovies(request.data.results || []);
    }
    fetchData();
    return () => { cancelled = true; };
  }, [fetchUrl]);

  // Helper to safely extract YouTube id (returns null if not found)
  const findTrailerId = async (movie) => {
    try {
      const url = await movieTrailer(movie?.name || movie?.title || movie?.original_name || "");
      if (!url) return null;
      const urlParams = new URLSearchParams(new URL(url).search);
      return urlParams.get("v");
    } catch (err) {
      return null;
    }
  };

  // Play trailer in main modal
  const playTrailer = async (movie) => {
    const id = await findTrailerId(movie);
    if (!id) {
      console.log("Trailer not found");
      return;
    }
    setTrailerUrl(id);
    setModalVisible(true);
  };

  // Hover handlers: compute position & preload trailer id for autoplay preview
  const onPosterEnter = async (e, movie) => {
    // compute bounding rect relative to page
    const rect = e.currentTarget.getBoundingClientRect();
    const hoverW = 360; // hover-card width
    const hoverH = 220; // hover-card height
    const centerX = rect.left + window.scrollX + rect.width / 2;
    let left = centerX - hoverW / 2;
    // clamp within viewport with some margin
    const margin = 12;
    const maxLeft = window.scrollX + document.documentElement.clientWidth - hoverW - margin;
    left = Math.max(window.scrollX + margin, Math.min(left, maxLeft));

    let top = rect.top + window.scrollY - hoverH - 12; // above poster
    // if not enough space above, place below poster
    if (top < window.scrollY + margin) {
      top = rect.top + window.scrollY + rect.height + 12;
    }

    setHoverPos({ left, top });
    setHoveredMovie(movie);

    // preload hover trailer id (muted autoplay). Do not await blocking UI.
    findTrailerId(movie).then((id) => {
      setHoverTrailerId(id);
    }).catch(() => setHoverTrailerId(null));
  };

  const onPosterLeave = () => {
    setHoveredMovie(null);
    setHoverTrailerId(null);
  };

  // Like / Save toggles (local only)
  const toggleLike = (movieId) => {
    setLikedSet(prev => {
      const next = new Set(prev);
      if (next.has(movieId)) next.delete(movieId); else next.add(movieId);
      return next;
    });
  };
  const toggleSave = (movieId) => {
    setSavedSet(prev => {
      const next = new Set(prev);
      if (next.has(movieId)) next.delete(movieId); else next.add(movieId);
      return next;
    });
  };

  // Scroll controls
  const scrollLeft = () => {
    rowRef.current.scrollBy({ left: -window.innerWidth / 2, behavior: "smooth" });
  };
  const scrollRight = () => {
    rowRef.current.scrollBy({ left: window.innerWidth / 2, behavior: "smooth" });
  };

  // YouTube options (hover preview is muted, no controls)
  const previewOpts = {
    height: "120",
    width: "100%",
    playerVars: { autoplay: 1, controls: 0, modestbranding: 1, mute: 1, rel: 0 },
  };
  const modalOpts = {
    height: "480",
    width: "100%",
    playerVars: { autoplay: 1 },
  };

  return (
    <div className="row">
      <h2 className="row-title">{title}</h2>

      <div className="row-wrapper">
        <ArrowBackIosIcon className="row-arrow left" onClick={scrollLeft} />

        <div className="row-posters" ref={rowRef}>
          {movies.map(movie => (
            <div
              key={movie.id}
              className={`poster-wrapper ${isLargeRow ? "large" : "small"}`}
            >
              <img
                className={`row-poster ${isLargeRow ? "row-posterLarge" : ""}`}
                src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                alt={movie.name || movie.title}
                onMouseEnter={(e) => onPosterEnter(e, movie)}
                onMouseLeave={onPosterLeave}
                onClick={() => playTrailer(movie)} // single-click opens main trailer
                draggable={false}
              />
            </div>
          ))}
        </div>

        <ArrowForwardIosIcon className="row-arrow right" onClick={scrollRight} />
      </div>

      {/* Hover preview card (positioned via style using hoverPos) */}
      {hoveredMovie && (
        <div
          className="hover-card"
          style={{ left: `${hoverPos.left}px`, top: `${hoverPos.top}px` }}
          onMouseEnter={() => {/* keep visible while hovering card */}}
          onMouseLeave={() => { setHoveredMovie(null); setHoverTrailerId(null); }}
        >
          {/* preview video (if available) otherwise show image */}
          {hoverTrailerId ? (
            <div className="hover-video">
              <YouTube videoId={hoverTrailerId} opts={previewOpts} />
            </div>
          ) : (
            <img
              className="hover-image"
              src={`${base_url}${hoveredMovie.backdrop_path || hoveredMovie.poster_path}`}
              alt=""
              draggable={false}
            />
          )}

          <div className="hover-controls">
            <button className="hover-btn play" onClick={() => playTrailer(hoveredMovie)}>▶</button>
            <button
              className={`hover-btn ${savedSet.has(hoveredMovie.id) ? "active" : ""}`}
              onClick={() => toggleSave(hoveredMovie.id)}
            >＋</button>
            <button
              className={`hover-btn ${likedSet.has(hoveredMovie.id) ? "active" : ""}`}
              onClick={() => toggleLike(hoveredMovie.id)}
            >👍</button>
            <button
              className="hover-btn"
              onClick={() => setInfoModalVisible(true)}
            >ℹ</button>
          </div>

          <div className="hover-meta">
            <div className="hover-title">{hoveredMovie.name || hoveredMovie.title}</div>
            <div className="hover-overview">{hoveredMovie.overview?.slice(0, 140)}</div>
          </div>
        </div>
      )}

      {/* Main trailer modal */}
      {modalVisible && (
        <div className="modal" onClick={() => setModalVisible(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <YouTube videoId={trailerUrl} opts={modalOpts} />
            <button className="modal-close" onClick={() => setModalVisible(false)}>✖</button>
          </div>
        </div>
      )}

      {/* More Info modal (separate from trailer modal) */}
      {infoModalVisible && hoveredMovie && (
        <div className="info-modal" onClick={() => setInfoModalVisible(false)}>
          <div className="info-modal-content" onClick={(e) => e.stopPropagation()}>
            <img className="info-backdrop" src={`${base_url}${hoveredMovie.backdrop_path}`} alt="" />
            <div className="info-body">
              <h2>{hoveredMovie.title || hoveredMovie.name}</h2>
              <p>{hoveredMovie.overview}</p>
              <div className="info-actions">
                <button onClick={() => playTrailer(hoveredMovie)} className="play-large">▶ Play Trailer</button>
                <button onClick={() => setInfoModalVisible(false)} className="close-info">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Row;
