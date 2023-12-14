import UsersService from "../../services/users.service.js";

async function unBlockUser(id) {
  const confirmed = confirm('Are you sure you want to unblock this user?');

  if (confirmed) {
    const response = await UsersService.unblockUser(id);
    if (response.ok) {
      window.location.reload();
    } else {
      console.log('Error unblocking user');
    }
  }
}

async function blocked() {
  const response = await UsersService.getBlockedUsers();
  if (!response.ok) {
    window.location.href = '#/login';
    return;
  }

  const list = await response.json();

  const container = document.getElementById('friends_blocked_container');

  // Create a table
  const table = document.createElement('table');
  table.className = 'table table-striped table-bordered table-hover';
  container.appendChild(table);

  // Create the table header
  const thead = document.createElement('thead');
  table.appendChild(thead);
  const tr = document.createElement('tr');
  thead.appendChild(tr);
  const headers = ['Avatar', 'Username', 'Actions'];
  headers.forEach(header => {
    const th = document.createElement('th');
    tr.appendChild(th);
    th.textContent = header;
    if (header === 'Actions') {
      th.className = 'text-end';
    }
  });

  // Create the table body
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);

  if (list.length === 0) {
    const tr = document.createElement('tr');
    tbody.appendChild(tr);
    const td = document.createElement('td');
    td.setAttribute('colspan', headers.length.toString());
    td.textContent = 'No friends found';
    tr.appendChild(td);
  }

  list.forEach(user => {
    const tr = document.createElement('tr');
    // Align the items vertically
    tr.className = 'align-middle';
    tbody.appendChild(tr);

    // User avatar
    const tdAvatar = document.createElement('td');
    tr.appendChild(tdAvatar);
    const img = document.createElement('img');
    tdAvatar.appendChild(img);
    img.src = user.avatar || 'https://www.gravatar.com/avatar/';
    img.alt = user.username;
    img.className = 'rounded-circle';
    img.width = 30;
    img.height = 30;

    // User username
    const tdUsername = document.createElement('td');
    tr.appendChild(tdUsername);
    tdUsername.textContent = user.username;

    // User actions
    const tdActions = document.createElement('td');
    tdActions.className = 'text-end';
    tr.appendChild(tdActions);

    // Unblock button
    const aUnblock = document.createElement('a');
    aUnblock.className = 'btn btn-danger';
    aUnblock.textContent = 'Unblock';
    aUnblock.addEventListener('click', () => {
      unBlockUser(user.id);
    });
    tdActions.appendChild(aUnblock);
  });
}

async function init() {
  await blocked();
}

init();