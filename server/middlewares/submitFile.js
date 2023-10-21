const multer = require('multer')
const { existsSync, mkdirSync } = require('fs')
const { resolve, extname } = require('path')
const { Events, ParEvents } = require('../models')
const { CustomAPIError, BadRequestError } = require('../errors')

//file submit
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fieldName = 'submission'
    if (file.fieldname !== fieldName) {
      cb(new Error(`Field name didn't match`))
    }
    let destName = resolve(
      __dirname,
      `../uploads/${fieldName}/${req.params.eventValue}`
    )

    if (!existsSync(destName)) {
      try {
        mkdirSync(destName, { recursive: true })
      } catch (error) {
        console.log(error)
      }
    }
    const pathName = `uploads/${fieldName}/${req.params.eventValue}`
    cb(null, pathName)
  },
  filename: (req, file, cb) => {
    const { userName } = req.user
    const fileExt = extname(file.originalname)
    req.fileExt = `${fileExt}`

    let fileName = `${userName}_${req.params.eventValue}_${Date.now()}`

    cb(null, fileName + fileExt)
  },
})

const imgTypes = /jpeg|jpg|png|JPG|JPEG|PNG/

const submit = multer({
  storage: storage,
  limits: { fileSize: 1048576 },
  fileFilter: (req, file, cb) => {
    const fileTypes = req.fileTString

    let mimeType = false
    if (fileTypes.includes('image')) {
      if (imgTypes.test(extname(file.originalname))) mimeType = true
      else mimeType = false
    } else mimeType = fileTypes.includes(extname(file.originalname))

    if (mimeType) {
      return cb(null, true)
    } else {
      cb(new Error(`only ${fileTypes} is allowed!`))
    }

    cb(new Error('there was an unknown error'))
  },
})

const checkRegPermit = async (req, res, next) => {
  const eventValue = req.params.eventValue
  const { id } = req.user

  let targetPar = await ParEvents.findOne({
    attributes: ['eventInfo', 'SubLinks', 'SubNames'],
    where: { parId: id },
  })

  targetPar = {
    eventInfo: JSON.parse(targetPar.eventInfo),
    SubLinks: JSON.parse(targetPar.SubLinks),
    SubNames: JSON.parse(targetPar.SubNames),
  }

  if (targetPar.eventInfo.hasOwnProperty(eventValue)) {
    return res.json({
      succeed: false,
      msg: 'you have already participated in this event',
      type: 'rd',
    })
  }

  let targetEvent = await Events.findOne({
    attributes: ['regPortal', 'submission'],
    where: { value: eventValue },
  })

  if (!targetEvent) throw new BadRequestError('this event does not exist')

  targetEvent['submission'] = JSON.parse(targetEvent.submission)

  if (targetEvent.submission.name) {
    req.fileTString = targetEvent.submission.name
  } else {
    throw new CustomAPIError('Something went wrong. Please try again later')
  }

  req.submissionObj = targetPar

  next()
}

module.exports = { submit, checkRegPermit }
