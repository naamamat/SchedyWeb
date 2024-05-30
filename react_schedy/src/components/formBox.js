import React from 'react';
// import '../styleLogin.css';


import LoginForm from './loginForm.js';
import RegisterForm from './registerForm';

const FormBox = ({ isLogin, toggleForms }) => {
  return (
    <div className="form-box">
      {isLogin ? <LoginForm toggleForms={toggleForms} /> : <RegisterForm toggleForms={toggleForms} />}
    </div>
  );
};

export default FormBox;
