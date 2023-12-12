import AccountsService from "../../services/accounts.service.js";

async function init() {
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

init();