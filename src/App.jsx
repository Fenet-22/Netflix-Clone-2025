import React from "react";
import "./App.css";

import Header from "./components/Header/Header";
import Banner from "./components/banner/Banner";
import Row from "./components/Row/Row";
import requests from "./components/utils/requests";
import axios from "./components/utils/axios";
import Footer from "./components/Footer/Footer";




function App() {
  return (
    <div className="App">
      <Header />
      <Banner />
      <Row title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />

      <Footer />
    </div>
  );
}

export default App;
