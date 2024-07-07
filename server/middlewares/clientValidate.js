const { clients } = require('../models');
const uniqid = require('uniqid');
const { validate } = require('deep-email-validator');
const { UnauthenticatedError, BadRequestError } = require('../errors');
const { hashSync, compare } = require('bcryptjs');
const deleteFile = require('../utils/deleteFile');
const { Op } = require('sequelize');
const hashSalt = Number(process.env.SALT);

const emailValidate = async (req, res, next) => {
  const { email } = req.body;
  const emailRes = await validate(email);
  if (email) {
    // if (emailRes?.valid) next();
    // else {
    //   throw new UnauthenticatedError(
    //     'Invalid email ID. Please provide a valid one.'
    //   );
    // }
    next();
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

  const clientUser = await clients.findByPk(id, {
    attributes: ['password'],
  });
  const match = await compare(password, clientUser.password);
  if (!match) {
    throw new UnauthenticatedError('wrong password entered');
  } else next();
};

const clientRegValidate = async (req, res, next) => {
  const { fullName, email, phone, password } = req.body;

  let isOnlyPhone = false;
  let isOnlyEmail = false;

  if (fullName && (email || phone) && password) {
    let whereOr = [];
    if (email?.length > 0 && phone?.length > 0) {
      whereOr = [{ email: email }, { phone: phone }];
    } else if (email?.length > 0) {
      whereOr = [{ email: email }];
      isOnlyEmail = true;
    } else {
      whereOr = [{ phone: phone }];
      isOnlyPhone = true;
    }
    const isEmailPhoneThere = await clients.findOne({
      where: { [Op.or]: whereOr },
    });
    if (isEmailPhoneThere) {
      throw new UnauthenticatedError(
        `Already registered with ${
          isOnlyPhone
            ? phone
            : isOnlyEmail
            ? email
            : `this ${email} or ${phone}`
        }`
      );
    }

    const hashedPass = hashSync(password, hashSalt);
    const username = fullName.split(' ')[0].toLowerCase() + `@${Date.now()}`;

    let data = {
      fullName: fullName.trim(),
      email,
      phone: phone.trim(),
      userName: username,
      password: hashedPass,
    };
    if (isOnlyEmail) delete data.phone;
    else if (isOnlyPhone) delete data.email;

    req.user = data;
    next();
  } else {
    throw new BadRequestError('Input fields should not be empty');
  }
};

module.exports = {
  clientRegValidate,
  emailValidate,
  passwordValidate,
};
