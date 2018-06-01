import React, { Component } from "react";
import { render } from "react-dom";
import Logo from "./components/Logo/";
import Link from "./components/Link/";

import ElectronImg from "./assets/electron.png";
import ReactImg from "./assets/react.png";
import WebpackImg from "./assets/webpack.png";

const logos = [ElectronImg, ReactImg, WebpackImg];

export default class App extends Component {
  render() {
    const logosRender = logos.map((logo, index) => {
      return <Logo key={index} src={logo} />;
    });

    return (
      <div>
        {logosRender}
        <div className="hello">
          <h1>Hello Reacheaioghoighoaehgoaet!</h1>
        </div>
      </div>
    );
  }
}
