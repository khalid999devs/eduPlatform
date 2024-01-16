const deleteFile = require('./deleteFile');

const deleteMultipleFiles = (files) => {
  files.forEach((file) => {
    deleteFile(file.path);
  });
};

module.exports = {
  deleteMultipleFiles,
};
