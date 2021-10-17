import React, { useState } from 'react';
import axios from 'axios';
import Progressbar from './Progressbar';
import Alerts from './Alerts'

export default function Fdecrypt() {
    //Decrypt
    const [file, setfile] = useState("")
    const [progress, setprogress] = useState(0)
    const [filepswd, setfilepswd] = useState('');
    const [error, setError] = useState('');

    function handlefile2(e) {
        setfile(e.target.files)

    }
    async function decrptfile(e) {
        e.preventDefault();
        setError("");
        setprogress(2)
        const formData = new FormData();
        for (let i = 0; i < file.length; i++) {
            formData.append("file", file[i]);
        }

        formData.append("filepswd", filepswd);
        await axios({
            method: 'post',
            url: process.env.REACT_APP_ANServer + 'fdecrypt',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'

            },
            onUploadProgress(progressEvent) {
                var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                setprogress(percentCompleted)
            }
        }).then((response) => {
            console.log(response.status);
            if (response.data.error === 'no error') {
                const link = document.createElement('a');
                link.href = response.data.url;
                document.body.appendChild(link);
                link.click();
                setError("");
            }
            else {
                setprogress(0)
                setError("Sorry you entered Password is Not Match for decrytion");

            }
        }).catch((e) = console.log("Some Error Occurs"));
    }


    return (
        <div>
            <form onSubmit={decrptfile}>
                <div className="form-group">
                    <input type="file" id="file2" className="form-control" onChange={(e) => handlefile2(e)} required />
                

                    {file !== '' ? (
                        <>
                            <div className="form-group">
                                <label htmlFor="Password2">Password</label>
                                <input type="password" className="form-control" id="Password2" onChange={(e) => { setfilepswd(e.target.value) }} placeholder="Password" required />
                            </div>
                            <button type="submit" className="btn btn-success my-2">Decrypt</button>
                        </>
                    ) : 'No file is selected'}

                </div>


            </form>

            <Progressbar progress={progress} setprogress={setprogress} msg="File is Downloading... !" alerttype="#fd7e14" />



            {error !== '' ?
                <Alerts msg={error} alerttype="red" />
                : ' '}

            <h2 className="my-2">How its works</h2>
            <ol>
                <li>Upload your Encrypted file </li>
                <li>Enter that decryption password</li>
                <li>Click on Decrypt button</li>
                <li>After that your decrypted file will automatically download if the password match</li>
            </ol>

        </div>
    )
}
