const { getFoodGeneralInfo } = require('../models/foodInfoModel');

const getFoodInfo = async (req, res, next) => {
  try {
    // [data, buf] => what query actually returns. We only need data here
    const [response] = await getFoodGeneralInfo();
    res.status(200).json({ message: response });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getFoodInfo
};
