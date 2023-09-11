const { getGoogleOAuthToken, getGoogleUser } = require('../utils');
const { checkSignUp } = require('../models/userInfoModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleGoogleOauth = async (req, res, next) => {
  try {
    console.log(req.cookies);
    // get the code
    const code = req.query.code;
    // get id_token and access_token with the code
    const { id_token, access_token } = await getGoogleOAuthToken(code);
    // get user's google info with id_token and access_token
    const userData = await getGoogleUser(id_token, access_token);
    // check email returned from google is verified
    if (userData.verified_email) {
      // Signup if first time login
      await checkSignUp(userData);
      const accessToken = jwt.sign({ type: 'google', google_id: userData.id }, process.env.jwt_private_key);
      const infoToken = jwt.sign({ email: userData.email, status: 'login' }, process.env.jwt_private_key);
      res.cookie('jwt_access_fitness_helper', accessToken, { httpOnly: true, maxAge: 60 * 60 * 1000 }); // maxAge unit: millisecond
      res.cookie('jwt_info_fitness_helper', infoToken, { maxAge: 60 * 60 * 1000 });
      res.redirect('http://localhost:3000');
    } else {
      res.status(400).json({ message: 'OAuth: unverified email' });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  handleGoogleOauth
};
