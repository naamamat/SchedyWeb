import React, { useState } from 'react';
import Navbar from './navbar';
import ProfilePicUploader from './profilePic.js';
import PicMail from '../pic/email.png';
import PicId from '../pic/id-card.png';
import { useUserContext } from '../context/UserProvider.jsx';
import axiosInstance from '../context/axios.js';
import '../styles/dashboard.css';
import Header from './header';


const ManagerProfile = () => {
    const { user, setUser } = useUserContext();
    const [currentUser, setCurrentUser] = useState(user);

    const onSaveProfile = async () => {
        try {
            const result = await axiosInstance.put('/user', currentUser)
            setUser(result.data.user);
        } catch (e) {
            alert('Error saving profile. please try again');
        }
    }

    const onProfileChange = (field, value) => {
        setCurrentUser(u => ({ ...u, [field]: value }));
    }
    return (
        <div className="container ">

            <Navbar></Navbar>
            <section className="main">
                <Header text="My Profile" />
                <section className="main-dash">
                    <div class="dashboard">
                        <div class="sidebar">
                            <div class="profile">
                                <ProfilePicUploader
                                    photo={currentUser?.photo}
                                    setPhoto={(photo) => onProfileChange('photo', photo)}
                                />
                            </div>
                            <div>
                                <p><strong>Organization ID:</strong></p>
                                {currentUser?.orgId}

                                <p style={{ fontSize: '12px'}}>Using this organization ID, you can invite others to your organization :)</p>
                            </div>
                            <div class="sidebar-items">
                                <h3 class="name">"To be able to lead others, a man must be willing to go forward alone."</h3>
                            </div>


                            <div className='padButton'>
                                <button className='submit-button' onClick={onSaveProfile}> Save changes </button>
                            </div>
                        </div>



                        <div class="main-edit">
                            <h1>My Profile</h1>
                            <div class="skill">
                                <div class="skill-content">
                                    <div class="skill-img-box">
                                        <img src={PicId} alt="id" className="card-imgP" />
                                    </div>
                                    <div class="skill-detail">
                                        <h2 class="skill-title">First Name</h2>

                                        <div className="input-box">
                                            <input type="text" className="input-field" placeholder="firstName"
                                                value={currentUser?.firstName}
                                                onChange={(e) => onProfileChange('firstName', e.target.value)}
                                            />
                                            <i className="bx bx-user"></i>
                                        </div>

                                    </div>
                                </div>
                            </div>


                            <div class="skill">
                                <div class="skill-content">
                                    <div class="skill-img-box">
                                        <img src={PicId} alt="id" className="card-imgP" />
                                    </div>

                                    <div class="skill-detail">
                                        <h2 class="skill-title">Last Name</h2>

                                        <div className="input-box">
                                            <input type="text" className="input-field" placeholder="Lastname"
                                                value={currentUser?.lastName}
                                                onChange={(e) => onProfileChange('lastName', e.target.value)}
                                            />
                                            <i className="bx bx-user"></i>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div class="skill">
                                <div class="skill-content">
                                    <div class="skill-img-box">
                                        <img src={PicMail} alt="id" className="card-imgP" />
                                    </div>
                                    <div class="skill-detail">
                                        <h2 class="skill-title">Mail</h2>

                                        <div className="input-box">
                                            <input type="text" className="input-field" placeholder="Email" value={currentUser?.email} onChange={(e) => onProfileChange('email', e.target.value)}
                                            />
                                            <i className="bx bx-user"></i>
                                        </div>
                                    </div>
                                </div>

                            </div>


                        </div>
                        <div class="p3">
                        </div>
                    </div>
                </section>
            </section>
        </div>
    );
};

export default ManagerProfile;
