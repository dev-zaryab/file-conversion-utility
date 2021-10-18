import React, { useState } from 'react'
import axios from 'axios';
import Progressbar from './Progressbar';
import swal from 'sweetalert';

export default function Splitpdf() {
    const [file, setfile] = useState("")
    const [progress, setprogress] = useState(0)
    const [splitpdfs, setsplitpdfs] = useState([])
    let f = [];

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
    async function Splitpdffile(e) {
        e.preventDefault();
        setprogress(2)
        const formData = new FormData();
        for (let i = 0; i < file.length; i++) {
            formData.append("file", file[i]);
        }

        await axios({
            method: 'post',
            url: process.env.REACT_APP_ANServer + 'splitpdf',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress(progressEvent) {
                var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                setprogress(percentCompleted)
            }
        }).then((response) => {
            for (let index = 1; index <= response.data.pages; index++) {
                let d = response.data.url + '-' + index + '.pdf';
                f.push(d);
            }
            setsplitpdfs(f);
        });
    }
    return (
        <div className="main-container my-5 p-2">
            <h1 className="text-center my-2">Split PDF</h1>
            <p className="text-center">Separate one page or a whole set for easy conversion into independent PDF files. </p>
            <div className="container my-5">
                <div className="form-group">
                    <form onSubmit={Splitpdffile}>
                        <input type="file" className="form-control-file" id="file" name="file" onChange={(e) => handlefile(e)} accept=".pdf" required />

                        {file !== '' ? (
                            <button type="submit" className="btn btn-success my-2">Split</button>
                        ) : 'No file is selected'}
                    </form>
                    <Progressbar progress={progress} setprogress={setprogress} msg="File Uploaded" alerttype="green" />
                </div>
                {splitpdfs.map((d, index) => {

                    return (
                        <div key={d}>
                            <div className="my-2 alert alert-warning alert-dismissible text-light fade show" style={{ backgroundColor: 'blueviolet' }} role="alert">
                                <strong>Page no {index + 1}<a href={d} className="text-decoration-none text-danger"> Download </a></strong>
                            </div>
                        </div>
                    )
                }
                )}
            </div>
        </div>
    )
}
