import React, { Component } from "react";
import { render } from "react-dom";
import { Switch, Route } from "react-router-dom";
import axios from "axios";

import Home from "../src/pages/Home";
import Series from "../src/pages/Series";
import ErrorScreen from "../src/pages/Error";

export default class App extends Component {
  render() {
    console.log(window.location);
    return (
      <div className="container is-fluid">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/series/:id" component={Series} />
          <Route component={ErrorScreen} />
        </Switch>
      </div>
    );
  }
}
