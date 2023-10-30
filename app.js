const express = require("express");
const nunjucks = require("nunjucks");
const session = require("express-session");

const passport = require("passport");
const path = require("path");
const app = express();


app.get('/mypage/reVeiw', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'reviewNote.html'));
});


// Nunjucks 설정
app.set("view engine", "html");
nunjucks.configure("views", { express: app, watch: true , noCache: true});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// css 속성을 적용하기 위한 미들웨어 경로 설정
app.use(express.static(path.join(__dirname, "public")));

// 세션 설정
app.use(
  session({
    httpOnly: true, // http통일때 허용
    secret: "secretkey", //암호화키
    resave: false, //요청이 들어 왔을때 세션에 수정 사항이 없더라도 다시저장
  })
);
// Passport 초기화 및 세션 사용 설정
app.use(passport.initialize());
app.use(passport.session());

const loginRouter = require("./router/login");
app.use(loginRouter);
const joinRouter = require("./router/login");
app.use(joinRouter);
const indexRouter = require("./router/codeExam");
app.use(indexRouter);
const mypageRouter = require("./router/mypage");
app.use('/mypage',mypageRouter);
const codeIframeRouter = require("./router/index");
app.use(codeIframeRouter)


app.listen(3003, () => {
  console.log("서버가 3003번 포트에서 실행 중입니다.");
});
