import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import MovieList from '../MovieList/MovieList'
// import MovieList from "./pages/MovieList/MovieList";
const Home = () => {
  return (
    <div>
       <Navbar/>
       <MovieList/>
    </div>
  )
}

export default Home
