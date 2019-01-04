import React, { Component } from 'react';
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
            this.getSelectedCourse();
            this.getComments();
        }
        
    }

    //fetches the selected course's information from the server. the id is given to this component as a prop
    getSelectedCourse = () => {
        axios.get("/api/course/"+this.props.courseid).then(response => {
          
          var data = JSON.parse(response.data);
          console.log(data);
          this.setState({
              selected: data
          })
        });
    };

    getComments = () => {
        axios.get("/api/comments/"+this.props.courseid).then(response => {
        
        var data = JSON.parse(response.data);
        console.log(data);
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
                <p>yksittäinen kurssi</p>

            );
        }
    }
}
 
export default SelectedCourse;