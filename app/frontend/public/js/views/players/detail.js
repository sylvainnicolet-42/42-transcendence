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

  const avatar = document.getElementById('player_avatar');
  const username = document.getElementById('player_username');
  const bio = document.getElementById('player_bio');
  const blockBtnContainer = document.getElementById('player_block_btn');

  avatar.src = player.avatar || 'https://www.gravatar.com/avatar/';
  username.innerHTML = player.username;
  bio.innerHTML = player.bio;

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