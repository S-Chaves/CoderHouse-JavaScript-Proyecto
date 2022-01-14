import { agregarACarritoStorage, carritoArray } from './storage.js';
import { notificarAgregar, agregarACarrito } from './mainDOM.js';

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

// Agrega los productos a un array
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
const controlarBtn = (btn) => {
  if (btn.disabled == false) {
    btn.disabled = true;
    btn.innerText = 'PRODUCTO AGREGADO';
    btn.classList.add('agregado');
    return;
  }

  btn.disabled = false;
  btn.innerText = 'AGREGAR AL CARRITO';
  btn.classList.remove('agregado');
};
// Agrega los productos al DOM
const contenedor = document.querySelector('.productos_contenedor');

const agregarProductosDOM = () => {
  productos.forEach(producto => {
    const div = document.createElement('div');

    div.classList.add('producto_card');
    div.innerHTML = `
      <a href="#" class="producto_imagen">
        <img src="${producto.url}" alt="${producto.alt}">
      </a>
      <div class="producto_descripción">
        <a href="#"><h3 class="producto_nombre">${producto.nombre}</h3></a>
        <p>$<span class="producto_precio">${producto.precio}</span>.00</p>
      </div>
      <button class="agregar_carrito" data-id="${producto.id}">AGREGAR AL CARRITO</button>
      `;
    contenedor.append(div);

    if (carritoArray.find(item => item.id == producto.id) === undefined) return;

    const btn = div.lastElementChild;
    controlarBtn(btn);
  });
};
// Agrega lo guardado en el local storage y agrega los event listeners a los productos
const prepararProductos = () => {
  agregarProductosDOM();

  const agregarCarrito = document.querySelectorAll('.agregar_carrito');

  agregarCarrito.forEach(boton => {
    boton.addEventListener('click', e => {
      const productoId = e.target.getAttribute("data-id");
      const producto = productos
        .find(producto => producto.id == productoId);

      controlarBtn(e.target);
      notificarAgregar(producto);
      agregarACarritoStorage(producto);
      agregarACarrito(producto);
    });
  });
};
const getAjax = async url => {
  const response = await fetch(url);
  return await response.json();
};
const getProductos = async () => {
  if (!contenedor) return;
  const path = window.location.pathname;
  let result;
  path.includes('index')
    ? result = await getAjax('./productos.json')
    : result = await getAjax('../productos.json');

  agregarStock(result, productos);
  prepararProductos(productos);
};

/*********************/
/*Contenido Principal*/
/*********************/

getProductos();

export { agregarStock, controlarBtn, prepararProductos, productos };