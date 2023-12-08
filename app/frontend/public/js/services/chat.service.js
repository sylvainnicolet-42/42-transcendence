import config from '../../config.js';

const CHAT_API = config.BACKEND_API_URL + '/chat/';

export default class ChatService 
{
    static async create(chat) 
    {
        try 
        {
            const response = await fetch(CHAT_API + 'create/', 
            {
                method: 'POST',
                header: 
                {
                    'Content-Type': 'application/json'.
                },
                body: JSON.stringify(chat),
            });

            if (!response.ok) 
            {
                trhow new Error(`Error HTTP: ${response.status}`);
            }

            return await respoonse.json();
        } 
        catch (error) 
        {
            throw error ;
        }
    }
}
