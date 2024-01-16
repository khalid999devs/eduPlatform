const multer = require('multer');
const { existsSync, mkdirSync } = require('fs');
const { resolve } = require('path');
const { BadRequestError } = require('../errors');
const upload = require('./uploadFile');

function saveToDisk(file, callback) {
  const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      let destName;
      if (file.fieldname === 'questions') {
        destName = resolve(
          __dirname,
          `../uploads/${file.fieldname}/${req.body.title
            .split(' ')
            .join('_')
            .slice(0, 15)}`
        );
      }

      if (!existsSync(destName)) {
        try {
          mkdirSync(destName, { recursive: true });
        } catch (error) {
          console.log(error);
        }
      }
      cb(null, destName); // specify the directory where files will be stored
    },
    filename: (req, file, cb) => {
      let fileName;
      if (file.fieldname === 'questions') {
        fileName = req.body.title.split(' ').join('_').slice(0, 15);
      }
      cb(null, fileName); // specify the filename
    },
  });

  const uploadToDisk = multer({ storage: diskStorage }).single(file.fieldname);

  // Create a pseudo request and response for multer
  const req = { file: file };
  const res = {
    locals: {},
    on: (event, handler) => {
      if (event === 'end') {
        handler();
      }
    },
  };

  // Use the disk storage to save the file to disk
  uploadToDisk(req, res, (err) => {
    if (err) {
      return callback(err);
    }
    // File has been saved to disk
    let filePath;
    if (file.fieldname === 'questions') {
      filePath = `uploads/${file.fieldname}/${req.body.title
        .split(' ')
        .join('_')
        .slice(0, 15)}`;
    }
    callback(null, filePath);
  });
}

const storage = multer.memoryStorage();

const uploadMemory = multer({
  storage: storage,
  limits: { fileSize: 4 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|pdf|ppt|pptx|docx/;
    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType) {
      if (!req.fileBuffers) {
        req.fileBuffers = [];
      }
      req.fileBuffers.push(file);
      req.fileBuffers.forEach((file, index) => {
        console.log(file);
        // Access the buffer of the uploaded file
        const fileBuffer = file.buffer;

        // Now you can do something with the fileBuffer
        // For example, log the buffer length
        // console.log(`File ${index + 1} Buffer Length:`, fileBuffer.length);

        // Save the file to disk using diskStorage
        saveToDisk(file, (err, filePath) => {
          if (err) {
            console.error(`Error saving file ${index + 1} to disk:`, err);
            return res
              .status(500)
              .send(`Error saving file ${index + 1} to disk`);
          }

          console.log(`File ${index + 1} saved to disk:`, filePath);
        });
      });

      return cb(null, true);
    } else {
      cb(new Error('only jpg,png,jpeg,pdf,ppt,pptx is allowed!'));
    }

    cb(new Error('there was an unknown error'));
  },
});

module.exports = { uploadMemory };
