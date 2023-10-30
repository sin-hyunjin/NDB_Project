document.addEventListener("DOMContentLoaded", function () {
  // 검색시 페이지 새로고침 현상 막기
  function handleSubmit(event) {
    event.preventDefault();
    value = "";
  }
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
  function onKeyUp(event) {
    if (event.key === "Enter") {
      goToScroll();
      console.log("전송");
    }
  }
  function goToScroll() {
    let location = document.querySelector(".codeExam_code_wrap").offsetTop;
    window.scrollTo({ top: location - 50, behavior: "smooth" });
  }

  main_searchBar.addEventListener("keyup", onKeyUp);
  main_searchBar.addEventListener("keyup", handleSubmit);
  main_searchBar.addEventListener("submit", handleSubmit);
  document
    .querySelector(".main_search_button")
    .addEventListener("click", goToScroll);
  // 스크롤 자동

  // 정답가리기 기능
  const box = document.querySelector(".codeExam_boxesHide");

  box.addEventListener("dragstart", (e) => {
    e.preventDefault();
  });

  let offsetX,
    offsetY,
    isDragging = false;

  box.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.pageX - box.getBoundingClientRect().left; // 클릭한 위치와 요소의 왼쪽 간의 거리
    // offsetY = e.clientY - box.getBoundingClientRect().top;
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      box.style.left = e.pageX - offsetX + "px"; // 마우스 위치에서 거리를 빼서 요소의 왼쪽 위치를 설정
      // box.style.top = e.clientY - offsetY - 32 + 'px';
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
  // 정답 가리기 기능 끝
});

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

function front() {
  // select option이 html,css,js일때 api html,css,js코드 응답함수
  const api_key = "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";
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
  console.log("상단 바 사용자 선택언어:", language);
  console.log("메임검색바 사용자 선택언어:", language2);

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
      },
    })
      .done(function (serverResponse) {
        console.log("데이터 서버에 보내기 성공~");
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
      },
    })
      .done(function (serverResponse) {
        console.log("데이터 서버에 보내기 성공~");
      })
      .fail(function (error) {
        console.error("데이터 서버에 못보냄ㅋ 오류 : ", error);
      });

    document.getElementsByClassName("main_searchbar").value = ""; //검색창 비우기
  });
}

function python() {
  // select option이 python일때 api python 응답함수
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
      },
    })
      .done(function (serverResponse) {
        console.log("데이터 서버에 보내기 성공~");
      })
      .fail(function (error) {
        console.error("데이터 서버에 못보냄ㅋ 오류 : ", error);
      });

    document.getElementsByClassName("main_searchbar").value = "";
  });
}

function C_programing() {
  // select option이 python일때 api python 응답함수
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
      },
    })
      .done(function (serverResponse) {
        console.log("데이터 서버에 보내기 성공~");
      })
      .fail(function (error) {
        console.error("데이터 서버에 못보냄ㅋ 오류 : ", error);
      });
    document.getElementsByClassName("main_searchbar").value = "";
  });
}
