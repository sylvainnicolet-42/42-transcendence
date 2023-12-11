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

export function logout() {
  const token = localStorage.getItem('access_token');
  if (token) {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '#/login';
  } else {
    window.location.href = '/';
  }
}