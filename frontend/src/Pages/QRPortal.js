import React from 'react';
import './../styles/Home.css';
import QRCode from "react-qr-code";

function QRPortal() {
    return (
      <div className="app">
        <h1 className="CGI-lettering">CGI</h1>
        <header className="login-container">
          <h4 className='login-header'>Scan to Apply</h4>
          <QRCode value={window.location.href} />
        </header>
      </div>
    );
  }

  export default QRPortal