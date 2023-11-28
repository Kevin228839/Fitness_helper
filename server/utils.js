require('dotenv').config();
const axios = require('axios');
const jwt = require('jsonwebtoken');

const getGoogleOAuthToken = async (code) => {
  const url = 'https://oauth2.googleapis.com/token';
  const value = {
    code,
    client_id: process.env.google_oauth_client_id,
    client_secret: process.env.google_oauth_client_secret,
    redirect_uri: process.env.google_oauth_redirect_uri,
    grant_type: 'authorization_code'
  };
  try {
    const response = await axios.post(url + '?' + new URLSearchParams(value), {
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data;
  } catch (error) {
    console.error(error, 'Error fetching google oauth token');
    throw new Error(error.message);
  }
};

const getGoogleUser = async (id_token, access_token) => {
  try {
    const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
      header: {
        Authorization: `Bearer ${id_token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error, 'Error fetching google user');
    throw new Error(error.message);
  }
};

const checkCookie = (token) => {
  try {
    const decode = jwt.verify(token, process.env.jwt_private_key);
    return decode;
  } catch (err) {
    return undefined;
  }
};

const addressFoodInfo = (foodData) => {
  const re = /^\d+(\.\d+)?$/;
  if (re.test(foodData.carbonhydrate) && re.test(foodData.protein) && re.test(foodData.fat) && re.test(foodData.calory)) {
    const data = {
      name: foodData.name,
      carbonhydrate: parseFloat(parseFloat(foodData.carbonhydrate).toFixed(1)),
      protein: parseFloat(parseFloat(foodData.protein).toFixed(1)),
      fat: parseFloat(parseFloat(foodData.fat).toFixed(1)),
      calory: parseFloat(parseFloat(foodData.calory).toFixed(1))
    };
    return data;
  }
  return undefined;
};

module.exports = {
  getGoogleOAuthToken,
  getGoogleUser,
  checkCookie,
  addressFoodInfo
};
