import React, { useState } from "react";
import "../styles/StudentData.css"

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
            <tr class="student-row" onClick={this.openStudentWindow}>
                <td className="student-field"><span class="student-name">{this.state.student.name}</span></td>
                <td className="student-field"><span class="student-email">{this.state.student.email}</span></td>
                <td className="student-field"><span class="student-rating1">{this.state.student.rating1}</span></td>
                <td className="student-field"><span class="student-rating2">{this.state.student.rating2}</span></td>
                <td className="student-field"><span class="student-rating3">{this.state.student.rating3}</span></td>
            </tr>
            
        );
    }
    
} export default StudentData;