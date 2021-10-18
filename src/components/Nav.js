import React from 'react'

import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark font-weight-bold text-white" style={{ background: "#195290", width: "100%" }}>
      <Link className="navbar-brand" to="/">
        <img src="mainlogo.png" width="100%" height="50" className="main_logo d-inline-block align-top" alt="" />

      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">

          <li className="nav-item active">
            <Link className="nav-link" to="/">Home<span className="sr-only">(current)</span></Link>
          </li>

          <li className="nav-item active">
            <Link className="nav-link" to="/Imagecompressor">Image Compressor <span className="sr-only">(current)</span></Link>
          </li>

          <li className="nav-item dropdown active">
            <div className="nav-link dropdown-toggle c-pointer" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Converters
            </div>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <Link className="dropdown-item" to="/imgtopdf">Images to PDF</Link>
              <Link className="dropdown-item" to="/Imagetotext">Image to Text</Link>
              <Link className="dropdown-item" to="/changeimageformat">Image Converter</Link>
              <Link className="dropdown-item" to="/csvtojson">CSV to JSON</Link>
              <Link className="dropdown-item" to="/Jsontocsv">JSON to CSV</Link>
              <Link className="dropdown-item" to="/mergepdf">Merge PDF</Link>
              <Link className="dropdown-item" to="/splitpdf">Split PDF</Link>
              <Link className="dropdown-item" to="/Passwordprotectpdffile">Password Protected PDF</Link>
              <Link className="dropdown-item" to="/Fileencrption">Make File with End to End Encrypted</Link>
              <Link className="dropdown-item" to="/wordtopdf">Word to PDF</Link>
              <Link className="dropdown-item" to="/pdftoword">PDF to Word</Link>
            </div>
          </li>

          <li className="nav-item active">
            <Link className="nav-link" to="Features">Features</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
