// 코딩 문법 하이라이팅
// 모든 언어를 가져오면 번들 크기가 커지기 때문에 몇 가지 언어만 가져오기
// const hljs = require('highlight.js/lib/core');
// hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
// 모든 언어 가져오기
// const hljs = require('highlight.js');
// textarea내용 iframe에 바로 업로드
function updateIframeContent(lang) {
  console.log("updateIframeContent 함수 실행");
  // iframe을 선택합니다.
  const iframe = document.getElementById("main_Nav_iframe"); // 적절한 선택자 사용 필요

  // [개선 필요](중복 많음)front 언어인지 기타 다른 언어인지 구분
  if ((lang === "html") | (lang === "css") | (lang === "javascript")) {
    // 스타일과 내용을 포함한 HTML을 작성합니다.
    // iframe 변수 선언
    const iframeContentFront = `
        <html>
            <head>
                <style>
                ${responseVal.EXAM_CSS}
                </style>
            </head>
            <body>
                <!-- 내용을 여기에 작성 -->
                ${responseVal.EXAM_HTML}
                <script>
                ${responseVal.EXAM_JS}
                </script>
            </body>
        </html>
        `;
    // srcdoc 속성을 사용하여 iframe의 내용을 설정합니다.
    console.log("iframeContentFront", iframeContentFront);
    iframe.setAttribute("srcdoc", iframeContentFront);
  } else {
    // [개선 필요]JSP로 구현(Tomcat, Apache 등 서버단에서 실행요함)
    // JSP 내용 해당 블로그 참조 https://ejfrmjava.tistory.com/14
    if (lang === "java") {
      const iframeContentJava = `
            <%-- 지시 태그  --%>
            <%@page import="java.util.ArrayList"%>
            <%@ page language="java" contentType="text/html; charset=UTF-8"
                pageEncoding="UTF-8"%>
            <html>
                <title>NDBSWEBTEST</title>                
                <head>
                    <style>
                    </style>
                </head>
                <body>
                    <!-- 내용을 여기에 작성 -->
                    <h1>JAVA 코드 실행</h1>
                    <%${responseVal.EXAM_JAVA}%>
                    <script>
                    </script>
                </body>
            </html>
            `;
      console.log("iframeContentJava", iframeContentJava);
      iframe.setAttribute("srcdoc", iframeContentJava);
    } else if (lang === "python") {
      const iframeContentPython = `
            <html>
                <head>
                <link rel="stylesheet" href="https://pyscript.net/alpha/pyscript.css" />
                <script defer src="https://pyscript.net/alpha/pyscript.js"></script>
                <py-env>
                  - numpy
                  - matplotlib
                </py-env>
                    <style>
                    body{
                        margin:0;
                        bos-sizing:borderbox;
                    }
                    </style>
                </head>
                <body>
                    <!-- 내용을 여기에 작성 -->
                    <py-script>
                    ${responseVal.EXAM_PYTHON}
                    </py-script>
                    <script>
                    </script>
                </body>
            </html>
            `;
      console.log("iframeContentPython", iframeContentPython);
      iframe.setAttribute("srcdoc", iframeContentPython);
    } else if (lang === "c_language") {
      const iframeContentC = `
            <html>
                <head>
                    <style>
                    ${responseVal.EXAM_CSS}
                    </style>
                </head>
                <body>
                    <!-- 내용을 여기에 작성 -->
                    ${responseVal.EXAM_C}
                    <script>
                    ${responseVal.EXAM_JS}
                    </script>
                </body>
            </html>
            `;
      console.log("iframeContentFront", iframeContentC);
      iframe.setAttribute("srcdoc", iframeContentC);
    }
  }
}

// 코드 하이라이팅 효과 시작
function update_code() {
  const result_elem = document.querySelector("#highlighting-code code");
  let text = document.querySelector("#editing-code").value;
  if (text[text.length - 1] == "\n") {
    text += "  ";
  } else if (text == "") {
    text += "\n  ";
  } else if (text.indexOf("\n", 1) < 0) {
    text += "\n  ";
  }

  result_elem.innerHTML = text;
  hljs.highlightBlock(result_elem);
}

function sync_scroll(element) {
  let result_element = document.querySelector("#highlighting-code");
  result_element.scrollTop = element.scrollTop;
  result_element.scrollLeft = element.scrollLeft;
}

function check_tab(element, event) {
  let code = element.value;
  if (event.key == "Tab") {
    event.preventDefault();
    let before_tab = code.slice(0, element.selectionStart);
    let after_tab = code.slice(element.selectionEnd, element.value.length); //
    let cursor_pos = element.selectionEnd + 2;
    element.value = before_tab + "  " + after_tab;
    element.selectionStart = cursor_pos;
    element.selectionEnd = cursor_pos;
    update_code(element.value);
  }
}
// 코드 예제 창 div 값 변경
function codeExam_divLanguage() {
  var lang = document.getElementById("main_language");
  var selectLang = lang.options[lang.selectedIndex].value;
  console.log(selectLang);
}

// 검색시 페이지 새로고침 현상 막기
function handleSubmit(event) {
  event.preventDefault();
  value = "";
}
// radio 버튼 클릭 여부 판별
function checkRadio() {
  let radioButtons = document.querySelectorAll(
    'input[type="radio"][name="main_Nav_RadioName"]'
  );
  let isSelected = false;

  radioButtons.forEach((radio) => {
    if (radio.checked) {
      isSelected = true;
    }
  });

  if (!isSelected) {
    alert(
      "DB 혹은 API를 선택해주세요. 선택하지 않으면 결과가 나오지 않습니다 ㅜㅜㅜ"
    );
    return;
  }
}

// 검색시 코드 창 class 변경(코드 입력창 변경)
function insertHTMLToDiv() {
  var main_searchLanguage2 = document.querySelector(".main_searchLanguage2");
  var main_selectLanguage2 =
    main_searchLanguage2.options[main_searchLanguage2.selectedIndex].value;
  const codeExamBox = document.querySelector(".codeExam_boxesSize");

  if (
    (main_selectLanguage2 === "html") |
    (main_selectLanguage2 === "css") |
    (main_selectLanguage2 === "javascript")
  ) {
    codeExamBox.innerHTML = `
        <div id="html-box" class="codeExam_exambox codeExam_htmlBox">
        <div class="codeExam_codePage">
            <div id="codeExam_Language" class="codeExam_codeLanguage">HTML</div>
            <div class="codeExam_codeContent-Size">
                <div class="codeExam_codeContent">
                    <textarea cols="100" id="editing_code_html"><pre class=""></pre></textarea>
                </div>
            </div>
        </div>
    </div>
    <div id="css-box" class="codeExam_exambox codeExam_cssBox">
        <div class="codeExam_codePage">
            <div id="codeExam_Language" class="codeExam_codeLanguage">CSS</div>
            <div class="codeExam_codeContent-Size">
                <div class="codeExam_codeContent">
                    <textarea cols="100" id="editing_code_Css"></textarea>
                </div>
            </div>
        </div>
    </div>
    <div id="js-box" class="codeExam_exambox codeExam_jsBox">
        <div class="codeExam_codePage">
            <div id="codeExam_Language" class="codeExam_codeLanguage">JAVASCRIPT</div>
            <div class="codeExam_codeContent-Size">
                <div class="codeExam_codeContent">
                    <textarea cols="100" id="editing_code_Js"></textarea>
                </div>
            </div>
        </div>
    </div>`;
  } else {
    codeExamBox.innerHTML = `
        <div id="html-box" class="codeExam_exambox codeExam_etcBox">
        <div class="codeExam_codePage">
            <div id="codeExam_Language" class="codeExam_codeLanguage">${main_selectLanguage2}</div>
            <div class="codeExam_codeContent-Size">
                <div class="codeExam_codeContent">
                    <textarea cols="100" id="editing_code_html"></textarea>
                </div>
            </div>
        </div>
    </div>
    `;
  }
}
// codeExam_StartAndSave>button 클릭시 textarea내용 iframe에 출력
function printHtml() {
  const htmlContent = document.getElementById("editing_code_html");
  const cssContent = document.getElementById("editing_code_Css");
  const jsContent = document.getElementById("editing_code_Js");
}

// day&night theme 토글 함수
function is_checked() {
  // 메인 검색창을 찾습니다.
  const main_search = document.querySelector(".main_search");
  // 메인페이지를 찾습니다.
  const main_wrap = document.querySelector(".main_wrap");
  // 1. checkbox element를 찾습니다.
  const checkbox = document.getElementById("main_Nav_themecheck");

  // 2. checked 속성을 체크합니다.
  const is_checked = checkbox.checked;

  // 3. 결과를 출력합니다.
  console.log("체크확인", is_checked);
  console.log("main_wrap 스타일 속성 확인", main_wrap.style);

  // 테마변경
  if (is_checked) {
    // 낮
    window.document.body.classList.add("day");
    main_search.classList.add("main_search_day");
    main_search.classList.remove("main_search_night");
    main_wrap.classList.remove("main_wrap_backImg_night");
    main_wrap.classList.add("main_wrap_backImg_day");
    document.querySelector(".main_NavLangDB_Text").style.color = "#212121";
  } else {
    // 밤
    window.document.body.classList.remove("day");
    main_search.classList.remove("main_search_day");
    main_search.classList.add("main_search_night");
    main_wrap.classList.remove("main_wrap_backImg_day");
    main_wrap.classList.add("main_wrap_backImg_night");
    document.querySelector(".main_NavLangDB_Text").style.color = "white";
  }
}
// 테마 기능 끝
function goToScroll() {
  let location = document.querySelector(".codeExam_code_wrap").offsetTop;
  window.scrollTo({ top: location - 50, behavior: "smooth" });

  // 검색어 추출 후 문제창에 띄우기
}
// 인기검색어 나오는 함수
document
  .getElementById("main_CheckPopularModal")
  .addEventListener("change", (e) => {
    const main_popularModal = document.querySelector("#main_popularSerchModal");
    if (e.target.checked === true) {
      main_popularModal.animate(
        {
          transform: ["translateY(calc(-100% - 58px))", "translateY(0)"],
        },
        {
          duration: 500, // 밀리초 지정
          fill: "forwards", // 종료 시 속성을 지님
          easing: "ease", // 가속도 종류
        }
      );
    } else {
      main_popularModal.animate(
        {
          transform: ["translateY(0%)", "translateY(calc(-100% - 10px))"],
        },
        {
          duration: 500, // 밀리초 지정
          fill: "forwards", // 종료 시 속성을 지님
          easing: "ease", // 가속도 종류
        }
      );
    }
  });

// 문서 로딩 완료한 뒤 실행
document.addEventListener("DOMContentLoaded", function () {
  // 한글 타이핑 효과
  TypeHangul.type(".main_text p", {
    intervalType: 50,
    humanize: 0.5,
  });

  // Scroll 변수 설정(스크롤 값 구하기)
  window.addEventListener(
    "scroll",
    () => {
      document.documentElement.style.setProperty(
        "--scroll",
        window.pageYOffset / (document.body.offsetHeight - window.innerHeight)
      );
    },
    false
  );

  // 검색 시 스크롤 자동이동 함수
  const main_searchBar = document.querySelector(".main_searchBar");
  const main_searchBar2 = document.querySelector(".main_searchBar2");

  function getSearchWord() {
    console.log("getSearchWord");
    let selectLang = document.querySelector(
      "#main_searchLanguage2 > option:checked"
    ).value;
    // let selectOption  = selectLang.selectedOptions[0].value;
    console.log(selectLang);
  }

  // 은우 keyUp
  // function onKeyUp(event) {
  //     if (event.key === 'Enter') {
  //         goToScroll();
  //         getSearchWord();
  //         console.log(document.querySelector(".main_searchBar2").value);
  //     }
  // }
  async function onKeyUp(event) {
    //라디오 버튼에 따라 enter눌렀을 때 호출하는 함수
    if (event.key === "Enter") {
      let a = await checkRadio();
      let b = await goToScroll();
      let c = await resetExam();
      if (document.getElementById("main_Nav_DB").checked) {
        ex_1();
        console.log("DB에서 데이터 꺼내기");
        // insertHTMLToDiv;
      } else if (document.getElementById("main_Nav_API").checked) {
        select();
        console.log("API에서 응답 받기");
      }
      console.log("전송");
    }
  }

  document
    .querySelector(".main_search_button")
    .addEventListener("click", function (e) {
      e.preventDefault();
    });
  document
    .querySelector(".main_search_button")
    .addEventListener("Click", goToScroll);
  // 스크롤 자동

  // 정답가리기 기능
  // div선택변수
  const box = document.querySelector(".codeExam_boxesHide");
  // div의 가로 값
  const width = document.querySelector(".codeExam_boxesHide").clientWidth;

  let isDragging = false;
  let startX, originalLeft;

  box.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX; // 드래그 시작점의 x 좌표 기록
    originalLeft = parseInt(getComputedStyle(box).left); // 요소의 초기 위치 기록 (정수 값으로 변환)
    e.preventDefault();
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      let currentX = e.clientX;
      let difference = currentX - startX; // 시작점과 현재점의 차이 계산

      // 요소를 드래그할 때만 위치를 변경하도록 조건 추가
      if (Math.abs(difference) > 10) {
        // 드래그한 거리를 기존 위치에 더하여 요소 이동
        box.style.left = originalLeft + difference + "px";
      }

      // 드래그를 일정 거리 이상 했을 때 요소를 화면 밖으로 슬라이드시킴
      // if (Math.abs(difference) > (width/2)) {
      //     let slideDirection = difference > 0 ? '100%' : '-100%';  // 오른쪽 또는 왼쪽으로 슬라이드 판단
      //     box.style.left = slideDirection;
      //     isDragging = false;  // 드래그 종료
      // }
    }
  });

  // 드래그시 이미지가 출력되는 브라우저 기본 기능 비활성화
  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
  // 정답 가리기 기능 끝
  // DB , API 검색버튼 클릭 후 색 유지
  let main_Navwon = document.querySelector(".main_Navwon");
  let main_Navwon_clicked = 0;
  main_Navwon.addEventListener("click", () => {
    if (main_Navwon_clicked) {
      main_Navwon.className = "main_Navwon";
      main_Navwon_clicked = 0;
    } else {
      main_Navwon.className = "main_Navwon_active-color";
      main_Navwon_clicked = 1;
    }
  });
  // 함수 최적화를 위한 검색버튼 순차실행 함수
  let SearchBtnasycnc = async function (e) {
    let a = await onKeyUp(e);
    let b = await insertHTMLToDiv();
  };

  // 함수 호출
  // 왼쪽 상단 검색바 함수 적용
  // main_searchBar.addEventListener("keyup", onKeyUp);
  // main_searchBar.addEventListener("keyup", insertHTMLToDiv);
  main_searchBar.addEventListener("keyup", SearchBtnasycnc);
  main_searchBar.addEventListener("keyup", handleSubmit);

  // 메인 가운데 검색바 함수 적용
  // main_searchBar2.addEventListener("keyup", insertHTMLToDiv);
  // main_searchBar2.addEventListener("keyup", onKeyUp);
  main_searchBar2.addEventListener("keyup", SearchBtnasycnc);
  main_searchBar2.addEventListener("keyup", handleSubmit);

  // codeExam Start Btn, iframe내용 반영
  let codeExam_startBtn = document.getElementById("codeExam_startBtn");
  codeExam_startBtn.addEventListener("click", loadTextareaContentIntoIframe);
});

async function user_Btn() {
  // 라디오 체크에 따라서 함수 호출하기
  let a = await checkRadio();
  let b = await goToScroll();
  let c = await resetExam();
  let d = await insertHTMLToDiv();

  if (document.getElementById("main_Nav_DB").checked) {
    ex_1();
    console.log("DB에서 데이터 꺼내기");
  } else if (document.getElementById("main_Nav_API").checked) {
    select();
    console.log("API에서 응답 받기");
  }
  console.log("전송");
}

function getCookie(cookieName) {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }

  return null;
}
let responseVal;
let responseAPI;
let responseDB;

// DB 코드
function ex_1() {
  // DB 테이블에서 문제 제공하는 함수
  let keywords = document.getElementsByClassName("main_searchBar")[0];
  let user_input = keywords.value;
  let keywords2 = document.getElementsByClassName("main_searchBar2")[0];
  let user_input2 = keywords2.value;
  let languageElement = document.querySelector(".main_searchLanguage");
  let language = languageElement.options[languageElement.selectedIndex].value; // select 태그 사용자 선택 value값 가져오기
  let languageElement2 = document.querySelector(".main_searchLanguage2");
  let language2 =
    languageElement2.options[languageElement2.selectedIndex].value;
  console.log("상단 검색바 사용자선택 언어 : ", language);
  console.log("메인 검색바 사용자선택 언어 : ", language2);
  let specificCookieValue = getCookie("user-email");
  console.log("Specific Cookie Value:", specificCookieValue);

  let select_Language = ""; // 사용자 선택언어
  let input_String = ""; // 사용자 입력값
  // 상단바 사용자 입력창
  if (user_input.trim() !== "") {
    select_Language = language;
    input_String = user_input;
  }

  // 메인 페이지 사용자 입력창
  if (user_input2.trim() !== "") {
    select_Language = language2;
    input_String = user_input2;
  }

  console.log("사용자 입력 : ", input_String);

  let find_keywords = [];
  let user_keywords = [
    "레이아웃",
    "flex",
    "addeventListener",
    "if",
    "for",
    "while",
    "switch case",
    "별찍기",
    "소수",
    "짝수",
    "구구단",
    "1차원",
    "2차원",
    "배열",
    "포인터",
  ];
  // 사용자가 선택할 것 같은 키워드 배열

  for (let i = 0; i < user_keywords.length; i++) {
    if (input_String.includes(user_keywords[i])) {
      console.log(`찾은 keyword: ${user_keywords[i]}`); //for, 별찍기
      find_keywords.push(user_keywords[i]); //찾은 keyword push
    }
  } // 사용자 입력 값(input_String)에서 user_keywords배열 안에 있는 값이 있는지
  console.log("찾아서 추가해준 keywords: ", find_keywords);

  if (find_keywords.length == 1) {
    // 찾은 키워드가 1개일때
    $.ajax({
      url: "/index/ex_1",
      method: "POST",
      data: {
        // 서버에 보낼 데이터
        find_keywords: find_keywords[0],
        user_input: input_String,
        select_language: select_Language,
        email: specificCookieValue,
      },
    })
      .done(function (serverResponse) {
        console.log("데이터 서버에 보내기 성공~");
        console.log(serverResponse); // 서버측에서 데이터 받기
        responseDB = serverResponse; // 전역 변수에 서버측 데이터 할당
        response_DB(); //responseDB 변수 값 확인
      })
      .fail(function (error) {
        console.error("데이터 서버에 못보냄ㅋ 오류 : ", error);
      });
  }
  if (find_keywords.length == 2) {
    // 찾은 키워드가 2개일때
    $.ajax({
      url: "/index/ex_2", //
      method: "POST",
      data: {
        // 서버에 보낼 데이터
        find_keywords: find_keywords[0],
        find_keywords2: find_keywords[1],
        select_language: select_Language,
        user_input: input_String,
        email: specificCookieValue,
      },
    })
      .done(function (serverResponse) {
        console.log("데이터 서버에 보내기 성공~");
        console.log("serverResponse : ", serverResponse); // 서버측에서 데이터 받기
        responseDB = serverResponse; // 전역 변수에 서버측 데이터 할당
        response_DB();
      })
      .fail(function (error) {
        console.error("데이터 서버에 못보냄ㅋ 오류 : ", error);
      });
  }
}

// SessionStorage 사용 위한 전역변수 설정
let codeData;
let retrievedData;

// editor값을 가져오기 위한 전역변수 설정
var editorHtml = null;
var editorCSS = null;
var editorJS = null;
let editorVal = null;

// DB에서 값가져오기
function response_DB() {
  // 전역 변수 값 확인해보기~
  // console.log(responseDB.EXAM_HTML);
  let examName = document.querySelector(".codeExam_examTitle > h2");
  let examDetail = document.querySelector(".codeExam_examDetail > span");
  responseVal = responseDB;
  let htmlTextarea = document.getElementById("editing_code_html");
  let cssTextarea = document.getElementById("editing_code_Css");
  let jsTextarea = document.getElementById("editing_code_Js");
  // textarea의 id가 editing_code_html임
  let codeTextarea = document.getElementById("editing_code_html");
  // index.html 요소 선택
  var main_searchLanguage2 = document.querySelector(".main_searchLanguage2");
  var main_selectLanguage2 =
    main_searchLanguage2.options[main_searchLanguage2.selectedIndex].value;

  // 왼쪽 문제 이름 / 문제 설명 창 내용 삽입
  examName.innerText = `${responseVal.EXAM_LANGUAGE}, ${responseVal.SEARCH_WORD}`;
  console.log(responseVal.EXAM_CONTENT);
  examDetail.innerText = `${responseVal.EXAM_CONTENT}`;
  if (
    (main_selectLanguage2 === "html") |
    (main_selectLanguage2 === "css") |
    (main_selectLanguage2 === "javascript")
  ) {
    // // Session에 데이터 저장
    // codeData = [responseVal.EXAM_HTML, responseVal.EXAM_CSS, responseVal.EXAM_JS]
    // sessionStorage.setItem('codeExam', JSON.stringify(codeData));
    // retrievedData = JSON.parse(sessionStorage.getItem('codeExam'));
    // console.log(retrievedData);
    // index.html에 내용 삽입
    htmlTextarea.innerText = responseVal.EXAM_HTML;
    cssTextarea.innerText = responseVal.EXAM_CSS;
    jsTextarea.innerText = responseVal.EXAM_JS;
    // code mirror
    // 에디터 설정
    // HTML
    editorHtml = CodeMirror.fromTextArea(htmlTextarea, {
      mode: "htmlmixed",
      theme: "dracula", //테마는 맘에드는 걸로.
      lineNumbers: true,
      lineWrapping: true, //줄바꿈. 음.. break-word;
    });
    console.log("codemirror 수정_HTML");
    editorHtml.setValue(responseVal.EXAM_HTML);
    editorHtml.save();
    // CSS
    editorCSS = CodeMirror.fromTextArea(cssTextarea, {
      mode: "css",
      theme: "dracula", //테마는 맘에드는 걸로.
      lineNumbers: true,
      lineWrapping: true, //줄바꿈. 음.. break-word;
    });
    console.log("codemirror 수정_CSS");
    editorCSS.setValue(responseVal.EXAM_CSS);
    editorCSS.save();
    // JS
    editorJS = CodeMirror.fromTextArea(jsTextarea, {
      mode: "javascript",
      theme: "dracula", //테마는 맘에드는 걸로.
      lineNumbers: true,
      lineWrapping: true, //줄바꿈. 음.. break-word;
    });
    console.log("codemirror 수정_JS");
    editorJS.setValue(responseVal.EXAM_JS);
    editorJS.save();
    updateIframeContent(main_selectLanguage2);
    editorValFront = [
      editorHtml.getDoc().getValue("\n"),
      editorCSS.getDoc().getValue("\n"),
      editorJS.getDoc().getValue("\n"),
    ];
  } else {
    // 다른 언어 내용 삽입
    if (main_selectLanguage2 === "java") {
      var editorJAVA = CodeMirror.fromTextArea(codeTextarea, {
        mode: "clike",
        theme: "dracula", //테마는 맘에드는 걸로.
        lineNumbers: true,
        lineWrapping: true, //줄바꿈. 음.. break-word;
      });
      console.log("codemirror 수정_JAVA");
      editorJAVA.setValue(responseVal.EXAM_JAVA);
      editorJAVA.save();
      editorVal = editorJAVA;
    } else if (main_selectLanguage2 === "python") {
      var editorPYTHON = CodeMirror.fromTextArea(codeTextarea, {
        mode: "python",
        theme: "dracula", //테마는 맘에드는 걸로.
        lineNumbers: true,
        lineWrapping: true, //줄바꿈. 음.. break-word;
      });
      console.log("codemirror 수정_PYTHON");
      editorPYTHON.setValue(responseVal.EXAM_PYTHON);
      editorPYTHON.save();
      editorVal = editorPYTHON;
    } else if (main_selectLanguage2 === "c_language") {
      var editorC = CodeMirror.fromTextArea(codeTextarea, {
        mode: "clike",
        theme: "dracula", //테마는 맘에드는 걸로.
        lineNumbers: true,
        lineWrapping: true, //줄바꿈. 음.. break-word;
      });
      console.log("codemirror 수정_C");
      editorC.setValue(responseVal.EXAM_C);
      editorC.save();
      editorVal = editorC;
    }
    updateIframeContent(main_selectLanguage2);
  }
}

// API에서 값 가져오기
function response_API() {
  // 전역 변수 값 확인해보기~
  // console.log(responseDB.EXAM_HTML);
  let examName = document.querySelector(".codeExam_examTitle > h2");
  let examDetail = document.querySelector(".codeExam_examDetail > span");
  responseVal = responseAPI[0];

  let htmlTextarea = document.getElementById("editing_code_html");
  let cssTextarea = document.getElementById("editing_code_Css");
  let jsTextarea = document.getElementById("editing_code_Js");
  // textarea의 id가 editing_code_html임
  let codeTextarea = document.getElementById("editing_code_html");
  // index.html 요소 선택
  var main_searchLanguage2 = document.querySelector(".main_searchLanguage2");
  var main_selectLanguage2 =
    main_searchLanguage2.options[main_searchLanguage2.selectedIndex].value;

  // 왼쪽 문제 이름 / 문제 설명 창 내용 삽입
  examName.innerText = `${responseVal.EXAM_LANGUAGE}, ${responseVal.SEARCH_WORD}`;
  console.log(responseVal.EXAM_CONTENT);
  examDetail.innerText = `${responseVal.EXAM_CONTENT}`;
  if (
    (main_selectLanguage2 === "html") |
    (main_selectLanguage2 === "css") |
    (main_selectLanguage2 === "javascript")
  ) {
    // Session에 데이터 저장
    codeData = [
      responseVal.EXAM_HTML,
      responseVal.EXAM_CSS,
      responseVal.EXAM_JS,
    ];
    sessionStorage.setItem("codeExam", JSON.stringify(codeData));
    retrievedData = JSON.parse(sessionStorage.getItem("codeExam"));
    console.log(retrievedData);
    // index.html에 내용 삽입
    htmlTextarea.innerText = responseVal.EXAM_HTML;
    cssTextarea.innerText = responseVal.EXAM_CSS;
    jsTextarea.innerText = responseVal.EXAM_JS;
    // code mirror
    // 에디터 설정
    // HTML
    editorHtml = CodeMirror.fromTextArea(htmlTextarea, {
      mode: "htmlmixed",
      theme: "dracula", //테마는 맘에드는 걸로.
      lineNumbers: true,
      lineWrapping: true, //줄바꿈. 음.. break-word;
    });
    console.log("codemirror 수정_HTML");
    editorHtml.setValue(responseVal.EXAM_HTML);
    editorHtml.save();
    // CSS
    editorCSS = CodeMirror.fromTextArea(cssTextarea, {
      mode: "css",
      theme: "dracula", //테마는 맘에드는 걸로.
      lineNumbers: true,
      lineWrapping: true, //줄바꿈. 음.. break-word;
    });
    console.log("codemirror 수정_CSS");
    editorCSS.setValue(responseVal.EXAM_CSS);
    editorCSS.save();
    // JS
    editorJS = CodeMirror.fromTextArea(jsTextarea, {
      mode: "javascript",
      theme: "dracula", //테마는 맘에드는 걸로.
      lineNumbers: true,
      lineWrapping: true, //줄바꿈. 음.. break-word;
    });
    console.log("codemirror 수정_JS");
    editorJS.setValue(responseVal.EXAM_JS);
    editorJS.save();
    updateIframeContent(main_selectLanguage2);
    editorValFront = [
      editorHtml.getDoc().getValue("\n"),
      editorCSS.getDoc().getValue("\n"),
      editorJS.getDoc().getValue("\n"),
    ];
  } else {
    // 다른 언어 내용 삽입
    if (main_selectLanguage2 === "java") {
      var editorJAVA = CodeMirror.fromTextArea(codeTextarea, {
        mode: "clike",
        theme: "dracula", //테마는 맘에드는 걸로.
        lineNumbers: true,
        lineWrapping: true, //줄바꿈. 음.. break-word;
      });
      console.log("codemirror 수정_JAVA");
      editorJAVA.setValue(responseVal.EXAM_JAVA);
      editorJAVA.save();
      editorVal = editorJAVA;
    } else if (main_selectLanguage2 === "python") {
      var editorPYTHON = CodeMirror.fromTextArea(codeTextarea, {
        mode: "python",
        theme: "dracula", //테마는 맘에드는 걸로.
        lineNumbers: true,
        lineWrapping: true, //줄바꿈. 음.. break-word;
      });
      console.log("codemirror 수정_PYTHON");
      editorPYTHON.setValue(responseVal.EXAM_PYTHON);
      editorPYTHON.save();
      editorVal = editorPYTHON;
    } else if (main_selectLanguage2 === "c_language") {
      var editorC = CodeMirror.fromTextArea(codeTextarea, {
        mode: "clike",
        theme: "dracula", //테마는 맘에드는 걸로.
        lineNumbers: true,
        lineWrapping: true, //줄바꿈. 음.. break-word;
      });
      console.log("codemirror 수정_C");
      editorC.setValue(responseVal.EXAM_C);
      editorC.save();
      editorVal = editorC;
    }
    updateIframeContent(main_selectLanguage2);
  }
}

// exam content reset
function resetExam() {
  let examName = document.querySelector(".codeExam_examTitle > h2");
  let examDetail = document.querySelector(".codeExam_examDetail > span");
  const codeExamBox = document.querySelector(".codeExam_boxesSize");
  codeExamBox.innerHTML = ` `;
  examName.innerText = "문제를 검색해주세요";
  examDetail.innerText = "문제를 검색해주세요";
}

// textarea의 수정된 내용을 start버튼을 클릭했을 때 새로 반영
function loadTextareaContentIntoIframe() {
  // const textAreaValue = document.getElementById('YOUR_TEXTAREA_ID').value;
  const iframe = document.getElementById("main_Nav_iframe");
  const iframeDocument =
    iframe.contentDocument || iframe.contentWindow.document;

  // index.html 요소 선택
  var main_searchLanguage2 = document.querySelector(".main_searchLanguage2");
  var main_selectLanguage2 =
    main_searchLanguage2.options[main_searchLanguage2.selectedIndex].value;
  if (
    (main_selectLanguage2 === "html") |
    (main_selectLanguage2 === "css") |
    (main_selectLanguage2 === "javascript")
  ) {
    let editorValFront = [
      editorHtml.getDoc().getValue("\n"),
      editorCSS.getDoc().getValue("\n"),
      editorJS.getDoc().getValue("\n"),
    ];
    console.log("editorValFront값 확인: ", editorValFront);
    // console.log('loadTextareaContentIntoIframe에서 Response_DB값 확인:', globalResponseDBValue)
    // iframeDocument.body.innerHTML = globalResponseDBValue[0];
    // 스타일과 내용을 포함한 HTML을 작성합니다.
    // iframe 변수 선언
    const iframeContentFront = `
        <html>
            <head>
                <style>
                ${editorValFront[1]}
                </style>
            </head>
            <body>
                <!-- 내용을 여기에 작성 -->
                ${editorValFront[0]}
                <script>
                ${editorValFront[2]}
                </script>
            </body>
        </html>
        `;
    // srcdoc 속성을 사용하여 iframe의 내용을 설정합니다.
    console.log("iframeContentFront", iframeContentFront);
    iframe.setAttribute("srcdoc", iframeContentFront);
  } else {
    let editorValGetDoc = editorVal.getDoc().getValue("\n");
    console.log("editorVal 값 확인 : ", editorValGetDoc);
    // [개선 필요]JSP로 구현(Tomcat, Apache 등 서버단에서 실행요함)
    // JSP 내용 해당 블로그 참조 https://ejfrmjava.tistory.com/14
    if (main_selectLanguage2 === "java") {
      const iframeContentJava = `
            <%-- 지시 태그  --%>
            <%@page import="java.util.ArrayList"%>
            <%@ page language="java" contentType="text/html; charset=UTF-8"
                pageEncoding="UTF-8"%>
            <html>
                <title>NDBSWEBTEST</title>                
                <head>
                    <style>
                    </style>
                </head>
                <body>
                    <!-- 내용을 여기에 작성 -->
                    <h1>JAVA 코드 실행</h1>
                    <%${editorValGetDoc}%>
                    <script>
                    </script>
                </body>
            </html>
            `;
      console.log("iframeContentJava", iframeContentJava);
      iframe.setAttribute("srcdoc", iframeContentJava);
    } else if (main_selectLanguage2 === "python") {
      const iframeContentPython = `
            <html>
                <head>
                <link rel="stylesheet" href="https://pyscript.net/alpha/pyscript.css" />
                <script defer src="https://pyscript.net/alpha/pyscript.js"></script>
                <py-env>
                  - numpy
                  - matplotlib
                </py-env>
                    <style>
                    body{
                        margin:0;
                        bos-sizing:borderbox;
                    }
                    </style>
                </head>
                <body>
                    <!-- 내용을 여기에 작성 -->
                    <py-script>
                    ${editorValGetDoc}
                    </py-script>
                    <script>
                    </script>
                </body>
            </html>
            `;
      console.log("iframeContentPython", iframeContentPython);
      iframe.setAttribute("srcdoc", iframeContentPython);
    } else if (main_selectLanguage2 === "c_language") {
      const iframeContentC = `
            <html>
                <head>
                </head>
                <body>
                    <!-- 내용을 여기에 작성 -->
                    ${editorValGetDoc}
                    <script>
                    </script>
                </body>
            </html>
            `;
      console.log("iframeContentFront", iframeContentC);
      iframe.setAttribute("srcdoc", iframeContentC);
    }
  }
}

function select() {
  let languageElement = document.querySelector(".main_searchLanguage");
  let language = languageElement.options[languageElement.selectedIndex].value; // select 태그 사용자 선택 value값 가져오기
  let languageElement2 = document.querySelector(".main_searchLanguage2");
  let language2 =
    languageElement2.options[languageElement2.selectedIndex].value;
  console.log("상단 검색바 사용자선택 언어 : ", language);
  console.log("메인 검색바 사용자선택 언어 : ", language2);
  if (language == " ") {
    if (language2 == "html") {
      front();
    } else if (language2 == "css") {
      front();
    } else if (language2 == "javascript") {
      front();
    } else if (language2 == "java") {
      java();
    } else if (language2 == "python") {
      python();
    } else if (language2 == "c_language") {
      C_programing();
    }
  }
  if (language2 == " ") {
    if (language == "html") {
      front();
    } else if (language == "css") {
      front();
    } else if (language == "javascript") {
      front();
    } else if (language == "java") {
      java();
    } else if (language == "python") {
      python();
    } else if (language == "c_language") {
      C_programing();
    }
  }
}
// 548~ 끝까지 api응답 코드
function front() {   // select option이 html,css,js일때 api html,css,js코드 응답함수
    const api_key = "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"
    let keywords = document.getElementsByClassName('main_searchBar')[0]
    let user_input = keywords.value;
    let keywords2 = document.getElementsByClassName('main_searchBar2')[0]
    let user_input2 = keywords2.value

  console.log("상단 바 사용자 입력 :", user_input);
  console.log("메인 검색바 사용자 입력 :", user_input2);

  let languageElement = document.querySelector(".main_searchLanguage");
  let language = languageElement.options[languageElement.selectedIndex].value; // select 태그 사용자 선택 value값 가져오기
  let languageElement2 = document.querySelector(".main_searchLanguage2");
  let language2 =
    languageElement2.options[languageElement2.selectedIndex].value;
  console.log("상단 바 사용자 선택언어:", language);
  console.log("메임검색바 사용자 선택언어:", language2);

  let specificCookieValue = getCookie("user-email");
  console.log("Specific Cookie Value:", specificCookieValue);
  $("#loading").show();

  let select_Language = "";
  let input_String = "";
  // 상단바 사용자 입력창
  if (user_input.trim() !== "") {
    select_Language = language;
    input_String = user_input;
  }

  // 메인 페이지 사용자 입력창
  if (user_input2.trim() !== "") {
    select_Language = language2;
    input_String = user_input2;
  }

  const messages = [
    //명령 프롬프트
    { role: "system", content: "You are a helpful assistant." },
    {
      role: "user",
      content:
        "GPT, HTML, CSS, JS 언어로 " +
        select_Language +
        input_String +
        "에 대해서 HTML ,CSS,JS 코드와 함께 제시해주세요. 제일먼제 문제를 제시해주세요. 주석은 한글로 작성해주세요",
    },
    {
      role: "assistant",
      content:
        '"""HTML Code:""" 여기에 HTML 코드를 작성해주세요. 없다면 실습 문제에서 제시한 답안 HTML코드를 작성해주세요"""End HTML Code"""',
    },
    {
      role: "assistant",
      content:
        '"""CSS Code:""" 여기에 CSS 코드를 작성해주세요. 없다면 실습 문제에서 제시한 답안 CSS코드를 작성해주세요"""End CSS Code"""',
    },
    {
      role: "assistant",
      content:
        '"""JS Code:""" 여기에 JS 코드를 작성해주세요. 없다면 실습 문제에서 제시한 답안 JS코드를 작성해주세요"""End JS Code"""',
    },
    {
      role: "assistant",
      content:
        '"""text:""" 여기에 제시한 코드들에 대한 설명을 작성해주세요. """End text Code"""',
    },
  ];

  const data = {
    //데이터 구조
    model: "gpt-3.5-turbo",
    temperature: 0.5,
    n: 1,
    messages: messages,
  };

  $.ajax({
    url: "https://api.openai.com/v1/chat/completions",
    method: "POST",
    headers: {
      Authorization: "Bearer " + api_key,
      "Content-Type": "application/json",
    }, // HTTP 통신
    data: JSON.stringify(data), // 사용자 입력을 json형태로 변환해서 api에게 요청
  }).then(function (response) {
    //콜백함수, api 응답
    $("#loading").hide();
    console.log(response);
    const responseText = response.choices[0].message.content;
    const splitResponse = responseText.split(
      /(```|"""HTML Code:|"""CSS Code:|"""JS Code:|"""text:)/
    );

    console.log(splitResponse);
    let htmlCode = ""; //html코드가 들어갈 변수
    let cssCode = ""; //css코드가 들어갈 변수
    let jsCode = ""; //js코드가 들어갈 변수
    let apitext = ""; //api 설명이 들어갈 변수
    let currentCode = ""; //현재 작업중인 코드가 들어갈 변수

    for (let i = 0; i < splitResponse.length; i++) {
      // 응답 데이터 가공
      if (splitResponse[i].trim().startsWith("html")) {
        currentCode = "HTML"; // 현재 작업중인 코드유형 저장장
        htmlCode = splitResponse[i].replace("html", "").trim();
      } else if (splitResponse[i].trim().startsWith("css")) {
        currentCode = "CSS";
        cssCode = splitResponse[i].replace("css", "").trim();
      } else if (splitResponse[i].trim().startsWith("javascript")) {
        currentCode = "JS";
        jsCode = splitResponse[i].replace("javascript", "").trim();
      } else if (splitResponse[i].trim().startsWith("")) {
        currentCode = "text";
        apitext = splitResponse[i].replace("text", "").trim();
      } else {
        switch (currentCode) {
          case "HTML":
            htmlCode += splitResponse[i].trim();
            break;
          case "CSS":
            cssCode += splitResponse[i].trim();
            break;
          case "JS":
            jsCode += splitResponse[i].trim();
            break;
          case "text":
            apitext += splitResponse[i].trim();
        }
      }
    }
    let f_text = splitResponse[0];
    console.log(splitResponse);
    console.log(f_text);
    console.log(htmlCode);

    let result = document.getElementsByClassName("main_searchWrap");
    let pre = document.createElement("pre");

    pre.innerText =
      f_text +
      "\n\n" +
      htmlCode +
      "\n\n" +
      cssCode +
      "\n\n" +
      jsCode +
      "\n\n" +
      apitext;

    console.log(pre);

    $.ajax({
      url: "/index/frontinput", // Update this to the URL of your server endpoint
      method: "POST",
      data: {
        f_text: f_text,
        apitext: apitext,
        htmlCode: htmlCode,
        cssCode: cssCode,
        jsCode: jsCode,
        user_input: input_String,
        select_language: select_Language,
        email: specificCookieValue,
      },
    })
      .done(function (serverResponse) {
        console.log("데이터 서버에 보내기 성공~");
        responseAPI = serverResponse;
        console.log(responseAPI);
        console.log(responseAPI[0].EXAM_CONTENT);
        response_API();
      })
      .fail(function (error) {
        console.error("데이터 서버에 못보냄ㅋ 오류 : ", error);
      });

    // result.appendChild(pre)

    document.getElementsByClassName("main_searchbar").value = ""; //검색창 비우기
  });
}

function java() {
    // select option이 java일때 api java 응답함수
    // api key
    const api_key = "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"; // api key 값
    let keywords = document.getElementsByClassName("main_searchBar")[0];
    let user_input = keywords.value;
    let keywords2 = document.getElementsByClassName("main_searchBar2")[0];
    let user_input2 = keywords2.value;

  console.log("상단 바 사용자 입력 :", user_input);
  console.log("메인 검색바 사용자 입력 :", user_input2);

  let languageElement = document.querySelector(".main_searchLanguage");
  let language = languageElement.options[languageElement.selectedIndex].value; // select 태그 사용자 선택 value값 가져오기
  let languageElement2 = document.querySelector(".main_searchLanguage2");
  let language2 =
    languageElement2.options[languageElement2.selectedIndex].value;
  console.log("상단 바 사용자 선택언어 : ", language);
  console.log("메인 검색바 사용자 선택언어 : ", language2);

  let specificCookieValue = getCookie("user-email");
  console.log("Specific Cookie Value:", specificCookieValue);

  $("#loading").show();

  let select_Language = "";
  let input_String = "";
  // 상단바 사용자 입력창
  if (user_input.trim() !== "") {
    select_Language = language;
    input_String = user_input;
  }

  // 메인 페이지 사용자 입력창
  if (user_input2.trim() !== "") {
    select_Language = language2;
    input_String = user_input2;
  }

  const messages = [
    // 명령 프롬프트
    { role: "system", content: "You are a helpful assistant." },
    {
      role: "user",
      content:
        "GPT," +
        select_Language +
        " 언어로 " +
        input_String +
        "에 대하여" +
        select_Language +
        " 코드와 함께 제시해주세요. 제일먼제 실습문제를 제시해주세요. 주석은 한글로 작성해주세요",
    },
    {
      role: "assistant",
      content:
        '"""java Code:""" 여기에 java코드를 작성해주세요. 없다면 실습 문제에서 제시한 답안 java코드를 작성해주세요"""End java Code"""',
    },
  ];

  const data = {
    // 데이터 구조
    model: "gpt-3.5-turbo",
    temperature: 0.5,
    n: 1,
    messages: messages,
  };

  $.ajax({
    url: "https://api.openai.com/v1/chat/completions",
    method: "POST",
    headers: {
      Authorization: "Bearer " + api_key,
      "Content-Type": "application/json",
    }, // HTTP통신
    data: JSON.stringify(data), // 사용자 입력을 json형태로 변환해서 api에게 요청
  }).then(function (response) {
    //콜백함수, api 응답
    $("#loading").hide();
    console.log(response);
    const responseText = response.choices[0].message.content;
    const splitResponse = responseText.split(/(```|"""java Code:)/);

    console.log(splitResponse);
    let javaCode = ""; //java코드가 들어갈 변수
    let apitext = ""; //api 설명이 들어갈 변수
    let currentCode = ""; //현재 작업중인 코드가 들어갈 변수

    for (let i = 0; i < splitResponse.length; i++) {
      // 응답 데이터 가공
      if (splitResponse[i].trim().startsWith("java")) {
        currentCode = "JAVA"; // 현재 작업중인 코드유형 저장장
        javaCode = splitResponse[i].replace("java", "").trim();
      } else if (splitResponse[i].trim().startsWith("")) {
        currentCode = "text";
        apitext = splitResponse[i].replace("text", "").trim();
      } else {
        switch (currentCode) {
          case "JAVA":
            javaCode += splitResponse[i].trim();
            break;
          case "text":
            apitext += splitResponse[i].trim();
        }
      }
    }
    let f_text = splitResponse[0];
    console.log(splitResponse);
    console.log(f_text);
    console.log(javaCode);
    console.log(apitext);

    let result = document.getElementsByClassName("main_searchWrap");
    let pre = document.createElement("pre");

    pre.innerText = f_text + "\n\n" + javaCode + "\n\n" + apitext;

    console.log(pre);
    //result.appendChild(pre)
    $.ajax({
      url: "/index/java_input", // Update this to the URL of your server endpoint
      method: "POST",
      data: {
        // 서버에 데이터 전송
        f_text: f_text,
        apitext: apitext,
        javaCode: javaCode,
        user_input: input_String,
        select_language: select_Language,
        email: specificCookieValue,
      },
    })
      .done(function (serverResponse) {
        console.log("데이터 서버에 보내기 성공~");
        responseAPI = serverResponse;
        console.log(responseAPI);
        console.log(responseAPI[0].EXAM_JAVA);
        response_API();
      })
      .fail(function (error) {
        console.error("데이터 서버에 못보냄ㅋ 오류 : ", error);
      });

    document.getElementsByClassName("main_searchbar").value = ""; //검색창 비우기
  });
}

function python() {
    // select option이 python일때 api python 응답함수
    // api key
    const api_key = "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"; // api key 값
    let keywords = document.getElementsByClassName("main_searchBar")[0];
    let user_input = keywords.value;
    let keywords2 = document.getElementsByClassName("main_searchBar2")[0];
    let user_input2 = keywords2.value;

  console.log("상단 바 사용자 입력 :", user_input);
  console.log("메인 검색바 사용자 입력 :", user_input2);

  let languageElement = document.querySelector(".main_searchLanguage");
  let language = languageElement.options[languageElement.selectedIndex].value; // select 태그 사용자 선택 value값 가져오기
  let languageElement2 = document.querySelector(".main_searchLanguage2");
  let language2 =
    languageElement2.options[languageElement2.selectedIndex].value;
  console.log("상단 바 사용자 선택언어 : ", language);
  console.log("메인 검색바 사용자 선택언어 : ", language2);
  let specificCookieValue = getCookie("user-email");
  console.log("Specific Cookie Value:", specificCookieValue);

  $("#loading").show();

  let select_Language = "";
  let input_String = "";
  // 상단바 사용자 입력창
  if (user_input.trim() !== "") {
    select_Language = language;
    input_String = user_input;
  }

  // 메인 페이지 사용자 입력창
  if (user_input2.trim() !== "") {
    select_Language = language2;
    input_String = user_input2;
  }

  const messages = [
    // 명령 프롬프트
    { role: "system", content: "You are a helpful assistant." },
    {
      role: "user",
      content:
        "GPT," +
        select_Language +
        " 언어로 " +
        input_String +
        "에 대하여" +
        select_Language +
        "코드와 함께 제시해주세요. 제일먼제 실습문제를 제시해주세요. 주석은 한글로 작성해주세요",
    },
    {
      role: "assistant",
      content:
        '"""python Code:""" 여기에 python코드를 작성해주세요. 없다면 실습 문제에서 제시한 답안 python코드를 작성해주세요"""End python Code"""',
    },
  ];

  const data = {
    // 데이터 구조
    model: "gpt-3.5-turbo",
    temperature: 0.5,
    n: 1,
    messages: messages,
  };

  $.ajax({
    url: "https://api.openai.com/v1/chat/completions",
    method: "POST",
    headers: {
      Authorization: "Bearer " + api_key,
      "Content-Type": "application/json",
    }, // HTTP 통신
    data: JSON.stringify(data),
  }).then(function (response) {
    //콜백함수, api 응답
    $("#loading").hide();
    console.log(response);
    const responseText = response.choices[0].message.content;
    const splitResponse = responseText.split(/(```|"""python Code:)/); // 첫번째 응답 데이터 가공, split()

    console.log(splitResponse);
    let pythonCode = ""; // python코드가 들어갈 변수
    let apitext = ""; // api 설명이 들어갈 변수
    let currentCode = ""; // 현재 작업중인 코드가 들어갈 변수

    for (let i = 0; i < splitResponse.length; i++) {
      if (splitResponse[i].trim().startsWith("python")) {
        currentCode = "PYTHON"; // 현재 작업중인 코드유형 저장장
        pythonCode = splitResponse[i].replace("python", "").trim();
      } else if (splitResponse[i].trim().startsWith("")) {
        currentCode = "text";
        apitext = splitResponse[i].replace("text", "").trim();
      } else {
        switch (currentCode) {
          case "PYTHON":
            pythonCode += splitResponse[i].trim();
            break;
          case "text":
            apitext += splitResponse[i].trim();
        }
      }
    } // 응답 데이터 가공 단계

    let f_text = splitResponse[0];
    console.log(splitResponse);
    console.log(pythonCode);
    console.log(apitext);
    console.log(f_text);
    let result = document.getElementsByClassName("main_searchWrap");
    let pre = document.createElement("pre");

    pre.innerText = f_text + "\n\n" + pythonCode + "\n\n" + apitext;

    console.log(pre);
    //result.appendChild(pre)
    $.ajax({
      url: "/index/python_input", // Update this to the URL of your server endpoint
      method: "POST",
      data: {
        // 서버에 데이터 전송
        f_text: f_text,
        apitext: apitext,
        pythonCode: pythonCode,
        user_input: input_String,
        select_language: select_Language,
        email: specificCookieValue,
      },
    })
      .done(function (serverResponse) {
        console.log("데이터 서버에 보내기 성공~");
        responseAPI = serverResponse;
        console.log(responseAPI[0]);
        response_API();
      })
      .fail(function (error) {
        console.error("데이터 서버에 못보냄ㅋ 오류 : ", error);
      });

    document.getElementsByClassName("main_searchbar").value = "";
  });
}

function C_programing() {
    // select option이 python일때 api python 응답함수
    // api Key
    const api_key = "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"; // api key 값
    let keywords = document.getElementsByClassName("main_searchBar")[0];
    let user_input = keywords.value;
    let keywords2 = document.getElementsByClassName("main_searchBar2")[0];
    let user_input2 = keywords2.value;

  console.log("상단 바 사용자 입력 :", user_input);
  console.log("메인 검색바 사용자 입력 :", user_input2);

  let languageElement = document.querySelector(".main_searchLanguage");
  let language = languageElement.options[languageElement.selectedIndex].value; // select 태그 사용자 선택 value값 가져오기
  let languageElement2 = document.querySelector(".main_searchLanguage2");
  let language2 =
    languageElement2.options[languageElement2.selectedIndex].value;
  console.log("상단 바 사용자 선택언어 : ", language);
  console.log("메인 검색바 사용자 선택언어 : ", language2);
  let specificCookieValue = getCookie("user-email");
  console.log("Specific Cookie Value:", specificCookieValue);

  $("#loading").show();

  let select_Language = "";
  let input_String = "";
  // 상단바 사용자 입력창
  if (user_input.trim() !== "") {
    select_Language = language;
    input_String = user_input;
  }

  // 메인 페이지 사용자 입력창
  if (user_input2.trim() !== "") {
    select_Language = language2;
    input_String = user_input2;
  }

  const messages = [
    // 명령 프롬프트
    { role: "system", content: "You are a helpful assistant." },
    {
      role: "user",
      content:
        "GPT," +
        select_Language +
        "로" +
        input_String +
        "에 대하여 예시문제나 실습문제를" +
        select_Language +
        "코드와 함께 제시해주세요. 제일먼제 실습문제를 제시해주세요. 주석은 한글로 작성해주세요",
    },
    {
      role: "assistant",
      content:
        '"""c Code:""" 여기에 C언어코드를 작성해주세요. 없다면 실습 문제에서 제시한 답안 C언어코드를 작성해주세요"""End c Code"""',
    },
  ];

  const data = {
    // 데이터 구조
    model: "gpt-3.5-turbo",
    temperature: 0.5,
    n: 1,
    messages: messages,
  };

  $.ajax({
    url: "https://api.openai.com/v1/chat/completions",
    method: "POST",
    headers: {
      Authorization: "Bearer " + api_key,
      "Content-Type": "application/json",
    }, // HTTP 통신
    data: JSON.stringify(data),
  }).then(function (response) {
    //콜백함수, api 응답
    $("#loading").hide();
    console.log(response);
    const responseText = response.choices[0].message.content;
    const splitResponse = responseText.split(/(```|"""c Code:)/); // 첫번째 응답 데이터 가공, split()

    console.log(splitResponse);
    let c_Code = ""; // c언어코드가 들어갈 변수
    let apitext = ""; // api 설명이 들어갈 변수
    let currentCode = ""; // 현재 작업중인 코드가 들어갈 변수

    for (let i = 0; i < splitResponse.length; i++) {
      if (splitResponse[i].trim().startsWith("c")) {
        currentCode = "C"; // 현재 작업중인 코드유형 저장장
        c_Code = splitResponse[i].replace("c", "").trim();
      } else if (splitResponse[i].trim().startsWith("")) {
        currentCode = "text";
        apitext = splitResponse[i].replace("text", "").trim();
      } else {
        switch (currentCode) {
          case "C":
            c_Code += splitResponse[i].trim();
            break;
          case "text":
            apitext += splitResponse[i].trim();
        }
      }
    } // 응답 데이터 가공 단계
    let f_text = splitResponse[0];
    console.log(splitResponse);
    console.log(c_Code);
    console.log(apitext);
    console.log(f_text);

    let result = document.getElementsByClassName("main_searchWrap");
    let pre = document.createElement("pre");

    pre.innerText = f_text + "\n\n" + c_Code + "\n\n" + apitext;

    console.log(pre);
    //result.appendChild(pre)
    $.ajax({
      url: "/index/c_input", // Update this to the URL of your server endpoint
      method: "POST",
      data: {
        // 서버에 데이터 전송
        f_text: f_text,
        apitext: apitext,
        c_Code: c_Code,
        user_input: input_String,
        select_language: select_Language,
        email: specificCookieValue,
      },
    })
      .done(function (serverResponse) {
        console.log("데이터 서버에 보내기 성공~");
        responseAPI = serverResponse;
        console.log(responseAPI[0]);
        response_API();
      })
      .fail(function (error) {
        console.error("데이터 서버에 못보냄ㅋ 오류 : ", error);
      });
    document.getElementsByClassName("main_searchbar").value = "";
  });
}
