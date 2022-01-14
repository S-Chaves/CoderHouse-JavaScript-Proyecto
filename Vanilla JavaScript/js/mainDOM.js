import { productos, controlarBtn } from './productos.js';
import { buscarCarrito, removerProductoStorage } from './storage.js';

/*****/
/*Nav*/
/*****/

const nav_links = document.querySelectorAll('.nav_links a');

nav_links.forEach(link => {
  link.addEventListener('mouseenter', e => {
    nav_links.forEach(link => {
      link.style.cssText = `
      opacity: .6;
      transition: opacity 400ms ease;
    `;
    });
    e.target.style.opacity = '1';
  });

  link.addEventListener('mouseleave', () => {
    nav_links.forEach(link => {
      link.style.cssText = `
      opacity: 1;
      transition: opacity 400ms ease;
    `;
    });
  });
});
// Funciones para los clicks
const abrirLinks = item => item.style.cssText = `
  left: 0;
  transition: left 600ms ease;
`;
const cerrarLinks = item => item.style.cssText = `
  left: -300px;
  transition: left 900ms ease;
`;
const abrirCarrito = item => item.style.cssText = `
  right: 0;
  transition: right 600ms ease;
`;
const cerrarCarrito = item => item.style.cssText = `
  right: -300px;
  transition: right 750ms ease;
`;
const mostrarFondo = item => item.style.opacity = '.3';
const ocultarFondo = item => item.style.opacity = '0';
// EventListeners de las barras del nav
const barsLinks = document.querySelector('.nav_bars_links');
const fondoNegro = document.querySelector('.fondo-negro');
const bars = document.querySelector('.bars');
const exitLinks = document.querySelector('.exit_links');

bars.addEventListener('click', e => {
  e.stopPropagation();
  abrirLinks(barsLinks);
  mostrarFondo(fondoNegro);
  cerrarCarrito(carrito);
});
exitLinks.addEventListener('click', () => {
  cerrarLinks(barsLinks);
  ocultarFondo(fondoNegro);
});
// Carrito del nav click eventListener
const carrito = document.querySelector('.carrito');
const carritoNav = document.querySelector('.carrito_nav');
const exitCarrito = document.querySelector('.exit_carrito');

carritoNav.addEventListener('click', e => {
  e.stopPropagation();
  abrirCarrito(carrito);
  mostrarFondo(fondoNegro);
  cerrarLinks(barsLinks);
});
exitCarrito.addEventListener('click', () => {
  cerrarCarrito(carrito);
  ocultarFondo(fondoNegro);
});
// Event listener para los clicks afuera
const body = document.querySelector('body');

body.addEventListener('click', e => {
  const noCerrar =
    e.target.closest('.nav_bars_links')
    || e.target.closest('.carrito')
    || e.target.classList.contains('carrito_producto_remover');

  if (noCerrar) return;

  const cerrar =
    barsLinks.style.left == '0px'
    || carrito.style.right == '0px';

  if (cerrar) {
    cerrarLinks(barsLinks);
    cerrarCarrito(carrito);
    ocultarFondo(fondoNegro);
  }
});

/*********/
/*Carrito*/
/*********/

// Mover el resto de notificaciones
const moverNotificaciones = (items) => {
  items.forEach(item => {
    let bottom = item.style.bottom.slice(0, 2);
    if (bottom != '') bottom = parseInt(bottom) - 1;
    item.style.bottom = `${bottom + 10}rem`;
  });
};
// Notificar cambios al usuario
const notificarAgregar = (producto) => {
  const notificacionesAgregado = document.querySelectorAll('.notificación_agregado');
  moverNotificaciones(notificacionesAgregado);

  const div = document.createElement('div');
  div.classList.add('notificación_agregado');
  div.innerHTML = `
    <p class="notificacion_titulo">Agregaste <span>${producto.nombre}</span> al carrito</p>
    <p>Precio: <span>$${producto.precio}</span></p>
    `;
  body.append(div);

  setTimeout(() => div.remove(), 4000);
  div.classList.add('slide-in-right');
};
const notificarRemover = (producto) => {
  const notificacionesRemovido = document.querySelectorAll('.notificación_removido');
  moverNotificaciones(notificacionesRemovido);

  const div = document.createElement('div');
  div.classList.add('notificación_removido');
  div.innerHTML = `
    <p class="notificacion_titulo">Removiste <span>${producto.nombre}</span> del carrito</p>
    <p>Precio: <span>$${producto.precio}</span></p>
    `;
  body.append(div);

  setTimeout(() => div.remove(), 4000);
  div.classList.add('slide-in-left');
};
// Actualiza el precio y número del carrito del nav
const carritoNavPrecio = document.querySelector('.carrito_nav_precio');
const carritoNavContador = document.querySelector('.carrito_nav_contador');

const agregarACarritoNav = producto => {
  const precioCarrito = parseInt(carritoNavPrecio.innerText);
  const valorContadorCarrito = parseInt(carritoNavContador.innerText);

  carritoNavPrecio.innerText = precioCarrito + producto.precio;
  carritoNavContador.innerText = valorContadorCarrito + 1;
};
// Agrega los productos al carrito DOM
const carritoProductos = document.querySelector('.carrito_productos_contenedor');

const agregarACarritoDOM = (producto) => {
  // Elige la ruta dependiendo desde donde se la llama
  const path = window.location.pathname;
  const regExp = /[\wá-]+\.\w+/;
  const urlFinal = producto.url.match(regExp);
  path.includes('index')
    ? producto.url = './imágenes/' + urlFinal
    : producto.url = '../imágenes/' + urlFinal;

  carritoProductos.innerHTML += `
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
  `;
};
// Actualiza el precio total del carrito
const carritoTotal = document.querySelector('.carrito_total_precio');

const agregarACarritoTotal = (producto) => {
  const valorCarritoTotal = parseInt(carritoTotal.innerText);
  carritoTotal.innerText = valorCarritoTotal + parseInt(producto.precio);
};

const agregarACarrito = (producto) => {
  agregarACarritoNav(producto);
  agregarACarritoDOM(producto);
  agregarACarritoTotal(producto);
};

const removerProductoCarrito = (id) => {
  const producto = productos.find(producto => producto.id == id);

  // Descontar precio total
  const valorCarritoTotal = parseInt(carritoTotal.innerText);
  carritoTotal.innerText = valorCarritoTotal - producto.precio;
  // Descontar valores del nav
  const precioCarrito = parseInt(carritoNavPrecio.innerText);
  const valorContadorCarrito = parseInt(carritoNavContador.innerText);

  carritoNavPrecio.innerText = precioCarrito - producto.precio;
  carritoNavContador.innerText = valorContadorCarrito - 1;
  // Borrar del local storage
  removerProductoStorage(id);
  // Cambiar estado del botón de compra
  const btns = [...document.querySelectorAll('.agregar_carrito')];
  const btn = btns.find(btn => btn.dataset.id == id);
  controlarBtn(btn);
};
// EventListener para remover productos del carrito
carritoProductos.addEventListener('click', e => {
  const target = e.target;
  if (!target.classList.contains('carrito_producto_remover')) return;

  const productoId = target.getAttribute("data-id");
  const producto = productos
    .find(producto => producto.id == productoId);

  notificarRemover(producto);
  removerProductoCarrito(productoId);
  target.parentElement.remove();
});
// Remover todos los productos del carrito
const removerProductosCarrito = () => {
  const carrito = buscarCarrito();
  carrito.forEach(item => {
    removerProductoCarrito(item.id);
  });
  while (carritoProductos.lastElementChild) {
    carritoProductos.lastElementChild.remove();
  }
};
// Event listner para comprar productos
const iniciarCompra = document.querySelector('.iniciar_compra');

iniciarCompra.addEventListener('click', () => {
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
      document.querySelector('.confirmar_compra').addEventListener('mouseenter', e => {
        e.target.style.backgroundColor = 'limegreen';
      }),
      document.querySelector('.confirmar_compra').addEventListener('mouseleave', e => {
        const green400 = 'rgb(43, 180, 43)';
        e.target.style.backgroundColor = green400;
      }),

      document.querySelector('.cancelar_compra').addEventListener('mouseenter', e => {
        const red400 = 'rgb(255, 30, 30)';
        e.target.style.backgroundColor = red400;
      }),
      document.querySelector('.cancelar_compra').addEventListener('mouseleave', e => {
        e.target.style.backgroundColor = 'red';
      })
    )
    .then((value) => {
      if (!value) return;
      removerProductosCarrito();
      swal('Compra Realizada Exitosamente', 'Dentro de las próximas 48hs hábiles le estaremos enviando sus productos. Muchas gracias por confiar en nosotros!', 'success');

      const blue200 = 'rgb(33, 180, 210)';
      const blue400 = 'rgb(20, 141, 172)';
      const swalButton = document.querySelector('.swal-button');

      swalButton.addEventListener('mouseenter', e => {
        e.target.style.backgroundColor = blue200;
      });
      swalButton.addEventListener('mouseleave', e => {
        e.target.style.backgroundColor = blue400;
      });
    });
});

export { notificarAgregar, agregarACarrito };