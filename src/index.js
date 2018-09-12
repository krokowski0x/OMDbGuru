import React from "react";
import ReactDOM from "react-dom";

import styles from "./styles.scss";

const App = () => {
  return (
    <div>
      <h1>Hello!</h1>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app-container"));
