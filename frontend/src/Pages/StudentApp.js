import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import '../styles/StudentApp.css'

function StudentApp () {
    const params = new URLSearchParams(window.location.search)
	const userID = params.get("id")

    const [schools, setSchools] = useState([]);
    const [majors, setMajors] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchSchools = async () => {
            const response = await axios.get(`http://localhost:8080/api/schools`);
            response.data.unshift({_id: "", school: ""})
            setSchools(response.data);
        }
        const fetchMajors = async () => {
            const response = await axios.get(`http://localhost:8080/api/majors`);
            response.data.unshift({_id: "", major: ""})
            setMajors(response.data);
        }
        const fetchDepartments = async () => {
            const response = await axios.get(`http://localhost:8080/api/categories`);
            setDepartments(response.data);
        }
        const fetchLocations = async () => {
            const response = await axios.get(`http://localhost:8080/api/locations`);
            setLocations(response.data);
        }

        fetchSchools();
        fetchMajors();
        fetchDepartments();
        fetchLocations();
    }, [])


    const [resume, setResume] = useState('')
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [pw, setPW] = useState('')
    const [pwReq, setPWReq] = useState([])
    const [cpw, setCPW] = useState('')
    const [pwMatch, setPWMatch] = useState('')
    const [hidePW, setHidePW] = useState(false)
    const [phone, setPhone] = useState('')
    const [school, setSchool] = useState('')
    const [major, setMajor] = useState('')
    const [graduation, setGraduation] = useState()
    const [workPref, setWorkPref] = useState('')
    const [depsChecked, setDepsChecked] = useState(new Array(100).fill(false))
    const [depPref, setDepPref] = useState([])
    const [locsChecked, setLocsChecked] = useState(new Array(100).fill(false))
    const [locPref, setLocPref] = useState([])
    const [linkedIn, setLinkedIn] = useState('')

    const internshipRef = useRef(null)
    const fullTimeRef = useRef(null)

    const [userData, setUserData] = useState({})
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:8080/api/students/${userID}`)
            console.log(response.data)
            setHidePW(true)
            setUserData(response.data)
            setFname(userData.fname)
            setLname(userData.lname)
            setEmail(userData.email)
            setPhone(userData.phone)
            setSchool(userData.school)
            setMajor(userData.major)
            setGraduation(userData.grad_date)
            setWorkPref(userData.job_type)
            setDepsChecked(departments.map(v => userData.categories.includes(v._id)))
            setDepPref(userData.categories)
            setLocsChecked(locations.map(v => userData.location_prefs.includes(v._id)))
            setLocPref(userData.location_prefs)
            setLinkedIn(userData.linkedin)
        }
        if (userID) {
            fetchData()
        }
    }, [userID])

    useEffect(() => {
        if (userData.job_type === 'Internship') {
            internshipRef.current.click()
        } else {
            fullTimeRef.current.click()
        }
    }, [userData])

    const navigate = useNavigate()

    const submitHandler = () => {
        // verify input - this probably needs to be expanded
        if (!fname || !lname || !email || !pw || !cpw || !phone || !major || !graduation || !workPref || !locPref.length || !depPref.length || !school) {
            return alert('Required field missing!')
        }

        if (linkedIn && !linkedIn.match(/^https:\/\/[a-z]{2,3}\.linkedin\.com\/.*$/)) {
            return alert('LinkedIn URL is invalid!')
        }

        // input is verified; now write to database
        const params = {
            email: email,
            fname: fname,
            lname: lname,
            school: school,
            major: major,
            job_type: workPref,
            categories: depPref,
            location_prefs: locPref,
            grad_date: graduation,
            phone: phone,
            interview_status: 'Pending Review'
        }
        if (linkedIn) params.linkedin = linkedIn
        console.log(params)
        axios.post(`http://localhost:8080/api/students`, params).then(r => {
            // navigate to student home
            console.log(r)
            navigate('/student/home?id=' + r.data._id)
        });
    }

    // for resume upload: https://www.filestack.com/fileschool/react/react-file-upload/
    
    return (
        <div className="background">
            <div className="application-form">
            <h1>Application</h1>
            
            <p>
                <label htmlFor="resume">Resume</label>
                <br/>
                <input type="file" id="resume" name="resume" value="" accept=".pdf" onChange={e => {
                    const [file] = e.target.files
                    setResume(file)
                    document.getElementById("resume").style.color = 'transparent'
                }}/>
                {resume && <section>
                    Successfully uploaded: {resume.name} ({Math.round(resume.size / 1024)} KB)
                </section>}
            </p>

            <div className="form-row">
                <p className="form-group">
                    <label htmlFor="fname">First Name</label>
                    <input type="text" id="fname" name="fname" value={fname} onChange={e => setFname(e.target.value)}/>
                    </p>
                <p className="form-group">
                    <label htmlFor="lname">Last Name</label>
                    <input type="text" id="lname" name="lname" value={lname} onChange={e => setLname(e.target.value)}/>
                    <br/>
                </p>
            </div>

            <div className="form-row">
                <p className="form-group full-width">
                    <label htmlFor="email">Email Address</label>
                    <br/>
                    <input type="email" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)}/>
                </p>
            </div>
            {!hidePW && <div className="form-row">
                <p className="form-group">
                    <label htmlFor="pw">Password</label>
                    <br/>
                    <input type="pass" id="pw" name="pw" value={pw} onChange={e => {
                        setPW(e.target.value)
                        const req = []
                        if (e.target.value.length < 8) req.push({
                            key: 'length',
                            value: 'Password must be at least eight characters'
                        })
                        if (!e.target.value.match(/[0-9]/)) req.push({
                            key: 'length',
                            value: 'Password must contain at least one number'
                        })
                        if (!e.target.value.match(/[A-Z]/)) req.push({
                            key: 'length',
                            value: 'Password must contain at least one uppercase letter'
                        })
                        if (!e.target.value.match(/[a-z]/)) req.push({
                            key: 'length',
                            value: 'Password must contain at least one lowercase letter'
                        })
                        if (!e.target.value.match(/[!@#$%^&*]/)) req.push({
                            key: 'length',
                            value: 'Password must contain at least one special character - !@#$%^&*'
                        })
                        setPWReq(req)
                        if (pwMatch) {
                            setPWMatch(e.target.value === cpw ? 'Passwords match!' : 'Error: passwords do not match.')
                        }
                    }}/>
                    <ul>
                        {pwReq.map((d) => {
                            return (<li key={d.key}>{d.value}</li>)
                        })}
                    </ul>
                </p>
                <p className="form-group">
                    <label htmlFor="cpw">Confirm Password</label>
                    <br/>
                    <input type="pass" id="cpw" name="cpw" value={cpw} onChange={e => {
                        setCPW(e.target.value)
                        setPWMatch(pw === e.target.value ? 'Passwords match!' : 'Error: passwords do not match.')
                    }}/>
                    <ul>{pwMatch && <li>{pwMatch}</li>}</ul>
                </p>
            </div>}
            <div className="form-row">
                <p className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <br/>
                    <input type="text" id="phone" name="phone" value={phone} onChange={e => setPhone(e.target.value)}/>
                </p>
                <p className="form-group">
                    <label htmlFor="school">Select School</label>
                    <br/>
                    <select name="school" id="school" value={school} onChange={e => {
                        setSchool(e.target.value)
                    }}>
                        {schools.map(v => {
                            return (<option value={v._id}>{v.school}</option>)
                        })}
                    </select>
                </p>
            </div>
            
            <div className="form-row">
                <p className="form-group">
                    <label htmlFor="major">Select Major</label>
                    <br/>
                    <select name="major" id="major" value={major} onChange={e => {
                        setMajor(e.target.value)
                    }}>
                        {majors.map(v => {
                            return (<option value={v._id}>{v.major}</option>)
                        })}
                    </select>
                </p>
                <p className="form-group">
                    <label htmlFor="graduation">Graduation Date</label>
                    <br/>
                    <input type="month" id="graduation" name="graduation" value={graduation} onChange={e => setGraduation(e.target.value)}/>
                </p>
            </div>     

            <div className="form-row">
                <p className="form-group">
                    <label htmlFor="workpref">Job Preference</label>
                    <br/>
                    <input ref={internshipRef} type="radio" id="Internship" name="workpref" value="Internship" onChange={e => setWorkPref(e.target.value)}/>
                    <label htmlFor="Internship">Internship</label>
                    <br/>
                    <input ref={fullTimeRef} type="radio" id="Full-Time" name="workpref" value="Full-Time" onChange={e => setWorkPref(e.target.value)}/>
                    <label htmlFor="Full-Time">Full-Time</label>
                </p>
                <p className="form-group">
                    <label htmlFor="linkedin">LinkedIn (optional)</label>
                    <br/>
                    <input type="url" id="linkedin" name="linkedin" value={linkedIn} onChange={e => setLinkedIn(e.target.value)}/>
                </p>
            </div>

            <div className="form-row">
                <p className="form-group">
                    <label htmlFor="deppref">Department Preference</label>
                    <br/>
                    {departments.map((v, i) => {
                        return (
                            <span>
                                <input type="checkbox" id={v._id} name="deppref" checked={depsChecked[i]} value={v._id} onChange={e => {
                                    const newArr = depPref;
                                    const newChecked = [...depsChecked]
                                    newChecked[i] = !newChecked[i]
                                    if (newArr.includes(v._id)) {
                                        newArr.splice(newArr.indexOf(v._id), 1);
                                    } else {
                                        newArr.push(v._id)
                                    }
                                    setDepsChecked(newChecked)
                                    setDepPref(newArr)
                                }}/>
                                <label htmlFor={v._id}>{v.category}</label>
                                <br/>
                            </span>
                        )
                    })}   
                    <br/>
                </p>
                <p className="form-group">
                    <label htmlFor="locpref">Top 3 Location Preference</label>
                    <br/>
                    {locations.map((v, i) => {
                        return (
                            <span>
                                <input type="checkbox" id={v._id} name="locpref" checked={locsChecked[i]} value={v._id} onChange={e => {
                                    const newArr = locPref;
                                    const newChecked = [...locsChecked]
                                    if (newArr.includes(v._id)) {
                                        newChecked[i] = !newChecked[i]
                                        newArr.splice(newArr.indexOf(v._id), 1);
                                    } else if (newArr.length !== 3) {
                                        newChecked[i] = !newChecked[i]
                                        newArr.push(v._id)
                                    } else {
                                        alert('Error: you have already selected 3 locations; please unselect one before selecting another.')
                                    }
                                    setLocsChecked(newChecked)
                                    setLocPref(newArr)
                                }}/>
                                <label htmlFor={v._id}>{`${v.city}, ${v.state}`}</label>
                                <br/>
                            </span>
                        )
                    })}
                    <br/>
                </p>
            </div>
            <p>
                <button onClick={submitHandler}>Submit</button>
            </p>
            </div>
        </div>
    )
}

export default StudentApp