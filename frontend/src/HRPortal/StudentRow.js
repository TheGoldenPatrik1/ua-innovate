import "./StudentRow.css"
import StudentWindow from "./StudentWindow";
import React, {useState} from 'react'

class StudentRow extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            student: props.student,
            visible: false
        }
    }

    toggleStudentWindow = () => {
        this.setState(prevState => ({
            visible: !prevState.visible
        }));
        console.log(this.state.visible);
    }

    render() {
        return (
            <tr class="student-row" onClick={this.toggleStudentWindow}>
                <td><span class="student-field student-name">{`${this.state.student.lname}, ${this.state.student.fname}`}</span></td>
                <td><span class="student-field student-grad-date">{this.state.student.grad_date}</span></td>
                <td><span class="student-field student-status">{this.state.student.interview_status}</span></td>
                <td><span class="student-field student-tech-score">{this.state.student.technical_score || 'N/A'}</span></td>
                <td><span class="student-field student-behavior-score">{this.state.student.behavioral_score || 'N/A'}</span></td>
                {this.state.visible ===true && (
                    <div class="student-modal">
                        <div class="student-modal-content">
                            <div class="student-modal-header">
                                <span class="close" id="student-modal-close" onClick={this.toggleStudentWindow}>&times;</span>
                                <h2>{this.state.student.name}</h2>
                            </div>
                        </div>
                    </div>
                )}
                
            </tr>
            
        );
    }

} export default StudentRow;

