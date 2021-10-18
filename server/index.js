const express = require("express")
const fs = require("fs")
const port = 5000;
var cors = require('cors')
var path = require('path')

const imgToPDF = require('image-to-pdf');
var app = express()

app.use(fileUpload());

app.use(cors())

let protocol = "https://";

app.get("/", (req, res) => {
  res.send("Welcome To File Conversion Utility Backend");
})

const multer = require('multer')
const upload = multer({
  dest: 'Uploads/'
})

app.post('/imagetopdf', upload.single('files'), async function (req, res, next) {

  let servername = protocol + req.get('host');
  let flength = req.files.files.length;

  //for 1 file
  if (flength == undefined) {
    try {
      let imageFile = req.files.files;

      let newf = Date.now() + "converted" + path.extname(imageFile.name);
      let downloadfile = newf + '.pdf';

      console.log(newf)
      await imageFile.mv(`${__dirname}/Uploads/${newf}`, err => {
        if (err) {
          return res.status(500).send(err);
        } else {
          const pages = [
            "Uploads/" + newf
          ];

          imgToPDF(pages, 'A4').pipe(fs.createWriteStream("Uploads/" + downloadfile));

          setTimeout(function () {
            res.send(`${servername}/${downloadfile}`);
          }, 4000)
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  //for 1 or many files
  else {
    let checkloop = 0;
    let mpages = [];
    let fuploaded = 0;
    let downloadfile = Date.now() + '.pdf';

    for (let index = 0; index < flength; index++) {
      let imageFile = req.files.files[index];
      let newf = Date.now() + "converted" + index + path.extname(imageFile.name);
      mpages.push("Uploads/" + newf);

      await imageFile.mv(`${__dirname}/Uploads/${newf}`, err => {
        if (err) {
          return res.status(500).send(err);
          exit
        } else {
          fuploaded++;
          console.log(`${__dirname}/Uploads/${newf} done`);

          if (fuploaded == flength) {
            imgToPDF(mpages, 'A4').pipe(fs.createWriteStream("Uploads/" + downloadfile));
            console.log(fuploaded)
          }
        }
      })
      checkloop++;
    }
    if (checkloop == flength) {
      console.log(checkloop);
      setTimeout(function () {
        res.send(`${servername}/${downloadfile}`);
      }, 4000)
    }
  }

})

//*************************CSV to JSON**************************
let csvToJson = require('convert-csv-to-json');
app.post("/csvtojson", async (req, res) => {
  try {
    if (req) {
      let servername = protocol + req.get('host');
      //  console.log(req.files)
      const clientfile2 = req.files.file;
      // console.log(clientfile2);
      let newf2 = Date.now() + "_change_csv_to_json_format" + path.extname(clientfile2.name);;
      await clientfile2.mv(`${__dirname}/Uploads/${newf2}`, err => {
        if (err) {
          return res.status(500).send(err);
        } else {
          let fileInputName = "Uploads/" + newf2;
          let fileOutputName = "Uploads/" + newf2 + '.json';
          let downloadfile2 = newf2 + '.json';
          let json = csvToJson.fieldDelimiter(',').getJsonFromCsv(fileInputName);
          console.log(JSON.stringify(json))
          fs.writeFileSync(fileOutputName, JSON.stringify(json));
          res.send(`${servername}/${downloadfile2}`);
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
})


//*************************JSON to CSV**************************
const converter = require('json-2-csv');
const { exit } = require("process");
app.post("/jsontocsv", async (req, res) => {
  try {
    let servername = protocol + req.get('host');
    console.log(req.files)
    const clientfile2 = req.files.file;
    //  console.log(clientfile2);
    let newf2 = Date.now() + "_change_json_to_csv_format" + path.extname(clientfile2.name);
    await clientfile2.mv(`${__dirname}/Uploads/${newf2}`, err => {
      if (err) {
        return res.status(500).send(err);
      } else {
        let file2 = "Uploads/" + newf2;
        let file2output = "Uploads/" + newf2 + '.csv';
        let downloadfile2 = newf2 + '.csv';
        file2 = fs.readFile(file2, 'utf-8', (e, data) => {
          if (data) {
            // convert JSON array to CSV string
            converter.json2csv(JSON.parse(data), (err, csv) => {
              if (err) {
                throw err;
              } else {
                fs.writeFileSync(file2output, csv)
              }
            });
          }
        });
        res.send(`${servername}/${downloadfile2}`);
      }
    });
  } catch (err) {
    res.send(`${servername}/${downloadfile2}`);
  }
})


//*************************Image Format**************************
app.use(express.urlencoded({
  extended: false
}));

app.post("/changeimgformat", async (req, res) => {
  let servername = protocol + req.get('host');
  let downloadfile2;

  try {
    // console.log(req.files)
    const clientfile2 = req.files.file;
    // console.log(clientfile2);
    let newf2 = Date.now() + "_change_image_format" + path.extname(clientfile2.name);
    await clientfile2.mv(`${__dirname}/Uploads/${newf2}`, err => {
      if (err) {
        return res.status(500).send(err);
      } else {
        let file3 = "Uploads/" + newf2;
        let file3ext = '.' + req.body.fileext;
        let nfile = "Uploads/" + newf2 + file3ext;
        downloadfile2 = newf2 + file3ext;

        console.log(newf2)
        fs.copyFile(file3, `${__dirname}/${nfile}`, (err) => {
          if (err) {
            console.log(err)
          } else {
            //fs.rm(file3);
            console.log("Image converted Successfully")
          }
        });
        res.send(`${servername}/${downloadfile2}`);
      }
    });
  } catch (err) {
    res.send(`${servername}/${downloadfile2}`);
  }
})


//*************************Modules file for Encryption and Decryption**************************
const crypto = require('crypto');
const zlib = require('zlib');

//Appendinitvect
const { Transform } = require('stream');

class AppendInitVect extends Transform {
  constructor(initVect, opts) {
    super(opts);
    this.initVect = initVect;
    this.appended = false;
  }

  _transform(chunk, encoding, cb) {
    if (!this.appended) {
      this.push(this.initVect);
      this.appended = true;
    }
    this.push(chunk);
    cb();
  }
}

//Getcipherkey
function getCipherKey(password) {
  return crypto.createHash('sha256').update(password).digest();
}

//Encrypt
function encrypt({ file, password, newfilename }) {
  const initVect = crypto.randomBytes(16);
  // Generate a cipher key from the password.
  const CIPHER_KEY = getCipherKey(password);
  const readStream = fs.createReadStream(file);
  const gzip = zlib.createGzip();
  const cipher = crypto.createCipheriv('aes256', CIPHER_KEY, initVect);
  const appendInitVect = new AppendInitVect(initVect);

  // Create a write stream with a different file extension.
  const writeStream = fs.createWriteStream(path.join(newfilename));
  readStream.pipe(gzip).pipe(cipher).pipe(appendInitVect).pipe(writeStream);
}

//Decrypt
function decrypt({ file, password, newfilename }) {
  // First, get the initialization vector from the file.
  const readInitVect = fs.createReadStream(file, { end: 15 });
  let initVect;
  readInitVect.on('data', (chunk) => {
    initVect = chunk;
  });
  // Once we’ve got the initialization vector, we can decrypt the file.
  readInitVect.on('close', () => {
    const cipherKey = getCipherKey(password);
    const readStream = fs.createReadStream(file, { start: 16 });
    const decipher = crypto.createDecipheriv('aes256', cipherKey, initVect);
    const unzip = zlib.createUnzip();
    const writeStream = fs.createWriteStream(newfilename);
    readStream.pipe(decipher).pipe(unzip).pipe(writeStream);
  });
}

//*************************Modules file for Encryption and Decryption**************************


//*************************File Encryption**************************
app.use(express.urlencoded({
  extended: false
}));
app.post("/fencrypt", async (req, res) => {
  let servername = protocol + req.get('host');
  let downloadfile2;

  try {
    // console.log(req.files)
    const clientfile2 = req.files.file;
    //console.log(clientfile2);
    let newf2 = Date.now() + "_file_encrypted" + path.extname(clientfile2.name);
    await clientfile2.mv(`${__dirname}/Uploads/${newf2}`, err => {
      if (err) {
        return res.status(500).send(err);
      } else {
        let file3 = "Uploads/" + newf2;
        let filepswd = req.body.filepswd;
        downloadfile2 = 'AN_' + newf2;
        console.log(newf2)
        console.log(downloadfile2)
        encrypt({ file: file3, password: filepswd, newfilename: "Uploads/" + downloadfile2 });
        res.send(`${servername}/${downloadfile2}`);
      }
    });
  } catch (err) {
    res.send(`${servername}/${downloadfile2}`);
  }
})


//*************************File Decryption**************************
app.use(express.urlencoded({
  extended: false
}));
app.post("/fdecrypt", async (req, res) => {
  let servername = protocol + req.get('host');
  let downloadfile2;

  let seterror = {
    error: 'no error',
  }

  try {
    //console.log(req.files)
    const clientfile2 = req.files.file;
    // console.log(clientfile2);

    let newf2 = Date.now() + "_file_decrypted" + path.extname(clientfile2.name);
    await clientfile2.mv(`${__dirname}/Uploads/${newf2}`, err => {
      if (err) {
        return res.status(500).send(err);
      } else {
        let file3 = "Uploads/" + newf2;
        let filepswd = req.body.filepswd;
        downloadfile2 = 'AN_' + newf2;
        decrypt({ file: file3, password: filepswd, newfilename: "Uploads/" + downloadfile2 });
        process.on('uncaughtException', (error) => {
          if (error) {
            seterror.error = "Error Occurs";
          }
        })
        setTimeout(function () {
          console.log("Data Sent");
          res.status(200).send(`{"url":"${servername}/${downloadfile2}","error":"${seterror.error}"}`);
        }, 2000)
      }
    });
  } catch (err) {
    console.log(err)
  }
})


//*************************Merge PDF Files**************************
const PDFMerger = require('pdf-merger-js');
var merger = new PDFMerger();

app.post('/mergepdf', upload.single('files'), async function (req, res, next) {
  let servername = protocol + req.get('host');
  let flength = req.files.files.length;

  //for 1 file
  if (flength == undefined) {
    try {
      let imageFile = req.files.files;
      let newf = Date.now() + "converted" + path.extname(imageFile.name);
      let downloadfile = Date.now() + "_mergedpdf.pdf";

      await imageFile.mv(`${__dirname}/Uploads/${newf}`, err => {
        if (err) {
          return res.status(500).send(err);
        } else {
          const pages = [
            "Uploads/" + newf
          ];

          (async () => {
            pages.forEach(mfilename => {
              merger.add(mfilename);
            });
            await merger.save('Uploads/' + downloadfile);
          })();
          setTimeout(function () {
            res.send(`${servername}/${downloadfile}`);
          }, 4000)
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  //for 1 or many files
  else {
    let checkloop = 0;
    let mpages = [];
    let fuploaded = 0;
    let downloadfile = Date.now() + "_mergedpdf.pdf";

    for (let index = 0; index < flength; index++) {
      let imageFile = req.files.files[index];
      let newf = Date.now() + "converted" + index + path.extname(imageFile.name);
      mpages.push("Uploads/" + newf);

      await imageFile.mv(`${__dirname}/Uploads/${newf}`, err => {
        if (err) {
          return res.status(500).send(err);
          exit
        } else {
          fuploaded++;
          console.log(`${__dirname}/Uploads/${newf} done`);

          if (fuploaded == flength) {
            (async () => {
              mpages.forEach(mfilename => {
                merger.add(mfilename);
              });
              await merger.save('Uploads/' + downloadfile);
            })();
            console.log(fuploaded)
          }
        }
      })
      checkloop++;
    }

    if (checkloop == flength) {
      setTimeout(function () {
        res.send(`${servername}/${downloadfile}`);
      }, 4000)
    }
  }
})


//*************************Password Protected PDF**************************
const HummusRecipe = require('hummus-recipe');
app.post("/passwordprotectedpdf", async (req, res) => {
  let servername = protocol + req.get('host');
  let downloadfile2;

  try {
    // console.log(req.files)
    const clientfile2 = req.files.file;
    //console.log(clientfile2);
    let newf2 = Date.now() + "_requestpasswordprotected_" + path.extname(clientfile2.name);
    await clientfile2.mv(`${__dirname}/Uploads/${newf2}`, err => {
      if (err) {
        return res.status(500).send(err);
      } else {
        let file3 = "Uploads/" + newf2;
        let filepswd = req.body.filepswd;
        downloadfile2 = 'passwordprotected_' + newf2;
        console.log(newf2)
        console.log(downloadfile2)

        const pdfDoc = new HummusRecipe(file3, "Uploads/" + downloadfile2);

        pdfDoc.encrypt({
          userPassword: filepswd,
          ownerPassword: filepswd,
          userProtectionFlag: 4
        })
          .endPDF();
        res.send(`${servername}/${downloadfile2}`);
      }
    });
  } catch (err) {
    res.send(`${servername}/${downloadfile2}`);
  }
})


//*************************Split PDF**************************
app.post("/splitpdf", async (req, res) => {
  let servername = protocol + req.get('host');
  let downloadfile2;

  try {
    const clientfile2 = req.files.file;
    let newf2 = Date.now() + "_splitpdf_" + path.extname(clientfile2.name);
    await clientfile2.mv(`${__dirname}/Uploads/${newf2}`, err => {
      if (err) {
        return res.status(500).send(err);
      } else {
        let file3 = "Uploads/" + newf2;
        downloadfile2 = 'splitpdf_' + newf2;
        const pdfDoc = new HummusRecipe(file3);
        const outputDir = path.join(__dirname, '/Uploads');
        pdfDoc.split(outputDir, downloadfile2).endPDF();
        res.send(`{"url":"${servername}/${downloadfile2}","pages":"${pdfDoc.metadata.pages}"}`);
      }
    });
  } catch (err) {
    res.send(`${servername}/${downloadfile2}`);
  }
})


//*************************Word to PDF**************************
var docxConverter = require('docx-pdf');
app.post("/wordtopdf", async (req, res) => {
  let servername = protocol + req.get('host');
  let downloadfile2;

  try {
    const clientfile2 = req.files.file;
    let newf2 = Date.now() + "_requestdoctopdf_" + path.extname(clientfile2.name);
    await clientfile2.mv(`${__dirname}/Uploads/${newf2}`, err => {
      if (err) {
        return res.status(500).send(err);
      } else {
        let file3 = "Uploads/" + newf2;
        downloadfile2 = 'doctopdf_' + newf2 + '.pdf';
        console.log(newf2)
        console.log(downloadfile2)

        docxConverter(file3, "Uploads/" + downloadfile2, function (err, result) {
          if (err) {
            console.log(err);
          }
          res.send(`${servername}/${downloadfile2}`);
        });
      }
    });
  } catch (err) {
    res.send(`${servername}/${downloadfile2}`);
  }
})


//******************Downloading file******************
app.get('/:file(*)', function (req, res, next) {
  var path = require('path');
  var file = req.params.file;
  //console.log(file)
  var path = path.resolve('.') + '/Uploads/' + file;
  res.download(path);
});

app.listen(port, () => {
  console.log("running")
})