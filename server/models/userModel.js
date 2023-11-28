const { pool } = require('./mysqlconnection');
require('dotenv').config();

const signUp = async (type, userData) => {
  const conn = await pool.getConnection();
  try {
    let data = await conn.query(
      'SELECT COUNT(*), user_id FROM user_info WHERE account_type=? and email=? GROUP BY user_id', [type, userData.email]
    );
    if (data[0].length !== 0) {
      return data[0][0]['user_id'];
    } else {
      data = await conn.query('INSERT INTO user_info(account_type, email, name) VALUES (?, ?, ?)', ['google', userData.email, userData.name]);
      return data[0]['insertId'];
    }
  } catch (err) {
    console.error('user sign up error');
    throw err;
  } finally {
    conn.release();
  }
};

const getProfile = async (id) => {
  const conn = await pool.getConnection();
  try {
    const data = await conn.query(
      'SELECT email, name FROM user_info WHERE user_id=?',
      [id]
    );
    return data[0][0];
  } catch (err) {
    console.error('get profile error');
    throw err;
  } finally {
    conn.release();
  }
};

module.exports = {
  signUp,
  getProfile
};
