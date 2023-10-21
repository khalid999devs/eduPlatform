const { CAs, ParEvents, Participants, sequelize } = require('../models');
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

const registration = async (req, res) => {
  if (req.mode === 'participant') {
    const newPar = await Participants.create(req.user);
    req.eventsRel.parId = newPar.id;
    const event = await ParEvents.create(req.eventsRel);

    mailer({ client: newPar, event }, 'par').catch((err) => {
      // console.log(err)
    });
  } else if (req.mode === 'ca') {
    const newCA = await CAs.create(req.user);
    req.eventsRel.CAId = newCA.id;
    const event = await ParEvents.create(req.eventsRel);

    mailer({ client: newCA, event }, 'ca').catch((err) => {
      // console.log(err)
    });
  }

  res.status(StatusCodes.CREATED).json({
    succeed: true,
    msg: 'Congratulations!! Your registration is successful.',
  });
};

const login = async (req, res) => {
  let clientUser;
  const { email, password, mode } = req.body;

  if (!email || !password)
    return res.json({
      succeed: false,
      msg: 'Email or Password should not be empty.',
    });
  if (mode === 'par') {
    clientUser = await Participants.findOne({ where: { email: email } });
  } else if (mode === 'ca') {
    clientUser = await CAs.findOne({ where: { email: email } });
  } else {
    throw new BadRequestError('wrong mode value');
  }

  if (!clientUser)
    return res.json({
      succeed: false,
      msg: `${email} does not exist for ${
        mode === 'par' ? 'participant' : 'CA'
      }`,
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
    mode: mode,
  };

  const token = sign(user, process.env.CLIENT_SECRET, {
    expiresIn: 60 * 60 * 24 * 30,
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
  const { mode, id } = req.user;
  let events = await ParEvents.findOne({
    where: { [mode === 'par' ? 'parId' : 'CAId']: id },
    attributes: ['eventInfo'],
  });
  let extraInfo = {};
  if (mode === 'par') {
    extraInfo = await Participants.findOne({
      where: { id: id },
      attributes: ['fullName', 'image', 'email', 'phone'],
    });
  } else if (mode === 'ca') {
    extraInfo = await CAs.findOne({
      where: { id: id },
      attributes: ['fullName', 'image', 'email', 'phone'],
    });
  }
  const result = {
    ...req.user,
    ...extraInfo.dataValues,
    clientEvents: Object.keys(JSON.parse(events.dataValues.eventInfo)),
  };

  res.json({ succeed: true, result });
};

const deleteClient = async (req, res) => {
  const { password } = req.body;
  const id = req.user.id;
  const mode = req.user.mode;
  if (!password)
    throw new BadRequestError('you should provide the password first');

  let clientUser = null;
  if (mode === 'par') {
    clientUser = await Participants.findByPk(id, {
      attributes: ['password', 'image'],
    });
    const match = await compare(password, clientUser.password);
    if (!match) {
      throw new UnauthenticatedError('wrong password Entered');
    }
    await Participants.destroy({ where: { id: id } });
  } else if (mode === 'ca') {
    clientUser = await CAs.findByPk(id, { attributes: ['password', 'image'] });
    const match = await compare(password, clientUser.password);

    if (!match) {
      throw new UnauthenticatedError('wrong password Entered');
    }
    await CAs.destroy({ where: { id: id } });
  }

  deleteFile(clientUser.image);
  res.clearCookie('token');
  res.json({ succeed: true, msg: 'delete succeed' });
};

const resetPassSetToken = async (req, res) => {
  let clientUser;
  const { email, mode, sendMode, number } = req.body;
  let finder = {
    [sendMode === 'sms' ? 'phone' : 'email']:
      sendMode === 'sms' ? number : email,
  };

  if (mode === 'par') {
    clientUser = await Participants.findOne({
      attributes: ['email', 'phone'],
      where: finder,
    });
  } else if (mode === 'ca') {
    clientUser = await CAs.findOne({
      attributes: ['email', 'phone'],
      where: finder,
    });
  } else {
    throw new UnauthenticatedError('wrong mode value entered');
  }
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
    sendSMS(number, `Your ${hostUrl.host || 'resetPass'} OTP code is ${otp}`)
      .then((res) => {
        // console.log(res)
      })
      .catch((err) => {});
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

  if (mode === 'par') {
    [metadata] = await Participants.update(updateObj, { where: finder });
  } else {
    [metadata] = await CAs.update(updateObj, { where: finder });
  }

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
  const { email, otp, password, mode, phone, clientMode, sendMode } = req.body;
  const maxOtpCount = 10;

  let finder = {
    [sendMode === 'sms' ? 'phone' : 'email']:
      sendMode === 'sms' ? phone : email,
  };

  let otpData;
  if (clientMode === 'par') {
    otpData = await Participants.findOne({
      attributes: ['otp', 'otpCount', 'otpTime'],
      where: finder,
    });
  } else {
    otpData = await CAs.findOne({
      attributes: ['otp', 'otpCount', 'otpTime'],
      where: finder,
    });
  }

  if (!otpData)
    throw new UnauthenticatedError(
      'did not match any record, please try with the correct email or mobile number'
    );

  if (mode === 'ov' && Date.now() <= Number(otpData.otpTime)) {
    if (clientMode === 'par')
      await Participants.increment('otpCount', { by: 1, where: finder });
    else if (clientMode === 'ca')
      await CAs.increment('otpCount', { by: 1, where: finder });
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

    if (clientMode === 'par') {
      await Participants.update(
        { password: hassedPass },
        { where: { [email ? 'email' : 'phone']: email ? email : phone } }
      );
    } else if (clientMode === 'ca') {
      await CAs.update({ password: hassedPass }, { where: { email: email } });
    } else {
      throw new UnauthenticatedError('wrong mode value entered');
    }

    res.json({
      succeed: true,
      msg: 'Your password was changed successfully. Please login with the new password',
    });
  }
};

const getAllClients = async (req, res) => {
  const mode = req.params.mode;
  const { skip, rowNum } = req.body;
  if (skip === '' || skip === null || skip === undefined || !rowNum)
    throw new BadRequestError('skip or rows field must not be empty');

  let result;
  if (mode === 'allPar') {
    [result] = await sequelize.query(
      `SELECT par.id,par.qrCode,par.fullName,par.fb,par.institute,par.className,par.address,par.image,par.email,par.phone,par.userName, pe.eventInfo,pe.teamName,pe.paidEvent,pe.fee,pe.transactionID,pe.SubLinks,pe.SubNames,pe.roll_no FROM participants as par LEFT JOIN parevents as pe ON par.id=pe.parId LIMIT ${skip},${rowNum};`
    );
  } else if (mode === 'cas') {
    result = await CAs.findAll({
      include: {
        model: ParEvents,
        as: 'ParEvent',
        attributes: ['eventInfo'],
      },
      attributes: { exclude: ['password'] },
      offset: Number(skip),
      limit: Number(rowNum),
    });
  } else {
    [result] = await sequelize.query(
      `SELECT par.id,par.qrCode,par.fullName,par.fb,par.institute,par.className,par.address,par.image,par.email,par.phone,par.userName, pe.eventInfo,pe.teamName,pe.paidEvent,pe.fee,pe.transactionID,pe.SubLinks,pe.SubNames,pe.roll_no FROM participants as par LEFT JOIN parevents as pe ON par.id=pe.parId WHERE JSON_EXTRACT(pe.eventInfo, "$.${mode}") =0 or JSON_EXTRACT(pe.eventInfo, "$.${mode}") =1 LIMIT ${skip},${rowNum};`
    );
  }
  res.json({ succeed: true, result: result });
};

const getClientOnId = async (req, res) => {
  const { id, userName, mode } = req.user;
  const username = req.params.username;
  if (userName !== username) {
    return res.json({
      succeed: false,
      type: 'rdView',
      msg: 'access denied',
    });
  }
  let clientUser;
  if (mode === 'par') {
    clientUser = await Participants.findOne({
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
  } else if (mode === 'ca') {
    clientUser = await CAs.findOne({
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
      msg: 'CA found',
    });
  } else {
    res.json({
      succeed: false,
      msg: 'something went wrong finding the client',
    });
  }
};

const profileView = async (req, res) => {
  const userName = req.params.username;
  let targetClient = undefined;
  targetClient = await Participants.findOne({
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
  getEventBasedCount,
  allPointOrderedCAs,
  getAllClients,
  getClientOnId,
  profileView,
};
