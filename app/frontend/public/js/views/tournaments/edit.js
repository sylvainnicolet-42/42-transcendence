import TournamentsService from "../../services/tournaments.service.js";
import { getRouteParams } from '../../router/routeParams.js';

async function loadTournamentData(form) {
  const id = getRouteParams().id;
  const response = await TournamentsService.getDetail(id);
  if (!response.ok) {
    window.location.href = '#/login';
    return;
  }
  const tournament = await response.json();
  form.elements.name.value = tournament.name;
  form.elements.points_to_win.value = tournament.points_to_win;
}

async function updateTournament(form) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const spanError = document.getElementById('form-error');
    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData.entries());
    const tournament = {
      name: jsonData.name,
      points_to_win: jsonData.points_to_win,
    };

    const response = await TournamentsService.update(getRouteParams().id, tournament);
    if (response.ok) {
      window.location.hash = '#/tournaments/list';
    } else {
      const data = await response.json();
      if (data.name) {
        spanError.innerText = 'name: ' + data.name[0];
      }
      if (data.points_to_win) {
        spanError.innerText = 'points_to_win: ' + data.points_to_win[0];
      }
    }
  });
}

async function init() {
  const form = document.getElementById('edit-a-tournament-form');
  await loadTournamentData(form);
  await updateTournament(form);
}

init();