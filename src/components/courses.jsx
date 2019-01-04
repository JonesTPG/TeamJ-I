import React, { Component } from "react";
import SelectedCourse from "./selectedcourse";
const axios = require("axios");

class Courses extends Component {
 constructor(props) {
   super(props);
   this.state = {
     courses: null,
     filter: "",
     selectedCourse: null,
     course_id: null
   };
   this.setFilter = this.setFilter.bind(this);
   this.setSelectedCourse = this.setSelectedCourse.bind(this);
 }

 // fetch data from mlab database, add to courses
 componentDidMount() {
   this.getDataFromDb();
 }
 getDataFromDb = () => {
   axios.get("/api/all").then(response => {
     console.log(response.data);
     var data = JSON.parse(response.data);
     this.setState({
       courses: data
     });
   });
 };

 setFilter(e) {
   this.setState({ filter: e.target.value });
 }

 setSelectedCourse(course) {
   this.setState({ course_id: course });
 }

 render() {
   if (this.state.courses === null) {
     return "loading";
   }

   const filtered = this.state.courses.filter(
     course =>
       course.coursename
         .toLowerCase()
         .indexOf(this.state.filter.toLowerCase()) !== -1
   );

   return (
     <React.Fragment>
       {" "}
       <br />
       <div className="course-container">
         <input
           value={this.state.filter}
           type="text"
           onChange={this.setFilter}
         />
         <ul>
           {filtered.map(course => (
             <li
               key={course._id}
               //className="course-list-item"
               onClick={() => this.setSelectedCourse(course._id)}
             >
               {course.courseid} {course.coursename}
             </li>
           ))}
         </ul>

         <SelectedCourse courseid={this.state.course_id}/>
       </div>
     </React.Fragment>
   );
 }
}

export default Courses;

