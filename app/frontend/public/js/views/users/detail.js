import { getRouteParams } from '../../router/routeParams.js';
import UsersService from "../../services/users.service.js";

async function blockUser(id) {
  const confirmed = confirm('Are you sure you want to block this user?');

  if (confirmed) {
    const response = await UsersService.blockUser(id);
    if (response.ok) {
      window.location.reload();
    } else {
      console.log('Error blocking user');
    }
  }
}

async function addFriend(id) {
  const confirmed = confirm('Are you sure you want to add this user as a friend?');

  if (confirmed) {
    const response = await UsersService.addFriend(id);
    if (response.ok) {
      window.location.reload();
    } else {
      console.log('Error adding friend');
    }
  }
}

async function init() {
  const id = getRouteParams().id;
  const response = await UsersService.getDetail(id);
  if (!response.ok) {
    window.location.href = '#/login';
    return;
  }
  const user = await response.json();

  // Check if the user is blocked
  const isBlockedResponse = UsersService.isBlocked(id);
  isBlockedResponse.then(isBlocked => {
    const blockedContainer = document.getElementById('user_block_container');
    const userContainer = document.getElementById('user_detail_container');
    if (isBlocked) {
      blockedContainer.className = 'alert alert-danger';
      blockedContainer.innerHTML = 'This user is blocked or you are not allowed to see it';
      userContainer.style.display = 'none';
    } else {
      blockedContainer.style.display = 'none';
      userContainer.style.display = 'block';
    }
  });

  const avatar = document.getElementById('user_avatar');
  const username = document.getElementById('user_username');
  const bio = document.getElementById('user_bio');
  const blockBtnContainer = document.getElementById('user_block_btn');
  blockBtnContainer.className = 'd-grid gap-2 d-md-flex justify-content-md-center';

  avatar.src = user.avatar || 'https://www.gravatar.com/avatar/';
  username.innerHTML = user.username;
  bio.innerHTML = user.bio;

  const addFriendBtn = document.createElement('button');
  addFriendBtn.className = 'btn btn-primary';
  addFriendBtn.innerHTML = 'Add friend';
  addFriendBtn.addEventListener('click', () => {
    console.log('Add friend');
  });
  blockBtnContainer.appendChild(addFriendBtn);

  const messageBtn = document.createElement('button');
  messageBtn.className = 'btn btn-primary';
  messageBtn.innerHTML = 'Message';
  messageBtn.addEventListener('click', () => {
    console.log('Message');
  });
  blockBtnContainer.appendChild(messageBtn);

  // TODO: Block only if it's not the current user
  const blockBtn = document.createElement('button');
  blockBtn.className = 'btn btn-danger';
  blockBtn.innerHTML = 'Block';
  blockBtn.addEventListener('click', () => {
    blockUser(user.id);
  });
  blockBtnContainer.appendChild(blockBtn);
}

init();