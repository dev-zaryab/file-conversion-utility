import React, { useState } from 'react'
import axios from 'axios';
import Progressbar from './Progressbar';
import swal from 'sweetalert';

export default function Imagetopdf() {

    const [file, setfile] = useState("")
    const [progress, setprogress] = useState(0)

    function handlefile(e) {
        setfile(e.target.files);
        //****** file Validation *********
        var fileInput = document.getElementById('file');
        var filePath = fileInput.value;
        var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        if (!allowedExtensions.exec(filePath)) {
            swal("Oops", "Please Upload a Valid File", "error")
            setfile('')
        }
        //****** End file Validation ********* 
    }

    async function convertfile(e) {
        e.preventDefault();
        setprogress(2)
        const formData = new FormData();
        for (let i = 0; i < file.length; i++) {
            formData.append("files", file[i]);
        }

        await axios({
            method: 'post',
            url: process.env.REACT_APP_ANServer + 'imagetopdf',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress(progressEvent) {
                var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                setprogress(percentCompleted)
            }
        }).then((response) => {
            console.log(response.data);
            const link = document.createElement('a');
            link.href = response.data;
            document.body.appendChild(link);
            link.click();
        });
    }

    return (
        <div className="main-container my-5 p-2">
            <h1 className="text-center my-2">image's to Pdf</h1>
            <p className="text-center">Convert images to PDF in seconds. Easily adjust orientation and margins.</p>
            <div className="container my-5">
                <div className="form-group">

                    <form onSubmit={convertfile}>
                        <input type="file" className="form-control-file" id="file" name="file" onChange={(e) => handlefile(e)} accept="image/png, image/gif, image/jpeg,image/jpg" multiple required />
                        {file !== '' ? (
                            <button type="submit" className="btn btn-success my-2">Convert</button>
                        ) : 'No file is selected'}
                    </form>
                    <Progressbar progress={progress} setprogress={setprogress} msg="File is Downloading... !" alerttype="#fd7e14" />
                </div>
            </div>
        </div>
    )
}
