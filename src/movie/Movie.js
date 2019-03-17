import React, { Component } from "react";
import Axios from "axios";
import Loading from "./Loading";
import MovieData from "./MovieData";

class Movie extends Component {
  state = {
    movie: {},
    isLoading: true
  };
  getMovieId = () => {
    Axios.get(
      `https://api.themoviedb.org/3/movie/${
        this.props.match.params.id
      }?api_key=5d16317ec483c239f8eb5c0a7e6e3a94&language=en-US`
    )
      .then(res => {
        const movie = res.data;
        this.setState({
          movie,
          isLoading: false
        });
        console.log(this.state.movie);
      })
      .catch(err => {
        console.log(err, ">>>>Movie");
      });
  };

  componentDidMount() {
    this.getMovieId();
  }
  render() {
    const { isLoading /*movie*/ } = this.state;
    return <div>{isLoading ? <Loading /> : <MovieData {...this.state} />}</div>;
  }
}

export default Movie;
