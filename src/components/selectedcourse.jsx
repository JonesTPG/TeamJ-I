import React, { Component } from 'react';
const axios = require('axios');

class SelectedCourse extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            
            selected: {} //store's the currently selected course's information

        }
        console.log(this.props.courseid)
        
    }

    componentDidMount() {
       
        this.getSelectedCourse();


    }

    //fetches the selected course's information from the server. the id is given to this component as a prop
    getSelectedCourse = () => {
        axios.get("/api/"+this.props.id).then(response => {
          console.log(response.data);
          var data = JSON.parse(response.data);
          this.setState({
              selected: data
          })
        });
      };

    render() { 

        const courseid = this.props.courseid;
        console.log(courseid);
        //there is no course selected
        if (this.props.id === null || this.props.id === '') {
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