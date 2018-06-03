import React from "react";
import { Link } from "react-router-dom";

import db from "../db/index";

export default class extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.init();
  }
  async init() {
    const info = await db.info();
    console.log("DB INFO", info);
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
