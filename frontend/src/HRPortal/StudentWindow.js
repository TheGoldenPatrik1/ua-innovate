import React, {useState} from 'react'
import FormValue from './FormValue';
import '../styles/StudentWindow.css';
import axios from 'axios';

class StudentWindow extends React.Component{
    constructor(props) {
        super(props);
        props.student.technical_score = props.student.technical_score || null;
        props.student.behavioral_score = props.student.behavioral_score || null;
        props.student.comments = props.student.comments || null;
        this.navigation = props.navigation;
        console.log(props)
        this.state = {
            student: props.student,
            edit: false,
            categories: props.student.categories,
            email: props.student.email,
            fname: props.student.fname,
            grad_date: props.student["grad_date"],
            interview_status: props.student["interview_status"],
            technical_score: props.student["technical_score"],
            behavioral_score: props.student["behavioral_score"],
            comments: props.student["comments"],
            job_type: props.student["job_type"],
            lname: props.student.lname,
            location_prefs: props.student["location_prefs"],
            major: props.student.major,
            phone: props.student.phone,
            resume: props.student.resume,
            school: props.student.school,
            linkedin: props.student.linkedin,
            constants: props.constants
        };
    }

    closeStudentWindow = () => {
        this.props.parentCallback(-1);
    }
    editBtnClick =() => {
        if(this.state.edit) {
            this.setState({edit:false});
            const editParams = {};
            for (let key in this.state.student) {
                if (Array.isArray(this.state[key])) {
                    editParams[key] = this.state[key]
                } else if (this.state[key] !== this.state.student[key]) {
                    editParams[key] = this.state[key]
                }
            }
            console.log(editParams)
            axios.put('http://localhost:8080/api/students/' + this.state.student._id, editParams).then(r => {
                console.log(r);
                this.navigation(0);
            }).catch(e => {
                console.log(e);
            });
            const editStudent = this.state.student;
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
            const confirmation = window.confirm('Are you sure you want to delete this user? This action cannot be undone.');
            if (confirmation) {
                axios.delete(`http://localhost:8080/api/students/${this.state.student._id}`).then(r => {
				    axios.delete(`http://localhost:8080/api/users/${this.state.email}`).then(r => {
					    this.closeStudentWindow();
				    }).catch(e => {
					    console.log(e);
					    alert('Something went wrong in deleting their account.');
				    })
			    }).catch(e => {
				    console.log(e);
				    alert('Something went wrong in deleting their account.');
			    });
            }
        }
    }

    onChangeCallback = (key, newVal) => {
        let obj = {}
        obj[key] = newVal;
        this.setState(obj);
    }

    ResetForm = () => {
        this.setState({interview_status:this.state.student.interview_status});
        this.setState({technical_score:this.state.student.technical_score});
        this.setState({behavioral_score:this.state.student.behavioral_score});
        this.setState({comments:this.state.student.comments});
        
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
                        <FormValue label="Resume Link" href={this.state.resume} inputType="href"/>
                        <FormValue label="First Name: " value={this.state.fname} edit={this.state.edit} inputType="text" stateKey="fname" parentCallback={this.onChangeCallback}/>
                        <FormValue label="Last Name: " value={this.state.lname} edit={this.state.edit} inputType="text" stateKey="lname" parentCallback={this.onChangeCallback}/>
                        <FormValue label="Email: " value={this.state.email} edit={this.state.edit} inputType="text" stateKey="email" parentCallback={this.onChangeCallback}/>
                        <FormValue label="Phone Number: " value={this.state.phone} edit={this.state.edit} inputType="number" stateKey="phone" parentCallback={this.onChangeCallback}/>
                        <FormValue label="School: " value={this.state.constants['Schools'][this.state.school]} edit={this.state.edit} inputType="text" stateKey="school" parentCallback={this.onChangeCallback}/>
                        <FormValue label="Major: " value={this.state.constants['Majors'][this.state.major]} edit={this.state.edit} inputType="text" stateKey="major" parentCallback={this.onChangeCallback}/>
                        <FormValue label="Graduation Date: " value={this.state.grad_date} edit={this.state.edit} inputType="month" stateKey="grad_date" parentCallback={this.onChangeCallback}/>
                        <FormValue label="Job Type: " value={this.state.job_type} edit={this.state.edit} inputType="text" stateKey="job_type" parentCallback={this.onChangeCallback}/>
                        <FormValue label="LinkedIn: " value={this.state.linkedin} edit={this.state.edit} inputType="text" stateKey="linkedin" parentCallback={this.onChangeCallback}/>
                        <FormValue label="Department Preferences: " value={this.state.categories.map(v => this.state.constants['Departments'][v]).join(', ')} edit={this.state.edit} inputType="text" stateKey="categories" parentCallback={this.onChangeCallback}/>
                        <FormValue label="Location Preferences: " value={this.state.location_prefs.map(v => this.state.constants['Locations'][v]).join('; ')} edit={this.state.edit} inputType="text" stateKey="location_prefs" parentCallback={this.onChangeCallback}/>
                        <FormValue label="Interview Status: " editable={true} value={this.state.interview_status} edit={this.state.edit} inputType="select" options={['Pending Review', 'First Round', 'Final Round', 'Offer Sent', 'Hired']} stateKey="interview_status" parentCallback={this.onChangeCallback}/>
                        <FormValue label="Technical Score: " editable={true} value={this.state.technical_score} edit={this.state.edit} inputType="number" stateKey="technical_score" parentCallback={this.onChangeCallback} max={5} min={0}/>
                        <FormValue label="Behavioral Score: " editable={true} value={this.state.behavioral_score} edit={this.state.edit} inputType="number" stateKey="behavioral_score" parentCallback={this.onChangeCallback} max={5} min={0}/>
                        <FormValue label="Comments: " editable={true} value={this.state.comments} edit={this.state.edit} inputType="text" stateKey="comments" parentCallback={this.onChangeCallback}/>
                    </div>
                </div>
            </div>
        );
    }
    

} export default StudentWindow;