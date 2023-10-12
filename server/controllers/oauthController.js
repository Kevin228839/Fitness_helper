const { getGoogleOAuthToken, getGoogleUser } = require('../utils');
const { signUp } = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleGoogleOauth = async (req, res, next) => {
  try {
    // get the code
    const code = req.query.code;
    // get id_token and access_token with the code
    const { id_token, access_token } = await getGoogleOAuthToken(code);
    // get user's google info with id_token and access_token
    const userData = await getGoogleUser(id_token, access_token);
    // Signup if first time login
    const userId = await signUp('google', userData);
    const accessToken = jwt.sign({ userId }, process.env.jwt_private_key, { expiresIn: '1h' });
    res.cookie(process.env.jwt_token_name, accessToken, { httpOnly: true, sameSite: 'strict', maxAge: 60 * 60 * 1000 });
    res.redirect(process.env.frontend_origin);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  handleGoogleOauth
};
