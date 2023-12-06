import TournamentsService from "../../services/tournaments.service.js";

function init() {
  const form = document.getElementById('create-a-tournament-form');

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Deactivate the default behavior of the form

    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData.entries());
    const tournament = {
      name: jsonData.name,
      points_to_win: jsonData.points_to_win,
    };

    TournamentsService.create(tournament)
      .then(data => {
        window.location.hash = '#/tournaments/list';
      })
      .catch(error => {
        console.log(error);
      });
  });
}

init();