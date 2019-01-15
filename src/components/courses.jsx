import React, { Component } from "react";
import SelectedCourse from "./selectedcourse";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";

const axios = require("axios");

const styles = theme => ({
  root: {
    width: "50%",
    maxWidth: 650,
    maxHeight: 400,
    backgroundColor: theme.palette.background.paper
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  }
});

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
      let data = JSON.parse(response.data);
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
          <div>
            <AppBar position="fixed">
              <Toolbar className="appbar">
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon className="search" />
                  </div>
                  <InputBase
                    className="search"
                    value={this.state.filter}
                    onChange={this.setFilter}
                    placeholder="Etsi..."
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                  />
                </div>
                <p className="site-title">Kurssipalaute.fi</p>
              </Toolbar>
            </AppBar>
          </div>

          <div className="body-container">

            
            <List className={classes.root}>
              {filtered.slice(0,14).map(course => (
                <div className="listElement"
                    key={course._id}>
                  <ListItem onClick={() => this.setSelectedCourse(course._id)}>
                      {course.courseid} {course.coursename}
                  </ListItem>
                  <Divider light />
                </div>
              ))}
            </List>
            
            <SelectedCourse courseid={this.state.course_id} />
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
