import TournamentsService from "../../services/tournaments.service.js";
import { getRouteParams } from '../../router/routeParams.js';

async function loadTournamentData(form) {
  try {
    const id = getRouteParams().id;
    const tournament = await TournamentsService.getDetail(id);
    form.elements.name.value = tournament.name;
    form.elements.points_to_win.value = tournament.points_to_win;
  } catch (error) {
    console.error('Error loading tournament data:', error);
  }
}

async function updateTournament(form) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData.entries());
    const tournament = {
      name: jsonData.name,
      points_to_win: jsonData.points_to_win,
    };

    try {
      await TournamentsService.update(getRouteParams().id, tournament);
      window.location.hash = '#/tournaments/list';
    } catch (error) {
      console.error('Error updating tournament:', error);
    }
  });
}

async function init() {
  const form = document.getElementById('edit-a-tournament-form');
  await loadTournamentData(form);
  await updateTournament(form);
}

init();