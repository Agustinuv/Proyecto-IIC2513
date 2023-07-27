const authConfig = require('../config/token');
const jwt = require('jsonwebtoken');

const authorization = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {return res.sendStatus(401);}
    try {
      jwt.verify(token, authConfig.secret)
    }
    catch (err) {
      return res.sendStatus(404);
    }
    next();
  };

  module.exports = {authorization};