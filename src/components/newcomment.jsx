import React, { Component } from "react";
import axios from "axios";

class NewComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      message: null
    };
  }

  //update state with the current comment text
  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  handleSubmit = e => {
    //prevent the page from reloading
    e.preventDefault();

    console.log(this.state.text);
    //check that the comment has some text and then send it to the server.
    if (this.state.text === null || this.state.text.length < 5) {
      this.setState({
        message: "Kommenttisi on liian lyhyt."
      });
      return;
    } else {
      console.log(
        "lähetetään tämä serverille" +
          this.state.text +
          "osoitteeseen" +
          this.props.courseId
      );
      let data = {
        text: this.state.text,
        courseId: this.props.courseId
      };
      axios
        .post("/api/comments/" + this.props.courseId, data)
        .then(response => {
          console.log("serveri vastasi");
          let data = JSON.parse(response.data);
          console.log(data);
          this.setState({
            message: "Kommentti tallennettu."
          });
        });
    }
  };

  render() {
    return (
      <div>
        
        <div className="my-form">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Kirjoita kommentti:</label>
              <textarea
                className="textarea"
                value={this.state.text}
                onChange={this.handleChange}
              />
            </div>
            <input className="button" type="submit" value="Submit" />
          </form>
          <p>{this.state.message}</p>
        </div>
      </div>
    );
  }
}

export default NewComment;
