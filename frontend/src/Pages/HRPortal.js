import StudentData from '../HRPortal/StudentData';
import Sidebar from '../HRPortal/Sidebar';
import StudentWindow from '../HRPortal/StudentWindow';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/HRPortal.css";
import axios from "axios";

function sortByName(a, b) {
    if (a.lname < b.lname) return -1;
    if (a.lname > b.lname) return 1;
    // If the first keys are equal, sort based on the second key
    if (a.fname < b.fname) return -1;
    if (a.fname > b.fname) return 1;
    return 0;
}

function HRPortal() {
    const [students, setStudents] = useState({});
    const [studentData, setStudentData] = useState({});
    const [window, setWindow] = useState('');
    const [sideBarVisible, setSideBarVisible] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            const response = await axios.get(`http://localhost:8080/api/students`);
            const data = response.data.sort(sortByName);
            setStudentData(data);
            setStudents(data);
        }

        fetchStudents();
    }, [])

    const handleCallback = (childData) => {
        if(childData === -1) {
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
                    <th style={{width: "50%"}}><span>Grad Date</span></th>
                    <th><span>Application Status</span></th>
                    <th><span>Technical Score</span></th>
                    <th><span>Behavioral Score</span></th>
                </tr>
                
        
                {studentElements}
            </table>
            {window}
            
            </div>
            
        </div>
        
    );
    
}
export default HRPortal;