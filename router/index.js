const express = require("express");
const router = express.Router();
const passport = require("passport");

const db = require("../config/datebase");

router.get("/index/codeExam", (req, res) => {
  res.render("codeExam.html");
});

module.exports = router;
