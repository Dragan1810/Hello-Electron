import React from "react";
import { withRouter } from "react-router-dom";

const Series = ({ series, history }) => {
  const getSeriesPage = () => {
    const pathname = `/series${series.link_id}`;
    history.push(pathname, series.url);
  };
  return (
    <div className="column card">
      <div className="card-image" onClick={getSeriesPage}>
        <figure className="image">
          <img src={series.image} alt={series.title} />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4">{series.title}</p>
            <p className="subtitle is-6">Videos count: {series.count}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Series);
