const { getFoodGeneralInfo, addFoodInfo } = require('../models/foodInfoModel');
const { checkCookie, addressFoodInfo } = require('../utils');

const getFoodInfo = async (req, res, next) => {
  try {
    const userInfo = checkCookie(req.cookies[process.env.jwt_token_name]);
    // [data, buf] => what query actually returns. We only need data here
    const [response] = await getFoodGeneralInfo(userInfo);
    if (userInfo) {
      res.status(200).json({ login: true, data: response, message: 'get food list with customized food' });
    } else {
      res.status(200).json({ login: false, data: response, message: 'get food list without customized food' });
    }
  } catch (err) {
    next(err);
  }
};

const addFood = async (req, res, next) => {
  try {
    const userInfo = checkCookie(req.cookies[process.env.jwt_token_name]);
    if (userInfo === undefined) {
      res.status(401).json({ messsage: 'unauthorized' });
      return;
    }
    const foodInfo = addressFoodInfo(req.body);
    if (foodInfo) {
      await addFoodInfo(userInfo.userId, foodInfo);
      res.status(200).json({ message: 'data uploaded' });
    } else {
      res.status(400).json({ message: 'invalid data' });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getFoodInfo,
  addFood
};
