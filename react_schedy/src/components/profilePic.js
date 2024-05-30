
import React, { useState } from 'react';
import picProfile from '../pic/user5.png';
import '../styles/styleProfile.css'; // Make sure to import a CSS file for styling

function ProfilePic() {
  const [photo, setPhoto] = useState(picProfile);

  const handleFileChange = (e) => {
    const choosedFile = e.target.files[0];
    if (choosedFile) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setPhoto(reader.result);
      });
      reader.readAsDataURL(choosedFile);
    }
  };

  return (
    <div className="profile-pic-div">
      <img src={photo} id="photo" alt="Profile" />
      <input 
        type="file" 
        id="file" 
        onChange={handleFileChange} 
        style={{ display: 'none' }} 
      />
      <label htmlFor="file" id="uploadBtn">Choose Photo</label>
    </div>
  );
}

export default ProfilePic;

