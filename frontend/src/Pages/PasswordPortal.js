import React from 'react';
import './../styles/Home.css';

function PasswordPortal() {
    return (
      <div className="app">
        <h1 className="CGI-lettering">CGI</h1>
        <header className="login-container">
          <h3 className='login-header'>Password Reset</h3>
          <br/><br/><br/><br/><br/><br/>
          <text>You have been emailed a link to reset your password.</text>
        </header>
      </div>
    );
  }

  export default PasswordPortal