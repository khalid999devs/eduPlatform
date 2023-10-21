const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require('../errors')

const deleteFile = require('../utils/deleteFile')

const eventSettingValidate = (req, res, next) => {
  const { title, phones, gmails, titleDesc, bkash, intro } = req.body

  if (title && phones && gmails && titleDesc) {
    req.adminSetting = {
      title,
      phones,
      gmails,
      titleDesc,
      image: req.file.path,
      bkash,
      intro,
    }
    next()
  } else {
    deleteFile(req.file.path)
    throw new BadRequestError('input fields should not be empty')
  }
}

const addEventValidate = (req, res, next) => {
  const {
    name,
    category,
    date,
    timeRange,
    videoLink,
    description,
    value,
    type,
    paid,
    fee,
    team,
    maxMember,
    place,
    submission,
    rules,
  } = req.body
  if (name && category && date && videoLink && description && value && rules) {
    req.event = {
      name,
      value,
      type,
      paid,
      fee,
      category,
      date,
      timeRange: timeRange ? timeRange : null,
      videoLink,
      description,
      image: req.file.path,
      team,
      maxMember,
      place,
      submission: JSON.parse(submission).name ? submission : '{}',
      rules,
    }
    next()
  } else {
    deleteFile(req.file.path)
    throw new BadRequestError('input fields should not be empty')
  }
}

module.exports = { eventSettingValidate, addEventValidate }
