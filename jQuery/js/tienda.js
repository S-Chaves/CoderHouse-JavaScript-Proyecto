import { agregarStock, prepararProductos } from './productos.js';

// Clase
const posiblesOrden = {
  "defecto": () => defecto(),
  "menorMayor": () => precioMenorMayor(),
  "mayorMenor": () => precioMayorMenor(),
  "A-Z": () => A_Z(),
  "Z-A": () => Z_A()
};

// EventListener
$('.orden').change(() => {
  const valor = $('.orden').val();
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
  $('.productos_contenedor').empty();
}

function getSortedProductos(sorter) {
  $.get('../productos.json', (respuesta, estado) => {
    if (estado === 'success') {
      respuesta = sorter(respuesta);
      agregarStock(respuesta);
      prepararProductos();
    }
  });
}