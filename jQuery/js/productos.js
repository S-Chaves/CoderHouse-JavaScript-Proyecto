import { agregarACarritoStorage } from './storage.js';
import { notificarAgregar, controlarBtn, agregarProductosDOM, agregarACarrito } from './DOM.js';

let productos = [];

/*******/
/*Clase*/
/*******/

class Producto {
  constructor(id, nombre, precio, url, alt) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.url = url;
    this.alt = alt;
  }
}

/***********/
/*Funciones*/
/***********/

// Agrega los productos al DOM y al array stock
const agregarStock = (items) => {
  productos = [];
  const path = window.location.pathname;
  let imágenes;
  path.includes('index')
    ? imágenes = './imágenes/'
    : imágenes = '../imágenes/';

  items.forEach(item => {
    const producto = new Producto(
      item.id,
      item.nombre,
      item.precio,
      imágenes + item.imagen.url,
      item.imagen.alt
    );
    productos.push(producto);
  });
};
// Agrega lo guardado en el local storage y agrega los event listeners a los productos
const prepararProductos = () => {
  agregarProductosDOM();

  const agregarCarrito = $('.agregar_carrito');

  agregarCarrito.click(e => {
    const productoId = $(e.target).attr("data-id");
    const producto = productos
      .find(producto => producto.id == productoId);

    controlarBtn($(e.target));
    notificarAgregar(producto);
    agregarACarritoStorage(producto);
    agregarACarrito(producto);
  });
};
// Get productos
const getAjax = url => {
  $.get(url, (respuesta, estado) => {
    if (estado === 'success') {
      agregarStock(respuesta, productos);
      prepararProductos(productos);
    }
  });
};

const getProductos = () => {
  const path = window.location.pathname;
  if (path.includes('index')) {
    getAjax('./productos.json');
    return;
  }

  getAjax('../productos.json');
};

/*********************/
/*Contenido Principal*/
/*********************/

getProductos();

export { agregarStock, prepararProductos, getProductos, productos };