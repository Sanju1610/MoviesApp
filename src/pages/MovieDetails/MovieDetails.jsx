import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./MovieDetail.css";

const API_KEY = "b9bd48a6";
const BASE_URL = "https://www.omdbapi.com/";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  const fetchMovieDetails = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log("Fetching Movie with ID:", id); // Debugging ID

      const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
      const data = await response.json();

      console.log("API Response:", data); // Debugging API Response

      if (data.Response === "True") {
        setMovie(data);
      } else {
        setError(`Error: ${data.Error}`); // Show the actual API error
      }
    } catch (err) {
      setError("Failed to fetch movie details. Check network connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="movie-details-container">
      <button className="btn" onClick={handleBack}>🔙 Back</button>

      {loading && <p className="loading">Loading movie details...</p>}
      {error && <p className="error">{error}</p>}

      {movie && (
        <div className="movie-details">
          <img src={movie.Poster} alt={movie.Title} className="details-poster" />
          <h2>{movie.Title}</h2>
          <p><strong>Year:</strong> {movie.Year}</p>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
