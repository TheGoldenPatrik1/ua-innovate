import React, {useState} from 'react'
import './StudentWindow.css';

class StudentWindow extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            student: props.student
        }
    }

    closeStudentWindow = () => {
        this.props.parentCallback(-1);
    }
    render() {
        return (
            <div class="student-modal">
                <div class="student-modal-content">
                    <div class="student-modal-header">
                        <span class="close" id="student-modal-close" onClick={this.closeStudentWindow}>&times;</span>
                        <h2>{this.props.student.name}</h2>
                    </div>
                </div>
            </div>
        );
    }
    

} export default StudentWindow;