const { pool } = require('./mysqlconnection');
require('dotenv').config();

const getFoodGeneralInfo = async () => {
  const conn = await pool.getConnection();
  try {
    const response = await conn.query(
      'select food_id, food_name, carbonhydrate, protein, fat, calory, image_url from food_info, image_info where food_info.image_id=image_info.image_id '
    );
    return response;
  } catch (err) {
    console.error('Get food info error!');
    throw err;
  } finally {
    conn.release();
  }
};

module.exports = {
  getFoodGeneralInfo
};
