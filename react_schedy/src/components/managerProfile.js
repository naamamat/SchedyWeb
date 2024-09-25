import React, { useState } from 'react';
import Navbar from './navbar';
import ProfilePicUploader from './profilePic.js';
import PicMail from '../pic/email.png';
import PicId from '../pic/id-card.png';
import { useUserContext } from '../context/UserProvider.jsx';
import axiosInstance from '../context/axios.js';
import '../styles/dashboard.css';
import Header from './header';
//
// import 'bootstrap/dist/css/bootstrap.min.css';

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
                                {/* <a href="#" class="sidebar-item">
                                <div class="si-img-box">

                                </div>
                                <h4 class="si-name active">Skills</h4>
                            </a>
                            <a href="#" class="sidebar-item">
                                <div class="si-img-box">
                                </div>
                                <h4 class="si-name">Math</h4>
                            </a>
                            <a href="#" class="sidebar-item">
                                <div class="si-img-box">

                                </div>
                                <h4 class="si-name">computer Science</h4>
                            </a>
                            <a href="#" class="sidebar-item">
                                <div class="si-img-box">

                                </div>
                                <h4 class="si-name">Library</h4>
                            </a> */}
                            </div>


                            <div className='padButton'>
                                <button className='submit-button' onClick={onSaveProfile}> Save changes </button>
                            </div>

                            {/* <div class="pro">
                                <h4 class="pro-text">For other's profile</h4>
                                <div class="pro-img-box">

                                </div>
                            </div> */}
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
                                        {/* <p>211 Days</p> */}

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
                                        {/* <img src="assets/images/read.png" alt=""> */}
                                    </div>

                                    <div class="skill-detail">
                                        <h2 class="skill-title">Last Name</h2>
                                        {/* <p>211 Days</p> */}

                                        <div className="input-box">
                                            <input type="text" className="input-field" placeholder="Lastname"
                                                value={currentUser?.lastName}
                                                onChange={(e) => onProfileChange('lastName', e.target.value)}
                                            />
                                            <i className="bx bx-user"></i>
                                        </div>

                                    </div>
                                </div>
                                {/* <h2 class="percent">60%</h2> */}
                            </div>




                            {/*
                        <div class="skill">
                            <div class="skill-content">
                                <div class="skill-img-box">

                                </div>
                                <div class="skill-detail">
                                    <h2 class="skill-title">Password</h2>


                                    <div className="input-box">
                                        <input type="text" className="input-field" placeholder="Lastname" />
                                        <i className="bx bx-user"></i>
                                    </div>


                                </div>


                            </div>





                        </div> */}
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




                            {/*
                        <h1>My Skills</h1>
                        <div class="skill">
                            <div class="skill-content">
                                <div class="skill-detail">
                                    <h2 class="skill-title">Math</h2>
                                </div>
                            </div>

                        </div>

                        <div class="skill">
                            <div class="skill-content">
                                <div class="skill-detail">
                                    <h2 class="skill-title">computer science</h2>
                                </div>
                            </div>

                        </div>
                        <div class="skill">
                            <div class="skill-content">
                                <div class="skill-detail">
                                    <h2 class="skill-title">Libary</h2>
                                </div>
                            </div>
                        </div> */}



















                        </div>


                    </div>






















                </section>
            </section>









            {/*
        <div className="two-forms">
        <div className="input-box">
          <input type="text" className="input-field" placeholder="Firstname" />
          <i className="bx bx-user"></i>
        </div>
        </div>

        <h4 className="font-weight-bold py-3 mb-4">
            Account settings
        </h4>
            <div className="card overflow-hidden">
                <div className="card-body media align-items-center">
                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar" className="d-block ui-w-80" />
                    <br></br>
                    <div className="media-body ml-4">
                        <label className="btn btn-outline-primary">
                            Upload new photo
                            <input type="file" className="account-settings-fileinput" />
                        </label> &nbsp;
                        <button type="button" className="btn btn-default md-btn-flat">Reset</button>
                    </div>
                </div>
                <hr className="border-light m-0" />
                <div className="card-body">
                    <div className="form-group">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control mb-1" id="username" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" id="Name" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input type="text" className="form-control" id="Password" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Living Area</label>
                        <input type="text" className="form-control" id="living_area" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Skills</label>
                        <div>
                            <input type="text" className="form-control" id="skill1" />
                        </div>
                        <div>
                            <input type="text" className="form-control" id="skill2" />
                        </div>
                        <div>
                            <input type="text" className="form-control" id="skill3" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input type="text" className="form-control mb-1" id="email" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">ID</label>
                        <input type="text" className="form-control mb-1" id="userId" />
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default ManagerProfile;
