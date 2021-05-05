const axios = require('axios');
const jwt = require('jsonwebtoken');

const user_model = require('../models/user');
//
const bcrypt = require('bcryptjs');
const saltRounds = 5;

function generateToken(userId, scope = 'basic', expiresIn = '30d') {
  const payload = { userId, scope },
    options = { expiresIn };
  return jwt.sign(payload, process.env.JWT_KEY, options);
}

function hashPassword(plainPassword) {
  return bcrypt.hash(plainPassword, saltRounds);
}

function checkPassword(plainPassword, hash) {
  return bcrypt.compare(plainPassword, hash);
}

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

function getUserData(apiUrl, access_token) {
  return axios.get(apiUrl + '?access_token=' + access_token);
}

function parseUsername(username) {
  const email = (phone_no = username);
  return (/[0-9]{10}/.test(username) && { phone_no }) || { email };
}

module.exports = {
  getUserData,
  generateToken,
  hashPassword,
  checkPassword,
  generateOTP,
  parseUsername,
};
