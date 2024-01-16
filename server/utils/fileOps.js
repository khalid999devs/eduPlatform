const deleteFile = require('./deleteFile');

const deleteMultipleFiles = (files) => {
  files.forEach((file) => {
    if (file.path) {
      deleteFile(file.path);
    } else if (file.url) {
      deleteFile(file.url);
    }
  });
};

module.exports = {
  deleteMultipleFiles,
};
