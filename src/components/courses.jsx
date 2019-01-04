import React, { Component } from "react";
const axios = require("axios");

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: null
    };
  }

  componentDidMount() {
    this.getDataFromDb();
  }
  getDataFromDb = () => {
    axios.get("/api/all").then(response => {
      console.log(response.data);
      var data = JSON.parse(response.data);
      this.setState({
          courses: data
      })
    });
  };

  render() {
    if (this.state.courses === null) {
      return "loading";
    }

    return (
      <React.Fragment>
        {" "}
        <h1>Test</h1>
        <ul>
          {this.state.courses.map(course => (
            <li
              key={course._id}
              //className="course-list-item"
              //onClick={() => this.setSelectedcourse(course)}
            >
              {course.coursename}
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

export default Courses;

