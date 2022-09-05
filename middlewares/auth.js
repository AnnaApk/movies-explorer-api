const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');

const UnAuthError = require('../errors/unAuthError');

const isAuthorized = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    throw new UnAuthError('Авторизуйтесь для доступа');
  }

  const token = auth.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (e) {
    throw new UnAuthError('Авторизуйтесь для доступа');
  }
  req.user = payload;
  next();
};

module.exports = { isAuthorized };
