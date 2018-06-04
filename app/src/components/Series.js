import React from "react";
import { withRouter } from "react-router-dom";

const Series = ({ series: { title, url, image, count, id }, history }) => {
  const getSeriesPage = () => {
    const location = {
      pathname: `/series${id}`,
      state: url
    };
    history.push(location);
  };
  return (
    <div className="column card">
      <div className="card-image" onClick={getSeriesPage}>
        <figure className="image">
          <img src={image} alt={title} />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4">{title}</p>
            <p className="subtitle is-6">Videos count: {count}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Series);
