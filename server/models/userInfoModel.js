const { pool } = require('./mysqlconnection');
require('dotenv').config();

const checkSignUp = async (userData) => {
  const conn = await pool.getConnection();
  try {
    const response = await conn.query(
      'SELECT COUNT(*) FROM user_info WHERE account_type=? and account_type_id=?', ['google', userData.id]
    );
    // if haven't sigin up, save account info to database
    if (response[0][0]['COUNT(*)'] === 0) {
      await conn.query('INSERT INTO user_info(account_type, account_type_id, email) VALUES (?, ?, ?)', ['google', userData.id, userData.email]);
    }
  } catch (err) {
    console.error('User sign in error');
    throw err;
  } finally {
    conn.release();
  }
};

module.exports = {
  checkSignUp
};
