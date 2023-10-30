const express = require("express");
const session = require("express-session");
const router = express.Router();
const cookieParser = require("cookie-parser");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const KakaoStrategy = require("passport-kakao").Strategy; // passport-kakao 모듈을 추가해야 합니다.
const GitHubStrategy = require("passport-github2").Strategy;
const bodyParser = require("body-parser");
const db = require("../config/datebase");
const app = express();
let conn = db.init();

app.use(
  session({
    secret: "your-secret-key", // 세션 암호화를 위한 비밀키
    resave: false,
    saveUninitialized: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
// 구글 OAuth 2.0 클라이언트 ID와 시크릿 설정
const GOOGLE_CLIENT_ID =
  "387069556796-pal9i13mtuj16inovquf5h4ucs8s926d.apps.googleusercontent.com"; // 여기에 발급받은 클라이언트 ID 입력
const GOOGLE_CLIENT_SECRET = "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"; // 여기에 발급받은 클라이언트 시크릿 입력

// Passport 구글 로그인 전략 설정
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      // 여기에서 profile 정보를 확인하고 사용자 데이터베이스에 저장하거나 확인할 수 있습니다.
      return done(null, profile);
    }
  )
);

// 로그인 성공 시 사용자 정보를 세션에 저장
passport.serializeUser(function (user, done) {
  done(null, user);
});

// 세션에 저장된 사용자 정보를 복구하여 사용자 정보를 요청 객체에 추가
passport.deserializeUser(function (user, done) {
  done(null, user);
});

// 구글 소셜 로그인 시작
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// 로그인 콜백 핸들러
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    // Successful authentication, redirect to the "/profile" route

    res.redirect("/index");
  }
);

// 사용자 프로필 페이지
router.get("/index", (req, res) => {
  if (req.isAuthenticated()) {
    // res.send(`<h1>Hello, ${req.user.displayName}</h1>`);
    res.render("index.html");
  } else {
    res.render("login.html");
  }
});

/* =======================================
              카카오 로그인 
   ======================================= */

// 카카오 OAuth 2.0 클라이언트 ID 설정
const KAKAO_CLIENT_ID = "accfec57b1b9be32ee75b2c22a044a2b"; // 여기에 발급받은 클라이언트 ID 입력

// Passport 카카오 로그인 전략 설정
passport.use(
  new KakaoStrategy(
    {
      clientID: KAKAO_CLIENT_ID,
      callbackURL: "/auth/kakao/callback", // 여기에 콜백 URL 입력
    },
    function (accessToken, refreshToken, profile, done) {
      // 여기에서 profile 정보를 확인하고 사용자 데이터베이스에 저장하거나 확인할 수 있습니다.
      return done(null, profile);
    }
  )
);

// 로그인 성공 시 사용자 정보를 세션에 저장
passport.serializeUser(function (user, done) {
  done(null, user);
});

// 세션에 저장된 사용자 정보를 복구하여 요청 객체에 추가
passport.deserializeUser(function (user, done) {
  done(null, user);
});

// 카카오 소셜 로그인 시작
router.get("/auth/kakao", passport.authenticate("kakao"));

// 로그인 콜백 핸들러
router.get(
  "/auth/kakao/callback",
  passport.authenticate("kakao", { failureRedirect: "/" }),
  function (req, res) {
    // Successful authentication, redirect to the "/index" route
    res.render("index.html", { user: req.user });
  }
);

// 사용자 프로필 페이지
router.get("/index", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("index.html");
  } else {
    res.render("login.html");
  }
});

/* ======================================
              깃허브 로그인 
   =====================================*/

// 깃허브 OAuth 2.0 클라이언트 ID 및 시크릿 설정
const GITHUB_CLIENT_ID = "cdc134ce6df8f8df71d8"; // 여기에 발급받은 클라이언트 ID 입력
const GITHUB_CLIENT_SECRET = "daab2cd2bd2cc57a5e04e265eadc040abfeb48ce"; // 여기에 발급받은 클라이언트 시크릿 입력

// Passport 깃허브 로그인 전략 설정
passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback", // 여기에 콜백 URL 입력
    },
    function (accessToken, refreshToken, profile, done) {
      // 여기에서 profile 정보를 확인하고 사용자 데이터베이스에 저장하거나 확인할 수 있습니다.
      return done(null, profile);
    }
  )
);

// 로그인 성공 시 사용자 정보를 세션에 저장
passport.serializeUser(function (user, done) {
  done(null, user);
});

// 세션에 저장된 사용자 정보를 복구하여 요청 객체에 추가
passport.deserializeUser(function (user, done) {
  done(null, user);
});

// 깃허브 소셜 로그인 시작
router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// 로그인 콜백 핸들러
router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  function (req, res) {
    // Successful authentication, redirect to the "/index" route
    res.redirect("/index");
  }
);

// 사용자 프로필 페이지
router.get("/index", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("index.html", { user: req.user });
  } else {
    res.render("login.html");
  }
});

// 로그아웃
router.get("/logout", (req, res) => {
  req.logout();
  res.render("login.html");
});

// 기본 라우트
router.get("/login", (req, res) => {
  res.render("login.html");
});

router.get("/join", (req, res) => {
  res.render("join.html");
});

router.get("/index", (req, res) => {
  res.render("index.html");
});

router.post("/join", (req, res) => {
  let join_name = req.body.name;
  let join_email = req.body.email;
  let join_pass = req.body.pass;

  console.log("Name:", join_name, "Email:", join_email, "Password:", join_pass);

  // DB 연결
  conn.connect(function (err) {
    if (err) {
      console.error("DB Connection Error:", err);
      return;
    }

    // 기존에 이메일이 이미 존재하는지 확인
    let checkEmailSql =
      "SELECT COUNT(*) AS emailCount FROM MEMBER WHERE EMAIL = ?";
    conn.query(checkEmailSql, [join_email], function (err, result) {
      if (err) {
        console.error("Query Error:", err);
        conn.end();
        return;
      }

      if (result[0].emailCount > 0) {
        // 이미 해당 이메일이 존재하는 경우
        console.log("Email already exists.");
        conn.end();
        return;
      }

      // 현재 최대 USER_ID 조회
      let getMaxUserIdSql = "SELECT MAX(USER_ID) AS maxUserId FROM MEMBER";
      conn.query(getMaxUserIdSql, function (err, result) {
        if (err) {
          console.error("Query Error:", err);
          conn.end();
          return;
        }

        let nextUserId = result[0].maxUserId + 1; // 다음 USER_ID 값 계산

        let insertSql =
          "INSERT INTO MEMBER (USER_ID, MEMBER_NAME, SIGN_PLATFORM_TYPE, PW, EMAIL) VALUES (?, ?, ?, ?, ?)";

        // 새로운 회원 정보 삽입
        conn.query(
          insertSql,
          [nextUserId, join_name, "NDB", join_pass, join_email],
          function (err, result) {
            if (err) {
              console.error("Query Error:", err);
            } else {
              console.log("Data inserted successfully:", result);
            }
          }
        );
      });
    });
  });
});

router.use(bodyParser.urlencoded({ extended: true }));
router.get("/setSession", (req, res) => {
  // 세션 생성하기
  req.session.nickName = "apple";
  req.session.age = 20;

  res.send("세션 만들기");
});

router.post("/index", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const query = `SELECT * FROM MEMBER WHERE EMAIL = ? AND PW = ?`;

  // DB 연결
  conn.connect(function (err) {
    if (err) {
      console.error("DB Connection Error:", err);
      return;
    }
    conn.query(query, [email, password], (err, results) => {
      if (!err && results.length === 1) {
        console.log("쿼리문 실행");
        // console.log(results[0].EMAIL);
        // console.log(results[0].MEMBER_LV);
        res.cookie("user-email", results[0].EMAIL); // 쿠키에 로그인 정보 저장
        req.session.loggedInUserEmail = email; // 세션에 이메일 저장

        const userEmail = (req.session.userEmail = email);
        console.log("user-email", userEmail);
        // 로그인 성공 시 index.html 페이지로 이동
        res.render("index.html", { results: results });
      } else {
        console.log("쿼리문 실패");
        res.write(`<!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>로그인 실패</title>
        </head>
        <body>
            <script>
            
                alert('로그인 실패. 이메일 또는 비밀번호가 잘못되었습니다.');
                window.location="http://localhost:3003/login";
            </script>
        </body>
        </html>`);

        // res.send("로그인 실패. 이메일 또는 비밀번호가 잘못되었습니다.");
      }
    });
  });
});

router.get("/getSession", (req, res) => {
  // 세션 생성하기
  let nick = req.session.nickName;
  console.log(nick);
  res.send(nick);
});

module.exports = router;
