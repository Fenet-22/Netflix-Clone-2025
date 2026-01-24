/* STEP 1: GATHERING SUPPLIES
   We import React's logic and two very special external tools:
   1. YouTube: A pre-made player so we don't have to build a video player ourselves.
   2. movie-trailer: A "search engine" that finds YouTube links based on movie names.
*/
import React, { useEffect, useState } from "react";
import "./Row.css"; // The design instructions for the scrolling rows
import axios from "../utils/axios"; // Our "delivery truck" that fetches data from the movie database
import YouTube from "react-youtube"; // The tool that displays the video
import movieTrailer from "movie-trailer"; // The tool that finds the video link

// This function receives "Props" (Instructions):
// - title: What to call the row (e.g., "Trending Now")
// - fetchUrl: The specific web address to get those movies
// - isLargeRow: A true/false switch to make the posters bigger (like for Netflix Originals)
function Row({ title, fetchUrl, isLargeRow }) {
  
  /* STEP 2: THE COMPONENT'S MEMORY (State) */
  const [movies, setMovies] = useState([]); // A list (array) to hold our movie data
  const [trailerUrl, setTrailerUrl] = useState(null); // Stores the YouTube ID for the video
  const [modalVisible, setModalVisible] = useState(false); // Switch to show/hide the video pop-up

  // The base address for where movie images are stored online
  const base_url = "https://image.tmdb.org/t/p/original/";

  /* STEP 3: THE DATA FETCHING (The "Delivery")
     This runs as soon as the row appears on the screen.
  */
  useEffect(() => {
    async function fetchData() {
      // We send our "delivery truck" (axios) to the specific address (fetchUrl)
      const request = await axios.get(fetchUrl);
      // We take the results and store them in our 'movies' memory
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]); // If the address changes, go get new movies!

  // Settings for the YouTube video player (Size and Autoplay)
  const opts = {
    height: "390",
    width: "100%",
    playerVars: { autoplay: 1 },
  };

  /* STEP 4: THE CLICK ACTION (The "Demo")
     This happens when a user clicks on a movie poster.
  */
  const handleClick = (movie) => {
    // If a video is already playing, clicking again closes it
    if (trailerUrl) {
      setTrailerUrl(null);
      setModalVisible(false);
      return;
    }

    // Use the movie's name to search for a trailer on YouTube
    movieTrailer(movie?.title || movie?.name || movie?.original_name)
      .then((url) => {
        if (!url) return;
        // YouTube URLs are long; we only need the ID (the code after "v=")
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v")); // Save just the ID
        setModalVisible(true); // Open the pop-up window
      })
      .catch(() => console.log("Trailer not found"));
  };

  return (
    <div className="row">
      {/* The Row Heading (e.g., "Action Movies") */}
      <h2>{title}</h2>

      <div className="row-posters">
        {/* STEP 5: THE LOOPING (Mapping)
            We take our list of movies and for EVERY movie, we create an <img> tag.
        */}
        {movies.map((movie) => (
          <img
            key={movie.id} // A unique ID so React doesn't get confused
            onClick={() => handleClick(movie)} // Listen for clicks to play trailer
            // If it's a 'LargeRow', give it a special CSS class for bigger size
            className={`row-poster ${isLargeRow && "row-posterLarge"}`}
            // Combine the base URL with the specific movie's image path
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>

      {/* STEP 6: THE MODAL (The Pop-up Window)
          This only appears if 'modalVisible' is true.
      */}
      {modalVisible && (
        <div className="modal" onClick={() => setModalVisible(false)}>
          {/* stopPropagation prevents the video from closing if you click inside it */}
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* The actual YouTube video player component */}
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