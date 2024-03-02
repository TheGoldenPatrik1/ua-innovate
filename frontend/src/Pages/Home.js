import React from 'react';
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const loginClick = () => {
        // verfiy before navigating
        navigate("/hr")
    }
    const createAccountClick = () => {
        // verify before navigating
        navigate("/student")
    }
    return (
      <div className="App">
        <header className="App-header">
          <h3>Login</h3>
          <label htmlFor="email">Email Address</label>
          <input type="text" id="email" name="email"/>
          <br/>
          <label htmlFor="pw">Password</label>
          <input type="text" id="pw" name="pw"/>
          <br/>
          <button onClick={loginClick}>Login</button>
          <br/>
          <button onClick={createAccountClick}>Create Account</button>
        </header>
      </div>
    );
  }

  export default Home