import React, { useState } from 'react'
import axios from 'axios';
import Progressbar from './Progressbar';
import swal from 'sweetalert'

export default function Imageformat() {

    const [file, setfile] = useState("")
    const [progress, setprogress] = useState(0)
    const [ImgEXT, setImgEXT] = useState('jpg')

    function handlefile(e) {
        setfile(e.target.files)
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
            formData.append("file", file[i]);
        }

        formData.append("fileext", ImgEXT);
        await axios({
            method: 'post',
            url: process.env.REACT_APP_ANServer + 'changeimgformat',
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
            <h1 className="text-center my-2">Image Converter</h1>
            <p className="text-center">Transform images to other image extention </p>
            <div className="container my-5">
                <div className="form-group">
                    <form onSubmit={convertfile}>
                        <input type="file" className="form-control form-control-sm" id="file" name="file" onChange={(e) => handlefile(e)} accept="image/png, image/gif, image/jpeg,image/jpg" required />                   
                        {file !== '' ? (
                            <>
                                <br /><b>Convert Image into:</b>
                                <select className="my-2 form-select" onChange={(e) => { setImgEXT(e.target.value) }}>
                                    <option value="jpg">Convert into</option>
                                    <option value="jpg">JPG</option>
                                    <option value="png">PNG</option>
                                    <option value="jpeg">JPEG</option>
                                </select>
                                <br />
                                <button type="submit" className="btn btn-success my-2">Convert</button>
                            </>
                        ) : 'No file is selected'}
                    </form>
                    <Progressbar progress={progress} setprogress={setprogress} msg="File is Downloading... !" alerttype="#fd7e14" />
                </div>
            </div>
        </div>
    )
}
