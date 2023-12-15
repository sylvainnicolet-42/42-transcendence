
const CHAT_PATH = "https://localhost:82/chat";
    
export default class ChatService {
    
    static async chat() {
        return await fetch(CHAT_PATH, {
            method: 'GET',
        });
    }
}
