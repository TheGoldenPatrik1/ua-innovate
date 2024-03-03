import StudentData from '../HRPortal/StudentData';
import Sidebar from '../HRPortal/Sidebar';
import StudentWindow from '../HRPortal/StudentWindow';
import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/HRPortal.css"

function HRPortal() {
    const state = {
        students:GetStudents(),
        window: '',
    }

    

    const [students, setStudents] = useState(GetStudents());
    const [window, setWindow] = useState('');
    const [sideBarVisible, setSideBarVisible] = useState(true);

    const handleCallback = (childData) => {
        if(childData == -1) {
            setWindow('') 
        } else {
            setWindow(<StudentWindow student={students[childData]} parentCallback={handleCallback} />)
        }
        
    }

    const navigate = useNavigate();
    function createApplication() {
        navigate("/student/app");
    }
    function logoutClick() {
        navigate("/");
    }

    function toggleSideBarClick() {
        console.log(sideBarVisible);
        setSideBarVisible(!sideBarVisible);
    }
    const studentElements = [];
    const studentWindows = [];
    for(var i = 0; i < students.length; i++) {
        studentElements.push(<StudentData student={students[i]} parentCallback={handleCallback}/>)
    }
    return (
        <div class="portal">
            <Sidebar visible={sideBarVisible}/>
            <div id="main">
                <button id="toggle-side-panel-button" onClick={toggleSideBarClick}>-</button>
            <div>
                <h1>HR Portal</h1>
                <button id="create-new-button" onClick={createApplication}>Create New</button>
                <button id="logout-button" onClick={logoutClick}>Log Out</button>
            </div>
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
            {window}
            
            </div>
            
        </div>
        
    );
    
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