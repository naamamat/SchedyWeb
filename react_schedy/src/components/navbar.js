import React  from 'react';
import '../styles/styleShift.css';
import picProfile from '../pic/picProfile.png';
import picCalendar from '../pic/calendar.png';
import picUpload from '../pic/upload.png';
import picGroup from '../pic/group.png';
import picTime from '../pic/time-left.png';
import profile from '../pic/profile.png';
import picLogout from '../pic/logout.png';
import { useUserContext } from '../context/UserProvider';
import { Link } from 'react-router-dom';
import axiosInstance from '../context/axios';

function Navbar() {
  const { user, setUser } = useUserContext()

  const handleLoginClick =async () => {
    try {
      await axiosInstance.get('/logout');
      setUser(null)
    } catch (e) {
      alert("Could not logout")
    }
  };

  return (
    <div className="choose-page">
      <nav className="navShift">
        <ul>
          <li>
            <Link to="/homePage" className="logo">
              <img src={user?.photo || picProfile} alt="Profile" />
              <span className="nav-item" >Admin ({user?.firstName})</span>
            </Link>
          </li>
          <li>
            <Link to="/manageProfile" className="icon">
              <img src={profile} alt="Watch Profile" />
              <span className="nav-item">My profile</span>
            </Link>
          </li>
          <li>
            <Link to="/FileUpload" className="icon">
              <img src={picUpload} alt="upload" />
              <span className="nav-item" >Upload files</span>
            </Link>
          </li>
          <li>
            <Link to="/WorkersList" className="icon">
              <img src={picGroup} alt="group" />
              <span className="nav-item">Workers List</span>
            </Link>
          </li>
          <li>
            <Link to="/ShiftsList" className="icon">
              <img src={picTime} alt="shiftsList" />
              <span className="nav-item">Shifts List</span>
            </Link>
          </li>
          <li>
            <Link to="/shift" className="icon">
              <img src={picCalendar} alt="calendar" />
              <span className="nav-item"  >Shift</span>
            </Link>
          </li>
          <li>
            <Link className="icon">
              <img src={picLogout} alt="logoutp" />
              <span className="nav-item" onClick={handleLoginClick}>Log out</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;

