import React, { Component } from "react";
import "./App.css";
import Toolbar from "./components/toolbar";
import Courses from "./components/courses";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Toolbar />
        <Courses />
      </div>
    );
  }
}

export default App;
