import React from 'react';
import ReactDOM from 'react-dom/client';
import Shift from './components/shift';
import EditFiles from './components/editFiles';
import Login from './components/register.js';
import reportWebVitals from './reportWebVitals';
import ManagerProfile from './components/managerProfile';
import FileUpload from './components/fileUpload';
import ProfileSettings from './components/ProfileSettings';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Router>
  <Routes>
    <Route path='ProfileSettings' element={<ProfileSettings/>}/>
    <Route path='FileUpload' element={<FileUpload/>}/>
    <Route path='manageProfile' element={<ManagerProfile/>}/>
    <Route path="editFiles" element={<EditFiles />} />
    <Route path="/shift" element={<Shift />} />
    <Route path="/" element={<Login />} />
    
  </Routes>
</Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


