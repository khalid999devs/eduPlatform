const { courses, notifications } = require('../models');
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require('../errors');
const { redis } = require('../utils/redis');
const mailer = require('../utils/sendMail');
const deleteFile = require('../utils/deleteFile');

const uploadCourse = async (req, res) => {};

module.exports = { uploadCourse };
