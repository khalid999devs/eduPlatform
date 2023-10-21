const { CAs, Participants, sequelize, PageSettings } = require('../models')
const uniqid = require('uniqid')
const { validate } = require('deep-email-validator')
const { UnauthenticatedError, BadRequestError } = require('../errors')
const { hashSync, compare } = require('bcryptjs')
const deleteFile = require('../utils/deleteFile')
const hashSalt = Number(process.env.SALT)

const emailValidate = async (req, res, next) => {
  const { email } = req.body
  const emailRes = await validate(email)
  if (email) {
    if (emailRes?.valid) next()
    else {
      deleteFile(req.file.path)
      throw new UnauthenticatedError(
        'Invalid email ID. Please provide a valid one.'
      )
    }
  } else {
    deleteFile(req.file.path)
    throw new UnauthenticatedError('Email field should not be empty')
  }
}

const passwordValidate = async (req, res, next) => {
  const { id, mode } = req.user
  const { password } = req.body
  if (!password) {
  }
  if (mode === 'par') {
    const clientUser = await Participants.findByPk(id, {
      attributes: ['password'],
    })
    const match = await compare(password, clientUser.password)
    if (!match) {
      throw new UnauthenticatedError('wrong password entered')
    } else next()
  } else if (mode === 'ca') {
    const clientUser = await CAs.findByPk(id, { attributes: ['password'] })
    const match = await compare(password, clientUser.password)
    if (!match) {
      throw new UnauthenticatedError('wrong password entered')
    } else next()
  }
}

// permit validates
const caPermitValidate = async (req, res, next) => {
  const [isCAPermitted] = await PageSettings.findAll({
    attributes: ['caRegPermit'],
  })
  if (isCAPermitted.caRegPermit === true) {
    next()
  } else {
    res.json({
      succeed: false,
      msg: 'We are not taking CA right now. The registration portal is turned off.',
    })
  }
}

const caRegValidate = async (req, res, next) => {
  const {
    fullName,
    fb,
    institute,
    className,
    address,
    email,
    phone,
    password,
  } = req.body
  if (
    fullName &&
    fb &&
    institute &&
    className &&
    address &&
    email &&
    phone &&
    password
  ) {
    const isEmailThere = await CAs.findOne({ where: { email: email } })
    if (isEmailThere) {
      deleteFile(req.file.path)
      throw new UnauthenticatedError(`Already registered with ${email}`)
    }

    const hashedPass = hashSync(password, hashSalt)
    const code = uniqid.time()
    const image = req.file.path
    const eventInfo = { snack: 0, lunch: 0 }
    const data = {
      code: code,
      blocked: false,
      fullName: fullName.trim(),
      fb,
      institute,
      className,
      address,
      image,
      email,
      phone: phone.trim(),
      userName: req.userName,
      password: hashedPass,
    }

    req.mode = 'ca'
    req.eventsRel = { eventInfo: JSON.stringify(eventInfo), clientQR: code }
    req.user = data
    next()
  } else {
    deleteFile(req.file.path)
    throw new BadRequestError('Input fields should not be empty')
  }
}

const parRegValidate = async (req, res, next) => {
  const {
    fullName,
    fb,
    institute,
    className,
    address,
    email,
    phone,
    password,
    CAref,
  } = req.body
  if (
    fullName &&
    fb &&
    institute &&
    className &&
    address &&
    email &&
    phone &&
    password
  ) {
    const isEmailThere = await Participants.findOne({ where: { email: email } })
    if (isEmailThere) {
      deleteFile(req.file.path)
      throw new UnauthenticatedError(`Already registered with ${email}`)
    }

    //ca ref update
    let targetCACode
    if (CAref) {
      targetCACode = await sequelize.query(
        `SELECT used FROM cas WHERE code='${CAref}'`
      )
      if (targetCACode[0].length > 0) {
        const targetCAused = targetCACode[0][0].used
        const increasedUsed = Number(targetCAused) + 1
        await CAs.update({ used: increasedUsed }, { where: { code: CAref } })
      } else {
        deleteFile(req.file.path)
        throw new BadRequestError(
          'Please provide the correct CA reference code or simply ingnore the CAref field'
        )
      }
    }

    const hashedPass = hashSync(password, hashSalt)
    const image = req.file.path
    const code = fullName.split(' ')[0].toLowerCase() + uniqid.time()

    //working with events fees (paid)
    const events = { snack: 0, lunch: 0 }

    const data = {
      qrCode: code,
      caRef: CAref || null,
      fullName: fullName.trim(),
      fb,
      institute,
      className,
      address,
      image,
      email,
      phone: phone.trim(),
      userName: req.userName,
      password: hashedPass,
    }

    req.mode = 'participant'
    req.eventsRel = {
      eventInfo: JSON.stringify({ ...events }),
      clientQR: code,
    }
    req.user = data
    next()
  } else {
    deleteFile(req.file.path)
    throw new BadRequestError('Input fields should not be empty')
  }
}

module.exports = {
  caRegValidate,
  parRegValidate,
  emailValidate,
  passwordValidate,
  caPermitValidate,
}
