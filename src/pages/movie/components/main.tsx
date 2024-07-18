import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./styles/main.scss";

interface Movie {
  _id: string;
  title: string;
  thumbnail: string;
}

const Main: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "https://movie-app-server-9gfs.onrender.com/api/v1/movies"
        );
        setMovies(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="main-container">
      <div className="movies-header">
        <div className="movies-search">
          <input
            type="text"
            className="search-movie"
            placeholder="найти аниме..."
          />
        </div>
      </div>
      <div className="movies-bar">
        <div className="all-movies-limited">
          <div className="movie-container">
            {loading
              ? Array(28)
                  .fill(null)
                  .map((_, index) => (
                    <div className="movie-card" key={index}>
                      <div className="card-thumbnail">
                        <Skeleton
                          height={280}
                          baseColor="#6d6d6d"
                          highlightColor="#161616"
                        />
                      </div>
                      <div className="card-infos">
                        <Skeleton
                          count={1}
                          baseColor="#6d6d6d"
                          highlightColor="#161616"
                        />
                      </div>
                    </div>
                  ))
              : movies.map((movie) => (
                  <Link to={`/movies/${movie._id}`} key={movie._id}>
                    <div className="movie-card">
                      <div className="card-thumbnail">
                        <div className="card-status">TV</div>
                        <img src={movie.thumbnail} alt={movie.title} />
                      </div>
                      <div className="card-infos">{movie.title}</div>
                    </div>
                  </Link>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
