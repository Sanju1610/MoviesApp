import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./MovieList.css";


const API_KEY = "b9bd48a6";
const BASE_URL = "https://www.omdbapi.com/";

const MovieList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
  }, [page]);

  const fetchMovies = async () => {
    setLoading(true);
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=marvel&page=${page}`);
    const data = await response.json();
    if (data.Search) {
      setMovies((prev) => [...prev, ...data.Search]);
      setTotalResults(parseInt(data.totalResults));
    }
    setLoading(false);
  };

  const fetchSuggestions = async (query) => {
    if (!query) return setSuggestions([]);
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}&page=1`);
    const data = await response.json();
    if (data.Search) setSuggestions(data.Search.slice(0, 5));
  };

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
    fetchSuggestions(e.target.value);
  }, []);

  return (
    <div className="container">
      <h1 className="title">Movie Explorer</h1>
      <input
        type="text"
        placeholder="Search movies..."
        className="search-input"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {suggestions.length > 0 && (
        <ul className="suggestion-list">
          {suggestions.map((s) => (
            <li key={s.imdbID} onClick={() => navigate(`/movie/${s.imdbID}`)}>{s.Title}</li>
          ))}
        </ul>
      )}
      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card" onClick={() => navigate(`/movie/${movie.imdbID}`)}>
            <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
            <h2 className="movie-title">{movie.Title}</h2>
            <p className="movie-year">{movie.Year}</p>
          </div>
        ))}
      </div>
      <button className="load-more" onClick={() => setPage(page + 1)} disabled={loading}>
        {loading ? "Loading..." : "Load More"}
      </button>
    </div>
  );
};

export default MovieList;
