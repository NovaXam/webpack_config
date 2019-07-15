import "../polyfills";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const render = Container => {
  return ReactDOM.render(
      <Container />,
    document.getElementById("root")
  );
};

render(App);
