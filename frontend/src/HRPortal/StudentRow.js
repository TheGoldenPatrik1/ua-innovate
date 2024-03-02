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
                <td><span class="student-field student-name">{this.state.student.name}</span></td>
                <td><span class="student-field student-email">{this.state.student.email}</span></td>
                <td><span class="student-field student-rating1">{this.state.student.rating1}</span></td>
                <td><span class="student-field student-rating2">{this.state.student.rating2}</span></td>
                <td><span class="student-field student-rating3">{this.state.student.rating3}</span></td>
                {/* <StudentWindow student={this.state.student} visible={this.state.visible} parentCallback={this.handleCallback}/> */}
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

