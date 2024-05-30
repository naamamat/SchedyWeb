import React from 'react';
import '../styles/styleShift.css';
import picProfile from '../pic/picProfile.png';
import picCalendar from '../pic/calendar.png';
import picUpload from '../pic/upload.png';
import picGroup from '../pic/group.png';
import profile from '../pic/profile.png';
import picLogout from '../pic/logout.png';
import { useNavigate } from 'react-router-dom';

function Navbar() {

    const navigate = useNavigate();
    const handleLoginClick = () => {
      navigate('/');
    };
    const handleUploadClick = () => {
        navigate('/editFiles');
      };
      const handleShiftClick = () => {
        navigate('/shift');
      };

  return (
    <div className="choose-page">
      <nav className="navShift">
        <ul>
          <li>
            <a href="#" className="logo">
              <img src={picProfile} alt="Profile" />
              <span className="nav-item">Admin</span>
            </a>
          </li>
          <li>
            <a href="#" className="icon">
              <img src={profile} alt="Watch Profile" />
              <span className="nav-item">My profile</span>
            </a>
          </li>
          <li>
            <a href="#" className="icon">
              <img src={picUpload} alt="upload"/>
              <span className="nav-item" onClick={handleUploadClick}>Upload files</span>
            </a>
          </li>
          <li>
            <a href="#" className="icon">
              <img src={picGroup} alt="group"/>
              <span className="nav-item">Group requests</span>
            </a>
          </li>
          <li>
            <a href="#" className="icon">
              <img src={picCalendar} alt="calendar"/>
              <span className="nav-item" onClick={handleShiftClick} >Shift</span>
            </a>
          </li>
          <li>
            <a href="#" className="icon"> 
              <img src={picLogout} alt="logoutp"/>
              <span className="nav-item" onClick={handleLoginClick}>Log out</span>
            </a>
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