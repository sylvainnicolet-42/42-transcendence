import ChatService from "../../services/chat.service.js"

async function init(){

    const response = await ChatService.chat();

    const container = document.getElementById("chat_container");

    if (!response.ok) {
        console.log("Error response not ok");
        return ;
    }    console.log(response);
    const text = await response.json();
    console.log(text);
    container.innerHTML = text.text;

    document.querySelector('#room-name-input').focus();
    document.querySelector('#room-name-input').onkeyup = function(e) {
        if (e.keyCode === 13) {  // enter, return
            document.querySelector('#room-name-submit').click();
        }
    };
    document.querySelector('#room-name-submit').onclick = function(e) {
        var roomName = document.querySelector('#room-name-input').value;
        window.location.pathname = '/chat/' + roomName + '/';
    };
}

init();
