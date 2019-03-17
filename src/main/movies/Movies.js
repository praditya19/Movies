import React from "react";
import MovieListItems from "./MovieListItems";
import "./Movies.css";
import Button from "../navigation/Button";

const Movies = ({ movies, page, onPageDecrease, onPageIncrease }) => {
  return (
    <section>
      <ul className="movies">
        {movies.map(movie => {
          return <MovieListItems key={movie.id} movie={movie} />;
        })}
      </ul>
      <div className="pagination">
        <Button onClick={onPageDecrease}>Pref</Button>
        <span>{`page ${page}`}</span>
        <Button onClick={onPageIncrease}>Next</Button>
      </div>
    </section>
  );
};

export default Movies;
