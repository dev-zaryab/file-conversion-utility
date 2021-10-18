import React from "react";

import imageCompression from "browser-image-compression";
import '../style.css';

class imageCompressor extends React.Component {
  constructor() {
    super();
    this.state = {
      //compressedLink:"https://icons.iconarchive.com/icons/blackvariant/button-ui-system-folders-drives/1024/Downloads-icon.png",
      compressedLink: "",
      originalImage: "",
      originalLink: "",
      clicked: false,
      uploadImage: false,
      compressedCompleted: ""
    };
  }

  handle = e => {
    const imageFile = e.target.files[0];
    this.setState({
      originalLink: URL.createObjectURL(imageFile),
      originalImage: imageFile,
      outputFileName: imageFile.name,
      uploadImage: true
    });
  };

  changeValue = e => {
    this.setState({ [e.target.name]: e.target.value });

  };

  click = e => {
    e.preventDefault();
    const options = {
      maxSizeMB: 2,
      useWebWorker: true,
      onProgress: (per) => {
        if (per === 10) {
          console.log("please wait Compressing");
        } else {
          this.setState({
            compressedCompleted: "100"
          });
        }
      },
    };

    if (options.maxSizeMB >= this.state.originalImage.size / 1024) {
      alert("Bring a bigger image");
      return 0;
    }

    let output;
    imageCompression(this.state.originalImage, options).then(x => {
      output = x;
      const downloadLink = URL.createObjectURL(output);
      this.setState({
        compressedLink: downloadLink,
        compressedfilesize: output.size,
      });
    });

    this.setState({ clicked: true });
    return 1;
  };

  render() {
    function formatBytes(bytes, decimals = 2) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    console.log("Original image size:" + formatBytes(this.state.originalImage.size));

    return (
      <>
        <div className="main-container my-4 p-2">
          <h1 className="text-center my-2">Image Compressor</h1>
          <p className="text-center">Reduce file size while optimizing for maximal IMAGE quality. </p>
          <div className="container my-5">

            <div className="card-body">
              <div>
                {this.state.uploadImage ? (
                  <>
                    <img className="card-img-top" variant="top" src={this.state.originalLink} alt="img Not Loaded Something went Wrong"></img>
                  </>

                ) : (
                  <center>
                    <img className="imagecompressionimg" variant="top" src="imagecompression.png" alt="Something went Wrong"></img>
                  </center>
                )}
                <div>
                  <input type="file" id="file" accept="image/*" className="btn btn-warning w-100" onChange={e => this.handle(e)}/>
                  {this.state.originalLink !== '' ? (
                    <>
                      <button type="button" className="btn btn-primary" onClick={e => this.click(e)}>
                        Compress
                      </button>
                    </>
                  ) : 'No file is selected'}
                  <br /><br />
                </div>
              </div>

              <div>
                <br />
                <div className="text-dark">
                  {this.state.compressedfilesize !== undefined ? (
                    <>
                      {this.state.compressedCompleted === "100" ? (
                        <>
                          <b>Original image size:{formatBytes(this.state.originalImage.size)}  </b><br />
                          {/* <b>Quality: {this.state.compressedquality}% </b><br /> */}
                          <b>Compressed image size:{formatBytes(this.state.compressedfilesize)}  </b><br /><br />
                          {this.state.clicked ? (
                            <div>
                              <a href={this.state.compressedLink} className="btn btn-danger">
                                View
                              </a>

                              <a href={this.state.compressedLink} download={this.state.outputFileName} className="m-4 btn btn-success">
                                Download
                              </a>
                            </div>
                          ) : (
                            <></>
                          )}
                        </>
                      ) :
                        (
                          <>
                          </>
                        )}
                    </>) : ''}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default imageCompressor;
