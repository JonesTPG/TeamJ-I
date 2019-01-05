import React, { Component } from "react";
import SelectedCourse from "./selectedcourse";
import TextField from "@material-ui/core/TextField";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
const axios = require("axios");

class Courses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: null,
      filter: "",
      selectedCourse: null,
      course_id: null //stores the currently selected course id
    };
    this.setFilter = this.setFilter.bind(this);
    this.setSelectedCourse = this.setSelectedCourse.bind(this);
  }

  // fetch data from mlab database, add to courses
  componentDidMount() {
    this.getDataFromDb();
  }

  getDataFromDb = () => {
    axios.get("/api/all").then(response => {
      console.log(response.data);
      var data = JSON.parse(response.data);
      this.setState({
        courses: data
      });
    });
  };

  setFilter(e) {
    this.setState({ filter: e.target.value });
  }

  setSelectedCourse(course) {
    this.setState({ course_id: course });
  }

  render() {
    if (this.state.courses === null) {
      return "loading";
    }

    const filtered = this.state.courses.filter(
      course =>
        course.coursename
          .toLowerCase()
          .indexOf(this.state.filter.toLowerCase()) !== -1
    );

    return (
      <React.Fragment>
        {" "}
        <div className="course-container">
          <AppBar position="static" color="primary">
            <Toolbar>
              <TextField
                value={this.state.filter}
                onChange={this.setFilter}
                label="Etsi..."
              />
            </Toolbar>
          </AppBar>
          <ul>
            {filtered.map(course => (
              <li
                key={course._id}
                //className="course-list-item"
                onClick={() => this.setSelectedCourse(course._id)}
              >
                {course.courseid} {course.coursename}
              </li>
            ))}
          </ul>

          <SelectedCourse courseid={this.state.course_id} />
        </div>
      </React.Fragment>
    );
  }
}

export default Courses;
