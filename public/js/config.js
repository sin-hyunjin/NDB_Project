// 환경변수를 가져와서 사용하는 코드
fetch("/config")
  .then((response) => response.json())
  .then((config) => {
    const baseUrl = config.BASE_URL;
    const gptKey = config.GPT_KEY;

    // 링크에 환경변수를 사용
    const myPageLink = document.getElementById("subscribe-link");
    if (myPageLink) {
      myPageLink.href = `${baseUrl}/mypage`;
    }

    const myPageLinkSe = document.getElementById("mypage_btn_open");
    if (myPageLinkSe) {
      myPageLinkSe.href = `${baseUrl}/mypage`;
    }
    const mainPageLink = document.getElementById("main-page");
    if (mainPageLink) {
      mainPageLink.href = `${baseUrl}/index`;
    }

    const loginPageLink = document.getElementById("login-page");
    if (loginPageLink) {
      loginPageLink.href = `${baseUrl}/login`;
    }

    // CSS 변수에 환경변수 값 적용 (예: 색상으로 사용)
    document.documentElement.style.setProperty("--base-url", baseUrl);
  })
  .catch((error) => console.error("환경변수 가져오기 오류:", error));
