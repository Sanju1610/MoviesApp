import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieList from "./pages/MovieList/MovieList";
import Home from "./pages/Home/Home";
import MovieDetails from "./pages/MovieDetails/MovieDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home Page (renders MovieList) */}
        <Route path="/" element={<Home />} />

        {/* Movie Details Page */}
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
