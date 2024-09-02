import React, { useState } from "react";
import Papa from 'papaparse';
import '../styles/uploadfiles.css';
import myImage from '../pic/upload.png';
import Navbar from "./navbar";
import DownloadButtons from './downloadButtons';
import { SERVER_URL, ORG_ID } from "../consts";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../context/axios";

function FileUpload() {
    const navigate = useNavigate();
    const [workerFile, setWorkerFile] = useState()
    const [shiftFile, setShiftFile] = useState()
    const [error, setError] = useState()

    function handleFile(event, type) {
        const file = event.target.files[0];
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                console.log('Parsed CSV:', results.data);
                if (type === 'worker')setWorkerFile(results.data)
                if (type === 'shift') setShiftFile(results.data)
              },
              error: (error) => {
                console.error('Error parsing CSV:', error);
              }
        })
    }

    const onSubmitFiles = async () => {
        setError(null);
        console.log("workerFile", {workerFile, shiftFile})
        try {
            await axiosInstance.post(`/${ORG_ID}/schedule`, { workerFile, shiftFile })
            navigate('/shift');
        } catch (e) {
            setError(e);
            console.log('Error in inserting files: ', e);
        }
    }

    return (
        <div class="container">
            <Navbar></Navbar>
            <div>
                <div>

                    <DownloadButtons></DownloadButtons>

                </div>


                <div class="upload">
                    <div style={{ display: 'flex'}}>

                        <div class="containerUpload">
                            <div >
                                <div><h3> Shifts placements </h3></div>
                                <div class="file-area" data-img="">
                                    <img src={myImage} alt="upload" />
                                </div>
                                <input class="select-workers" type="file" name="file" onChange={(e)=> handleFile(e, 'shift')} />
                                <br></br>
                            </div>
                        </div>

                        <div class="containerUpload">
                            <div >
                                <div><h3> Workers-roles </h3></div>
                                <div class="file-area" data-img="">
                                    <img src={myImage} alt="upload"/>
                                    </div>
                                <input class="select-workers" type="file" name="file" onChange={(e)=> handleFile(e, 'worker')} />
                                <br></br>
                            </div>
                        </div>
                        <div>
                        </div>
                        </div>

                        <button class="submit-button" onClick={onSubmitFiles}>Submit files</button>

                        {error && <p style={{color: 'red'}}> Could not upload the file. please try again.</p>}

                </div>

            </div>
        </div>

    )
}

export default FileUpload
