const multer = require('multer');
const { existsSync, mkdirSync } = require('fs');
const { resolve } = require('path');
const { BadRequestError } = require('../errors');
//file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const validFields =
      /students|courses|resources|questions|examsAns|gallery|thumbnail|discussions/;
    if (!file.fieldname) {
      return cb(null, true);
    }
    const isFieldValid = validFields.test(file.fieldname);
    if (!isFieldValid) {
      cb(new Error(`Field name didn't match`));
    }
    let mathRand = Math.ceil(Math.random() * 10).toString();
    let destName = resolve(__dirname, `../uploads/${file.fieldname}`);

    if (file.fieldname === 'examsAns') {
      destName = resolve(
        __dirname,
        `../uploads/${file.fieldname}/exam@${req.body.examId}/stu@${req.user.id}`
      );
    } else if (file.fieldname === 'resources') {
      destName = resolve(
        __dirname,
        `../uploads/${file.fieldname}/${req.body.Title.split(' ').join('_')}`
      );
    } else if (file.fieldname === 'discussions') {
      destName = resolve(
        __dirname,
        `../uploads/${file.fieldname}/${req.body.question
          .split(' ')
          .join('_')
          .slice(0, 10)}`
      );
    } else if (file.fieldname === 'questions') {
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

    let pathName = `uploads/${file.fieldname}`;
    if (file.fieldname === 'examsAns') {
      pathName = resolve(
        __dirname,
        `../uploads/${file.fieldname}/exam@${req.body.examId}/stu@${req.user.id}`
      );
    } else if (file.fieldname === 'resources') {
      pathName = `uploads/${file.fieldname}/${req.body.Title.split(' ').join(
        '_'
      )}`;
    } else if (file.fieldname === 'discussions') {
      pathName = `uploads/${file.fieldname}/${req.body.question
        .split(' ')
        .join('_')
        .slice(0, 10)}`;
    } else if (file.fieldname === 'questions') {
      pathName = `uploads/${file.fieldname}/${req.body.title
        .split(' ')
        .join('_')
        .slice(0, 15)}`;
    }
    cb(null, pathName);
  },
  filename: (req, file, cb) => {
    let type = file.mimetype.split('/');
    let fileExt = type[type.length - 1];

    let fileName = '';
    if (file.fieldname === 'examsAns') {
      fileName = `ansfile_${req.body.examId}_${req.user.id}_@${Date.now()}`;
    } else if (file.fieldname === 'students') {
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
    } else if (file.fieldname === 'resources') {
      fileName = req.body.Title.split(' ').join('_') + `_${Date.now()}`;
    } else if (file.fieldname === 'discussions') {
      fileName = `${
        req.body.question.split(' ').join('_').slice(0, 10) + `_${Date.now()}`
      }`;
    } else if (file.fieldname === 'questions') {
      fileName =
        req.body.title.split(' ').join('_').slice(0, 15) + `_${Date.now()}`;
    } else {
      fileName = file.fieldname + `-${Date.now()}`;
    }
    cb(null, fileName + '.' + fileExt);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 4 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|pdf|ppt|pptx/;

    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType) {
      return cb(null, true);
    } else {
      cb(new Error('only jpg,png,jpeg,pdf,ppt,pptxis allowed!'));
    }

    cb(new Error('there was an unknown error'));
  },
});

module.exports = upload;
