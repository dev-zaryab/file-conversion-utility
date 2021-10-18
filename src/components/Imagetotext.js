import React from "react";
import { useState } from 'react';
import '../style.css';
var Tesseract = window.Tesseract;


export function Imagetotext() {
  const [imagePath, setImagePath] = useState("");
  const [text, setText] = useState("");
  const handleChange = (event) => {
    setImagePath(URL.createObjectURL(event.target.files[0]));
  }

  function copytext(e) {
    navigator.clipboard.writeText(text);
    e.target.innerHTML = "Copied";
  }
  const handleClick = (e) => {
    e.preventDefault();
    setText("Please Wait...");
    Tesseract.recognize(
      imagePath, 'eng',
      {
        logger: m => console.log(m)
      }
    )
      .catch(err => {
        console.error(err);
      })
      .then(result => {
        // Get Confidence score
        // let confidence = result.confidence
        let text = result.text
        setText(text);
      })
  }

  return (
    <div className="main-container my-5 p-2">
      <h1 className="text-center my-2">Image To Text(OCR)</h1>
      <p className="text-center">Extract text from image and convert into editable Text output formats</p>

      <div className="container my-5">
        {imagePath !== '' ? <img src={imagePath} alt="something went wrong" width="100%" /> : ''}

        {text !== '' ? (<><div class="alert alert-success p-4 my-2" role="alert"><b>Converted Text is</b><br /><br />{text}
          <button className="btn btn-secondary d-block my-2" onClick={(e) => copytext(e)} type="button">Copy</button>
        </div>
        </>
        ) : ''}

        <form onSubmit={handleClick}>
          <input type="file" id="file" onChange={handleChange} accept="image/png, image/gif, image/jpeg,image/jpg" required />
        
          {imagePath !== '' ? (
            <button type="submit" className="btn btn-success my-2">Convert</button>
          ) : 'No file is selected'}
        </form>
      </div>
    </div>
  );
}




