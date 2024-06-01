import React, { useState } from 'react';
import Navbar from './navbar';
//  
// import 'bootstrap/dist/css/bootstrap.min.css';

const ManagerProfile = () => {
    const [ask, setAsk] = useState();

    return (
        <div className="container light-style flex-grow-1 container-p-y">
            <Navbar></Navbar>
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
            </div>
         </div>
    );
};

export default ManagerProfile;
