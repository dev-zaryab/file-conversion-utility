import React, { useState } from 'react'
import axios from 'axios';
import Progressbar from './Progressbar';
import swal from 'sweetalert'

export default function Mergepdf() {
    const [file, setfile] = useState("")
    const [progress, setprogress] = useState(0)

    function handlefile(e) {
        setfile(e.target.files)
        //****** file Validation *********
        var fileInput = document.getElementById('file');
        var filePath = fileInput.value;
        var allowedExtensions = /(\.pdf)$/i;
        if (!allowedExtensions.exec(filePath)) {
            swal("Oops", "Please Upload a Valid File", "error")
            setfile('')
        }
        //****** End file Validation ********* 
    }
    async function Mergepdffile(e) {
        e.preventDefault();
        setprogress(2)
        const formData = new FormData();
        for (let i = 0; i < file.length; i++) {
            formData.append("files", file[i]);
        }

        await axios({
            method: 'post',
            url: process.env.REACT_APP_ANServer + 'mergepdf',
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
            <h1 className="text-center my-2">Merge PDFS</h1>
            <p className="text-center">Combine PDFs in the order you want with the easiest PDF merger available. </p>
            <div className="container my-5">
                <div className="form-group">
                    <form onSubmit={Mergepdffile}>
                        <input type="file" className="form-control-file" id="file" name="file" onChange={(e) => handlefile(e)} accept=".pdf" multiple required />
                      
                        {file !== '' ? (
                            <button type="submit" className="btn btn-success my-2">Merge</button>
                        ) : 'No file is selected'}
                    </form>
                    <Progressbar progress={progress} setprogress={setprogress} msg="File is Downloading... !" alerttype="#fd7e14" />
                </div>
            </div>
        </div>
    )
}
