import TournamentsService from "../../services/tournaments.service.js";
import { getRouteParams } from '../../router/routeParams.js';

async function init() {
  const id = getRouteParams().id;
  const response = await TournamentsService.getDetail(id);
  if (!response.ok) {
    window.location.href = '#/login';
    return;
  }
  const tournament = await response.json();

  const container = document.getElementById('tournaments_detail_container');

  // Create a table
  const tableData = [
    { label: 'ID', value: tournament.id },
    { label: 'Name', value: tournament.name },
    { label: 'Points to win', value: tournament.points_to_win },
    { label: 'Status', value: tournament.status },
    { label: 'Created at', value: tournament.created_at },
    { label: 'Started at', value: tournament.started_at },
    { label: 'Finished at', value: tournament.finished_at },
  ];

  const table = document.createElement('table');
  table.className = 'table table-striped table-bordered table-hover';
  container.appendChild(table);

  // Create the table body
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);

  tableData.forEach(item => {
    const tr = document.createElement('tr');
    const tdLabel = document.createElement('td');
    tdLabel.textContent = item.label;
    tdLabel.className = 'fw-bold';
    const tdValue = document.createElement('td');
    tdValue.textContent = item.value;

    tr.appendChild(tdLabel);
    tr.appendChild(tdValue);
    tbody.appendChild(tr);
  });
}

init();