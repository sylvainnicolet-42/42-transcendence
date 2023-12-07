import AuthService from '../../services/auth.service.js';

function init() {
  const form = document.getElementById('login-form');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const spanError = document.getElementById('login-error');
    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData.entries());
    const user = {
      username: jsonData.username,
      password: jsonData.password
    }

    AuthService.login(user)
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          throw new Error('Invalid credentials');
        }
      })
      .then(response => {
        response.text().then(text => {
          const data = JSON.parse(text);
          localStorage.setItem('access_token', data.access);
          localStorage.setItem('refresh_token', data.refresh);
          window.location.href = '#/profile';
        });
      })
      .catch(error => {
        spanError.innerText = error.message;
      });
  });
}

init();