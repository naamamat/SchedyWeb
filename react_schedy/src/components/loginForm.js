
import React from 'react';
import '../styles/styleLogin.css';
import { useNavigate } from 'react-router-dom';

function LoginForm() {

  const navigate = useNavigate();
  const handleHerfClick = () => {
    navigate('/shift');
  };



  return (
    <div className="login-container" id="login">
      <div className="top">
        <header>Login</header>
        <span>Don't have an account? <a href="#" onClick={window.register}>Sign Up</a></span>
      </div>
      <div className="input-box">
        <input type="text" className="input-field" placeholder="Username or Email" />
        <i className="bx bx-user"></i>
      </div>
      <div className="input-box">
        <input type="password" className="input-field" placeholder="Password" />
        <i className="bx bx-lock-alt"></i>
      </div>
      <div className="input-box">
        <input type="submit" className="submit" value="Sign In" onClick={handleHerfClick} />
      </div>
      <div className="two-col">
        <div className="one">
          <input type="checkbox" id="login-check" />
          <label htmlFor="login-check"> Remember Me</label>
        </div>
        <div className="two">
          <label><a href="#">Forgot password?</a></label>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

