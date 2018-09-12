import React from "react";
import ReactDOM from "react-dom";
import MovieList from "./components/MovieList";
import styles from "./styles.scss";

const App = () => {
  return (
    <div>
      <MovieList />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app-container"));
