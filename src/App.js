import React, { Component } from "react";
import "./App.css";
import Courses from "./components/courses";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Courses />
      </div>
    );
  }
}

export default App;
