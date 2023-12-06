import AuthService from '../../services/auth.service.js';

function init() {
  const form = document.getElementById('login-form');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData.entries());
    const user = {
      username: jsonData.username,
      password: jsonData.password
    }

    try {
      AuthService.login(user)
        .then(response => {
          if (response.access && response.refresh) {
            localStorage.setItem('access_token', response.access);
            localStorage.setItem('refresh_token', response.refresh);
            window.location.href = '#/profile';
          }
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  });
}

init();