const { hashSync, compare } = require('bcryptjs');
const { Admin } = require('../models');
const { sign } = require('jsonwebtoken');
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require('../errors');
const { attachTokenToResponse } = require('../utils/createToken');
const saltRounds = process.env.SALT;
const { StatusCodes } = require('http-status-codes');
const deleteFile = require('../utils/deleteFile');

const getAllAdmins = async (req, res) => {
  const result = await Admin.findAll({ attributes: ['id', 'userName'] });
  res.json({ succeed: true, result: result });
};

const adminReg = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    throw new BadRequestError('Username or Password should not be empty');
  }
  const isAlreadyExist = await Admin.findOne({ where: { userName: userName } });
  if (isAlreadyExist) {
    return res.json({ succeed: false, msg: 'account already exist' });
  }
  const hassedPass = hashSync(password, Number(saltRounds));
  await Admin.create({ userName: userName, password: hassedPass });
  res
    .status(StatusCodes.CREATED)
    .json({ succeed: true, msg: 'Admin User Created' });
};

const adminLogin = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    throw new BadRequestError('Username or Password should not be empty');
  }
  const admin = await Admin.findOne({ where: { userName: userName } });
  if (!admin) {
    throw new NotFoundError(`${userName} does not exist`);
  }
  const match = await compare(password, admin.password);
  if (!match) {
    throw new UnauthenticatedError('Wrong username and password combination');
  }
  const user = {
    id: admin.id,
    userName: admin.userName,
    role: 'admin',
  };
  const token = sign(user, process.env.ADMIN_SECRET, {
    expiresIn: '2h',
  });
  attachTokenToResponse('token', { res, token, expiresInDay: 1 });
  res.json({ succeed: true, msg: 'successfully logged in' });
};

const adminLogout = (req, res) => {
  res.clearCookie('token');
  res.json({ succeed: true, msg: 'logout succes' });
};

const isAdminValidated = (req, res) => {
  res.json({ succeed: true, result: req.admin });
};

module.exports = {
  getAllAdmins,
  adminReg,
  adminLogin,
  isAdminValidated,
  adminLogout,
};
