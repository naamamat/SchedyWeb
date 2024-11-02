import React from 'react';
import ReactDOM from 'react-dom/client';
import { CookiesProvider } from 'react-cookie';
import Shift from './components/shifty/shift.js';
import ShiftWorker from './components/shifty/shiftWorker.js';
import Login from './components/register.js';
import reportWebVitals from './reportWebVitals';
import ManagerProfile1 from './components/managerProfile';
import HomePage from './components/homePage.js';
import FileUpload from './components/fileUpload';
import WorkersList from './components/workersList/workersList.js';
import ShiftsList from './components/shiftsList/shiftsList.js';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserProvider.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <Router>
        <UserProvider>
          <Routes>
            <Route path='FileUpload' element={<FileUpload />} />
            <Route path='manageProfile' element={<ManagerProfile1 />} />
            <Route path='homePage' element={<HomePage />} />
            <Route path="/shift" element={<Shift />} />
            <Route path="/WorkersList" element={<WorkersList />} />
            <Route path="/ShiftsList" element={<ShiftsList />} />
            <Route path="/shiftWorker" element={<ShiftWorker />} />
            <Route path="/shiftWorker/:id" element={<ShiftWorker />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </UserProvider>
      </Router>
    </CookiesProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


