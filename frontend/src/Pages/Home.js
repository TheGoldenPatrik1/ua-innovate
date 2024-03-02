import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Home.css';

function Home() {
    const [email, setEmail] = useState('')
    const [pw, setPW] = useState('')
    const navigate = useNavigate();
    const loginClick = () => {
        if (!email || !email.length) return alert("Please specify an email address!")
        if (!pw || !pw.length) return alert("Please specify a password!")
        navigate("/hr")
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
          <input type="text" id="pw" name="pw"  placeholder="Password" value={pw} onChange={e => setPW(e.target.value)}/>
          <br/>
          <button className='button' onClick={loginClick}>Login</button>
          <h3 className="divider"></h3>
          <button className='button' onClick={createAccountClick}>New Application</button>
        </header>
      </div>
    );
  }

  export default Home