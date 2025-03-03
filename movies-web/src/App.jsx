import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import MovieCard from './MovieCard';

function App() {
  const [count, setCount] = useState(0)
  const [movies, setMovies] = useState([])


const fetchMoviesFuzzy = async (query) => {
  const response = await axios.post("http://localhost:3000/moviesByFuzzySearch", {searchQuery: query});
  const movies = response.data;
  console.log(movies);
  setMovies(movies);
}

const fetchMovies = async () => {
  const response = await axios.get("http://localhost:3000/movies");
  const movies = response.data;
  console.log(movies);
  setMovies(movies);
} 

useEffect(() => {
  fetchMovies();
}
, []);

  return (
    <>
     <div>
      <input type="text" id="searchCriteria" name="searchCriteria" style={{width: "500px"}}></input>
      <button default='true' onClick={() => {
        var searchCriteria = document.getElementById("searchCriteria").value;
        //alert(searchCriteria);
        fetchMoviesFuzzy(searchCriteria);
      }}>Search</button>
          </div>
    <h1>Movies</h1>
     <div>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>   
    </>
  )
}

export default App
