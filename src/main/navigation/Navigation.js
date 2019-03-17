import React, { Component } from "react";
import "./Navigation.css";
import Selection from "./Selection";
import Slider from "./Slider";
import Axios from "axios";
import Button from "./Button";

export default class Navigation extends Component {
  getGenres = () => {
    Axios.get(this.props.url).then(res => {
      this.props.setGenres(res.data.genres);
    });
  };

  componentDidMount() {
    if (this.props.genres != null) {
      return this.getGenres();
    }
    alert("hai");
  }

  render() {
    const {
      genre,
      genres,
      year,
      rating,
      runtime,
      onGenreChange,
      onSliderChange,
      onSearchButtonClick
    } = this.props;

    return (
      <section className="navigation">
        <Selection
          genre={genre}
          genres={genres}
          onGenreChange={onGenreChange}
        />
        <Slider data={year} onSliderChange={onSliderChange} />
        <Slider data={rating} onSliderChange={onSliderChange} />
        <Slider data={runtime} onSliderChange={onSliderChange} />

        <Button onClick={onSearchButtonClick}>Search</Button>
      </section>
    );
  }
}
