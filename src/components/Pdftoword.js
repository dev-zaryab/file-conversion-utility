import React, { useState } from 'react'
import Progressbar from './Progressbar';
import swal from 'sweetalert';


export default function Pdftoword() {

    const [file, setfile] = useState("")
    const [progress, setprogress] = useState(0)

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

    return (
        <div className="main-container my-5 p-2">
            <h1 className="text-center my-2">PDF to Word</h1>
            <p className="text-center">Convert your PDF to WORD documents with incredible accuracy.</p>
            <div className="container my-5">
                <div className="form-group">

                    <form action="https://freemediatools.com/pdftodocx" method="post" enctype="multipart/form-data">
                        <input type="file" className="form-control-file" id="file" name="file" onChange={(e) => handlefile(e)} accept=".pdf" multiple required />

                        {file !== '' ? (
                            <button type="submit" className="btn btn-success my-2">Convert into Word</button>
                        ) : 'No file is selected'}
                    </form>
                    <Progressbar progress={progress} setprogress={setprogress} msg="File is Downloading... !" alerttype="#fd7e14" />
                </div>
            </div>
        </div>
    )
}
