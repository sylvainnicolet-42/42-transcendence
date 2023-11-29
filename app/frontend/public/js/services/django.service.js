const HELLO_API = 'http://localhost:81/api/hello/'; // TODO: Have .env file

export default class DjangoService {
  static async getHello() {
    try {
      console.log(HELLO_API);
      const response = await fetch(HELLO_API);

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error('Cannot get hello from backend', error);
      throw error;
    }
  }
}