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
          <h2 className='login-header'>Login</h2>
          <label htmlFor="email">Email Address</label>
          <input type="text" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)}/>
          <br/>
          <label htmlFor="pw">Password</label>
          <input type="text" id="pw" name="pw" value={pw} onChange={e => setPW(e.target.value)}/>
          <br/>
          <button onClick={loginClick}>Login</button>
          <br/>
          <button onClick={createAccountClick}>Create Account</button>
        </header>
      </div>
    );
  }

  export default Home