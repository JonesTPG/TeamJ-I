import React, { Component } from "react";
import SelectedCourse from "./selectedcourse";
import TextField from "@material-ui/core/TextField";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
const axios = require("axios");

const styles = theme => ({
  root: {
    width: "50%",
    maxWidth: 650,
    maxHeight: 400,
    backgroundColor: theme.palette.background.paper
  }
});

class Courses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: true,
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

  handleToggle = () => {
    this.setState({
      checked: !this.state.checked
    });
  };

  setFilter(e) {
    this.setState({ filter: e.target.value });
  }

  setSelectedCourse(course) {
    this.setState({ course_id: course });
  }

  render() {
    const { classes } = this.props;

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
        <div>
          <AppBar position="static" color="primary">
            <Toolbar>
              <TextField
                value={this.state.filter}
                onChange={this.setFilter}
                label="Etsi..."
              />
            </Toolbar>
          </AppBar>

          <div className="course-container">
            <List className={classes.root}>
              {filtered.map(course => (
                <div className="listElement">
                  <ListItem
                    key={course._id}
                    onClick={() => this.setSelectedCourse(course._id)}
                  >
                    {course.courseid} {course.coursename}
                    <ListItemSecondaryAction>
                      <Checkbox
                        checked={this.state.isChecked}
                        onChange={this.handleToggle}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider light />
                </div>
              ))}
            </List>
            <div className="selectedCourse">
              <SelectedCourse courseid={this.state.course_id} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
Courses.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Courses);
