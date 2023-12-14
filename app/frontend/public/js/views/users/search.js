import UsersService from "../../services/users.service.js";

async function find() {
  const form = document.getElementById('friends_search_form');
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const formData = new FormData(form);
    const username = formData.get('search_input');
    if (!username) {
      return;
    }

    const response = await UsersService.search(username);
    if (!response.ok) {
      console.log('Error searching users');
      return;
    }

    const list = await response.json();

    const container = document.getElementById('friends_search_container');

    // Clear existing table content
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

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
      td.textContent = 'No users found';
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

      // Detail button
      const aDetail = document.createElement('a');
      aDetail.href = '#/users/detail/' + user.id;
      aDetail.className = 'btn btn-primary';
      aDetail.textContent = 'Detail';
      tdActions.appendChild(aDetail);
    });
  });
}

async function init() {
  await find();
}

init();