import ChatService from "../../service/chat.service.js"

async function init()
{
    const container = document.getElementById('chat_container');

    const response = await ChatService.text();
    if (response.ok)
    {
        const data = await response.json();
        container.innerHTML = data.message;
    }
    else
    {
        container.innerHTML = 'Error';
    }
}

init();
