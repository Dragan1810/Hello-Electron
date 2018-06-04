import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { fromEvent, pipe } from "rxjs";
import { map, filter, scan, debounceTime } from "rxjs/operators";

import db from "../db/index";
import getCrunchy from "../api/crunchyroll";

import Series from "../components/Series";

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      series: []
    };
    getCrunchy();
  }
  componentDidMount() {
    this.sub = fromEvent(
      db.series.changes({ since: 0, live: true, include_docs: true }),
      "change"
    )
      .pipe(
        filter(change => !change.deleted),
        map(change => change[0].doc),
        scan((acc, doc) => [...acc, doc], []),
        debounceTime(1000)
      )
      .subscribe(series => this.setState({ series }));
  }
  componentWillUnmount() {
    this.sub.unsubscribe();
  }
  render() {
    const { series } = this.state;
    return (
      <>
        {_.chunk(series, 4).map((chunk, i) => (
          <div key={`num-${i}`} className="columns">
            {chunk.map(item => <Series key={item._id} series={item} />)}
          </div>
        ))}
      </>
    );
  }
}
