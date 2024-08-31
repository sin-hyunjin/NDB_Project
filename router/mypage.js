const express = require("express");
const router = express.Router();
const db = require("../config/datebase");
const path = require("path");

// 데이터베이스 연결
const conn = db.init();
conn.connect((err) => {
  if (err) {
    console.error("데이터베이스 연결 오류:", err);
    process.exit(1); // 서버 종료
  }
});

router.get("/", (req, res) => {
  let page = parseInt(req.query.page) || 1; // 페이지 번호를 가져옵니다. 기본값은 1입니다.
  let limit = 5; // 페이지당 표시할 데이터 수
  let offset = (page - 1) * limit; // OFFSET 값을 계산합니다.

  // 전체 데이터 수를 가져옵니다.
  const sqlCount = "SELECT COUNT(*) AS total FROM QUESTION";
  conn.query(sqlCount, (err, countResults) => {
    if (err) {
      console.error("쿼리 수행 오류:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    let totalData = countResults[0].total;
    let total_pages = Math.ceil(totalData / limit); // 전체 페이지 수를 계산합니다.

    const sqlQuestion =
      "SELECT EXAM_ID, EXAM_LANGUAGE, SEARCH_WORD FROM QUESTION LIMIT ? OFFSET ?";
    const sqlMember =
      "SELECT USER_ID, MEMBER_NAME, PW, MEMBER_LV, EMAIL FROM MEMBER LIMIT 1";

    conn.query(sqlMember, (err, memberResults) => {
      if (err) {
        console.error("쿼리 수행 오류:", err);
        res.status(500).send("Internal Server Error");
        return;
      }

      conn.query(sqlQuestion, [limit, offset], (err, questionResults) => {
        if (err) {
          console.error("쿼리 수행 오류:", err);
          res.status(500).send("Internal Server Error");
          return;
        }

        if (memberResults.length > 0) {
          const memberData = memberResults[0];

          // SQL query to get the grade based on the user's email
          const sqlGradeQuery =
            "SELECT COUNT(*) AS total FROM QUESTION WHERE EMAIL = ?";
          conn.query(sqlGradeQuery, [memberData.EMAIL], (err, gradeResults) => {
            if (err) {
              console.error("쿼리 수행 오류:", err);
              res.status(500).send("Internal Server Error");
              return;
            }

            const total = gradeResults[0].total;
            let userGrade;

            if (total >= 30) {
              userGrade = "두부";
            } else if (total >= 20) {
              userGrade = "순두부";
            } else if (total >= 10) {
              userGrade = "연두부";
            } else if (total >= 1) {
              userGrade = "콩물";
            } else {
              userGrade = "신입생";
            }

            res.render("myPage.html", {
              id: memberData.USER_ID,
              email: memberData.EMAIL,
              name: memberData.MEMBER_NAME,
              password: memberData.PW,
              member_lv: memberData.MEMBER_LV,
              questions: questionResults,
              total_pages: total_pages,
              userGrade: userGrade,
            });
          });
        } else {
          console.log("사이트 접속 실패! 결과 없음.");
          res.status(404).send("Not Found");
        }
      });
    });
  });
});

router.get("/index", (req, res) => {
  const query = "SELECT * FROM QUESTION";

  conn.query(query, (err, results) => {
    if (err) {
      console.error("쿼리 실행 오류:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    console.log("쿼리문 실행");
    console.log(results);
    res.render("index.html", { results: results });
  });
});

module.exports = router;
