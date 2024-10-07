import React, { useEffect } from 'react';
import { redirect } from 'react-router-dom';
import Navbar from './navbarLogin.js';
import LoginForm from './loginForm.js';
import RegisterForm from './registerForm.js';
import logoS from '../pic/logo-no-background.png';
import { useUserContext } from '../context/UserProvider.jsx';
// import './App.css';

function Register() {
  const { user } = useUserContext();

  const login = () => {
    document.getElementById('login').style.left = '4px';
    document.getElementById('register').style.right = '-520px';
    document.getElementById('loginBtn').classList.add('white-btn');
    document.getElementById('registerBtn').classList.remove('white-btn');
    document.getElementById('login').style.opacity = 1;
    document.getElementById('register').style.opacity = 0;
  };

  const register = () => {
    document.getElementById('login').style.left = '-510px';
    document.getElementById('register').style.right = '5px';
    document.getElementById('loginBtn').classList.remove('white-btn');
    document.getElementById('registerBtn').classList.add('white-btn');
    document.getElementById('login').style.opacity = 0;
    document.getElementById('register').style.opacity = 1;
  };

  useEffect(()=> {
    if (user) {
      redirect('/homePage')
    }
  }, [user])

  window.login = login;
  window.register = register;

  return (
    <div>
      <div className="wrapper">
        <Navbar login={login} register={register} />
        <div class="left-background">
          <img src={logoS} alt="logo" />
        </div>
        <div class="right-background">
          <div className="form-box">
            <LoginForm />
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>

  );
}

export default Register;


