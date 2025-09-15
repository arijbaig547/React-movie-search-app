import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../App.css'

const Home = () => {
  const [query, setQuery] = useState("Batman"); // default search
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

const API_KEY = "f4b49333";

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
        );
        const data = await res.json();
        console.log(data)
        if (data.Search) {
          setMovies(data.Search);
        } else {
          setMovies([]);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchMovies();
  }, [query]);

return (
  <div className="container py-4">
    <h1 className="mb-4 text-center">🎬 Movie Search</h1>

    {/* Search Bar */}
    <div className="mb-4 d-flex justify-content-center">
      <input
        type="text"
        className="form-control w-50"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>

    {loading && <p className="text-center">Loading...</p>}

    {/* Movies List */}
    <div className="row">
      {movies.map((movie) => (
        <div key={movie.imdbID} className="col-md-3 mb-4">
          <div className="card h-100 shadow-sm">
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
              alt={movie.Title}
              className="card-img-top"
              style={{ height: "350px", objectFit: "cover" }}
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{movie.Title}</h5>
              <p className="card-text">{movie.Year}</p>
              <Link to={`/movie/${movie.imdbID}`} className="btn btn-primary mt-auto">
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>

    {!loading && movies.length === 0 && (
      <p className="text-center text-muted">No movies found.</p>
    )}
  </div>
);

};

export default Home;
