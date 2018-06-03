import React from "react";
import { Link } from "react-router-dom";
import { fromEvent } from "rxjs";

import db from "../db/index";
import getCrunchy from "../api/crunchyroll";

export default class extends React.Component {
  constructor() {
    super();
    this.state = {};
    getCrunchy();
  }
  componentDidMount() {
    this.sub = fromEvent(
      db.series.changes({ since: 0, live: true, include_docs: true }),
      "change"
    ).subscribe(change => console.log("series db change: ", change));
  }
  componentWillUnmount() {
    //this.sub.unsubscribe();
  }
  render() {
    return (
      <div>
        Hu
        <Link to="/about">About</Link>
        <p>fjwaoijowia</p>
      </div>
    );
  }
}
