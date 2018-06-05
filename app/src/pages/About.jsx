import React from "react";
//import { withRouter } from "react-router-dom";
import { getCrunchyEpisode } from "../api/crunchyroll";

class About extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    const { state: url } = this.props.location;
    getCrunchyEpisode(url);
  }
  render() {
    const { match } = this.props;
    return <div>Episode: {match.params.id}</div>;
  }
}

export default About;
