import React, { useState } from 'react';
import Navbar from './navbar';
import RegisterForm from './registerForm.js';
import ProfilePicUploader from './profilePic.js';

import '../styles/dashboard.css';
import { useUserContext } from '../context/UserProvider.jsx';
//
// import 'bootstrap/dist/css/bootstrap.min.css';

const ManagerProfile = () => {
    const [ask, setAsk] = useState();
    const { user } = useUserContext();

    return (
        <div className="container ">

            <Navbar></Navbar>

            <section className="main-dash">

                <div class="dashboard">
                    <div class="sidebar">
                        <div class="profile">

                            <ProfilePicUploader photo={user?.photo}/>
                            {/* <div class="profile-img-box">


                </div> */}
                            {/* <h3 class="name">Admim details</h3>
                <p class="desc">Admin</p> */}
                        </div>
                        <div class="sidebar-items">
                            <h3 class="name">Admim details</h3>
                            {/* <p class="desc">Admin</p> */}
                            <a href="#" class="sidebar-item">
                                <div class="si-img-box">
                                    {/* <img src="assets/images/skills.png" alt=""> */}
                                </div>
                                <h4 class="si-name active">Skills</h4>
                            </a>
                            <a href="#" class="sidebar-item">
                                <div class="si-img-box">
                                    {/* <img src="assets/images/courses.png" alt=""> */}
                                </div>
                                <h4 class="si-name">Math</h4>
                            </a>
                            <a href="#" class="sidebar-item">
                                <div class="si-img-box">
                                    {/* <img src="assets/images/upcoming.png" alt=""> */}
                                </div>
                                <h4 class="si-name">computer Science</h4>
                            </a>
                            <a href="#" class="sidebar-item">
                                <div class="si-img-box">
                                    {/* <img src="assets/images/library.png" alt=""> */}
                                </div>
                                <h4 class="si-name">Library</h4>
                            </a>
                        </div>
                        <div class="pro">
                            <h4 class="pro-text">For other's profile</h4>
                            <div class="pro-img-box">
                                {/* <img src="assets/images/premium-quality.png" alt=""> */}
                            </div>
                        </div>
                    </div>
                    <div class="main-edit">
                        <h1>My Profile</h1>
                        <div class="skill">
                            <div class="skill-content">
                                <div class="skill-img-box">
                                    {/* <img src="assets/images/read.png" alt=""> */}
                                </div>
                                <div class="skill-detail">
                                    <h2 class="skill-title">Name</h2>
                                    {/* <p>211 Days</p> */}

                                    <div className="input-box">
                                        <input type="text" className="input-field" placeholder="Lastname" />
                                        <i className="bx bx-user"></i>
                                    </div>
                                    {/* <div class="skill-progress">
                            <div class="progress progress-1"></div>
                        </div> */}

                                </div>
                            </div>
                            {/* <h2 class="percent">60%</h2> */}
                        </div>





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





                        </div>
                        <div class="skill">
                            <div class="skill-content">
                                <div class="skill-img-box">

                                </div>
                                <div class="skill-detail">
                                    <h2 class="skill-title">Mail</h2>

                                    <div className="input-box">
                                        <input type="text" className="input-field" placeholder="Lastname" />
                                        <i className="bx bx-user"></i>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div class="p3">





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
                        </div>



















                    </div>


                </div>






















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
