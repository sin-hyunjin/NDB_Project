const express = require("express");
const router = express.Router();
const passport = require("passport");

const db = require("../config/datebase");
let conn = db.init();
// 예제 시연창
router.get("/home/codeExam", (req, res) => {
  // res.send(`<h1>Hello, ${req.user.displayName}</h1>`);
  res.render("codeExam.html");
});

//   module.exports = router;
// router.get("/views/codeExam", (req, res) => {
//     res.sendFile(path.join(__dirname, 'views/codeExam.html'));
// });
module.exports = router;
