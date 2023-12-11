import AuthService from '../../services/auth.service.js';

function init() {
  const form = document.getElementById('login-form');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const spanError = document.getElementById('login-error');
    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData.entries());
    const user = {
      username: jsonData.username,
      password: jsonData.password
    }

    const response = await AuthService.login(user);
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      window.location.href = '#/profile';
    } else {
      const data = await response.json();
      spanError.innerText = data.detail;
    }
  });
}

init();