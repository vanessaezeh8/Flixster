import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/footer";
import Banner from "./components/banner";
import "./App.css";
import MovieList from "./components/movieList";
const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [mode, setMode] = useState("nowPlaying");
  const [loadMoreCount, setLoadMoreCount] = useState(1);
  const handleSearchChange = (event) => setSearchTerm(event.target.value);
  const handleSearchClick = () => {
    setMode("search");
    setLoadMoreCount(1);
  };
  const handleClearClick = () => {
    setSearchTerm("");
    setMode("nowPlaying");
    setLoadMoreCount(1);
  };
  return (
    <div>
      <Header />
      <Banner
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        handleSearchClick={handleSearchClick}
        handleClearClick={handleClearClick}
      />
      <MovieList
        searchTerm={searchTerm}
        mode={mode}
        loadMoreCount={loadMoreCount}
        setLoadMoreCount={setLoadMoreCount}
      />
      <Footer />
    </div>
  );
};

export default App;
