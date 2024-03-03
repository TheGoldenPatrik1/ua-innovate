import StudentData from '../HRPortal/StudentData';
import Sidebar from '../HRPortal/Sidebar';
import StudentWindow from '../HRPortal/StudentWindow';
import React from 'react';
import "../styles/HRPortal.css"

class HRPortal extends React.Component {
    state = {
        students:GetStudents(),
        window: ''
    }
    handleCallback = (childData) => {
        if(childData == -1) {
            this.setState({window:''}) 
        } else {
            this.setState({window: <StudentWindow student={this.state.students[childData]} parentCallback={this.handleCallback} />})
        }
        
    }
    render() {
        
        const studentElements = [];
        const studentWindows = [];
        for(var i = 0; i < this.state.students.length; i++) {
            studentElements.push(<StudentData student={this.state.students[i]} parentCallback={this.handleCallback}/>)
        }
        return (
            <div class="portal">
              <Sidebar />
              <div id="main">
                <h1>HR Portal</h1>
                <input type="text" placeholder="search"/>
                <table id="student-table">
                    {/*TODO: figure out how to include table headers later */}
                    <tr className="heading-row">
                        <th><span>Name</span></th>
                        <th style={{width: "50%"}}><span>Email</span></th>
                        <th><span>Rating 1</span></th>
                        <th><span>Rating 2</span></th>
                        <th><span>Rating 3</span></th>
                    </tr>
                    
            
                    {studentElements}
                </table>
                {this.state.window}
                
              </div>
              
            </div>
            
          );
    }
    
}
export default HRPortal;

//Gets students from backend
function GetStudents() {
    var students = [];
    for(var i = 0; i < 5; i++) {
        students.push({
            id: i,
            name: "Student " + i,
            email: "something@example.com",
            major: "CS",
            school: "School " + i,
            rating1: Math.floor(Math.random() * 5),
            rating2: Math.floor(Math.random() * 5),
            rating3: Math.floor(Math.random() * 5)
        });
    }
    return students;
}

function ToggleStudentWindow(number) {
    console.log(number);
}