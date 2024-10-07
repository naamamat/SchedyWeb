import React, { useState } from "react";
import Papa from 'papaparse';
import '../styles/uploadfiles.css';
import myUpload from '../pic/upload-file.png';
import myDocument from '../pic/document.png';
import Navbar from "./navbar";
import DownloadButtons from './downloadButtons';
import { useNavigate } from "react-router-dom";
import axiosInstance from "../context/axios";
import Header from './header';
import { useUserContext } from "../context/UserProvider";

function FileUpload() {
  const { user } = useUserContext();
    const navigate = useNavigate();
    const [workerFile, setWorkerFile] = useState()
    const [shiftFile, setShiftFile] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState()

    const [labelShift, setLabelShift] = useState('Upload Shift File');
    const [labelWorkers, setLabelWorkers] = useState('Upload Workers File');
    const [shiftFileUploaded, setShiftFileUploaded] = useState(false);
    const [WorkersFileUploaded, setWorkersFileUploaded] = useState(false);



    function handleFile(event, type) {
        const file = event.target.files[0];
        if (file) {

          Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
              console.log('Parsed CSV:', results.data);
              if (type === 'worker') {
                setWorkerFile(results.data);
                setLabelWorkers(file.name);
                setWorkersFileUploaded(true);
              }
              if (type === 'shift'){
                setShiftFile(results.data);
                setLabelShift(file.name);
                setShiftFileUploaded(true);
              }
            },
            error: (error) => {
              console.error('Error parsing CSV:', error);
              if (type === 'worker') {
                setLabelWorkers('Upload Worker File');
                setWorkersFileUploaded(false);
              }
              if (type === 'shift'){
                setLabelShift('Upload Shift File');
                setShiftFileUploaded(false);
              }
            }
          });
        } else {
            if (type === 'worker') {
                setLabelWorkers('Upload Worker File');
              }
              if (type === 'shift'){
                setLabelShift('Upload Shift File');
              }
        }
      }

    const onSubmitFiles = async () => {
        setError(null);
        setLoading(true)
        console.log("workerFile", {workerFile, shiftFile})
        try {
            await axiosInstance.post(`/${user.orgId}/schedule`, { workerFile, shiftFile })
            navigate('/shift');
        } catch (e) {
            setError(e);
            console.log('Error in inserting files: ', e);
        } finally {
            setLoading(false);
        }
    }





    return (
        <div class="container">
            <Navbar></Navbar>
            <section className="main">
            <Header text="Upload Files Page" />

            <DownloadButtons text="For download format files: "></DownloadButtons>

            <section className="slider-upload">
                    <div className="cardUpload">
                        <div className="card-content">
                            <img src={shiftFileUploaded?myDocument : myUpload} alt="Watch Profile" className="card-imgU"/>
                            <h1 className="card-titleU">Shift File</h1>
                            <div className="card-body">
                                <p className="card-expU">Explanation about this web.</p>
                            </div>
                            <div className="card-footer">
                                <label className="btn btn-success" htmlFor="firstimg">{labelShift}</label>
                                <input type="file" id="firstimg" onChange={(e) => handleFile(e, 'shift')} />




                            </div>
                        </div>
                    </div>
                    <div className="cardUpload">
                        <div className="card-content">
                            <img src={WorkersFileUploaded?myDocument : myUpload} alt="Watch Profile" className="card-imgU"/>
                            <h1 className="card-titleU">Workers File</h1>
                            <div className="card-body">
                                <p className="card-expU">You can see your shifts and edit them.</p>
                            </div>
                            <div className="card-footer">
                                <label className="btn btn-success" htmlFor="firstimg1">{labelWorkers}</label>
                                <input type="file" id="firstimg1" onChange={(e) => handleFile(e, 'worker')} />
                            </div>
                        </div>
                    </div>


                </section>


                    <div className="buttons-p">
                        <button class="submit-button" onClick={onSubmitFiles} disabled={loading}>{loading  ? "Uploading..." : "Submit files"}</button>
                        {error && <p style={{color: 'red'}}> Could not upload the file. please try again.</p>}
                    </div>


            </section>

        </div>

    )
}

export default FileUpload
