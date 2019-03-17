import React, { Component } from "react";
import Navigation from "./navigation/Navigation";
import Movies from "./movies/Movies";
import Axios from "axios";
import "./Main.css";

export default class Main extends Component {
  state = {
    page: 1,
    total_pages: 1,
    moviesUrl: `https://api.themoviedb.org/3/discover/movie?api_key=5d16317ec483c239f8eb5c0a7e6e3a94&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`,
    url: `https://api.themoviedb.org/3/genre/movie/list?api_key=5d16317ec483c239f8eb5c0a7e6e3a94&language=en-US`,
    genre: "Comedy",
    genres: [],
    year: {
      label: "year",
      min: 1990,
      max: 2018,
      step: 1,
      value: { min: 2000, max: 2018 }
    },
    rating: {
      label: "rating",
      min: 0,
      max: 10,
      step: 1,
      value: { min: 8, max: 10 }
    },
    runtime: {
      label: "runtime",
      min: 0,
      max: 300,
      step: 15,
      value: { min: 60, max: 100 }
    },
    movies: []
  };

  onSliderChange = data => {
    this.setState({
      [data.type]: { ...this.state[data.type], value: data.value }
    });
  };

  setGenres = genres => {
    this.setState({
      genres
    });
  };

  onGenreChange = event => {
    this.setState({
      genre: event.target.value
    });
  };

  generateUrl = params => {
    const { genres, rating, year, runtime, page } = params;
    //const selectedGenre = genres.find(genre => genre.name === params.genre);
    console.log(genres);
    // const genreId = selectedGenre.id;

    const moviesUrl =
      `https://api.themoviedb.org/3/discover/movie?` +
      `api_key=5d16317ec483c239f8eb5c0a7e6e3a94&` +
      `language=en-US&sort_by=popularity.desc&` +
      `primary_release_date.gte=${year.value.min}-01-01&` +
      `primary_release_date.lte=${year.value.max}-12-31&` +
      `vote_average.gte=${rating.value.min}&` +
      `vote_average.lte=${rating.value.max}&` +
      `with_runtime.gte=${runtime.value.min}&` +
      `with_runtime.lte=${runtime.value.max}&` +
      `page=${page}`;

    this.setState({ moviesUrl });
  };

  onSearchButtonClick = () => {
    this.setState({ page: 1 });
    this.generateUrl(this.state);
  };

  getMovies = url => {
    Axios.get(url)
      .then(res => {
        const movies = res.data.results;
        this.setState({
          movies,
          total_pages: res.data.total_pages
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  onPageIncrease = () => {
    const { page, total_pages } = this.state;
    const nextPage = page + 1;
    if (nextPage <= total_pages) {
      this.setState({
        page: nextPage
      });
    }
  };

  onPageDecrease = () => {
    const { page /* total_pages */ } = this.state;
    const nextPage = page - 1;
    if (nextPage > 0) {
      this.setState({
        page: nextPage
      });
    }
  };

  saveStateToLocalStorage = () => {
    localStorage.setItem("sweetpumpkins.params", JSON.stringify(this.state));
  };

  getStateFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("sweetpumpkins.params"));
  };

  componentDidMount() {
    const savedState = this.getStateFromLocalStorage();
    if (!savedState || (savedState && !savedState.movies.length)) {
      return this.getMovies(this.state.moviesUrl);
    }
    this.setState({ ...savedState });
    this.generateUrl(savedState);
  }

  componentWillUpdate(nextProps, nextState) {
    this.saveStateToLocalStorage();
    if (this.state.moviesUrl !== nextState.moviesUrl) {
      this.getMovies(nextState.moviesUrl);
    }
    if (this.state.page !== nextState.page) {
      this.generateUrl(nextState);
    }
  }

  render() {
    const {
      onGenreChange,
      onSliderChange,
      setGenres,
      onSearchButtonClick,
      onPageIncrease,
      onPageDecrease
    } = this;
    return (
      <section className="main">
        {/* <button onClick={() => this.props.ubahState("401")}>keluar</button> */}
        <Navigation
          onGenreChange={onGenreChange}
          onSliderChange={onSliderChange}
          setGenres={setGenres}
          onSearchButtonClick={onSearchButtonClick}
          {...this.state}
        />
        <Movies
          url={this.state.moviesUrl}
          {...this.state}
          onPageDecrease={onPageDecrease}
          onPageIncrease={onPageIncrease}
        />
      </section>
    );
  }
}
