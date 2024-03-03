import React, { useState } from "react";
import "./StudentData.css"

class StudentData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            student: props.student
        }
    }

    openStudentWindow = () => {
        this.props.parentCallback(this.state.student.id);
    }
    render() {
        return (
            <div class="student-row" onClick={this.openStudentWindow}>
                <span class="student-field student-name">{this.state.student.name}</span>
                <span class="student-field student-email">{this.state.student.email}</span>
                <span class="student-field student-rating1">{this.state.student.rating1}</span>
                <span class="student-field student-rating2">{this.state.student.rating2}</span>
                <span class="student-field student-rating3">{this.state.student.rating3}</span>
            </div>
            
        );
    }
    
} export default StudentData;