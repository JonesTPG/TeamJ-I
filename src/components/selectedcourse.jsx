import React, { Component } from 'react';
import Comment from './comment';
import NewComment from './newcomment';
const axios = require('axios');


class SelectedCourse extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            selected: {}, //stores the currently selected course's information 
            comments: [{}] //stores the comments related to selected course
        }   
    }

   
    //this component is dependent from the course id it gets, so we have to listen to
    //possible changes
    componentDidUpdate(prevProps, prevState) {
        
        if (this.props.courseid !== prevProps.courseid) {
            this.getSelectedCourse()
            this.getComments();
        }    
    }

    //fetches the selected course's information from the server. the id is given to this component as a prop
    getSelectedCourse = () => {
        axios.get("/api/course/"+this.props.courseid).then(response => {
          
          let data = JSON.parse(response.data);
          this.setState({
              selected: data
          })
        });
    };

    getComments = () => {
        axios.get("/api/comments/"+this.props.courseid).then(response => {
        
        let data = JSON.parse(response.data);
        if (data.length === 0) {
            this.setState({
                comments:[{}]
            })
            return;
        }
        this.setState({
            comments: data
        })
        });
    };



    render() { 
        
        let id = this.props.courseid;
        
        //there is no course selected
        if (id === null || id === '' || id === undefined) {
            return (
                <p>ei valittua kurssia</p>
            )
        }
        
        //course is selected, display it's information
        else {

            return ( 
                <div className="course-view">
                
                    <h3>Valittu kurssi: {this.state.selected.coursename} </h3>
                    <h3>Kurssin id: {this.state.selected.courseid}</h3>

                    <div className="comments-list">
                        
                        <ul>
                            {this.state.comments.map(comment => (
                            <Comment
                                key={comment._id}
                                text={comment.text}
                                upvotes={comment.upvotes}
                                downvotes={comment.downvotes}
                                username={comment.username}
                            >
                            </Comment>
                            ))}
                        </ul>
                    </div>

                    <div className="new-comment">
                             <NewComment courseId={this.props.courseId}></NewComment>   
                                
                    </div>


                </div>

            );
        }
    }
}
 
export default SelectedCourse;