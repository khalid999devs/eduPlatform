const { verify } = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors');

const clientValidate = (req, res, next) => {
  const { token } = req.signedCookies;
  if (!token) {
    return res.json({ succeed: false, msg: 'user not logged in' });
  }
  const validClient = verify(token, process.env.CLIENT_SECRET);
  if (!validClient) {
    throw new UnauthorizedError(
      'you do not have permission to access this route'
    );
  }
  req.user = validClient;
  next();
};

module.exports = clientValidate;
