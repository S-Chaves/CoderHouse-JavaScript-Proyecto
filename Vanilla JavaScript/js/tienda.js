import { agregarStock, prepararProductos } from './productos.js';

// Variables
const orden = document.querySelector('.orden');
const contenedor = document.querySelector('.productos_contenedor');

// Clase
const posiblesOrden = {
  "defecto": () => defecto(),
  "menorMayor": () => precioMenorMayor(),
  "mayorMenor": () => precioMayorMenor(),
  "A-Z": () => A_Z(),
  "Z-A": () => Z_A()
};

// EventListener
orden.addEventListener('change', () => {
  const valor = orden.value;
  if (posiblesOrden.hasOwnProperty(valor)) posiblesOrden[valor]();
});

// Funciones
function defecto() {
  borrarProductos();
  getSortedProductos(items => items);
}

function precioMenorMayor() {
  borrarProductos();
  getSortedProductos(items => items.sort((a, b) => a.precio - b.precio));
}

function precioMayorMenor() {
  borrarProductos();
  getSortedProductos(items => items.sort((a, b) => b.precio - a.precio));
}

function A_Z() {
  borrarProductos();
  getSortedProductos(items => items.sort((a, b) => {
    if (a.nombre > b.nombre) return 1;
    if (a.nombre < b.nombre) return -1;
    return 0;
  }));
}

function Z_A() {
  borrarProductos();
  getSortedProductos(items => items.sort((a, b) => {
    if (b.nombre > a.nombre) return 1;
    if (b.nombre < a.nombre) return -1;
    return 0;
  }));
}

function borrarProductos() {
  while (contenedor.lastElementChild) {
    contenedor.lastElementChild.remove();
  }
}

async function getSortedProductos(sorter) {
  try {
    const response = await fetch('../productos.json');

    const result = sorter(await response.json());
    agregarStock(result);
    prepararProductos();
  } catch (err) {
    console.log(err);
  }
};