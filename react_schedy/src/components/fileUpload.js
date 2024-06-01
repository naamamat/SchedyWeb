import React, { useState } from "react";
import '../styles/uploadfiles.css';
import myImage from '../pic/upload.png';
import Navbar from "./navbar";
import DownloadButtons from './downloadButtons';
function FileUpload (){
    const [file, setFile]=useState()

    function handleFile(event){
        setFile(event.target.files[0])
        console.log("hello")
    }
    function handleUpload(){
        const formData = new FormData();
        formData.append('file', file)
        fetch(
            'url',
            {
                method:"POST",
                body: formData
            }
        ).then((response)=>response.json()).then(
            (result)=>{
                console.log('succses', result)
            }
        )
        .catch(error => {
            console.log("Error: ", error)
        })
        
    }
    return (
    <div class="container">
        <Navbar></Navbar>
    <div class ="upload">
        
        <div class="containerUpload">
            
            <div >
                <div><h3> Workers </h3></div>
                {/* <DownloadButtons></DownloadButtons> */}
                <div class="file-area" data-img=""><img src={myImage} alt="My Image" /></div>
                <input class="select-workers" type="file" name="file" onChange={handleFile} />
                <br></br>
            </div>
            <form onSubmit={handleUpload}>
                <button class="select-workers">Upload</button>

            </form>
        </div>
    </div>
    </div>
       
    )
}

export default FileUpload 