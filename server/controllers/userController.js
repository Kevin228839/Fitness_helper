require('dotenv').config();
const { checkCookie } = require('../utils');
const { getProfile } = require('../models/userModel');

const autoLogin = (req, res, next) => {
  try {
    const userInfo = checkCookie(req.cookies[process.env.jwt_token_name]);
    if (userInfo === undefined) {
      res.status(400).json({ message: 'Login fail' });
      return;
    }
    res.status(200).json({ message: 'Login success' });
  } catch (err) {
    next(err);
  }
};

const logout = (_req, res, next) => {
  try {
    res.cookie(process.env.jwt_token_name, '', { maxAge: 0 });
    res.status(200).json({ message: 'Logout Success.' });
  } catch (err) {
    next(err);
  }
};

const userProfile = async (req, res, next) => {
  try {
    const userInfo = checkCookie(req.cookies[process.env.jwt_token_name]);
    if (userInfo === undefined) {
      res.status(400).json({ message: 'Get Profile Fail' });
      return;
    }
    const data = await getProfile(userInfo.userId);
    res.status(200).json({ message: 'Get Profile Success', data });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  autoLogin,
  logout,
  userProfile
};
