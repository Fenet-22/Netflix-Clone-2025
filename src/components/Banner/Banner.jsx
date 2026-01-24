import React, { useEffect, useState } from "react";
import "./Banner.css"; // Importing styling for the banner
import { FaPlay } from "react-icons/fa"; // Importing the Play icon from react-icons
import axios from "../utils/axios"; // Importing the custom axios instance (base URL)
import requests from "../utils/requests"; // Importing the object containing API endpoints

function Banner() {
  // 1. State to store the randomly selected movie object
  const [movie, setMovie] = useState({});

  // 2. useEffect hook to fetch data when the component mounts
  useEffect(() => {
    async function fetchData() {
      // Fetching "Netflix Originals" from the API
      const request = await axios.get(requests.fetchNetflixOriginals);
      
      // Extracting the array of movies from the response
      const movies = request.data.results;
      
      // Selecting one random movie from the results array and updating state
      setMovie(
        movies[Math.floor(Math.random() * movies.length)]
      );
    }
    fetchData(); // Executing the async function
  }, []); // Empty dependency array means this runs only once on load

  /**
   * 3. Helper function to shorten the movie description
   * @param {string} str - The full description text
   * @param {number} n - Maximum character limit
   */
  function truncate(str, n) {
    // If the string exists and is longer than 'n', cut it and add "..."
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    // 4. Header section with dynamic background image from TMDB
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        // Using optional chaining (movie?) to prevent errors if image hasn't loaded yet
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner-contents">
        {/* 5. Displaying the title (Handling different naming conventions in API) */}
        <h1 className="banner-title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        {/* 6. Action Buttons */}
        <div className="banner-buttons">
          <button className="banner-button">
            <FaPlay style={{ marginRight: "8px" }} /> Play
          </button>
          <button className="banner-button">My List</button>
        </div>

        {/* 7. Movie Description (Truncated to 150 characters) */}
        <h1 className="banner-description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>

      {/* 8. Visual fade effect at the bottom of the banner */}
      <div className="banner-fade-bottom" />
    </header>
  );
}

export default Banner;