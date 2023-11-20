const { clients } = require('../models');
const uniqid = require('uniqid');
const { validate } = require('deep-email-validator');
const { UnauthenticatedError, BadRequestError } = require('../errors');
const { hashSync, compare } = require('bcryptjs');
const deleteFile = require('../utils/deleteFile');
const hashSalt = Number(process.env.SALT);

const emailValidate = async (req, res, next) => {
  const { email } = req.body;
  const emailRes = await validate(email);
  if (email) {
    if (emailRes?.valid) next();
    else {
      deleteFile(req.file.path);
      throw new UnauthenticatedError(
        'Invalid email ID. Please provide a valid one.'
      );
    }
  } else {
    deleteFile(req.file.path);
    throw new UnauthenticatedError('Email field should not be empty');
  }
};

const passwordValidate = async (req, res, next) => {
  const { id, mode } = req.user;
  const { password } = req.body;
  if (!password) {
  }
  if (mode === 'par') {
    const clientUser = await clients.findByPk(id, {
      attributes: ['password'],
    });
    const match = await compare(password, clientUser.password);
    if (!match) {
      throw new UnauthenticatedError('wrong password entered');
    } else next();
  }
};

const clientRegValidate = async (req, res, next) => {
  const { fullName, email, phone, password } = req.body;
  if (fullName && email && phone && password) {
    const isEmailThere = await clients.findOne({
      where: { email: email },
    });
    if (isEmailThere) {
      deleteFile(req.file.path);
      throw new UnauthenticatedError(`Already registered with ${email}`);
    }

    const hashedPass = hashSync(password, hashSalt);

    const data = {
      fullName: fullName.trim(),
      email,
      phone: phone.trim(),
      userName: req.userName,
      password: hashedPass,
    };

    req.user = data;
    next();
  } else {
    deleteFile(req.file.path);
    throw new BadRequestError('Input fields should not be empty');
  }
};

module.exports = {
  clientRegValidate,
  emailValidate,
  passwordValidate,
};
