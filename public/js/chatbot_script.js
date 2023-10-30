function openChat() {
    document.getElementById('chat-body').style.display = 'block';
    document.getElementById('chat-input').style.display = 'flex';
    document.getElementById('back-button').style.display = 'block';
    document.getElementById('button-container').style.display = 'none';
}


// 별점
function openReview() {
    document.getElementById('myform').style.display = 'block';
    document.getElementById('chat-body').style.display = 'none';
    document.getElementById('chat-input').style.display = 'none';
    document.getElementById('back-button').style.display = 'block';
    document.getElementById('button-container').style.display = 'none';
}
// 뒤로가기 기능
function back() {
    const chatBody = document.getElementById("chat-body");
    const chatInput = document.getElementById("chat-input");
    const backButton = document.getElementById("back-button");
    const buttonContainer = document.getElementById("button-container");
    const reviewForm = document.getElementById("myform");
    chatBody.style.display = 'none';
    chatInput.style.display = 'none';
    backButton.style.display = 'none';
    buttonContainer.style.display = 'block';
    reviewForm.style.display = 'none';
}
function toggleChat() {
    const chatContainer = document.getElementById("chat-container");
    chatContainer.classList.toggle("open");
    const buttonContainer = document.getElementById("button-container");
    const chatBody = document.getElementById("chat-body");
    const chatInput = document.getElementById("chat-input");
    const backButton = document.getElementById("back-button");
    const reviewForm = document.getElementById("myform");
    if (chatContainer.classList.contains("open")) {
        buttonContainer.style.display = 'block';
        chatBody.style.display = 'none';
        chatInput.style.display = 'none';
        backButton.style.display = 'none';
        reviewForm.style.display = 'none';
    }
}
function createMessage(content, className) {
const chatBody = document.querySelector(".chat-body");
const messageDiv = document.createElement("div");
messageDiv.classList.add("message", className);
const contentDiv = document.createElement("div");
contentDiv.classList.add("content");
contentDiv.innerHTML = content;
messageDiv.appendChild(contentDiv);
chatBody.appendChild(messageDiv);
chatBody.scrollTop = chatBody.scrollHeight;
return messageDiv;
}

function initializeCodeMirror(element, codeContent, language) {
    let languageMode;
    switch (language) {
        case "JavaScript":
            languageMode = "javascript";
            break;
        case "HTML":
            languageMode = "htmlmixed";
            break;
        case "CSS":
            languageMode = "css";
            break;
        case "Python":
            languageMode = "python";
            break;
        case "C/C++":
            languageMode = "clike";
            break;
        default:
            languageMode = "plaintext";
            break;
    }

    // CodeMirror에 코드 부분만 적용
    const codeMirrorInstance = CodeMirror(element, {
        value: codeContent,
        mode: languageMode,
        lineNumbers: true,
        readOnly: true,
        lineWrapping: true,
        theme: "dracula"
    });
}

// 코드스니펫
function wrapCodeInBlock(text) {
const codePattern = /(```[\s\S]*?```)/g;
let match;
while (match = codePattern.exec(text)) {
    let snippet = match[1];
    text = text.replace(snippet, `<code>${snippet.slice(3, -3)}</code>`);
}
return text;
}
// GPT응답을 사용자에게 바로 보여주는 기능
function displayResponseInRealTime(message) {
    console.log("응답을 실시간으로 표시 함수가 호출");  // 로깅

    const chatBody = document.querySelector(".chat-body");
    const botMessageDiv = document.createElement("div");
    botMessageDiv.classList.add("message", "bot-message");
    const botContentDiv = document.createElement("div");
    botContentDiv.classList.add("content");

    chatBody.appendChild(botMessageDiv);
    botMessageDiv.appendChild(botContentDiv);

    message = wrapCodeInBlock(message);  // wrapCodeInBlock 함수 호출

    let currentText = "";
    let index = 0;

    function typeMessage() {
        if (index < message.length) {
            currentText += message[index];
            botContentDiv.innerHTML = currentText; // innerHTML로 수정
            index++;
            setTimeout(typeMessage, 50);  // 문자 하나 추가하는 속도 설정. 필요시 조절 가능.
        }
        chatBody.scrollTop = chatBody.scrollHeight;
    }
    typeMessage();
}

// 전역 변수로 메시지 배열 선언
let messagesHistory = [
    { role: 'system', content: 'You are a code reviewer. Please respond in Korean.' }
];

function sendMessage() {
// 사용자가 입력한 메시지 가져오기
const userInputElem = document.getElementById("user-input");
const userMessage = userInputElem.value;
if (userMessage.trim() === "") return;

// 대화창 박스
const chatBody = document.querySelector(".chat-body");

// 사용자 메시지 표시하는 div 요소
const userMessageDiv = document.createElement("div");
userMessageDiv.classList.add("message", "user-message");
const contentDiv = document.createElement("div");
contentDiv.classList.add("content");
contentDiv.innerText = userMessage;
userMessageDiv.appendChild(contentDiv);
chatBody.appendChild(userMessageDiv);
   // 메시지 배열에 사용자의 메시지 추가
   messagesHistory.push({ role: 'user', content: userMessage })
// 입력창 초기화
userInputElem.value = "";

 // GPT에 요청해서 챗봇의 응답을 가져옴
 chatGPT();
}

const botCodeContainer = document.createElement("div");
botCodeContainer.classList.add("code-container");
botMessageDiv.appendChild(botCodeContainer);
botCodeContainer.appendChild(codeDiv);
function detectLanguage(code) {
   // JavaScript
   if (code.includes("function") || 
   code.includes("console.log") || 
   code.includes("var ") || 
   code.includes("let ")) return "JavaScript";

// HTML
if (code.includes("<html") || 
   code.includes("<div") || 
   code.includes("<span") || 
   code.includes("<a ")) return "HTML";

// CSS
if (code.includes("{") && 
   (code.includes("color:") || 
    code.includes("margin:") || 
    code.includes("padding:"))) return "CSS";

// Python
if (code.includes("def ") || 
        code.includes("print(") || 
        code.includes("import ") ||
        code.includes("for ") ||
        code.includes("in ")) return "Python";

// C/C++
if (code.includes("#include") || 
   code.includes("int main()") || 
   code.includes("printf(")) return "C/C++";

return "Unknown";
}
function chatGPT(userInput) {
   

    console.log("chatGPT 함수가 호출");  // 로깅
    const loadingMsgBox = createMessage("타이핑중...", "bot-message");
    const api_key = "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";//본인 api키값 쓸것
    const messages = [
        { role: 'system', content: 'You are a code reviewer. Please respond in Korean.' },
        { role: 'user', content: userInput },
    ];
   
    const data = {
        model: 'gpt-3.5-turbo',
        temperature: 0.8,
        max_tokens: 1024,
        messages: messagesHistory, 
        top_p: 1, // 토큰 샘플링 확률을 설정
        frequency_penalty: 0.5 // 일반적으로 나오지 않는 단어를 억제하는 정도
       

    }

    $.ajax({
        url: "https://api.openai.com/v1/chat/completions",
        method: 'POST',
        headers: {
            Authorization: "Bearer " + api_key,
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
    }).done(function (response) {
        console.log(response);  // 응답 로깅
        loadingMsgBox.remove();
        const botResponse = response.choices[0].message.content;
 // 메시지 배열에 챗봇의 응답 추가
 messagesHistory.push({ role: 'assistant', content: botResponse });
        const codePattern = /```([\s\S]*?)```/g;
        const codeMatch = codePattern.exec(botResponse);
        
        if (codeMatch) {
            const codeContent = codeMatch[1];
            const cleanedResponse = botResponse.replace(codePattern, "").trim();
            displayResponseInRealTime(cleanedResponse);  // 코드 제외한 부분을 실시간으로 보여줌

            setTimeout(() => {  // 실시간 메시지 표시 후 코드 부분을 보여주기 위한 시간 지연
                const chatBody = document.querySelector(".chat-body");
                const botMessageDiv = document.createElement("div");
                botMessageDiv.classList.add("message", "bot-message");
                const codeDiv = document.createElement("div");
                codeDiv.classList.add("code-output");
                botMessageDiv.appendChild(codeDiv);
                chatBody.appendChild(botMessageDiv);

                const languageName = detectLanguage(codeContent);
                initializeCodeMirror(codeDiv, codeContent, languageName);
            }, cleanedResponse.length * 50);  // 실시간 표시 속도에 따라 조절
        } else {
            displayResponseInRealTime(botResponse);  // 실시간으로 전체 응답을 보여줌
        }

    })

.fail(function (jqXHR, textStatus, errorThrown) { // 에러 처리 부분
    console.log("API 요청 실패:", textStatus, errorThrown);  // 오류 로깅
loadingMsgBox.querySelector(".content").innerHTML = "응답실패.";

});
}
// 엔터키로 전송
function handleKeyDown(event) {
if (event.keyCode === 13) {
    sendMessage();
}
}