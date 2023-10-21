const { verify } = require('jsonwebtoken')
const { UnauthorizedError } = require('../errors')

const qrValidate = (req, res, next) => {
  const { token } = req.signedCookies
  if (!token) {
    throw new UnauthorizedError('QR admin not logged in')
  }
  const validQrAdmin = verify(token, process.env.QR_SECRET)
  if (!validQrAdmin) {
    throw new UnauthorizedError(
      'you do not have permission to access this route'
    )
  }
  req.qrAdmin = validQrAdmin
  next()
}

module.exports = { qrValidate }
