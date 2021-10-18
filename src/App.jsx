import React from "react";
import './style.css';
import ImageCompressor from "./components/ImageCompressor";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { Nav } from "./components/Nav";
import { Imagetotext } from "./components/Imagetotext";
import { Features } from "./components/Features";
import Imageformat from "./components/Imageformat";
import Imagetopdf from "./components/Imagetopdf";
import Pdftoimage from "./components/Pdftoimage";
import Csvtojson from "./components/Csvtojson";
import Jsontocsv from "./components/Jsontocsv";
import Footer from "./components/Footer";
import Fileencrption from "./components/Fileencrption";
import Mergepdf from "./components/Mergepdf";
import Splitpdf from "./components/Splitpdf";
import Passwordprotectpdf from "./components/Passwordprotectpdf";
import Wordtopdf from "./components/Wordtopdf";
import Pdftoword from "./components/Pdftoword";
import Homepage from "./Homepage";

const App = () =>

  <div className="main-container">
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>

        <Route exact path="/Imagecompressor">
          <ImageCompressor />
        </Route>
        <Route exact path="/Imagetotext">
          <Imagetotext />
        </Route>

        <Route exact path="/Features">
          <Features />
        </Route>

        <Route exact path="/changeimageformat">
          <Imageformat />
        </Route>

        <Route exact path="/imgtopdf">
          <Imagetopdf />
        </Route>

        <Route exact path="/pdftoimage">
          <Pdftoimage />
        </Route>

        <Route exact path="/Csvtojson">
          <Csvtojson />
        </Route>

        <Route exact path="/Jsontocsv">
          <Jsontocsv />
        </Route>

        <Route exact path="/Fileencrption">
          <Fileencrption />
        </Route>

        <Route exact path="/mergepdf">
          <Mergepdf />
        </Route>

        <Route exact path="/splitpdf">
          <Splitpdf />
        </Route>
        
        <Route exact path="/Passwordprotectpdffile">
          <Passwordprotectpdf />
        </Route>

        <Route exact path="/wordtopdf">
          <Wordtopdf />
        </Route>

        <Route exact path="/pdftoword">
          <Pdftoword />
        </Route>

        <Route>
          <h2>404 Error Page Not Found</h2>
        </Route>

      </Switch>

    </Router>
    <Footer />
  </div>
export default App;
