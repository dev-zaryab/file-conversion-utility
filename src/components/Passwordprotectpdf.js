import React, { useState } from 'react'
import axios from 'axios';
import Progressbar from './Progressbar';
import swal from 'sweetalert';

export default function Passwordprotectpdf() {
    const [file, setfile] = useState("")
    const [progress, setprogress] = useState(0)
    const [filepswd, setfilepswd] = useState('')

    function handlefile(e) {
        setfile(e.target.files);

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
    async function Passwordprotectpdffile(e) {
        e.preventDefault();
        setprogress(2)
        const formData = new FormData();
        for (let i = 0; i < file.length; i++) {
            formData.append("file", file[i]);
        }
        formData.append("filepswd", filepswd);
        await axios({
            method: 'post',
            url: process.env.REACT_APP_ANServer + 'passwordprotectedpdf',
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
            <h1 className="text-center my-2">Password Protected PDF</h1>
            <p className="text-center">Encrypt your PDF with a password so it can't be removed.</p>
            <div className="container my-5">
                <div className="form-group">
                    <form onSubmit={Passwordprotectpdffile}>
                        <input type="file" className="form-control-file" id="file" name="file" onChange={(e) => handlefile(e)} accept=".pdf" required />

                      

                        {file !== '' ? (
                            <>
                                <div className="form-group my-2">
                                    <label htmlFor="Password1">Password</label>
                                    <input type="password" className="form-control" id="Password1" onChange={(e) => { setfilepswd(e.target.value) }} placeholder="Password" required />
                                </div>
                                <button type="submit" className="btn btn-success my-2">Create Protected PDF</button>
                            </>
                        ) : 'No file is selected'}

                    </form>

                    <Progressbar progress={progress} setprogress={setprogress} msg="File is Downloading... !" alerttype="#fd7e14" />
                </div>

            </div>
        </div>
    )
}
