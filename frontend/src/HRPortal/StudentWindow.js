import React, {useState} from 'react'
import FormValue from './FormValue';
import '../styles/StudentWindow.css';

class StudentWindow extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            student: props.student,
            edit: false,
            email : props.student.email,
            rating1 : props.student.rating1,
            rating2 : props.student.rating2,
            rating3 : props.student.rating3
        }
    }

    closeStudentWindow = () => {
        this.props.parentCallback(-1);
    }
    editBtnClick =() => {
        if(this.state.edit) {
            //TODO: Save functionality
            this.setState({edit:false});
            const editStudent = this.state.student;
            editStudent.email = this.state.email;
            editStudent.rating1 = this.state.rating1;
            editStudent.rating2 = this.state.rating2;
            editStudent.rating3 = this.state.rating3;
            this.setState({student:editStudent});
        } else {
            //Edit
            this.setState({edit:true});
        }
    }

    delBtnClick = () => {
        if(this.state.edit) {
            //Cancel
            this.setState({edit:false});
            this.ResetForm();
        } else {
            //TODO: Delete functionality
        }
    }

    onChangeCallback = (key, newVal) => {
        let obj = {}
        obj[key] = newVal;
        this.setState(obj);
    }

    ResetForm = () => {
        this.setState({email:this.state.student.email});
        this.setState({rating1:this.state.student.rating1});
        this.setState({rating2:this.state.student.rating2});
        this.setState({rating3:this.state.student.rating3});
        
    }

    render() {
        return (
            <div class="student-modal">
                <div class="student-modal-content">
                    <div class="student-modal-header">
                        <span class="close" id="student-modal-close" onClick={this.closeStudentWindow}>&times;</span>
                        <button class="modal-header-btn" onClick={this.editBtnClick}>{this.state.edit ? "Save" : "Edit"}</button>
                        <button class="modal-header-btn" onClick={this.delBtnClick}>{this.state.edit ? "Cancel" : "Delete"}</button>
                        <h2>{this.props.student.name}</h2>
                    </div>
                    <div id="student-window" class="modal-body">
                        <FormValue label="Email: " value={this.state.email} edit={this.state.edit} inputType="text" stateKey="email" parentCallback={this.onChangeCallback}/>
                        <FormValue label="Rating 1: " value={this.state.rating1} edit={this.state.edit} inputType="number" stateKey="rating1" parentCallback={this.onChangeCallback}/>
                        <FormValue label="Rating 2: " value={this.state.rating2} edit={this.state.edit} inputType="number" stateKey="rating2" parentCallback={this.onChangeCallback}/>
                        <FormValue label="Rating 3: " value={this.state.rating3} edit={this.state.edit} inputType="number" stateKey="rating3" parentCallback={this.onChangeCallback}/>
                    </div>
                </div>
            </div>
        );
    }
    

} export default StudentWindow;