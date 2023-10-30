const joinButton = document.getElementById("joinButton");
const joinForm = document.querySelector(".join_form");
const modal = document.getElementById("modal");
const close = document.getElementById("close");

joinButton.addEventListener("click", () => {
  if (joinForm.checkValidity()) {
    modal.style.display = "block";
  } else {
    alert("모든 필드를 입력하세요.");
  }
});

close.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
