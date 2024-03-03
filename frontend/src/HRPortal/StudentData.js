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
                <td className="student-field"><span class="student-name">{`${this.state.student.lname}, ${this.state.student.fname}`}</span></td>
                <td className="student-field"><span class="student-grad-date">{this.state.student.grad_date}</span></td>
                <td className="student-field"><span class="student-status">{this.state.student.interview_status}</span></td>
                <td className="student-field"><span class="student-tech-score">{this.state.student.technical_score || 'N/A'}</span></td>
                <td className="student-field"><span class="student-behavior-score">{this.state.student.behavioral_score || 'N/A'}</span></td>
            </tr>
            
        );
    }
    
} export default StudentData;