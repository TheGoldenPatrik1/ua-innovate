import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

function StudentApp () {
    const [majors, setMajors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:8080/api/majors`);
            response.data.unshift({major: ""})
            setMajors(response.data);
        }

        fetchData();
    }, []);


    const [resume, setResume] = useState('')
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [pw, setPW] = useState('')
    const [pwReq, setPWReq] = useState([])
    const [cpw, setCPW] = useState('')
    const [pwMatch, setPWMatch] = useState('')
    const [phone, setPhone] = useState('')
    const [major, setMajor] = useState('')
    const [majorDisable, setMajorDisable] = useState('')
    const [omajor, setOmajor] = useState('')
    const [omajorDisable, setOmajorDisable] = useState('')
    const [graduation, setGraduation] = useState()
    const [workpref, setWorkpref] = useState('')
    const [linkedin, setLinkedin] = useState('')

    const navigate = useNavigate()

    const submitHandler = () => {
        // verify input - this probably needs to be expanded
        if (!resume || !fname || !lname || !email || !phone || !major || !graduation || !workpref) {
            return alert('Required field missing!')
        }

        // input is verified; now write to database

        // navigate to student home
        navigate('/student/home')
    }
    // office interest

    // for resume upload: https://www.filestack.com/fileschool/react/react-file-upload/
    
    return (
        <div>
            <h1>Application</h1>
            <p>
                <label htmlFor="resume">Resume</label>
                <br/>
                <input type="file" id="resume" name="resume" value={resume} accept=".pdf,.doc,.docx" onChange={e => setResume('')}/>
            </p>
            <p>
                <label htmlFor="fname">First Name</label>
                <br/>
                <input type="text" id="fname" name="fname" value={fname} onChange={e => setFname(e.target.value)}/>
            </p>
            <p>
                <label htmlFor="lname">Last Name</label>
                <br/>
                <input type="text" id="lname" name="lname" value={lname} onChange={e => setLname(e.target.value)}/>
            </p>
            <p>
                <label htmlFor="email">Email Address</label>
                <br/>
                <input type="email" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)}/>
            </p>
            <p>
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
            <p>
                <label htmlFor="cpw">Confirm Password</label>
                <br/>
                <input type="pass" id="cpw" name="cpw" value={cpw} onChange={e => {
                    setCPW(e.target.value)
                    setPWMatch(pw === e.target.value ? 'Passwords match!' : 'Error: passwords do not match.')
                }}/>
                <text>{pwMatch}</text>
            </p>
            <p>
                <label htmlFor="phone">Phone Number</label>
                <br/>
                <input type="text" id="phone" name="phone" value={phone} onChange={e => setPhone(e.target.value)}/>
            </p>
            <p>
                <label htmlFor="major">Select Major</label>
                <br/>
                <select name="major" id="major" value={major} disabled={majorDisable} onChange={e => {
                    setOmajorDisable(e.target.value ? true : false)
                    setMajor(e.target.value)

                }}>
                    {majors.map(v => {
                        return (<option value={v.major}>{v.major}</option>)
                    })}
                </select>
            </p>
            <p>
                <label htmlFor="omajor">Other Major</label>
                <br/>
                <input type="url" id="omajor" name="omajor" disabled={omajorDisable} value={omajor} onChange={e => {
                    setMajorDisable(e.target.value ? true : false)
                    setOmajor(e.target.value)
                }}/>
            </p>
            <p>
                <label htmlFor="graduation">Graduation Date</label>
                <br/>
                <input type="month" id="graduation" name="graduation" value={graduation} onChange={e => setGraduation(e.target.value)}/>
            </p>
            <p>
                <label htmlFor="workpref">Job Preference</label>
                <br/>
                <input type="radio" id="intern" name="workpref" value="intern" onChange={e => setWorkpref(e.target.value)}/>
                <label htmlFor="intern">Intern</label>
                <br/>
                <input type="radio" id="fulltime" name="workpref" value="fulltime" onChange={e => setWorkpref(e.target.value)}/>
                <label htmlFor="fulltime">Full Time</label>
            </p>
            <p>
                <label htmlFor="linkedin">LinkedIn (optional)</label>
                <br/>
                <input type="url" id="linkedin" name="linkedin" value={linkedin} onChange={e => setLinkedin(e.target.value)}/>
            </p>
            <p>
                <button onClick={submitHandler}>Submit</button>
            </p>
        </div>
    )
}

export default StudentApp