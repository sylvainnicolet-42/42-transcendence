import PlayersService from "../../services/players.service.js";
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

async function init() {
  const id = getRouteParams().id;
  const response = await PlayersService.getDetail(id);
  if (!response.ok) {
    window.location.href = '#/login';
    return;
  }
  const player = await response.json();

  // Check if the user is blocked
  const isBlockedResponse = UsersService.isBlocked(id);
  isBlockedResponse.then(isBlocked => {
    const blockedContainer = document.getElementById('player_block_container');
    const playerContainer = document.getElementById('player_detail_container');
    if (isBlocked) {
      blockedContainer.className = 'alert alert-danger';
      blockedContainer.innerHTML = 'This user is blocked or you are not allowed to see it';
      playerContainer.style.display = 'none';
    } else {
      blockedContainer.style.display = 'none';
      playerContainer.style.display = 'block';
    }
  });

  const avatar = document.getElementById('player_avatar');
  const username = document.getElementById('player_username');
  const bio = document.getElementById('player_bio');
  const blockBtnContainer = document.getElementById('player_block_btn');
  blockBtnContainer.className = 'd-grid gap-2 d-md-flex justify-content-md-center';

  avatar.src = player.avatar || 'https://www.gravatar.com/avatar/';
  username.innerHTML = player.username;
  bio.innerHTML = player.bio;

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
    blockUser(player.id);
  });
  blockBtnContainer.appendChild(blockBtn);
}

init();