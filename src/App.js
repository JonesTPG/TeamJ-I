import React, { Component } from "react";
import "./App.css";
import Courses from "./components/courses";
import BottomAppBar from "./components/bottomAppBar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Courses />
        <BottomAppBar />
      </div>
    );
  }
}

export default App;
