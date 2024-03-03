import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './../styles/Home.css';
import axios from 'axios';

function Home() {
    const [email, setEmail] = useState('')
    const [pw, setPW] = useState('')
    const navigate = useNavigate();
    const loginClick = () => {
        if (!email || !email.length) return alert("Please specify an email address!")
        if (!pw || !pw.length) return alert("Please specify a password!")
        const params = {
            username: email,
            password: pw
        }
        console.log(params)
        axios.post('http://localhost:8080/login', params).then(r => {
            if (r.data === 'success') {
                axios.get('http://localhost:8080/api/users/' + email).then(r2 => {
                    if (r2.data === 'admin') {
                        navigate("/hr")
                    } else {
                        navigate('/student/home?id=' + r2.data)
                    }
                }).catch(e => {
                    console.log(e)
                    alert('Login failed')
                })
            } else {
                alert('Login failed')
            }
        }).catch(e => {
            console.log(e)
            alert('Login failed')
        })
    }
    const createAccountClick = () => {
        navigate("/student/app")
    }
    return (
      <div className="app">
        <h1 className="CGI-lettering">CGI</h1>
        <header className="login-container">
          <h2 className='login-header'>Welcome</h2>
          <input type="text" id="email" name="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)}/>
          <br/>
          <input type="pass" id="pw" name="pw"  placeholder="Password" value={pw} onChange={e => setPW(e.target.value)}/>
          <br/>
          <button className='button' onClick={loginClick}>Login</button>
          <h3 className="divider"></h3>
          <button className='button' onClick={createAccountClick}>New Application</button>
        </header>
      </div>
    );
  }

  export default Home