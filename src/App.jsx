/* STEP 1: GATHERING THE TEAM (Imports)
   Think of this as the "Roll Call." We are bringing in every single 
   part we built so we can stack them together.
*/
import React from "react";
import "./App.css"; // The global styling (like the black background for the whole site)

// We import our "Custom Parts" (Components)
import Header from "./components/Header/Header"; // The top bar
import Banner from "./components/Banner/Banner"; // The big featured movie at the top
import Row from "./components/Row/Row";       // The blueprint for our movie lists
import Footer from "./components/Footer/Footer"; // The bottom section

// We import our "Data Tools"
import requests from "./components/utils/requests"; // The menu of movie links
import axios from "./components/utils/axios";       // The delivery service

/* STEP 2: THE ASSEMBLY LINE (The App Function)
   This function is where the magic happens. It tells the computer 
   exactly what order to place the components on the screen.
*/
function App() {
  return (
    // <div className="App">: The main container that holds everything.
    <div className="App">
      
      {/* 1. Place the Header at the very top */}
      <Header />

      {/* 2. Place the Hero Banner (the featured movie) under the Header */}
      <Banner />

      {/* 3. THE MOVIE ROWS (The "Shelf Filler")
          We reuse the 'Row' component over and over, but we give it 
          different "instructions" (Props) each time so it shows different movies.
      */}
      
      {/* Row 1: Special "Large" row for Netflix Originals */}
      <Row 
        title="Netflix Originals" 
        fetchUrl={requests.fetchNetflixOriginals} 
        isLargeRow // This tells the Row to use bigger posters
      />

      {/* Row 2: Standard size for Trending movies */}
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />

      {/* Row 3: Standard size for Top Rated */}
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />

      {/* Row 4 to 8: Different categories (Genres) 
          Notice how we just change the 'title' and the 'fetchUrl' 
          to get completely different results from the database!
      */}
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />

      {/* 4. Place the Footer at the very bottom */}
      <Footer />
      
    </div>
  );
}

/* STEP 3: THE FINAL SHIPMENT
   This makes the entire assembled website ready to be 
   rendered in the user's browser.
*/
export default App;