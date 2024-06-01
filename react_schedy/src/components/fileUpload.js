import React, { useState } from "react";
import '../styles/uploadfiles.css';
import myImage from './pics/upload.jpg';
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
            <div >
                <div><h3> Workers </h3></div>
                <div class="file-area" data-img=""><img src={myImage} alt="My Image" /></div>
                <input class="select-workers" type="file" name="file" onChange={handleFile} />
                <br></br>
            </div>
            <form onSubmit={handleUpload}>
                <button class="select-workers">Upload</button>
            </form>
        </div>
    )
}

export default FileUpload 