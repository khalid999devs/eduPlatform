const multer = require('multer');
const { existsSync, mkdirSync } = require('fs');
const { resolve } = require('path');
const { BadRequestError } = require('../errors');
//file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const validFields = /students|courses/;
    if (!file.fieldname) {
      return cb(null, true);
    }
    const isFieldValid = validFields.test(file.fieldname);
    if (!isFieldValid) {
      cb(new Error(`Field name didn't match`));
    }
    let destName = resolve(__dirname, `../uploads/${file.fieldname}`);

    if (!existsSync(destName)) {
      try {
        mkdirSync(destName, { recursive: true });
      } catch (error) {
        console.log(error);
      }
    }
    const pathName = `uploads/${file.fieldname}`;
    cb(null, pathName);
  },
  filename: (req, file, cb) => {
    let type = file.mimetype.split('/');
    const fileExt = type[type.length - 1];

    let fileName = '';
    if (file.fieldname === 'students') {
      let { fullName, name } = req.body;

      if (fullName) {
        fullName = fullName.trim();
        fileName = fullName.split(' ')[0].toLowerCase() + `@${Date.now()}`;
        req.userName = fileName;
      } else if (name) {
        fileName = name;
      } else {
        cb(new BadRequestError('fullName should be provided'));
      }
    } else if (file.fieldname === 'courses') {
      fileName =
        req.body.title.split(' ').join('').slice(0, 6) + `@${Date.now()}`;
    } else {
      fileName = file.fieldname + `-${Date.now()}`;
    }
    cb(null, fileName + '.' + fileExt);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType) {
      return cb(null, true);
    } else {
      cb(new Error('only jpg,png,jpeg is allowed!'));
    }

    cb(new Error('there was an unknown error'));
  },
});

module.exports = upload;
