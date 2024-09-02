
import React from 'react';
import picProfile from '../pic/user5.png';
import '../styles/styleProfile.css'; // Make sure to import a CSS file for styling

function ProfilePic({ photo, setPhoto }) {

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
      <img src={photo || picProfile} id="photo" alt="Profile" />
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

