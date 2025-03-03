import React from 'react';

function MovieCard({key, movie }) {
    return (
        <div className="movie-card" key={key} style={{ border: '1px solid #ddd' }}>
            <h2>{movie.title} ({movie.year})</h2>
            <img src={movie.poster} alt={movie.title} style={{ width: '100px', height: 'auto' }} />
            <p>Plot: <br/>{movie.plot}</p>
            <p>Genres:{movie.genres.join(", ")}</p>
            <p>Match Score: {movie.score*100}%</p>
        </div>
    );
}

export default MovieCard;