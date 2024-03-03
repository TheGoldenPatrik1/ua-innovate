import StudentData from '../HRPortal/StudentData';
import Sidebar from '../HRPortal/Sidebar';
import StudentWindow from '../HRPortal/StudentWindow';
import React, { useState, useEffect, forceUpdate } from 'react';
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
    const [filters, setFilters] = useState({});

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

    function filterUpdated(id, key, value) {
        // console.log(id);
        // console.log(key);
        // console.log(value);
        // console.log(students[0][key]);
        let newFilters = filters
        if(value) {
            if(key in newFilters) {
                newFilters[key].push(id);
            } else {
                newFilters[key] = [id];
            }
            
            
        } else {
            console.log(filters);
            const index = newFilters[key].indexOf(id);
            newFilters[key].splice(index, 1);
            if(newFilters[key].length === 0) {
                delete newFilters[key];
            }
        }

        console.log(studentData);
            console.log(key)
            console.log(id);
            let newStudents = [];
            
            console.log(Object.keys(newFilters).length);
            if(Object.keys(newFilters).length === 0) {
                newStudents = studentData;
            } else {
                for(let i = 0; i < studentData.length; i++) {
                    let addStudent = true;
                    for(const [skey, value] of Object.entries(newFilters)) {
                        let category = false
                        for(let j = 0; j < value.length; j++) {
                            
                            if(skey === "job_type" || skey === "major") {
                                console.log("Is " + studentData[i].fname + "[" + skey + "] = " +value[j] + "?");
                                if(studentData[i][skey] === value[j]) {
                                    console.log("Setting " + studentData[i].fname + " to true with category " + skey);
                                    category = true;
                                }
                            } else if(skey === "categories" || skey === "location_prefs") {
                                console.log("Does " + studentData[i].fname + "[" + skey + "] have " +value[j] + "? IndexOf = " + studentData[i][skey].indexOf(value[j]));
                                if(studentData[i][skey].indexOf(value[j]) != -1) {
                                    console.log("Setting " + studentData[i].fname + " to true with category " + skey);
                                    category = true;
                                }
                            }
                            
                        }
                        if(!category) {
                            console.log("Setting " + studentData[i].fname + " to false with category " + skey);
                            addStudent = false;
                            break;
                        } 
                    }
                    if(addStudent) {
                        newStudents.push(studentData[i]);
                    }
                    
                    
                }
            }
            
            console.log(newStudents);
            setStudents(newStudents);
            setFilters(newFilters);
        
    }
    const studentElements = [];
    const studentWindows = [];
    console.log(students);
    for(var i = 0; i < students.length; i++) {
        studentElements.push(<StudentData student={students[i]} parentCallback={handleCallback} key={i}/>)
    }
    console.log(studentElements);
    
    return (
        <div class="portal">
            <Sidebar visible={sideBarVisible} filterChangeCallback={filterUpdated}/>
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