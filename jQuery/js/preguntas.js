const titulos = $('.preguntas_section_titulo');
const iconos = $('.icon1');

titulos.click(e => {
  const target = e.target;
  const icono = $(target)
    .children('.preguntas_section_icon')
    .children('.icon1');
  let texto = target.nextElementSibling;
  const altura = texto.scrollHeight;
  texto = $(texto);

  if (texto.css('height') != '0px') {
    cerrarTexto($(target), icono, texto);
    return;
  };
  cerrarTexto(titulos, iconos, $('.preguntas_section_text'));

  abrirTexto($(target), icono, texto, altura);
});

// Funciones
function abrirTexto(titulo, icono, texto, altura) {
  const color = 'rgb(33, 180, 210)';
  titulo.css({
    color: color
  });
  icono.siblings().css({
    backgroundColor: color
  });
  icono.css({
    display: 'none'
  });

  texto.animate({
    height: `${altura}`,
    marginTop: '2rem'
  }, 250, function () {
    $(this).height('auto');
  });
}

function cerrarTexto(titulo, icono, texto) {
  titulo.css({
    color: 'black'
  });
  icono.siblings().css({
    backgroundColor: 'black'
  });
  icono.css({
    display: 'initial'
  });

  $(texto).animate({
    height: `0`,
    marginTop: '0'
  }, { duration: 250, queue: false });
}