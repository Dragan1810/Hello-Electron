import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import "./global.css";

const Root = () => (
  <Router>
    <App />
  </Router>
);

render(<Root />, document.getElementById("app") as HTMLElement);
