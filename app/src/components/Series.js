import React from "react";
export default ({ series: { title, url, image, count } }) => (
  <div>
    <img src={image} />
    <a href={url}>{title}</a>
    <span>{count}</span>
  </div>
);
