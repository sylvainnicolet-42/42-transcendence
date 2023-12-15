import UsersService from "../../services/users.service.js";

async function friendRequestReceived() {
  const response = await UsersService.getFriendRequestsReceived();
  if (!response.ok) {
    window.location.href = '#/login';
    return;
  }

  const list = await response.json();

  const container = document.getElementById('friend_requests_received_container');

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
    td.textContent = 'No friend requests received';
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
    tdActions.className = 'd-flex flex-column flex-md-row justify-content-end align-items-end gap-2';
    tr.appendChild(tdActions);

    // Accept button
    const aAccept = document.createElement('a');
    aAccept.className = 'btn btn-success';
    aAccept.textContent = 'Accept';
    aAccept.addEventListener('click', () => {
      console.log('Accept');
    });
    tdActions.appendChild(aAccept);

    // Reject button
    const aReject = document.createElement('a');
    aReject.className = 'btn btn-danger';
    aReject.textContent = 'Reject';
    aReject.addEventListener('click', () => {
      console.log('Reject');
    });
    tdActions.appendChild(aReject);
  });
}

async function friendRequestSent() {
  const response = await UsersService.getFriendRequestsSent();
  if (!response.ok) {
    window.location.href = '#/login';
    return;
  }

  const list = await response.json();

  const container = document.getElementById('friend_requests_sent_container');

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
    td.textContent = 'No friend requests sent';
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

    // Delete button
    const aDelete = document.createElement('a');
    aDelete.className = 'btn btn-danger';
    aDelete.textContent = 'Delete';
    aDelete.addEventListener('click', async () => {
      console.log(user.id);
      const response = await UsersService.deleteFriendRequest(user.id);
      if (!response.ok) {
        console.log('Error deleting friend request sent');
        return;
      }
      window.location.reload();
    });
    tdActions.appendChild(aDelete);
  });
}

async function init() {
  await friendRequestReceived();
  await friendRequestSent();
}

init();