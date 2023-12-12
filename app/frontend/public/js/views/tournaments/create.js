import TournamentsService from "../../services/tournaments.service.js";

function init() {
  const form = document.getElementById('create-a-tournament-form');

  form.addEventListener('submit', async function (e) {
    e.preventDefault(); // Deactivate the default behavior of the form

    const spanError = document.getElementById('form-error');
    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData.entries());
    const tournament = {
      name: jsonData.name,
      points_to_win: jsonData.points_to_win,
    };

    const response = await TournamentsService.create(tournament);
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

init();