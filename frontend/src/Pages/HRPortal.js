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
    const [filters, setFilters] = useState({});
    const [search, setSearch] = useState('');
    const [constants, setConstants] = useState({});
    const [windowConstants, setWindowConstants] = useState({});

    useEffect(() => {
        const fetchStudents = async () => {
            const response = await axios.get(`http://localhost:8080/api/students`);
            const data = response.data.sort(sortByName);
            setStudentData(data);
            setStudents(data);
        }

        fetchStudents();
    }, [])

    useEffect(() => {
        const fetchMajors = async () => {
            const response = await axios.get(`http://localhost:8080/api/majors`);
            constants["Majors"] = response.data.map(v =>  [v._id, v.major]);
            setConstants(constants);
            windowConstants["Majors"] = {}
            response.data.forEach((v, i) => {
                windowConstants["Majors"][v._id] = v.major;
            });
            setWindowConstants(windowConstants);
        }
        const fetchSchools = async () => {
            const response = await axios.get(`http://localhost:8080/api/schools`);
            windowConstants["Schools"] = {}
            response.data.forEach((v, i) => {
                windowConstants["Schools"][v._id] = v.school;
            });
            setWindowConstants(windowConstants);
        }
        const fetchDepartments = async () => {
            const response = await axios.get(`http://localhost:8080/api/categories`);
            constants["Departments"] = response.data.map(v =>  [v._id, v.category]);
            setConstants(constants);
            windowConstants["Departments"] = {}
            response.data.forEach((v, i) => {
                windowConstants["Departments"][v._id] = v.category;
            });
            setWindowConstants(windowConstants);
        }
        const fetchLocations = async () => {
            const response = await axios.get(`http://localhost:8080/api/locations`);
            constants["Locations"] = response.data.map(v =>  [v._id, v.city + ", " + v.state]);
            setConstants(constants);
            windowConstants["Locations"] = {}
            response.data.forEach((v, i) => {
                windowConstants["Locations"][v._id] = v.city + ", " + v.state;
            });
            setWindowConstants(windowConstants);
        }

        fetchMajors();
        fetchSchools();
        fetchDepartments();
        fetchLocations();

        constants["Job Type"] = [["Full-Time", "Full-Time"], ["Internship", "Internship"]];
        setConstants(constants);
    }, []);

    const navigate = useNavigate();

    const handleCallback = (childData) => {
        if(childData === -1) {
            setWindow('') 
        } else {
            console.log(childData);
            setWindow(<StudentWindow student={students[childData]} parentCallback={handleCallback} constants={windowConstants} navigation={navigate}/>)
        }
        
    }

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

    function applyFilters(studentData, newFilters) {
        let newStudents = []
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
                        if(studentData[i][skey].indexOf(value[j]) !== -1) {
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
        return newStudents
    }

    function filterUpdated(id, key, value) {
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
                newStudents = applyFilters(studentData, newFilters)
            }
            
            console.log(newStudents);
            setStudents(newStudents);
            setFilters(newFilters);
        
    }
    const studentElements = [];
    console.log(students);
    for(var i = 0; i < students.length; i++) {
        studentElements.push(<StudentData student={students[i]} parentCallback={handleCallback} key={i} num={i}/>)
    }
    console.log(studentElements);
    
    return (
        <div className='hr-portal'>
            <div className='banner'></div>
            <div class="portal-main">
                <Sidebar visible={sideBarVisible} filterChangeCallback={filterUpdated} constants={constants}/>
                <div id="main">
                    <button id="toggle-side-panel-button" onClick={toggleSideBarClick}>-</button>
                <div className='portal-title'>
                    <h1 id="title-text">HR Portal</h1>
                    <div id='portal-search-container'>
                        <input type="text" placeholder="search" value={search} id='portal-search' onChange={(e) => {
                            const criteria = e.target.value
                            setSearch(criteria)
                            console.log(criteria)
                            const newStudents = []
                            for (let i = 0; i < studentData.length; i++) {
                                if (studentData[i].lname.toLowerCase().includes(criteria.toLowerCase())) newStudents.push(studentData[i])
                                else if (studentData[i].fname.toLowerCase().includes(criteria.toLowerCase())) newStudents.push(studentData[i])
                            }
                            setStudents(applyFilters(newStudents, filters))
                        }}/>
                    </div>
                    
                    <div className='button-container'>
                        <button className='styled-button blue' id="create-new-button" onClick={createApplication}>Create New</button>
                    </div>
                    <div className='button-container'>
                        <button className='styled-button red' id="logout-button" onClick={logoutClick}>Log Out</button>
                    </div>
                </div>
                <div className="divider"></div>
                
                <table id="student-table">
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
            <div className='banner'></div>
        </div>
        
        
    );
    
}
export default HRPortal;