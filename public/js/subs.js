document.addEventListener("DOMContentLoaded", function () {
  fetch("/config")
    .then((response) => response.json())
    .then((config) => {
      const baseUrl = config.BASE_URL;

      // 결제 요청 함수
      function requestPay() {
        IMP.init("iamport");
        IMP.request_pay(
          {
            pg: "inicis",
            pay_method: "card",
            merchant_uid: "merchant_" + new Date().getTime(),
            name: "결제테스트",
            amount: 5000,
            buyer_email: "iamport@siot.do",
            buyer_name: "김도형",
            buyer_tel: "010-1234-5678",
            buyer_addr: "광주인공지능사관학교NSDB",
            buyer_postcode: "123-456",
          },
          function (rsp) {
            if (rsp.success) {
              var msg = "결제가 완료되었습니다.";
              alert(msg);
              location.href = `${baseUrl}/index`;
            } else {
              var msg = "결제에 실패하였습니다.";
              msg += "에러내용 : " + rsp.error_msg;
              alert(msg);
            }
          }
        );
      }

      // PRO 요금제 결제 요청 함수
      function requestPay1() {
        IMP.init("iamport");
        IMP.request_pay(
          {
            pg: "inicis",
            pay_method: "card",
            merchant_uid: "merchant_" + new Date().getTime(),
            name: "결제테스트",
            amount: 7000,
            buyer_email: "iamport@siot.do",
            buyer_name: "김도형",
            buyer_tel: "010-1234-5678",
            buyer_addr: "광주인공지능사관학교NSDB",
            buyer_postcode: "123-456",
          },
          function (rsp) {
            if (rsp.success) {
              var msg = "결제가 완료되었습니다.";
              alert(msg);
              location.href = `${baseUrl}/index`;
            } else {
              var msg = "결제에 실패하였습니다.";
              msg += "에러내용 : " + rsp.error_msg;
              alert(msg);
            }
          }
        );
      }

      $(document).ready(function () {
        // 열기 버튼을 클릭하면 모달 창을 보이게 하도록 이벤트 핸들러 추가
        $(".subs_btn_open").click(function () {
          $(".subs_modal, .overlay").addClass("active");
        });

        $("#subscribe-link2").click(function (event) {
          event.preventDefault(); // 버튼의 기본 동작을 중단
          requestPay();
        });

        $("#subscribe-link3").click(function (event) {
          event.preventDefault(); // 버튼의 기본 동작을 중단
          requestPay1();
        });

        $(".subs_modal").click(function (event) {
          event.stopPropagation(); // 이벤트 버블링 방지
        });

        // 닫기 버튼을 클릭하면 모달 창이 닫히도록 이벤트 핸들러 추가
        $(".subs_button_close, .overlay").click(function () {
          $(".subs_modal, .overlay").removeClass("active");
        });

        // 무료 구독창 클릭 시 완료 문구 및 마이페이지로 이동
        $("#subscribe-link").click(function (event) {
          event.preventDefault();
          alert("구독이 완료되었습니다! Basic 회원이 되신 걸 축하드립니다!");
          window.location.href = `${baseUrl}/mypage`;
        });

        $("#mypage_btn_open").click(function () {
          window.location.href = `${baseUrl}/mypage`;
        });

        $("#btn-pay").click(function () {
          requestPay();
        });
      });

      window.addEventListener("DOMContentLoaded", (event) => {
        // 현재 페이지의 경로를 가져옵니다.
        const currentPath = window.location.pathname;

        // '/mypage/index' 경로에서만 스크롤 이동하도록 처리합니다.
        if (currentPath === "/mypage/index") {
          const element = document.querySelector(".codeExam_container");
          if (element) {
            element.scrollIntoView();
          }
          // 여기서 서버와 통신하여 데이터베이스 정보를 가져옵니다.
          const response = fetch("");
          const data = response.text(); // JSON이 아닌 텍스트로 데이터를 받습니다.

          // 가져온 데이터를 문제 이름과 설명 요소에 적용합니다.
          const nameElement = document.getElementById("mp_reviewName");
          const descriptionElement = document.getElementById("mp_reviewanswer");

          if (nameElement && descriptionElement) {
            // 가져온 데이터를 해당 요소에 직접 삽입합니다.
            nameElement.textContent = data.split("\n")[0]; // 첫 줄을 문제 이름으로 가정합니다.
            descriptionElement.textContent = data
              .split("\n")
              .slice(1)
              .join("\n"); // 나머지를 설명으로 가정합니다.
          }
        }
      });
    });
});
