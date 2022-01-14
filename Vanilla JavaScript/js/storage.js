import { agregarACarrito } from './mainDOM.js';

let carritoArray = [];

/**********************/
/*Funciones de Storage*/
/**********************/

const buscarCarrito = () => JSON.parse(localStorage.getItem('carrito'));
// Agrega los productos al carrito del local storage
const agregarACarritoStorage = (producto) => {
  carritoArray.push(producto);
  localStorage.setItem('carrito', JSON.stringify(carritoArray));
};
// Actualiza el carrito con local storage
const actualizarCarrito = () => {
  const carrito = buscarCarrito();
  if (carrito == null) return;

  carritoArray = [...carrito];
  carrito.forEach(producto => {
    agregarACarrito(producto);
  });
};

const removerProductoStorage = (id) => {
  carritoArray = carritoArray.filter(producto => producto.id != id);
  localStorage.setItem('carrito', JSON.stringify(carritoArray));
};

export { buscarCarrito, agregarACarritoStorage, actualizarCarrito, removerProductoStorage, carritoArray };