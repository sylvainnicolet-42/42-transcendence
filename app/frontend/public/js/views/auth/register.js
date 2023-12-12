import AuthService from '../../services/auth.service.js';

function init() {
  const form = document.getElementById('register-form');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const spanError = document.getElementById('form-error');
    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData.entries());
    const user = {
      username: jsonData.username,
      password: jsonData.password,
    };

    // Check if passwords match
    if (user.password !== jsonData.confirm_password) {
      spanError.innerText = 'Passwords do not match';
      return;
    }

    const response = await AuthService.register(user);
    if (response.ok) {
      // const data = await response.json();
      window.location.href = '#/register-success';
    } else {
      const data = await response.json();
      if (data.username) {
        spanError.innerText = 'name: ' + data.username;
      }
      if (data.password) {
        spanError.innerText = 'password: ' + data.password;
      }
    }
  });
}

init();