import React from "react";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="page_not_found">
      <h1>Page not found :(</h1>
      <p>Try again with different options.</p>
      <button
        className="btn"
        onClick={() => {
          navigate("/");
        }}
      >
        go to home
      </button>
    </div>
  );
}

export default PageNotFound;
