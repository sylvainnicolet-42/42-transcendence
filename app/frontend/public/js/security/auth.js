import AuthService from '../services/auth.service.js';

export async function isAuthenticated() {
  const token = localStorage.getItem('access_token');
  if (token) {
    const response = await AuthService.verifyToken(token);
    return response.ok;
  } else {
    return false;
  }
}