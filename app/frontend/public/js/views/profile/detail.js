import AccountsService from "../../services/accounts.service.js";

async function init() {
  const response = await AccountsService.getDetail();
  if (!response.ok) {
    window.location.href = '#/login';
    return;
  }
  const user = await response.json();

  const username = document.getElementById('profile_username');
  const bio = document.getElementById('profile_bio');
  username.innerHTML = user.username;
  bio.innerHTML = user.bio;
}

init();