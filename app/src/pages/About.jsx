import React from "react";
import { withRouter } from "react-router-dom";

class About extends React.Component {
  render() {
    const { match } = this.props;
    return <div>Episode: {match.params.id}</div>;
  }
}

export default withRouter(About);
