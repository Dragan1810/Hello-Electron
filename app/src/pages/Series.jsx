import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { fromEvent, pipe } from "rxjs";
// our packages
import db from "../db";
import { getCrunchyEpisode } from "../api/crunchyroll";
// our components
import Episode from "../components/episode";

export default class Series extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      episodes: []
    };
    // trigger episodes loading
    const { location } = props;
    getCrunchyEpisode(location.state);
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
    const { episodes } = this.state;

    return (
      <div>
        {_.chunk(episodes, 4).map((chunk, i) => (
          <div key={`chunk_${i}`} className="columns">
            {chunk.map(ep => <Episode key={ep._id} episode={ep} />)}
          </div>
        ))}
      </div>
    );
  }
}
