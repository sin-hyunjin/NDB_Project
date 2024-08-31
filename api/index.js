// require("dotenv").config();
const express = require("express");
const nunjucks = require("nunjucks");
const session = require("express-session");
const path = require("path");

const app = express();
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);

// 정적 파일 제공
app.use(express.static(path.join(__dirname, "../public")));

// Nunjucks 설정
app.set("view engine", "html");

nunjucks.configure(path.join(__dirname, "../views"), {
  express: app,
  watch: true,
  noCache: true,
});

// Body-parser 설정
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 세션 설정
app.use(
  session({
    secret: "secretkey", // 암호화 키
    resave: false, // 요청이 들어왔을 때 세션을 저장할지 여부
    saveUninitialized: true, // 초기화되지 않은 세션을 저장할지 여부
    cookie: { secure: false }, // HTTPS를 사용할 경우 true로 설정
  })
);

// 라우트 설정
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "login.html"));
});
app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "index.html"));
});

app.get("/join", (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "join.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "login.html"));
});

app.get("/mypage/reVeiw", (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "reviewNote.html"));
});

app.get("/config", (req, res) => {
  res.json({
    BASE_URL: process.env.BASE_URL,
    API_KEY: process.env.API_KEY,
    GPT_KEY: process.env.GPT_KEY,
  });
});

const loginRouter = require("../router/login");
app.use(loginRouter);
const indexRouter = require("../router/codeExam");
app.use(indexRouter);
const mypageRouter = require("../router/mypage");
app.use("/mypage", mypageRouter);
const codeIframeRouter = require("../router/index");
app.use(codeIframeRouter);

app.listen(3003, () => {
  console.log("서버가 3003번 포트에서 실행 중입니다.");
});
module.exports = app;
