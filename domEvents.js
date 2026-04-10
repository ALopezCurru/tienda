"use strict";
//Definiendo Objetos del DOM
const contenedorProductosEnOferta = document.querySelector(
  "#productosContenedor",
);
const contenedorCatalogo = document.querySelector(
  "#productosCatalogoContenedor",
);
const contenedorCarrito = document.querySelector("#productosContenedorCarrito");
const modalCatalogo = document.querySelector("#modalCatalogo");
const modalCompraConfirmacion = document.querySelector(
  ".modalCompraConfirmacion",
);
const modalCarritoDeCompras = document.querySelector("#carritoDeCompras");

const btnVerCatalogo = document.querySelector("#verCatalogo");
const btnCarritoDeCompras = document.querySelector("#btnCarritoDeCompras");
const btnCerrarCarritoDeCompras = document.querySelector(
  "#cerrarCarritoDeCompras",
);

const btnLogoCatalogo = document.querySelector("#logoNavBarCatalogo");
const DOMSubTotal = document.querySelector("#subTotal");
const DOMTotal = document.querySelector("#total");
const cerrarCatalogo = document.querySelector("#cerrarModalCatalogo");
const btnCarritoEnCatalogo = document.querySelector("#carritoEnCatalogo");
//

// Definiendo active listeners

btnVerCatalogo.addEventListener("click", function () {
  modalCatalogo.classList.remove("hidden");
  // modalCatalogo.classList.add("center");
  console.log("si funca");
  window.scrollTo(0, 0);
});

btnCarritoDeCompras.addEventListener("click", function () {
  modalCarritoDeCompras.classList.remove("hidden");
  agregarProductosAlCarrito(carritoDeCompras);
  calcularTotales(subTotales);
});

btnCerrarCarritoDeCompras.addEventListener("click", function () {
  modalCarritoDeCompras.classList.add("hidden");
  window.scrollTo(0, 0);
});
// Definiendo funcionalidades de comprar y ver detalles
// Abrir modal de confirmacion de compra
window.addEventListener("DOMContentLoaded", (event) => {
  const btnComprar = document.querySelectorAll(".comprar");
  btnComprar.forEach((el) => {
    el.addEventListener("click", function (e) {
      let htmlcarrito = "";
      modalCompraConfirmacion.classList.remove("hidden");
      modalCompraConfirmacion.classList.add("center");
      const btnSeleccionado = e.target.id;
      const values = Object.values(productosGeneral);
      modalCompraConfirmacion.innerHTML = "";
      for (const { id, nombre, precio, descripcion, imagen } of values) {
        if (id == Number(btnSeleccionado)) {
          htmlcarrito = `
          <div class="containerCompraConfirmacion">
        <div class="containerImagenCompraConfirmacion">
          <img src="${imagen}" alt="" />
        </div>
        <div class="containterInformacionCompraConfirmacion">
          <h1 class="tituloInformacionCompraFinal">${nombre}</h1>
          <p class="descripcionCompraFinal">
            ${descripcion}
          </p>
          <p class="textoPrecioCompraFinal">
            Precio Q.<span class="precioCompraFinal">${precio}</span>
          </p>
          <p class="cantidadCompraFinal">Cantidad</p>
          <input
            type="number"
            class="inputCompraFinal"
            placeholder="Ingrese cantidad aqui"
          />
          
          <div class="containerBotonesCompraFinal">
            <button id="${id}" class="confirmarCompra">Confirmar Compra</button>
            <button class="cerrarModalCompraFinal">Cancelar</button>
          </div>
        </div>
      </div>
          `;
        }
      }
      modalCompraConfirmacion.insertAdjacentHTML("afterbegin", htmlcarrito);
      //Cerrar modal de confirmacion de compra
      cerrarModalCompraConfirmacion();
      // Cerrar modald de compra
      // Confirmar compra
      calcularSubTotalProducto();
    });
  });
});

cerrarCatalogo.addEventListener("click", function () {
  modalCatalogo.classList.add("hidden");
});

btnCarritoEnCatalogo.addEventListener("click", function () {
  modalCarritoDeCompras.classList.remove("hidden");
  agregarProductosAlCarrito(carritoDeCompras);
  calcularTotales(subTotales);
});
//========================================================
