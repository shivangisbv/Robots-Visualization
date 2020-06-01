import React, { Component } from "react";

import GridLayout from "../components/GridLayout";
import "./../style/style.css";

export default class App extends Component {
  render() {
    return (
      <div className="app-layout">
        <GridLayout />
      </div>
    );
  }
}
