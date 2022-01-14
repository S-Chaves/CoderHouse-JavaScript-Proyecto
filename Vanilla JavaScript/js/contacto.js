// Variables
const URL = 'https://jsonplaceholder.typicode.com/posts';

const form = document.querySelector('form');
const nombre = document.querySelector('#nombre');
const email = document.querySelector('#email');
const boton = document.querySelector('button');

// Event Listener
form.addEventListener('submit', e => {
  e.preventDefault();
  boton.disabled = true;

  const error = document.querySelector('.error');
  const respuesta = document.querySelector('.respuesta');
  if (error) error.remove();
  if (respuesta) respuesta.remove();

  if (nombre.value == '' || email.value == '') {
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="error">
      Uno o más campos tienen un error. Por favor, revísalos e inténtalo de nuevo.
    </div>
    `;
    form.append(div);
    boton.disabled = false;
    return;
  };

  const info = {
    nombre: nombre.value,
    email: email.value
  };

  postUser(URL, info);
});

// Funciones
async function postUser(URL, info) {
  try {
    let response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(info)
    });
    const result = await response.json();

    const div = document.createElement('div');
    div.innerHTML = `
          <div class="respuesta">
            Gracias <b>${result.nombre}</b> por tu mensaje! En las próximas 48 Hs. hábiles estaremos respondiendo a <b>${result.email}</b>.
          </div>
          `;
    form.append(div);
    form.reset();
    boton.disabled = false;
  }
  catch (err) {
    console.log(err);
  }
}