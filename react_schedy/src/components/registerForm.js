import React from 'react';
import ProfilePicUploader from './profilePic.js';

function RegisterForm() {
  return (
    <div className="register-container" id="register">
      <ProfilePicUploader />
      <div className="top">
        <header>Sign Up</header>
        <span>Have an account? <a href="#" onClick={window.login}>Login</a></span>
      </div>
      <div className="buttom">

      <div className="two-forms">
        <div className="input-box">
          <input type="text" className="input-field" placeholder="Firstname" />
          <i className="bx bx-user"></i>
        </div>
        <div className="input-box">
          <input type="text" className="input-field" placeholder="Lastname" />
          <i className="bx bx-user"></i>
        </div>
      </div>
      <div className="input-box">
        <input type="text" className="input-field" placeholder="Email" />
        <i className="bx bx-envelope"></i>
      </div>
      <div className="input-box">
        <input type="text" className="input-field" placeholder="ID" />
        <i className="bx bx-user"></i>
      </div>
      <div className="input-box">
        <input type="password" className="input-field" placeholder="Password" />
        <i className="bx bx-lock-alt"></i>
      </div>
      <div className="input-box">
        <input type="submit" className="submit" value="Register" />
      </div>
      <div className="two-col">
        <div className="one">
          <input type="checkbox" id="register-check" />
          <label htmlFor="register-check"> Remember Me</label>
        </div>
        <div className="two">
          <label><a href="#">Terms & conditions</a></label>
        </div>
        
      </div>

      </div>
    </div>
  );
}

export default RegisterForm;

