import React, { Component } from 'react';

class NewComment extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  
            <div>
                <p>uusi kommentti:
                    {this.props.courseId}
                </p>
            </div>
        );
    }
}
 
export default NewComment;