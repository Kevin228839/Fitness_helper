const { pool } = require('./mysqlconnection');
require('dotenv').config();

const getFoodInfoModel = async (page = 0) => {
  const conn = await pool.getConnection();
  try {
    const response = await conn.query(
      'select * from food_info limit ?, ?', [page * parseInt(process.env.listPerPage), parseInt(process.env.listPerPage)]
    );
    return response;
  } catch (err) {
    console.log('Get food info error!');
    throw err;
  } finally {
    conn.release();
  }
};

const getFoodDetailModel = async (foodid = 1) => {
  const conn = await pool.getConnection();
  try {
    const response = await conn.query(
      'select * from food_info where food_id = ?', [foodid]
    );
    return response;
  } catch (err) {
    console.log('Get food detail error!');
    throw err;
  } finally {
    conn.release();
  }
};

module.exports = {
  getFoodInfoModel,
  getFoodDetailModel
};