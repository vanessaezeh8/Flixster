import React from "react";

function Banner ({}) {
    return (
        <section className="banner">
            <div className="search-bar">
                <input 
                type="text" 
                placeholder="Search for a movie"
                />
                <button>Search</button>
                <button>Clear</button>
            </div>
        </section>
    );
}

export default Banner;