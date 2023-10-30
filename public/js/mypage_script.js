$(document).ready(function(){

    // const btn = document.getElementById('modalBtn');
    // const modal = document.getElementById('modalWrap');
    // const closeBtn = document.getElementById('closeBtn');
    $("#modalBtn").click(function(){
      $("#modalWrap").fadeIn()
    })
    $("#closeBtn").click(function(){
      $("#modalWrap").fadeOut()
    })
    // $(documen).click(function(event){
    //   if($(event.target).is('#modalBody')){
    //     $("#modalWrap").fadeOut();
    //   }
    })
    // btn.onclick = function() {
    //   modal.style.display = 'block';
    //   console.log('modalBtn')
    // }
    // closeBtn.onclick = function() {
    //   modal.style.display = 'none';
    // }
    
    // window.onclick = function(event) {
    //   if (event.target == modal) {
    //     modal.style.display = "none";
    //   }
    // }
  

    $(document).ready(function(){
  
      $('ul.mp_tabs li').click(function(){
        var tab_id = $(this).attr('data-tab');
    
        $('ul.mp_tabs li').removeClass('mp_current');
        $('.mp_tab-content').removeClass('mp_current');
    
        $(this).addClass('mp_current');
        $("#"+tab_id).addClass('mp_current');
      });
    })

    window.onload = () => {
      // 비밀번호 변경버튼을 누르면 데이터베이스의 번호도 변경
      document.getElementById("mp_nameCh").addEventListener("click", () => {
          // '변경되었습니다!'라는 알림을 표시,
          alert("변경되었습니다!");
      });
      // 회원탈퇴버튼을 누르면 데이터베이스에 저장되어있던 로그인 기록 삭제
      document.getElementById("mp_secessionButton").addEventListener("click", () => {
        // '변경되었습니다!'라는 알림을 표시합니다.
        alert("탈퇴했습니다!");
    });
  }
   // 열기 버튼을 클릭하면 모달 창을 보이게 하도록 이벤트 핸들러 추가
   $('.subs_btn_open').click(function () {
    $('.subs_modal, .overlay').addClass("active");
});

// 닫기 버튼을 클릭하면 모달 창이 닫히도록 이벤트 핸들러 추가
$('.subs_button_close, .overlay').click(function () {
    $('.subs_modal, .overlay').removeClass("active");
});

//무료 구독창 클리 시 완료 문구 및 마이페이지로 이동 
document.getElementById("subscribe-link").addEventListener("click", function (event) {
    event.preventDefault(); // 링크의 기본 동작 중단
    alert("구독이 완료되었습니다! Basic 회원이 되신 걸 축하드립니다!"); // 알림창 표시
    window.location.href = "http://localhost:3003/mypage"; // 주소로 이동
});

document.getElementById("mypage_btn_open").addEventListener("click", function (event) {
  window.location.href = "http://localhost:3003/mypage"; // 주소로 이동
});