const mysql = require("mysql2");

// // 고용 데이터 베이스 계정 만든후 바꿀 예정
let conn = {
  host: "project-db-stu3.smhrd.com",
  user: "Insa4_JSA_hacksim_6",
  password: "aishcool6",
  port: "3307",
  database: "Insa4_JSA_hacksim_6",
};

module.exports = {
  init: () => {
    return mysql.createConnection(conn);
  },
};
