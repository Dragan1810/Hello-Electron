import React, { Component } from "react";
import { render } from "react-dom";
import { Switch, Route } from "react-router-dom";
import axios from "axios";

import Home from "../src/pages/Home";
import About from "../src/pages/About";

export default class App extends Component {
  render() {
    return (
      <div className="container is-fluid">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/series/:id" component={About} />
          <Route component={Home} />
        </Switch>
      </div>
    );
  }
}
