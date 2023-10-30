document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const emailInput = document.getElementById("email");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const userEmail = emailInput.value;

    // 서버로 이메일 값을 전송
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: userEmail }),
    })
      .then((response) => response.json())
      .then((data) => {
        // 서버에서 반환한 응답 처리
        if (data.success) {
          // 로그인 성공 시 필요한 작업 수행
          window.location.href = "/index"; // 페이지 리디렉션
        } else {
          // 로그인 실패 시 처리
          alert("로그인 실패. 이메일 또는 비밀번호가 잘못되었습니다.");
        }
      });
  });
});
