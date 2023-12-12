import HelloService from "../../services/hello.service.js";
async function init() {
  const container = document.getElementById('hello_container');

  const response = await HelloService.hello();
  if (response.ok) {
    const data = await response.json();
    container.innerHTML = data.message;
  } else {
    container.innerHTML = 'Error';
  }
}

init();