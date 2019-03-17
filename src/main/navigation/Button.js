import React from "react";
import "./SearchButton.css";

const Button = ({ onClick, children }) => (
  <div className="search-button">
    <button onClick={onClick}>{children}</button>
  </div>
);

export default Button;
