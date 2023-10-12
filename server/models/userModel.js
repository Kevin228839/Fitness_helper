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
      await conn.query('COMMIT');
      return data[0]['insertId'];
    }
  } catch (err) {
    await conn.query('ROLLBACK');
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
  } finally {
    conn.release();
  }
};

module.exports = {
  signUp,
  getProfile
};
