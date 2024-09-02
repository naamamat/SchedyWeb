import React  from 'react';
import '../styles/styleShift.css';
import picProfile from '../pic/picProfile.png';
import picCalendar from '../pic/calendar.png';
import picUpload from '../pic/upload.png';
import picGroup from '../pic/group.png';
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
            <Link to="/manageProfile" className="logo">
              <img src={user?.photo || picProfile} alt="Profile" />
              <span className="nav-item" >Admin</span>
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
            <Link href="#" className="icon">
              <img src={picGroup} alt="group" />
              <span className="nav-item">Group requests</span>
            </Link>
          </li>
          <li>
            <Link to="/shift" className="icon">
              <img src={picCalendar} alt="calendar" />
              <span className="nav-item"  >Shift</span>
            </Link>
          </li>
          <li>
            <Link to="/" className="icon">
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



// import React from 'react';
// import '../styles/styleShift.css';
// import picProfile from '../pic/picProfile.png';
// import picCalendar from '../pic/calendar.png';
// import picUpload from '../pic/upload.png';
// import picGroup from '../pic/group.png';
// import profile from '../pic/profile.png';
// import picLogout from '../pic/logout.png';


// function Navbar() {
//   return (

//     <div className="choose-page">
//     <nav>
//       <ul>
//         <li>
//           <a href="#" className="logo">
//             <img src={picProfile} alt="Profile" />
//             <span className="nav-item">Admin</span>
//           </a>
//         </li>

//         <li>
//             <a href="#" class="icon">
//                 <img src={profile} alt="Watch Profile" />
//                 <span class="nav-item">My profile</span>
//             </a>
//         </li>

//         <li>
//             <a href="#" class="icon">
//                 <img src={picUpload} alt="upload"/>
//                 <span class="nav-item">Upload files</span>
//             </a>
//         </li>

//         <li>
//             <a href="#" class="icon">
//                 <img src={picGroup} alt="group"/>
//                 <span class="nav-item">Group requests</span>
//             </a>
//         </li>

//         <li>
//             <a href="#"  class="icon">
//                 <img src={picCalendar} alt="calendar"/>
//                 <span class="nav-item">Shift</span>
//             </a>
//         </li>

//         <li>
//             <a href="#"  class="icon" >
//             {/* classlogout */}
//                 <img src={picLogout} alt="logoutp"/>
//                 <span class="nav-item">Log out</span>
//             </a>
//         </li>
//       </ul>
//     </nav>
//   </div>
//   );
// }

// export default Navbar;
