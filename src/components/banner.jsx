import React from "react";

function Banner({
  searchTerm,
  handleSearchChange,
  handleSearchClick,
  handleClearClick,
}) {
  return (
    <section className="banner">
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for a movie"
        />
        <button onClick={handleSearchClick}>Search</button>
        <button onClick={handleClearClick}>Clear</button>
      </div>
    </section>
  );
}

export default Banner;
