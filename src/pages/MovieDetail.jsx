import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../App.css";

const MovieDetail = () => {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "f4b49333";

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`
        );
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchMovie();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!movie) return <p>No movie found.</p>;

  // ⭐ Convert rating (out of 10) into stars
  const ratingStars = (rating) => {
    if (!rating || rating === "N/A") return "No rating available";
    const stars = Math.round(rating / 2); // IMDB is out of 10, stars out of 5
    return "⭐".repeat(stars) + ` (${rating}/10)`;
  };

  return (
    <div className="movie-detail-container">
      {/* Left: Poster */}
      <div className="movie-poster">
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/400"
          }
          alt={movie.Title}
        />
      </div>

      {/* Right: Details */}
      <div className="movie-info">
        <h1>{movie.Title}</h1>
        <p className="tagline">{movie.Genre} • {movie.Year}</p>
        <p className="plot">{movie.Plot}</p>
        <p><strong>Director:</strong> {movie.Director}</p>
        <p><strong>Cast:</strong> {movie.Actors}</p>
        <p className="rating">
          <strong>IMDB Rating:</strong> {ratingStars(movie.imdbRating)}
        </p>
      </div>
    </div>
  );
};

export default MovieDetail;
