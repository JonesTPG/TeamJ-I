import React, { Component } from "react";
import Comment from "./comment";
import NewComment from "./newcomment";
import axios from "axios";

class SelectedCourse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: {}, //stores the currently selected course's information
      comments: null //stores the comments related to selected course
    };
  }

  //this component is dependent from the course id it gets, so we have to listen to
  //possible changes
  componentDidUpdate(prevProps, prevState) {
    if (this.props.courseid !== prevProps.courseid) {
      this.getSelectedCourse();
      this.getComments();
    }
  }

  //fetches the selected course's information from the server. the id is given to this component as a prop
  getSelectedCourse = () => {
    axios.get("/api/course/" + this.props.courseid).then(response => {
      let data = JSON.parse(response.data);
      this.setState({
        selected: data
      });
    });
  };

  //fetch the comments of a certain course from the database
  getComments = () => {
    axios.get("/api/comments/" + this.props.courseid).then(response => {
      let data = JSON.parse(response.data);
      if (data.length === 0) {
        this.setState({
          comments: null
        });
        return;
      }
      this.setState({
        comments: data
      });
    });
  };

  updateComments = () => {
    this.getComments();
    this.forceUpdate();
  };

  render() {
    let id = this.props.courseid;

    //there is no course selected
    if (id === null || id === "" || id === undefined) {
      return <p className="noCourseTxt">Valitse jokin kurssi</p>;
    }

    //there are no comments, so don't render the comments list
    else if (this.state.comments === null) {
      return (
        <div className="selectedCourse">
          <div className="course-view">
            <h3>
              {this.state.selected.coursename} {this.state.selected.courseid}
              <hr />
            </h3>
            <h4>Kurssin rating: {this.state.selected.rating}</h4>
            <div className="comments-list">
              <p>Ei kommentteja.</p>

              <div className="new-comment">
                <NewComment
                  courseId={this.props.courseid}
                  updateFunction={this.updateComments}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    //course is selected and it has comments, display the information
    else {
      return (
        <div className="selectedCourse">
          <div className="course-view">
            <h3>
              {this.state.selected.coursename} {this.state.selected.courseid}
              <hr />
            </h3>
            <h4>Kurssin rating: {this.state.selected.rating}</h4>
            <div className="comments-list">
              <ul>
                {this.state.comments.map((comment, index) => (
                  <div key={comment._id}>
                    <Comment
                      text={comment.text}
                      upvotes={comment.upvotes}
                      downvotes={comment.downvotes}
                      username={comment.username}
                      commentId={comment._id}
                      index={index}
                    />{" "}
                    <hr />
                  </div>
                ))}
              </ul>
            </div>

            <div className="new-comment">
              <NewComment
                courseId={this.props.courseid}
                updateFunction={this.updateComments}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default SelectedCourse;
