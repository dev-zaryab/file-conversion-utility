import React from "react";
import Fdecrypt from "./Fdecrypt";
import Fencrypt from "./Fencrypt";

export default function Fileencrption() {
  return (
    <div className="main-container my-5 p-2">
      <h1 className="text-center my-2">Make file with End to End encrypted</h1>
      <p className="text-center">Make Encrypt or decrypt file with Crytography </p>
      <div className="container my-5">
        <ul className="nav nav-pills mb-3 my-2" id="pills-tab" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active"
              id="pills-home-tab"
              data-toggle="pill"
              href="#pills-home"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              Encrypt File
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="pills-profile-tab"
              data-toggle="pill"
              href="#pills-profile"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
            >
              Decrypt File
            </a>
          </li>
        </ul>
        <div className="tab-content bg-light p-2" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <Fencrypt />
          </div>
          <div
            className="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <Fdecrypt />
          </div>
        </div>
      </div>
    </div>
  );
}
