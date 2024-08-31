const mysql = require("mysql2");

// // 고용 데이터 베이스 계정 만든후 바꿀 예정
let conn = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
};

module.exports = {
  init: () => {
    return mysql.createConnection(conn);
  },
};
