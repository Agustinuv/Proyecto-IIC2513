const jwt = require("jsonwebtoken");
const authConfig = require('../config/token');

const validateEmail = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };
  
const validateName = (name) => {
    return name && name.length >= 2;
  };

const validatePasswordLength = (password) => {
    return password && password.length >= 6;
  };

function validateAddSellerNames(body) {
    return (
        validateName(body.name) &&
        validateName(body.location)
    );
}

function validateAddUserNames(body) {
    return (
        validateName(body.fullName) &&
        validateName(body.userName)
    );
}

function generateAccessToken(username) {
  return jwt.sign({username: username}, authConfig.secret, {expiresIn: authConfig.expiresIn});
}
  
  module.exports = { validateAddUserNames, validateEmail, validatePasswordLength, validateAddSellerNames, generateAccessToken };

