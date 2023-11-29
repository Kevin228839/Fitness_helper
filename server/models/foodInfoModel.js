const { pool } = require('./mysqlconnection');
require('dotenv').config();

const getFoodGeneralInfo = async (userInfo) => {
  const conn = await pool.getConnection();
  let response;
  try {
    if (userInfo === undefined) {
      response = await conn.query(
        'select food_id, food_name, carbonhydrate, protein, fat, calory, image_url from food_info, image_info where food_info.image_id=image_info.image_id and food_info.owner_id = -1'
      );
    } else {
      response = await conn.query(
        'select food_id, food_name, carbonhydrate, protein, fat, calory, image_url from food_info, image_info where food_info.image_id=image_info.image_id and food_info.owner_id in (?, ?)',
        [-1, userInfo.userId]
      );
    }
    return response;
  } catch (err) {
    console.error('Get food info error!');
    throw err;
  } finally {
    conn.release();
  }
};

const addFoodInfo = async (userId, foodData) => {
  const conn = await pool.getConnection();
  try {
    await conn.query(
      'insert into food_info(food_name, carbonhydrate, protein, fat, calory, owner_id) values(?, ?, ?, ?, ?, ?)',
      [foodData.name, foodData.carbonhydrate, foodData.protein, foodData.fat, foodData.calory, userId]
    );
  } catch (err) {
    console.error('Add food info error!');
    throw err;
  } finally {
    conn.release();
  }
};

module.exports = {
  getFoodGeneralInfo,
  addFoodInfo
};
