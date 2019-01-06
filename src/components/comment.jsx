import React, { Component } from "react";
import axios from 'axios';
import IconButton from "@material-ui/core/IconButton";
import ThumbsUpIcon from "@material-ui/icons/ThumbUp";
import ThumbsDownIcon from "@material-ui/icons/ThumbDown";

class Comment extends Component {
  constructor(props) {
    super(props);

    // const {text, upvotes, downvotes, username} = props;
    // console.log(text, upvotes, downvotes, username)

    this.state = {
      increment: 0,
      decrement: 0
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  componentDidMount() {
    //get upvotes and downvotes for the specific comment
    console.log("haetaan upvotet")
    axios.get('/api/comment/'+this.props.commentId).then(response => {
      console.log(response.data)
      var data = JSON.parse(response.data);
      console.log(data.upvotes);
      this.setState({
        increment: data.upvotes,
        decrement: -data.downvotes
      });
     
    });


  }
  increment() {
    //post request add upvote

    let data = {
      vote: 'upvote'
    };

    console.log(this.props.commentId)
    axios
      .post("/api/comment/" + this.props.commentId + "/vote", data)
      .then(response => {
        console.log("serveri vastasi");
        
        this.setState({
          increment: this.state.increment + 1
        });
        
      });
  }
  decrement() {
    let data = {
      vote: 'downvote'
    };

    console.log(this.props.commentId)
    axios
      .post("/api/comment/" + this.props.commentId + "/vote", data)
      .then(response => {
        console.log("serveri vastasi");
        
        this.setState({
          decrement: this.state.decrement - 1
        });
        
      });
  }
  render() {
    return (
      <div>
        <h3>kommentti</h3>
        <p>{this.props.text}</p>
        <p>käyttäjä: anonymous</p>
        <div>
          {this.state.increment}
          <IconButton
            aria-label="ThumbUp"
            className="countUp"
            onClick={this.increment}
          >
            <ThumbsUpIcon />
          </IconButton>
          <IconButton
            aria-label="Delete"
            className="countDown"
            onClick={this.decrement}
          >
            <ThumbsDownIcon />
          </IconButton>
          {this.state.decrement}
        </div>
      </div>
    );
  }
}

export default Comment;
