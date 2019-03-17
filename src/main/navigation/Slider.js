import React, { Component } from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import "./Slider.css";

export default class Slider extends Component {
  onChange = range => {
    this.props.onSliderChange({
      type: this.props.data.label,
      value: range
    });
  };
  render() {
    const { label, min, max, step, value } = this.props.data;
    return (
      <div className="slider">
        <label>{label}</label>
        <InputRange
          minValue={min}
          maxValue={max}
          step={step}
          onChange={this.onChange}
          value={value}
        />
      </div>
    );
  }
}
