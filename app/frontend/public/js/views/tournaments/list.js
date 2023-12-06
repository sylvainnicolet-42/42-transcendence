import TournamentsService from "../../services/tournaments.service.js";

async function init() {
  try {
    const list = await TournamentsService.getList();
    const container = document.getElementById('tournaments_list_container');

    // Create a table
    const table = document.createElement('table');
    table.className = 'table table-striped table-bordered table-hover';
    container.appendChild(table);

    // Create the table header
    const thead = document.createElement('thead');
    table.appendChild(thead);
    const tr = document.createElement('tr');
    thead.appendChild(tr);
    const headers = ['Name', 'Points to Win', 'Status', 'Actions'];
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
      td.setAttribute('colspan', '4');
      td.textContent = 'No tournaments found';
      tr.appendChild(td);
    }

    list.forEach(tournament => {
      const tr = document.createElement('tr');
      tbody.appendChild(tr);

      // Tournament name
      const tdName = document.createElement('td');
      tr.appendChild(tdName);
      tdName.textContent = tournament.name;

      // Tournament points to win
      const tdPoints = document.createElement('td');
      tr.appendChild(tdPoints);
      tdPoints.textContent = tournament.points_to_win;

      // Tournament status
      const tdStatus = document.createElement('td');
      tr.appendChild(tdStatus);
      tdStatus.textContent = tournament.status;

      // Tournament actions
      const tdActions = document.createElement('td');
      tdActions.className = 'd-flex flex-column flex-md-row justify-content-end align-items-end';
      tr.appendChild(tdActions);

      // Detail button
      const aDetail = document.createElement('a');
      aDetail.href = '#/tournaments/detail/' + tournament.id;
      aDetail.className = 'btn btn-primary me-1 mb-1 mb-md-0';
      aDetail.textContent = 'Detail';
      tdActions.appendChild(aDetail);

      // Edit button
      const aEdit = document.createElement('a');
      aEdit.href = '#/tournaments/edit/' + tournament.id;
      aEdit.className = 'btn btn-primary me-1 mb-1 mb-md-0';
      aEdit.textContent = 'Edit';
      tdActions.appendChild(aEdit);

      // Delete button
      const aDelete = document.createElement('a');
      aDelete.href = '#/tournaments/delete/' + tournament.id;
      aDelete.className = 'btn btn-danger';
      aDelete.textContent = 'Delete';
      tdActions.appendChild(aDelete);
    });
  } catch (error) {
    console.error('Error: ', error);
  }
}

init();