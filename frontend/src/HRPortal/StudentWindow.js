import React, {useState} from 'react'
import FormValue from './FormValue';
import '../styles/StudentWindow.css';

class StudentWindow extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            student: props.student,
            edit: false,
            categories: props.student.categories,
            email: props.student.email,
            fname: props.student.fname,
            gradDate: props.student["grad_date"],
            interviewStatus: props.student["interview_status"],
            jobType: props.student["job_type"],
            lname: props.student.lname,
            locationPrefs: props.student["location_prefs"],
            major: props.student.major,
            phone: props.student.phone,
            resume: props.student.resume,
            school: props.student.school,
            linkedin: props.student.linkedin,
            constants: props.constants
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
            // editStudent.email = this.state.email;
            // editStudent.rating1 = this.state.rating1;
            // editStudent.rating2 = this.state.rating2;
            // editStudent.rating3 = this.state.rating3;
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

    GetFullName = () => {
        return this.state.lname + ", " + this.state.fname
    }

    render() {
        return (
            <div class="student-modal">
                <div class="student-modal-content">
                    <div class="student-modal-header">
                        <span class="close" id="student-modal-close" onClick={this.closeStudentWindow}>&times;</span>
                        <button class="modal-header-btn" onClick={this.editBtnClick}>{this.state.edit ? "Save" : "Edit"}</button>
                        <button class="modal-header-btn" onClick={this.delBtnClick}>{this.state.edit ? "Cancel" : "Delete"}</button>
                        <h2>{this.GetFullName()}</h2>
                    </div>
                    <div id="student-window" class="modal-body">
                        <FormValue label="First Name: " value={this.state.fname} edit={this.state.edit} inputType="text" stateKey="fname" parentCallback={this.onChangeCallback}/>
                        <FormValue label="Last Name: " value={this.state.lname} edit={this.state.edit} inputType="text" stateKey="lname" parentCallback={this.onChangeCallback}/>
                        <FormValue label="Email: " value={this.state.email} edit={this.state.edit} inputType="text" stateKey="email" parentCallback={this.onChangeCallback}/>
                        <FormValue label="Phone Number: " value={this.state.phone} edit={this.state.edit} inputType="number" stateKey="phone" parentCallback={this.onChangeCallback}/>
                        <FormValue label="School: " mappedValue={this.state.constants['Schools'][this.state.school]} value={this.state.school} edit={this.state.edit} inputType="text" stateKey="school" parentCallback={this.onChangeCallback}/>
                        <FormValue label="Major: " mappedValue={this.state.constants['Majors'][this.state.major]} value={this.state.major} edit={this.state.edit} inputType="text" stateKey="major" parentCallback={this.onChangeCallback}/>
                        <FormValue label="Graduation Date: " value={this.state.gradDate} edit={this.state.edit} inputType="date" stateKey="gradDate" parentCallback={this.onChangeCallback}/>
                        <FormValue label="Job Type: " value={this.state.jobType} edit={this.state.edit} inputType="text" stateKey="jobType" parentCallback={this.onChangeCallback}/>
                        <FormValue label="LinkedIn: " value={this.state.linkedin} edit={this.state.edit} inputType="text" stateKey="linkedin" parentCallback={this.onChangeCallback}/>
                        <FormValue label="Department Preferences: " value={this.state.categories} edit={this.state.edit} inputType="text" stateKey="categories" parentCallback={this.onChangeCallback}/>
                        <FormValue label="Location Preferences: " value={this.state.locationPrefs} edit={this.state.edit} inputType="text" stateKey="locationPreferences" parentCallback={this.onChangeCallback}/>
                    </div>
                </div>
            </div>
        );
    }
    

} export default StudentWindow;