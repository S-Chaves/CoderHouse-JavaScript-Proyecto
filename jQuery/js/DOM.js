import { productos } from './productos.js';
import { buscarCarrito, removerProductoStorage, carritoArray } from './storage.js';

/*****/
/*Nav*/
/*****/

$('.nav_links a').hover(
  function () {
    $('.nav_links a').css({
      opacity: '.6',
      transition: 'opacity 400ms ease'
    });
    $(this).css({ opacity: '1' });
  },
  function () {
    $('.nav_links a').css({
      opacity: '1',
      transition: 'opacity 400ms ease'
    });
  });

// Funciones para los clicks
const abrirLinks = item => item.css({
  left: '0',
  transition: 'left 600ms ease'
});
const cerrarLinks = item => item.css({
  left: '-300px',
  transition: 'left 900ms ease'
});
const abrirCarrito = item => item.css({
  right: '0',
  transition: 'right 600ms ease'
});
const cerrarCarrito = item => item.css({
  right: '-300px',
  transition: 'right 750ms ease'
});
const mostrarFondo = item => item.css({ opacity: '.3' });
const ocultarFondo = item => item.css({ opacity: '0' });
// EventListeners de las barras del nav
const barsLinks = $('.nav_bars_links');
const fondoNegro = $('.fondo-negro');

$('.bars').click(e => {
  e.stopPropagation();
  abrirLinks(barsLinks);
  mostrarFondo(fondoNegro);
  cerrarCarrito(carrito);
});
$('.exit_links').click(() => {
  cerrarLinks(barsLinks);
  ocultarFondo(fondoNegro);
});
// Carrito del nav click eventListener
const carrito = $('.carrito');

$('.carrito_nav').click(e => {
  e.stopPropagation();
  abrirCarrito(carrito);
  mostrarFondo(fondoNegro);
  cerrarLinks(barsLinks);
});
$('.exit_carrito').click(() => {
  cerrarCarrito(carrito);
  ocultarFondo(fondoNegro);
});
// Event listener para los clicks afuera
$('body').click(e => {
  const noCerrar =
    $(e.target).closest('.nav_bars_links').length
    || $(e.target).closest('.carrito').length
    || $(e.target).hasClass('carrito_producto_remover');

  if (noCerrar) return;

  const cerrar =
    barsLinks.css('left') == '0px'
    || carrito.css('right') == '0px';

  if (cerrar) {
    cerrarLinks(barsLinks);
    cerrarCarrito(carrito);
    ocultarFondo(fondoNegro);
  }
});

/*************/
/*Banner Info*/
/*************/

let slider = 0;
let len;
const media550 = matchMedia('(max-width: 550px)');
const media750 = matchMedia('(max-width: 750px)');
const bannerInfoSections = $('.banner_info_section');

const tamañoPantalla = () => {
  media550.matches
    ? len = 2
    : len = 1;
};
tamañoPantalla();
const moverIzquierda = () => {
  slider -= 1;
  bannerInfoSections.animate({
    right: '-=100%'
  });
};
const moverDerecha = () => {
  slider += 1;
  bannerInfoSections.animate({
    right: '+=100%'
  });
};

media550.addEventListener('change', () => {
  tamañoPantalla();

  if (slider != 2) return;
  moverIzquierda();
});
media750.addEventListener('change', () => {
  tamañoPantalla();
});

$('.slider_left').click(() => {
  if (!slider) return;
  moverIzquierda();
});
$('.slider_right').click(() => {
  if (slider == len) return;
  moverDerecha();
});

/***********/
/*Productos*/
/***********/

const controlarBtn = (btn) => {
  if (btn.prop('disabled') == false) {
    btn.prop('disabled', true);
    btn.text('PRODUCTO AGREGADO');
    btn.addClass('agregado');
    return;
  }

  btn.prop('disabled', false);
  btn.text('AGREGAR AL CARRITO');
  btn.removeClass('agregado');
};
// Agrega los productos al DOM
const contenedor = $('.productos_contenedor');

const agregarProductosDOM = () => {
  productos.forEach(producto => {
    const div = document.createElement('div');

    $(div).addClass('producto_card')
      .html(`
      <a href="#" class="producto_imagen">
        <img src="${producto.url}" alt="${producto.alt}">
      </a>
      <div class="producto_descripción">
        <a href="#"><h3 class="producto_nombre">${producto.nombre}</h3></a>
        <p>$<span class="producto_precio">${producto.precio}</span>.00</p>
      </div>
      <button class="agregar_carrito" data-id="${producto.id}">AGREGAR AL CARRITO</button>
      `)
      .appendTo(contenedor);

    if (carritoArray.find(item => item.id == producto.id) === undefined) return;

    const btn = $(div).find('.agregar_carrito');
    controlarBtn(btn);
  });
};

/*********/
/*Carrito*/
/*********/

// Mover el resto de notificaciones
const moverNotificaciónAgregado = () => {
  $('.notifición_agregado').css({
    bottom: '+=9rem'
  });
};
const moverNotificaciónRemovido = () => {
  $('.notifición_removido').css({
    bottom: '+=9rem'
  });
};
// Notificar cambios al usuario
const notificarAgregar = (producto) => {
  moverNotificaciónAgregado();

  const div = $('<div>');
  div.html(`
    <p class="notificacion_titulo">Agregaste <span>${producto.nombre}</span> al carrito</p>
    <p>Precio: <span>$${producto.precio}</span></p>
    `)
    .addClass('notifición_agregado')
    .appendTo('body')
    .animate({
      right: '1rem'
    }, 500, () => {
      setTimeout(() => div.remove(), 4400);
    })
    .delay(3500)
    .fadeOut();
};
const notificarRemover = (producto) => {
  moverNotificaciónRemovido();

  const div = $('<div>');
  div.html(`
    <p class="notificacion_titulo">Removiste <span>${producto.nombre}</span> del carrito</p>
    <p>Precio: <span>$${producto.precio}</span></p>
    `)
    .addClass('notifición_removido')
    .appendTo('body')
    .animate({
      left: '1rem'
    }, 500, () => {
      setTimeout(() => div.remove(), 4400);
    })
    .delay(3500)
    .fadeOut();
};
// Actualiza el precio y número del carrito del nav
const carritoNavPrecio = $('.carrito_nav_precio');
const carritoNavContador = $('.carrito_nav_contador');

const agregarACarritoNav = producto => {
  const precioCarrito = parseInt(carritoNavPrecio.text());
  const valorContadorCarrito = parseInt(carritoNavContador.text());

  carritoNavPrecio.text(precioCarrito + producto.precio);
  carritoNavContador.text(valorContadorCarrito + 1);
};
// Agrega los productos al carrito DOM
const carritoProductos = $('.carrito_productos_contenedor');

const agregarACarritoDOM = (producto) => {
  // Elige la ruta dependiendo desde donde se la llama
  const path = window.location.pathname;
  const regExp = /[\wá-]+\.\w+/;
  const urlFinal = producto.url.match(regExp);
  path.includes('index')
    ? producto.url = './imágenes/' + urlFinal
    : producto.url = '../imágenes/' + urlFinal;

  carritoProductos.append(`
  <div class="carrito_producto">
    <div class="carrito_producto_remover" data-id="${producto.id}"></div>
    <a href="#" class="carrito_producto_nombre">
      ${producto.nombre}
      <div href="#" class="carrito_producto_imagen">
        <img src="${producto.url}" alt="${producto.alt}">
      </div>
    </a>
    <p class="carrito_producto_precio">1 x $${producto.precio}.00</p>
  </div>
  `);
};
// Actualiza el precio total del carrito
const carritoTotal = $('.carrito_total_precio');

const agregarACarritoTotal = (producto) => {
  const valorCarritoTotal = parseInt(carritoTotal.text());
  carritoTotal.text(valorCarritoTotal + parseInt(producto.precio));
};

const agregarACarrito = (producto) => {
  agregarACarritoNav(producto);
  agregarACarritoDOM(producto);
  agregarACarritoTotal(producto);
};

const removerProductoCarrito = (id) => {
  const producto = productos.find(producto => producto.id == id);

  // Descontar precio total
  const valorCarritoTotal = parseInt(carritoTotal.text());
  carritoTotal.text(valorCarritoTotal - producto.precio);
  // Descontar valores del nav
  const precioCarrito = parseInt(carritoNavPrecio.text());
  const valorContadorCarrito = parseInt(carritoNavContador.text());

  carritoNavPrecio.text(precioCarrito - producto.precio);
  carritoNavContador.text(valorContadorCarrito - 1);
  // Borrar del local storage
  removerProductoStorage(id);
  // Cambiar estado del botón de compra
  const btns = [...$('.agregar_carrito')];
  const btn = btns.find(btn => btn.dataset.id == id);
  controlarBtn($(btn));
};
// EventListener para remover productos del carrito
carritoProductos.click(e => {
  const target = $(e.target);
  if (!target.hasClass('carrito_producto_remover')) return;

  const productoId = target.attr("data-id");
  const producto = productos
    .find(producto => producto.id == productoId);

  notificarRemover(producto);
  removerProductoCarrito(productoId);
  target.parent().remove();
});
// Remover todos los productos del carrito
const removerProductosCarrito = () => {
  const carrito = buscarCarrito();
  carrito.forEach(item => {
    removerProductoCarrito(item.id);
  });
  carritoProductos.empty();
};
// Event listner para comprar productos
$('.iniciar_compra').click(() => {
  const carrito = buscarCarrito();
  if (carrito.length == 0) return;

  swal({
    title: 'Comprar Productos',
    text: '¿Estas seguro que desea comprar los productos del carrito?',
    buttons: {
      cancelar: {
        text: 'CANCELAR',
        className: 'cancelar_compra',
        value: false
      },
      confirmar: {
        text: 'CONFIRMAR',
        className: 'confirmar_compra',
        value: true
      }
    }
  })
    .then(
      $('.confirmar_compra').hover(
        function () {
          $(this).css({
            backgroundColor: 'limegreen'
          });
        },
        function () {
          const green400 = 'rgb(43, 180, 43)';
          $(this).css({
            backgroundColor: green400
          });
        }),
      $('.cancelar_compra').hover(
        function () {
          const red400 = 'rgb(255, 30, 30)';
          $(this).css({
            backgroundColor: red400
          });
        },
        function () {
          $(this).css({
            backgroundColor: 'red'
          });
        })
    )
    .then((value) => {
      if (!value) return;
      removerProductosCarrito();
      swal('Compra Realizada Exitosamente', 'Dentro de las próximas 48hs hábiles le estaremos enviando sus productos. Muchas gracias por confiar en nosotros!', 'success');
      const blue200 = 'rgb(33, 180, 210)';
      const blue400 = 'rgb(20, 141, 172)';
      $('.swal-button').hover(
        function () {
          $(this).css({
            backgroundColor: blue200
          });
        },
        function () {
          $(this).css({
            backgroundColor: blue400
          });
        }
      );
    });
});

export { notificarAgregar, controlarBtn, agregarProductosDOM, agregarACarrito };