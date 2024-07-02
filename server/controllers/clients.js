const { clients, sequelize, clientcourses, orders } = require('../models');
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require('../errors');
const { hashSync, compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { attachTokenToResponse } = require('../utils/createToken');
const deleteFile = require('../utils/deleteFile');
const mailer = require('../utils/sendMail');
const sendSMS = require('../utils/sendSMS');
const { Op } = require('sequelize');

const registration = async (req, res) => {
  const newPar = await clients.create(req.user);
  mailer({ client: newPar }, 'par').catch((err) => {
    // console.log(err)
  });

  res.status(StatusCodes.CREATED).json({
    succeed: true,
    msg: 'Congratulations!! Your registration is successful.',
  });
};

const login = async (req, res) => {
  let clientUser;
  const { email, password, isCookieLong, phone } = req.body;

  if ((!email && !phone) || !password)
    return res.json({
      succeed: false,
      msg: 'Email & Phone or Password field should not be empty.',
    });
  clientUser = await clients.findOne({
    where: { [Op.or]: [{ email: email }, { phone: phone }] },
  });

  if (!clientUser)
    return res.json({
      succeed: false,
      msg: `${email} does not exist for students`,
    });

  const match = await compare(password, clientUser.password);
  if (!match) {
    if (req.signedCookies) {
      res.clearCookie('token');
    }
    return res.json({
      succeed: false,
      msg: 'Wrong email and password combination.',
    });
  }
  const user = {
    id: clientUser.id,
    userName: clientUser.userName,
    fullName: clientUser.fullName,
    email: clientUser.email,
    role: 'user',
  };

  const token = sign(user, process.env.CLIENT_SECRET, {
    expiresIn: isCookieLong ? 60 * 60 * 24 * 30 : 60 * 60 * 4,
  });
  attachTokenToResponse('token', { res, token, expiresInDay: 30 });
  res.json({
    succeed: true,
    msg: `successfully logged in as ${clientUser.fullName}`,
    username: clientUser.userName,
  });
};

const logout = (req, res) => {
  res.clearCookie('token');
  res.json({
    succeed: true,
    msg: 'successfully logged out. Please login again to access your account.',
  });
};

const getUser = async (req, res) => {
  const { id } = req.user;

  let extraInfo = {};
  extraInfo = await clients.findOne({
    where: { id: id },
    attributes: ['fullName', 'image', 'email', 'phone', 'address'],
    include: {
      model: clientcourses,
    },
  });

  const result = {
    ...req.user,
    ...extraInfo.dataValues,
  };

  res.json({ succeed: true, result });
};

const deleteClient = async (req, res) => {
  const { password } = req.body;
  const id = req.user.id;

  if (!password)
    throw new BadRequestError('you should provide the password first');

  let clientUser = null;
  clientUser = await clients.findByPk(id, {
    attributes: ['password', 'image'],
  });
  const match = await compare(password, clientUser.password);
  if (!match) {
    throw new UnauthenticatedError('wrong password Entered');
  }
  await clients.destroy({ where: { id: id } });

  if (clientUser.image) deleteFile(clientUser.image);
  res.clearCookie('token');
  res.json({ succeed: true, msg: 'delete succeed' });
};

const resetPassSetToken = async (req, res) => {
  let clientUser;
  const { email, sendMode, number } = req.body;
  let finder = {
    [sendMode === 'sms' ? 'phone' : 'email']:
      sendMode === 'sms' ? number : email,
  };

  clientUser = await clients.findOne({
    attributes: ['email', 'phone'],
    where: finder,
  });

  if (!clientUser) {
    throw new NotFoundError(
      `user with this ${sendMode === 'sms' ? 'number' : 'email'} does not exist`
    );
  }
  let otp = new Date().getTime().toString() + Math.random().toString().slice(2);
  otp = otp.substring(otp.length - 4, otp.length);

  // mailing and sms the otp
  if (sendMode === 'sms' && number) {
    let hostUrl = undefined;
    if (req.headers.origin) hostUrl = new URL(req.headers.origin);
    else hostUrl = req.hostname;
    sendSMS(number, `Your ${hostUrl || 'resetPass'} OTP code is ${otp}`)
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        // console.log(err);
      });
  } else if (email) {
    mailer(
      {
        client: {
          fullName: clientUser.fullName,
          email: clientUser.email,
        },
        info: {
          otp,
        },
      },
      'resetPass'
    ).catch((err) => {});
  } else {
    throw new BadRequestError('Email id or number must be provided');
  }

  const minute = 10;
  const expiresIn = (Date.now() + minute * 60 * 1000).toString();
  let metadata;

  const updateObj = {
    otp: otp,
    otpTime: expiresIn,
    otpCount: 0,
  };

  [metadata] = await clients.update(updateObj, { where: finder });

  if (metadata == 0) {
    res.json({
      succeed: false,
      msg: 'Something went wrong. Please try again later',
    });
  }

  res.json({
    succeed: true,
    msg: `${sendMode === 'sms' ? 'A sms' : 'An email'} with OTP was sent to ${
      sendMode === 'sms' ? clientUser.phone : clientUser.email
    }`,
  });
};

const resetPassVerify = async (req, res) => {
  const { email, otp, password, mode, phone, sendMode } = req.body;
  const maxOtpCount = 10;

  let finder = {
    [sendMode === 'sms' ? 'phone' : 'email']:
      sendMode === 'sms' ? phone : email,
  };

  let otpData;

  otpData = await clients.findOne({
    attributes: ['otp', 'otpCount', 'otpTime'],
    where: finder,
  });

  if (!otpData)
    throw new UnauthenticatedError(
      'did not match any record, please try with the correct email or mobile number'
    );

  if (mode === 'ov' && Date.now() <= Number(otpData.otpTime)) {
    await clients.increment('otpCount', { by: 1, where: finder });
  }

  if (Date.now() > Number(otpData.otpTime))
    throw new UnauthenticatedError('OTP timeout. Please request for another.');
  else if (otpData.otpCount > maxOtpCount)
    throw new UnauthenticatedError(
      'OTP became invalid. Please request for another.'
    );
  else if (otp !== otpData.otp)
    throw new UnauthenticatedError('Invalid OTP entered.');

  if (mode === 'ov') {
    return res.json({ succeed: true, msg: 'otp verifyed', type: mode });
  }

  if (mode !== 'ov') {
    const hassedPass = hashSync(password, Number(process.env.SALT));

    await clients.update(
      { password: hassedPass },
      { where: { [email ? 'email' : 'phone']: email ? email : phone } }
    );

    res.json({
      succeed: true,
      msg: 'Your password was changed successfully. Please login with the new password',
    });
  }
};

//for admin
const getAllClients = async (req, res) => {
  const { skip, rowNum } = req.body;
  if (skip === '' || skip === null || skip === undefined || !rowNum)
    throw new BadRequestError('skip or rows field must not be empty');

  let result = await clients.findAll({
    include: {
      model: clientcourses,
      // required: true,
    },
    attributes: { exclude: ['password', 'otp', 'otpCount', 'otpTime'] },
    offset: Number(skip),
    limit: Number(rowNum),
    order: [['id', 'DESC']],
  });

  res.json({ succeed: true, result: result });
};

const getClientOnId = async (req, res) => {
  const { id, userName } = req.user;
  const username = req.params.username;
  if (userName !== username) {
    return res.json({
      succeed: false,
      type: 'rdView',
      msg: 'access denied',
    });
  }
  let clientUser;
  clientUser = await clients.findOne({
    where: { id: id },
    attributes: { exclude: ['password'] },
    include: {
      model: ParEvents,
      as: 'ParEvent',
    },
  });

  res.json({
    succeed: true,
    mode: mode,
    result: clientUser,
    msg: 'participant found',
  });

  res.json({
    succeed: false,
    msg: 'something went wrong finding the client',
  });
};

const profileView = async (req, res) => {
  const userName = req.params.username;
  let targetClient = undefined;
  targetClient = await clients.findOne({
    attributes: ['fullName', 'userName', 'institute', 'image'],
    where: { userName: userName },
  });
  if (!targetClient) {
    targetClient = await CAs.findOne({
      attributes: [
        'fullName',
        'userName',
        'institute',
        'image',
        'code',
        'used',
      ],
      where: { userName: userName },
    });
  }
  if (!targetClient) {
    res.json({
      succeed: false,
      msg: 'Could not find any participant or CA',
      result: {},
    });
  } else {
    res.json({
      succeed: true,
      msg: 'Successfully found',
      result: targetClient,
    });
  }
};

module.exports = {
  registration,
  login,
  logout,
  getUser,
  deleteClient,
  resetPassSetToken,
  resetPassVerify,
  getAllClients,
  getClientOnId,
  profileView,
};
