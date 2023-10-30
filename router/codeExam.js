const express = require('express')
const router = express.Router();
const db = require("../config/datebase");
let conn = db.init();
router.post("/index/ex_1", function (req, res) {
    let user_keywords = req.body.find_keywords;
    let select_language = req.body.select_language;
    let user_input = req.body.user_input; //사용자 입력값
    let sql = `SELECT *
                FROM QUESTION
                WHERE EXAM_LANGUAGE = ? 
                AND SEARCH_WORD LIKE ?;`

    conn.query(sql, [select_language, `%${user_keywords}%`], function (err, rows) {
        if (!err) {
            if (rows.length > 0) {
                const randomIndex = Math.floor(Math.random() * rows.length);
                const randomRow = rows[randomIndex];
                console.log("랜덤으로 선택된 행:", randomRow);
                res.json(randomRow);
                // 이후 randomRow를 사용자에게 제공하는 로직을 추가합니다.

                let htmlCode = randomRow.EXAM_HTML; // html 코드 - O
                let cssCode = randomRow.EXAM_CSS;   // css 코드 - O
                let jsCode = randomRow.EXAM_JS;     // js 코드 - O
                let cCode = randomRow.EXAM_C;                                  // c 코드 - O
                let javaCode = randomRow.EXAM_JAVA;                // java 코드 - O
                let pythonCode = randomRow.EXAM_PYTHON;              // python 코드 - O
                //let exam_id = PK(auto_increment);   // 문제 id - PK
                let user_email = req.body.email;          // 유저 id - FK /임의 문제 아이디 
                let exam_desc = randomRow.EXAM_CONTENT;// 문제 + 부가설명 - O

                let sql2 = `INSERT INTO QUESTION (
                    EMAIL,EXAM_LANGUAGE, SEARCH_WORD, 
                    EXAM_CONTENT, EXAM_HTML, EXAM_CSS, EXAM_JS, EXAM_JAVA, 
                    EXAM_C, EXAM_PYTHON) VALUES (?,?,?,?,?,?,?,?,?,?)`;

                conn.query(sql2, [user_email, select_language, user_input, exam_desc,
                    htmlCode, cssCode, jsCode,
                    javaCode, cCode, pythonCode], function (err, rows2) {
                        if (!err) {
                            console.log("쿼리문 실행 완료", rows2);
                        } else {
                            console.log("DB 쿼리문 실행 실패", err);
                            console.log(user_input, select_language)
                        }
                    });
            } else {
                console.log("일치하는 결과가 없습니다.");
            }
        }
        else {
            console.log("쿼리문 실행실패", err)
        }
    })
})


router.post("/index/ex_2", function (req, res) {
    let user_keywords = req.body.find_keywords;
    let user_keywords2 = req.body.find_keywords2;
    let select_language = req.body.select_language; // 사용자 선택 언어
    let user_input = req.body.user_input; //사용자 입력값

    let sql = `SELECT *
                 FROM QUESTION
                WHERE EXAM_LANGUAGE = ? 
                AND SEARCH_WORD LIKE ? 
                AND SEARCH_WORD LIKE ?;`

    conn.query(sql, [select_language, `%${user_keywords}%`, `%${user_keywords2}%`], function (err, rows) {
        if (!err) {
            if (rows.length > 0) {
                const randomIndex = Math.floor(Math.random() * rows.length);
                const randomRow = rows[randomIndex];
                console.log("랜덤으로 선택된 행:", randomRow);
                // randomRow를 JSON 형식으로 클라이언트에 응답
                res.json(randomRow); // 클라이언트에 제공
                // 이후 randomRow를 사용자에게 제공하는 로직을 추가합니다.


                let htmlCode = randomRow.EXAM_HTML; // html 코드 - O
                let cssCode = randomRow.EXAM_CSS;   // css 코드 - O
                let jsCode = randomRow.EXAM_JS;     // js 코드 - O
                let cCode = randomRow.EXAM_C;                                  // c 코드 - O
                let javaCode = randomRow.EXAM_JAVA;                // java 코드 - O
                let pythonCode = randomRow.EXAM_PYTHON;              // python 코드 - O
                //let exam_id = PK(auto_increment);   // 문제 id - PK
                let user_email = req.body.email;           // 유저 id - FK /임의 문제 아이디 
                let exam_desc = randomRow.EXAM_CONTENT;// 문제 + 부가설명 - O

                console.log(user_email)
                let sql2 = `INSERT INTO QUESTION (
                    EMAIL,EXAM_LANGUAGE, SEARCH_WORD, 
                    EXAM_CONTENT, EXAM_HTML, EXAM_CSS, EXAM_JS, EXAM_JAVA, 
                    EXAM_C, EXAM_PYTHON) VALUES (?,?,?,?,?,?,?,?,?,?)`;

                conn.query(sql2, [user_email, select_language, user_input, exam_desc,
                    htmlCode, cssCode, jsCode,
                    javaCode, cCode, pythonCode], function (err, rows2) {
                        if (!err) {
                            console.log("쿼리문 실행 완료", rows2);
                        } else {
                            console.log("DB 쿼리문 실행 실패", err);
                            console.log(user_input, select_language)
                        }
                    });
            } else {
                console.log("일치하는 결과가 없습니다.");
            }
        }
        else {
            console.log("쿼리문 실행실패", err)
        }
    });

    // 기존의 문제를 사용자가 풀었다는 기록을 DB에 insert

});

router.post("/index/frontinput", function (req, res) {
    let user_input = req.body.user_input; //사용자 입력 데이터 - X
    let select_language = req.body.select_language; //사용자 선택 언어 - O
    let f_text = req.body.f_text;     // 문제   - O
    let apitext = req.body.apitext;   // 부가설명- O
    let htmlCode = req.body.htmlCode; // html 코드 - O
    let cssCode = req.body.cssCode;   // css 코드 - O
    let jsCode = req.body.jsCode;     // js 코드 - O
    let cCode = "";                   // c 코드 - O
    let javaCode = "";                // java 코드 - O
    let pythonCode = "";              // python 코드 - O
    //let exam_id = PK(auto_increment);   // 문제 id - PK
    let EMAIL = req.body.email;                    // 유저 id - FK
    let exam_desc = f_text + "\n" + apitext;    // 문제 + 부가설명 - O

    let sql = `insert into QUESTION (
        EMAIL,EXAM_LANGUAGE, SEARCH_WORD, 
        EXAM_CONTENT, EXAM_HTML, EXAM_CSS, EXAM_JS, EXAM_JAVA, 
        EXAM_C, EXAM_PYTHON )values(?,?,?,?,?,?,?,?,?,?)`;

    conn.query(sql, [EMAIL, select_language, user_input,
        exam_desc, htmlCode, cssCode,
        jsCode, javaCode, cCode, pythonCode], function (err,rows) {
            if (!err) {
                console.log("API 응답 insert 쿼리문 실행 완료");


                let sql2 = `select * FROM QUESTION WHERE EXAM_ID = ?`;
                let insertedExamId = rows.insertId;
                conn.query(sql2, [insertedExamId], function (err, rows2) {
                    if (!err) {
                        console.log("API응답 조회 쿼리문 실행 완료", rows2);
                        res.json(rows2)
                    } else {
                        console.log("DB 쿼리문 실행 실패", err);
                        console.log(user_input, select_language)
                    }
                });
            } else {
                console.log("DB 쿼리문 실행 실패", err);
                res.json({ success: false, error: err });
                console.log(user_input, select_language)
            }
        });
});

router.post("/index/java_input", function (req, res) {
    let user_input = req.body.user_input; //사용자 입력 데이터 - X
    let select_language = req.body.select_language; //사용자 선택 언어 - O
    let f_text = req.body.f_text;     // 문제   - O
    let javaCode = req.body.javaCode; // java 코드 - O
    let apitext = req.body.apitext;   // 부가설명- O
    let htmlCode = " ";                 // html 코드 - O
    let cssCode = " ";                  // css 코드 - O
    let jsCode = " ";                   // js 코드 - O
    let cCode = " ";                   // c 코드 - O
    let pythonCode = " ";              // python 코드 - O
    //let exam_id = PK(auto_increment);   // 문제 id - PK
    let EMAIL = req.body.email;                   // 유저 id - FK
    let exam_desc = f_text + "\n" + apitext;    // 문제 + 부가설명 - O

    let sql = `insert into QUESTION (EMAIL,EXAM_LANGUAGE, SEARCH_WORD, 
        EXAM_CONTENT, EXAM_HTML, EXAM_CSS, 
        EXAM_JS, EXAM_JAVA, EXAM_C, EXAM_PYTHON )values(?,?,?,?,?,?,?,?,?,?)`;

    conn.query(sql, [EMAIL, select_language, user_input,
        exam_desc, htmlCode, cssCode, jsCode,
        javaCode, cCode, pythonCode], function (err, rows) {
            if (!err) {
                console.log("API 응답 insert 쿼리문 실행 완료");
                let sql2 = `select * FROM QUESTION WHERE EXAM_ID = ?`;
                let insertedExamId = rows.insertId;
                conn.query(sql2, [insertedExamId], function (err, rows2) {
                    if (!err) {
                        console.log("API응답 조회 쿼리문 실행 완료", rows2);
                        res.json(rows2)
                    } else {
                        console.log("DB 쿼리문 실행 실패", err);
                        console.log(user_input, select_language)
                    }
                });
            } else {
                console.log("DB 쿼리문 실행 실패", err);
                res.json({ success: false, error: err });
                console.log(user_input, select_language)
            }
        });
});

router.post("/index/python_input", function (req, res) {
    let user_input = req.body.user_input; //사용자 입력 데이터 - X
    let select_language = req.body.select_language; //사용자 선택 언어 - O
    let pythonCode = req.body.pythonCode;              // python 코드 - O
    let f_text = req.body.f_text;     // 문제   - O
    let apitext = req.body.apitext;   // 부가설명- O
    let htmlCode = " ";                 // html 코드 - O
    let cssCode = " ";                  // css 코드 - O
    let jsCode = " ";                   // js 코드 - O
    let javaCode = " ";                 // java 코드 - O
    let cCode = " ";                   // c 코드 - O
    //let exam_id = PK(auto_increment);   // 문제 id - PK
    let EMAIL = req.body.email;                    // 유저 id - FK
    let exam_desc = f_text + "\n" + apitext;    // 문제 + 부가설명 - O

    let sql = `insert into QUESTION (EMAIL,EXAM_LANGUAGE, SEARCH_WORD,
         EXAM_CONTENT, EXAM_HTML, EXAM_CSS,
          EXAM_JS, EXAM_JAVA, EXAM_C, EXAM_PYTHON )values(?,?,?,?,?,?,?,?,?,?)`;

    conn.query(sql, [EMAIL, select_language, user_input,
         exam_desc, htmlCode, cssCode, jsCode, 
         javaCode, cCode, pythonCode], function (err, rows) {
        if (!err) {
            console.log("API 응답 insert 쿼리문 실행 완료");
            let sql2 = `select * FROM QUESTION WHERE EXAM_ID = ?`;
            let insertedExamId = rows.insertId;
            conn.query(sql2, [insertedExamId], function (err, rows2) {
                if (!err) {
                    console.log("API응답 조회 쿼리문 실행 완료", rows2);
                    res.json(rows2)
                } else {
                    console.log("DB 쿼리문 실행 실패", err);
                    console.log(user_input, select_language)
                }
            });
        } else {
            console.log("DB 쿼리문 실행 실패", err);
            res.json({ success: false, error: err });
            console.log(user_input, select_language)
        }
    });
});

router.post("/index/c_input", function (req, res) {
    let user_input = req.body.user_input; //사용자 입력 데이터 - X
    let select_language = req.body.select_language; //사용자 선택 언어 - O
    let cCode = req.body.c_Code;                   // c 코드 - O
    let f_text = req.body.f_text;     // 문제   - O
    let apitext = req.body.apitext;   // 부가설명- O
    let htmlCode = " ";                 // html 코드 - O
    let cssCode = " ";                  // css 코드 - O
    let jsCode = " ";                   // js 코드 - O
    let javaCode = " ";                 // java 코드 - O
    let pythonCode = " ";              // python 코드 - O
    //let exam_id = PK(auto_increment);   // 문제 id - PK
    let EMAIL = req.body.email;;                    // 유저 id - FK
    let exam_desc = f_text + "\n" + apitext;    // 문제 + 부가설명 - O

    let sql = `insert into QUESTION (EMAIL,EXAM_LANGUAGE, SEARCH_WORD, EXAM_CONTENT, 
        EXAM_HTML, EXAM_CSS, EXAM_JS, 
        EXAM_JAVA, EXAM_C, EXAM_PYTHON )values(?,?,?,?,?,?,?,?,?,?)`;

    conn.query(sql, [EMAIL, select_language, user_input,
         exam_desc, htmlCode, cssCode, 
         jsCode, javaCode, cCode, pythonCode], function (err, rows) {
        if (!err) {
            console.log("API 응답 insert 쿼리문 실행 완료");
            let sql2 = `select * FROM QUESTION WHERE EXAM_ID = ?`;
            let insertedExamId = rows.insertId;
            conn.query(sql2, [insertedExamId], function (err, rows2) {
                if (!err) {
                    console.log("API응답 조회 쿼리문 실행 완료", rows2);
                    res.json(rows2)
                } else {
                    console.log("DB 쿼리문 실행 실패", err);
                    console.log(user_input, select_language)
                }
            });
        } else {
            console.log("DB 쿼리문 실행 실패", err);
            res.json({ success: false, error: err });
            console.log(user_input, select_language)
        }
    });
});

module.exports = router;
