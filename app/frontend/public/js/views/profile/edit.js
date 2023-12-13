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
    if (jsonData.avatar.size > 0) {
      account.avatar = jsonData.avatar;
    }

    const response = await AccountsService.update(account);
    if (response.ok) {
      window.location.href = '#/profile/detail';
    } else {
      const data = await response.json();
      if (data.username) {
        spanError.innerText = 'username: ' + data.username[0];
      }
      if (data.bio) {
        spanError.innerText = 'bio: ' + data.bio[0];
      }
      if (data.avatar) {
        spanError.innerText = 'avatar: ' + data.avatar[0];
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
  if (account.avatar) {
    const avatarContainer = document.getElementById('preview-avatar-container');

    // Show avatar
    const avatar = document.createElement('img');
    avatar.id = 'preview_avatar';
    avatar.alt = 'avatar';
    avatar.className = 'rounded-circle d-block img-thumbnail';
    avatar.width = 80;
    avatar.height = 80;
    avatar.src = account.avatar;
    avatarContainer.appendChild(avatar);

    // Show remove button
    const removeAvatarButton = document.createElement('button');
    removeAvatarButton.id = 'remove-avatar-button';
    removeAvatarButton.type = 'button';
    removeAvatarButton.className = 'btn btn-danger ms-3';
    removeAvatarButton.innerText = 'Remove';
    avatarContainer.appendChild(removeAvatarButton);

    // Remove avatar
    removeAvatarButton.addEventListener('click', async () => {
      const confirmed = confirm('Are you sure you want to remove your avatar?');
      if (confirmed) {
        const response = await AccountsService.deleteAvatar();

        if (response.ok) {
          window.location.reload();
        } else {
          console.log('Error deleting avatar');
        }
      }
    });
  }
}

async function init() {
  await loadAccountData();
  updateAccount();
  deleteAccount();
}

init();