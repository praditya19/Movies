import React from "react";
import "./MovieData.css";
const MovieData = ({ movie }) => {
  const {
    title,
    backdrop_path,
    release_date,
    genres,
    overview,
    vote_average,
    runtime
  } = movie;

  const releaseYear = release_date ? release_date.substring(0, 4) : null;
  const imgUrl = `http://image.tmdb.org/t/p/w1280/${backdrop_path}`;
  const backgroundStyle = {
    backgroundImage: `url(${imgUrl})`
  };

  return (
    <div className="movie-page">
      <div className="movie-backdrop" style={backgroundStyle} />
      <div className="movie-details">
        <h1>
          {title}
          <span>({releaseYear})</span>
        </h1>
        <section className="genres">
          {genres.map((genre, index) => (
            <div key={genre.id}>
              <span>{genre.name}</span>
              {index < genres.length - 1 && (
                <span className="separator">|</span>
              )}
            </div>
          ))}
        </section>
        <img
          className=""
          src={imgUrl}
          alt=""
          srcset=""
          style={backgroundStyle}
        />
        <h5>
          Rating:
          <span>{vote_average}</span>
        </h5>
        <h5>
          Runtime:
          <span>{`${runtime} min`}</span>
        </h5>
        <h4>Overview</h4>
        <p>{overview}</p>
      </div>
    </div>
  );
};

export default MovieData;
