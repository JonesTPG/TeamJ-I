import React, { Component } from 'react';

class Comment extends Component {
    constructor(props) {
        super(props);

        // const {text, upvotes, downvotes, username} = props;
        // console.log(text, upvotes, downvotes, username)

        this.state = {  }
    }
    render() { 
        return (
            <div>
                <h3>kommentti</h3>
                <p>{this.props.text}</p>
                <p>upvotet: {this.props.upvotes}</p>
                <p>downvotet: {this.props.downvotes}</p>
                <p>käyttäjä: {this.props.username}</p>
            </div>
            );
    }
}
 
export default Comment;