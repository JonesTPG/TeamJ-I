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
    axios.get('/api/comment/'+this.props.commentId).then(response => {
      var data = JSON.parse(response.data);
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

    axios
      .post("/api/comment/" + this.props.commentId + "/vote", data)
      .then(response => {
        this.setState({
          increment: this.state.increment + 1
        });
        
      });
  }

  decrement() {
    let data = {
      vote: 'downvote'
    };

    axios
      .post("/api/comment/" + this.props.commentId + "/vote", data)
      .then(response => { 
        this.setState({
          decrement: this.state.decrement - 1
        });
        
      });
  }

  render() {
    return (
      <div>
        <strong>kommentti {this.props.index+1}</strong>
        <p className="comment-text">{this.props.text}</p>
        <p>kommentoija: anonymous</p>
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
