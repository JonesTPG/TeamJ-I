import React, { Component } from 'react';
import axios from 'axios';


class Rating extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            selectedRating: '',
            infoMessage: ''
         }
    }

    //if the user navigates to a new course, clear the previous rating
    componentDidUpdate(prevProps, prevState) {
        if (this.props.courseId !== prevProps.courseId) {
            this.clearRating();
        }
    }

    //submit the rating to the server
    handleSubmit = e => {
        e.preventDefault();
        if (this.state.selectedRating === '') {
            console.log("ei arviointia");
            this.setState({
                infoMessage: 'Valitse kurssille arvio asteikolla 1-5.'
            })
            return;
        }
        console.log("annettu arviointi: " + this.state.selectedRating);

         //construct a json object which will be sent to the server
        let data = {
            rating: this.state.selectedRating.toString()
        };

        axios
            .post("/api/course/" + this.props.courseId + "/rating", data)
            .then(() => {
            this.setState({
                infoMessage: 'Arvostelu tallennettu.'
            });
            this.props.updateFunction();
                
            });

    }

    //clears the css classes so the stars appear black
    clearRating = () => {
        for (let i=1; i<=5; i++) {
            let element = document.getElementById(i + "-rating");
            element.classList.remove("checked");
        }
        this.setState({
            selectedRating: ''
        })
    }

    //updates the rating starts via css classes, and updates react state with correct rating value
    handleOptionChange = rating => {
        //when user gives a rating, make the stars orange up to the rated value
        for (let i=rating; i>=1; i--) {
            let element = document.getElementById(i + "-rating");
            element.classList.add("checked");
        }
        //and if there was orange stars beyond the given rate, make them black again
        for (let i=rating+1; i<=5; i++) {
            let element = document.getElementById(i + "-rating");
            element.classList.remove("checked");
        }
        //update the state so we can send the given rate to api when user wants to
        this.setState({
            selectedRating: rating
        })   
    }

    render() {
        return ( 
            <>
                <p>Arvostele kurssi:</p>

                <form onSubmit={this.handleSubmit}>
                    <span id="1-rating" className="fa fa-star" onClick={() => this.handleOptionChange(1)}></span>
                    <span id="2-rating" className="fa fa-star" onClick={() => this.handleOptionChange(2)}></span>
                    <span id="3-rating" className="fa fa-star" onClick={() => this.handleOptionChange(3)}></span>
                    <span id="4-rating" className="fa fa-star" onClick={() => this.handleOptionChange(4)}></span>
                    <span id="5-rating" className="fa fa-star" onClick={() => this.handleOptionChange(5)}></span>
                    <input className="button" type="submit" value="Lähetä" />
                </form>
                <p>{this.state.infoMessage}</p>
            </>
         );
    }
}
 
export default Rating;