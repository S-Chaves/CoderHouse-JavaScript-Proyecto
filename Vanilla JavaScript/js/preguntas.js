// Variables
const titulos = document.querySelectorAll('.preguntas_section_titulo');
const textos = document.querySelectorAll('.preguntas_section_text');
const iconos = document.querySelectorAll('.icon1');

// Event Listener
titulos.forEach(titulo => titulo.addEventListener('click', e => {
  const target = e.target;
  const icono = target.querySelector('.icon1');
  const texto = target.nextElementSibling;
  const altura = texto.scrollHeight;

  if (texto.style.height != '0px' && texto.style.height != '') {
    cerrarTexto(target, icono, texto);
    return;
  };
  cerrarTextos(titulos, iconos, textos);

  abrirTexto(target, icono, texto, altura);
}));

// Funciones
function abrirTexto(titulo, icono, texto, altura) {
  const color = 'rgb(33, 180, 210)';
  titulo.style.color = color;

  icono.nextElementSibling.style.backgroundColor = color;
  icono.style.display = 'none';

  texto.style.cssText = `
    height: ${altura}px;
    margin-top: 2rem;
    transition: height 250ms ease;
  `;
};

function cerrarTexto(titulo, icono, texto) {
  titulo.style.color = 'black';

  icono.nextElementSibling.style.backgroundColor = 'black';
  icono.style.display = 'initial';

  texto.style.cssText = `
    height: 0px;
    margin-top: 0px;
    transition: height 250ms ease, margin-top 250ms ease;
  `;
}

function cerrarTextos(titulos, iconos, textos) {
  titulos.forEach(titulo => titulo.style.color = 'black');

  iconos.forEach(icono => {
    icono.nextElementSibling.style.backgroundColor = 'black';
    icono.style.display = 'initial';
  });

  textos.forEach(texto => {
    texto.style.cssText = `
    height: 0px;
    margin-top: 0px;
    transition: height 250ms ease, margin-top 250ms ease;
  `;
  });
}