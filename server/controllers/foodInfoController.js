const foodInfoModel = require('../models/foodInfoModel');

const getFoodInfo = async (req, res, next) => {
  try {
    // [data, buf] => what query actually returns. We only need data here
    const [response] = await foodInfoModel.getFoodInfoModel();
    res.status(200).json({ message: response });
  } catch (err) {
    next(err);
  }
};

const getFoodDetail = async (req, res, next) => {
  try {
    const [response] = await foodInfoModel.getFoodDetailModel(req.query.foodid);
    res.status(200).json({ message: response });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getFoodInfo,
  getFoodDetail
};
