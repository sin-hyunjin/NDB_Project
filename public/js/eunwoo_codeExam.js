retrievedData = JSON.parse(sessionStorage.getItem('codeExam'));
console.log(retrievedData); // "HelloWorld"
console.log("codeExam.js 실행")

document.addEventListener("DOMContentLoaded", function () {
    let codeExam_body = document.getElementById("codeExam_body");
    let codeExam_css = document.getElementById("codeExam_css");
    let codeExam_js = document.getElementById("codeExam_js");
    if (retrievedData && retrievedData.length > 0) {
        codeExam_body.innerHTML = retrievedData[0];
        codeExam_css.innerHTML = retrievedData[1];
        const scriptContent = retrievedData[2];
        // 스크립트 생성 및 실행
        const blob = new Blob([scriptContent], { type: 'text/javascript' });
        const scriptURL = URL.createObjectURL(blob);

        const scriptTag = document.createElement('script');
        scriptTag.src = scriptURL;
        document.body.appendChild(scriptTag);
    }
})