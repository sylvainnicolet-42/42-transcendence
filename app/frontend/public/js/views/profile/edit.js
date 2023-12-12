import AccountsService from "../../services/accounts.service.js";

function deleteAccount() {
  const deleteAccountButton = document.getElementById('delete-account-button');

  deleteAccountButton.addEventListener('click', async () => {
    const confirmed = confirm('Are you sure you want to delete your account?');

    if (confirmed) {
      const response = await AccountsService.delete();
      if (response.ok) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '#/login';
      } else {
        console.log('Error deleting account');
      }
    }
  });
}

function updateAccount() {
  const updateAccountForm = document.getElementById('edit-profile-form');

  updateAccountForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const spanError = document.getElementById('form-error');
    const formData = new FormData(updateAccountForm);
    const jsonData = Object.fromEntries(formData.entries());
    const account = {
      username: jsonData.username,
      bio: jsonData.bio,
    };

    const response = await AccountsService.update(account);
    if (response.ok) {
      window.location.href = '#/profile/detail';
    } else {
      const data = await response.json();
      if (data.username) {
        spanError.innerText = 'username: ' + data.username[0];
      }
    }
  });

}

async function loadAccountData() {
  const response = await AccountsService.getDetail();
  if (!response.ok) {
    window.location.href = '#/login';
    return;
  }
  const account = await response.json();
  document.getElementById('username').value = account.username;
  document.getElementById('bio').value = account.bio || '';

}

async function init() {
  await loadAccountData();
  updateAccount();
  deleteAccount();
}

init();