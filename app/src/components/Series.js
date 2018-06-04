import React from "react";

export default ({ series: { title, url, image, count } }) => (
  <div className="column card">
    <div className="card-image">
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
