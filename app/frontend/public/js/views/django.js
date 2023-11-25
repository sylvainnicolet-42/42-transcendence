import DjangoService from "../services/django.service.js";

async function loadAndDisplayHello() {
  try {
    const hello = await DjangoService.getHello();
    const container = document.getElementById('django_container');
    const p = document.createElement('p');
    container.appendChild(p);
    p.textContent = hello;
  } catch (error) {
    console.error('Error while loading hello:', error);
  }
}

loadAndDisplayHello().then(() => console.log('Hello loaded!'));