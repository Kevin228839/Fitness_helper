const mysql = require('mysql2/promise');
require('dotenv').config();

const mysqlEnv = {
  host: process.env.mysql_host,
  user: process.env.mysql_user,
  password: process.env.mysql_password,
  database: process.env.mysql_database
};

const pool = mysql.createPool(mysqlEnv);

module.exports = {
  pool
};
