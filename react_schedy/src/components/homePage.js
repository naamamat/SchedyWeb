import React, { useState } from 'react';
import Navbar from './navbar';
import ProfilePicUploader from '../pic/profile.png';
import Logo from '../pic/logo-color.png';
import Home from '../pic/home.png';
import Shift from '../pic/routine.png';
import User from '../pic/userRed.png';
import Upload from '../pic/uploadRed.png';
import '../styles/homePage.css';
import Header from './header';
import Paragraph from './paragraph';
import SpecialPara from './specialPara';
import ParaPic from './paraPic';
import { Link } from 'react-router-dom';


const HomePage = () => {



    return (
        <div className='container'>
            <Navbar></Navbar>
            <section className="main">
            <Header text="Welcome to Schedy's Life!" />

            <ParaPic content={Logo}/>

            <Paragraph text="Managing work schedules has never been easier! With Schedy's Life, you can quickly and efficiently create shifts for your team. Simply input your workers' details and shift preferences, and let our advanced algorithm handle the rest.
                        Wondering how it works? Our unique scheduling algorithm ensures that shifts are distributed fairly and efficiently, 
                        tailored to meet your needs."/>
                        {/* Ready to simplify your scheduling? Get started  */}
            <SpecialPara special="TODAY!" noSpecial="Ready to simplify your scheduling? Get started "/>

                        

                <section className="slider">
                    <div className="cardHome">
                        <div className="card-content">
                            <img src={Home} alt="Watch Profile" className="card-img"/>
                            <h1 className="card-title">Home Page</h1>
                            <div className="card-body">
                                <p className="card-exp">Explanation about this web.</p>
                            </div>
                            <div className="card-footer">
                            <Link to="/homePage" >
                                <button className="btn btn-success">GO!</button>                            
                            </Link>

                            </div>
                        </div>
                    </div>
                    <div className="cardHome">
                        <div className="card-content">
                            <img src={Shift} alt="Watch Profile" className="card-img"/>
                            {/* <img src="images/laptop 3.png" alt="" class="card-img"> */}
                            <h1 className="card-title">Shift Page</h1>
                            <div className="card-body">
                                <p className="card-exp">You can see your shifts and edit them.</p>
                            </div>
                            <div className="card-footer">
                            <Link to="/shift" >
                                <button className="btn btn-success">GO!</button>                            
                            </Link>
                            </div>
                        </div>
                    </div>
                    <div className="cardHome">
                        <div className="card-content">
                            {/* <img src="images/ipad.png" alt="" class="card-img"> */}
                            <img src={User} alt="Watch Profile" className="card-img"/>
                            <h1 className="card-title">My Profile</h1>
                            <div className="card-body">
                                <p className="card-exp">See and change your details.</p>
                            </div>
                            <div class="card-footer">
                            <Link to="/manageProfile" >
                                <button className="btn btn-success">GO!</button>                            
                            </Link>
                            </div>
                        </div>
                    </div>
                    <div className="cardHome">
                        <div className="card-content">
                            {/* <img src="images/Apple-iPhone-12-Pro.png" alt="" class="card-img"> */}
                            <img src={Upload} alt="Watch Profile" className="card-img"/>
                            <h1 className="card-title">Upload Files</h1>
                            <div className="card-body">
                                <p className="card-price">Upload your excels list to start process.</p>
                            </div>
                            <div className="card-footer">
                            <Link to="/FileUpload" >
                                <button className="btn btn-success">GO!</button>                            
                            </Link>
                            </div>
                        </div>
                    </div>


                </section>
                </section>


        </div>


       
    );
};

export default HomePage;
