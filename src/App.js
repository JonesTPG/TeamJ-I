import React, { Component } from "react";
import "./App.css";
import Toolbar from "./components/toolbar";
import Courses from "./components/courses";
import SelectedCourse from "./components/selectedcourse";


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
