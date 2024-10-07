
import React from 'react';
import '../styles/styleLogin.css';
import {useState} from 'react'
import { useUserContext } from '../context/UserProvider';
import axiosInstance from '../context/axios';
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const { setUser } = useUserContext();

  const[email, SetEmail] = useState('')
  const[password, SetPassword] = useState('')
  const navigate = useNavigate();

  async function submit(e){
    e.preventDefault()

    try{
      const res = await axiosInstance.post(`/login`,{ email, password})
      setUser(res.data.user)
      navigate('/homePage');
    } catch (e) {
      if (e.response?.data?.error){
        alert(e.response?.data.error)
      } else {
        console.error(e);
        alert("error")
      }
    }
  }

  return (
    <div className="login-container" id="login">
      <div className="top">
        <header>Login</header>
        <span>Don't have an account? <a href="#" onClick={window.register}>Sign Up</a></span>
      </div>
      <div className="input-box">
        <input type="text" className="input-field" placeholder="Email" onChange = {(e)=>{SetEmail(e.target.value)}}/>
        <i className="bx bx-user"></i>
      </div>
      <div className="input-box">
        <input type="password" className="input-field" placeholder="Password" onChange = {(e)=>{SetPassword(e.target.value)}}/>
        <i className="bx bx-lock-alt"></i>
      </div>
      <div className="input-box">
        <input type="submit" className="submit" value="Sign In" onClick={submit} />
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

