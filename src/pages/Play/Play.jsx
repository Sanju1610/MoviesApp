import React, { useState, useEffect } from "react";
import "./play.css";

const API_KEY = "b9bd48a6";
const BASE_URL = "https://www.omdbapi.com/";

const play = () => {
  const [searchTerm, setSearchTerm] = useState("marvel");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    fetchMovies();
  }, [searchTerm, page]);

  const fetchMovies = async () => {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${searchTerm}&page=${page}`);
    const data = await response.json();
    if (data.Search) {
      setMovies(data.Search);
      setTotalResults(parseInt(data.totalResults));
    }
  };

  const fetchMovieDetails = async (imdbID) => {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${imdbID}`);
    const data = await response.json();
    setSelectedMovie(data);
  };

  return (
    <div className="container">
      <h1 className="title">Movie Search</h1>
      <input
        type="text"
        placeholder="Search for a movie..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <div className="movie-grid">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="movie-card"
            onClick={() => fetchMovieDetails(movie.imdbID)}
          >
            <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
            <h2 className="movie-title">{movie.Title}</h2>
            <p className="movie-year">{movie.Year}</p>
          </div>
        ))}
      </div>
      
      <div className="pagination">
        <button 
          className="btn" 
          disabled={page <= 1} 
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button 
          className="btn" 
          disabled={page * 10 >= totalResults} 
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
      
      {selectedMovie && (
        <div className="movie-details">
          <h2 className="details-title">{selectedMovie.Title}</h2>
          <p><strong>Year:</strong> {selectedMovie.Year}</p>
          <p><strong>Genre:</strong> {selectedMovie.Genre}</p>
          <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
          <img src={selectedMovie.Poster} alt={selectedMovie.Title} className="details-poster" />
          <button 
            className="btn close-btn"
            onClick={() => setSelectedMovie(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default play;
