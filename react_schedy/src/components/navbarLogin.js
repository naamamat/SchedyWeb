

import React from 'react';
import '../styles/styleLogin.css';

function NavbarLogin({ login, register }) {
  return (
    <nav className="nav">
      <div className="nav-logo">
        <p>Schedy .</p>
      </div>
      <div className="nav-menu" id="navMenu"></div>
      <div className="nav-button">
        <button className="btn white-btn" id="loginBtn" onClick={login}>Sign In</button>
        <button className="btn" id="registerBtn" onClick={register}>Sign Up</button>
      </div>
      <div className="nav-menu-btn">
        <i className="bx bx-menu" onClick={() => document.getElementById('navMenu').classList.toggle('responsive')}></i>
      </div>
    </nav>
  );
}

export default NavbarLogin;

