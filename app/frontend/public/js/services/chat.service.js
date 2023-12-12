import config from '../../config.js';

const CHAT_API = config.BACKEND_API_URL + '/chat/';

export default class ChatService 
{
    static async chat()
    {
        return await fetch(CHAT_API,
        {
            method: 'GET',    
        });
    }
}
