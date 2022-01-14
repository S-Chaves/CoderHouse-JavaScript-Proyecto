const URL = 'https://jsonplaceholder.typicode.com/posts';

const form = $('form');
const nombre = $('#nombre');
const email = $('#email');

form.submit(e => {
  e.preventDefault();
  $('.error').remove();
  $('.respuesta').remove();

  if (nombre.val() == '' || email.val() == '') {
    form.append(`
      <div class="error">
        Uno o más campos tienen un error. Por favor, revísalos e inténtalo de nuevo.
      </div>
      `);
    return;
  };

  const info = {
    nombre: nombre.val(),
    email: email.val()
  };
  $.post(URL, info, (respuesta, estado) => {
    if (estado === 'success') {
      form.append(`
      <div class="respuesta">
        Gracias <b>${respuesta.nombre}</b> por tu mensaje! En las próximas 48 Hs. hábiles estaremos respondiendo a <b>${respuesta.email}</b>.
      </div>
      `);
    }
  });
  form.trigger("reset");
});
