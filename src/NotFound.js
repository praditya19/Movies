import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1>Page Not Found</h1>
      <Link to="/">
        <h1>Back to Before Page</h1>
      </Link>
    </div>
  );
};

export default NotFound;
