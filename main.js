"use strict";

import { productos } from "./products.js";
import { DOM } from "./DOMObjects.js";

const productosConDescuento = [];
const productosSinDescuento = [];
const carritoDeCompras = [];
const subTotales = [];

// Funcion para agregar los productos al array de productos en oferta y los que no estan en oferta
function productosEnDescuento(array) {
  const values = Object.values(array);
  for (const {
    id,
    nombre,
    descripcion,
    precio,
    imagen,
    descuento,
    activo,
    oferta,
  } of values) {
    if (oferta) {
      productosConDescuento.push({
        nombre: nombre,
        id: id,
        descripcion: descripcion,
        precioAnterior: precio,
        activo: activo,
        precio: precio - precio * descuento,
        imagen: imagen,
        oferta: oferta,
        ahorro: precio - (precio - precio * descuento),
      });
    } else if (!oferta) {
      productosSinDescuento.push({
        nombre: nombre,
        id: id,
        descripcion: descripcion,
        activo: activo,
        precio: precio,
        imagen: imagen,
        oferta: oferta,
      });
    }
  }
}
productosEnDescuento(productos);

const productosGeneral = [];
productosGeneral.push(...productosConDescuento, ...productosSinDescuento);

//Destrucurando el array de objetos con descuentos para mostarlo en el array
function mostrandoObjetosConDescuentosEnDOM(array) {
  let tarjetaOfertas;
  const entries = Object.entries(array);
  DOM.contenedorProductosEnOferta.innerHTML = "";
  for (let [
    key,
    { id, nombre, descripcion, precio, imagen, activo, precioAnterior, ahorro },
  ] of entries) {
    if (activo) {
      tarjetaOfertas = `
       <div class="productoTarjeta center">    
                     
                <img class="productoImagen" src="${imagen}" alt="imagenDeProducto">
           
                <div class="productoInformacion">
                  <div class="productoAlertaOferta center">
                    <div class="circuloOferta"></div>
                    <p>Producto en Oferta</p>       
                  </div>
                  <H1 class="productoNombre">${nombre}</H1>
                  <p class="productoDescripcion">${descripcion}</p>
                  <p class = "precios">Precio anterior Q.<span class="precioAnterior">${precioAnterior}</span></p>
                  <b class = "precios"><p>Precio con descuento: Q.<span class="productoPrecio">${precio}</span></p></b>
                  <b class = "ahorro"> Ahorraras:  Q.${ahorro} </b>
                  </div>
                <div class="productoBotones">
                    <button class="comprar" id="${id}">Comprar!</button>
                    <button class="productoMasInformacion">Ver detalles!</button>
                </div>
            </div>
      `;
    }
    //
    DOM.contenedorProductosEnOferta.insertAdjacentHTML(
      "afterbegin",
      tarjetaOfertas,
    );
  }
}
mostrandoObjetosConDescuentosEnDOM(productosConDescuento);

// Destructurando array de objetos en general para agregar los productos al catalogo
export function agregarObjetosAlCatalogo(array) {
  DOM.contenedorCatalogo.innerHTML = " ";
  const values = Object.values(array);
  let htmlCatalogo = "";
  for (const {
    nombre,
    id,
    descripcion,
    precio,
    activo,
    imagen,
    oferta,
    precioAnterior,
    ahorro,
  } of values) {
    if (oferta) {
      console.log(`${id} - ${nombre} - ${oferta}`);
      htmlCatalogo = `
      <div class="productoTarjeta center">    
                     
                <img class="productoImagen" src="${imagen}" alt="imagenDeProducto">
           
                <div class="productoInformacion">
                  <div class="productoAlertaOferta center">
                    <div class="circuloOferta"></div>
                    <p>Producto en Oferta</p>       
                  </div>
                  <H1 class="productoNombre">${nombre}</H1>
                  <p class="productoDescripcion">${descripcion}</p>
                  <p class = "precios">Precio anterior Q.<span class="precioAnterior">${precioAnterior}</span></p>
                  <b class = "precios"><p>Precio con descuento: Q.<span class="productoPrecio">${precio}</span></p></b>
                  <b class = "ahorro"> Ahorraras:  Q.${ahorro} </b>
                  </div>
                <div class="productoBotones">
                    <button class="comprar" id="${id}">Comprar!</button>
                    <button class="productoMasInformacion">Ver detalles!</button>
                </div>
            </div>
    `;
    } else {
      console.log(`${id} - ${nombre} - ${oferta}`);
      htmlCatalogo = `
     <div class="productoTarjeta center">    
                     
                <img class="productoImagen" src="${imagen}" alt="imagenDeProducto">
           
                <div class="productoInformacion">
                  <div class="productoAlertaOferta hidden">
                    <div class="circuloOferta"></div>
                    <p>Producto en Oferta</p>       
                  </div>
                  <H1 class="productoNombre">${nombre}</H1>
                  <p class="productoDescripcion">${descripcion}</p>
                  <p class = "precios hidden">Precio anterior Q.<span class="precioAnterior hidden">0</span></p>
                  <b class = "precios"><p>Precio: Q.<span class="productoPrecio">${precio}</span></p></b>
                </div>
                <div class="productoBotones">
                    <button class="comprar" id="${id}">Comprar!</button>
                    <button class="productoMasInformacion">Ver detalles!</button>
                </div>
            </div>
    `;
    }

    DOM.contenedorCatalogo.insertAdjacentHTML("afterbegin", htmlCatalogo);
  }
}
agregarObjetosAlCatalogo(productosGeneral);

// Definiendo funcionalidades de comprar y ver detalles
// Abrir modal de confirmacion de compra
window.addEventListener("DOMContentLoaded", (event) => {
  const btnComprar = document.querySelectorAll(".comprar");
  btnComprar.forEach((el) => {
    el.addEventListener("click", function (e) {
      let htmlcarrito = "";
      DOM.modalCompraConfirmacion.classList.remove("hidden");
      DOM.modalCompraConfirmacion.classList.add("center");
      const btnSeleccionado = e.target.id;
      const values = Object.values(productosGeneral);
      DOM.modalCompraConfirmacion.innerHTML = "";
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
      DOM.modalCompraConfirmacion.insertAdjacentHTML("afterbegin", htmlcarrito);
      //Cerrar modal de confirmacion de compra
      cerrarModalCompraConfirmacion();
      // Cerrar modald de compra
      // Confirmar compra
      calcularSubTotalProducto();
    });
  });
});

// Funcion para cerrar el modal de compra - despues de darle click a comprar en la tarjeta
function cerrarModalCompraConfirmacion() {
  const btnCerrarConfirmacionCompra = document.querySelectorAll(
    ".cerrarModalCompraFinal",
  );
  btnCerrarConfirmacionCompra.forEach((el) => {
    el.addEventListener("click", function (e) {
      let modalSeleccionado = e.target;
      console.log(modalSeleccionado);
      DOM.modalCompraConfirmacion.classList.remove("center");
      DOM.modalCompraConfirmacion.classList.add("hidden");
    });
  });
}

//Funcion para agregar los productos al carrito despues de darle click a  comprar
function calcularSubTotalProducto() {
  const btnConfirmarCompra = document.querySelectorAll(".confirmarCompra");
  btnConfirmarCompra.forEach((el) => {
    el.addEventListener("click", function (e) {
      const inputNumeroProductos =
        document.querySelector(".inputCompraFinal").value;
      let btnComprar = e.target.id;
      console.log(`id: ${btnComprar} - ${inputNumeroProductos}`);

      let values = Object.values(productosGeneral);
      for (const { nombre, id, precio, imagen, ahorro } of values) {
        if (id == btnComprar && Number(inputNumeroProductos) > 0) {
          let subTotal = precio * Number(inputNumeroProductos);
          carritoDeCompras.push({
            nombre: nombre,
            id: id,
            imagen: imagen,
            cantidad: inputNumeroProductos,
            subTotal: subTotal,
            ahorro: ahorro * inputNumeroProductos,
          });

          subTotales.push(Number(subTotal));
          console.log(subTotales);
          console.log(carritoDeCompras);
        }
      }
      // Cerrar modal de confirmacion despues de confirmar compra
      DOM.modalCompraConfirmacion.classList.remove("center");
      DOM.modalCompraConfirmacion.classList.add("hidden");
    });
  });
}

//Funcion para calcular el subTotal y el Total
function calcularTotales(array) {
  let subTotales = 0;
  const values = Object.values(array);
  for (let x of values) {
    subTotales += x;
  }
  const totales = subTotales + subTotales * 0.15;
  console.log(`SubTotales: ${subTotales} - Totales: ${totales}`);
  DOM.DOMSubTotal.textContent = subTotales;
  DOM.DOMTotal.textContent = totales;
}
//Funcion para mostrar los elementos en el carrito
function agregarProductosAlCarrito(array) {
  const values = Object.values(array);
  DOM.contenedorCarrito.innerHTML = "";
  for (const { nombre, cantidad, subTotal, id, imagen, ahorro } of values) {
    let html = `
   <div class="tarjetaProductoCarrito">
          <div class="contenedorImagenCarrito">
            <img src="${imagen}" alt="" class="imagenCarrito">
          </div>
          <div class="contenedorInformacionCarrito">
            <h2><span class="cantidadProductos">${cantidad}</span> - ${nombre}</h2>
          <p>${subTotal}</p>
          <p class="ahorro">--Ahorraras: ${ahorro}--</p>
          
          </div>
        </div>
  `;
    DOM.contenedorCarrito.insertAdjacentHTML("afterbegin", html);
  }
}

function calcularAhorro(array) {
  let totalAhorro = 0;
  const values = Object.values(array);
  for (const { ahorro } of values) {
    totalAhorro = totalAhorro + ahorro;
  }
  DOM.ahorroTotalCarrito.innerHTML = totalAhorro;
}

//========================================================
// B - O - T - O - N - E - S
//========================================================
DOM.btnVerCatalogo.addEventListener("click", function () {
  DOM.modalCatalogo.classList.remove("hidden");
  // modalCatalogo.classList.add("center");
  console.log("si funca");
  window.scrollTo(0, 0);
});

DOM.btnCarritoDeCompras.addEventListener("click", function () {
  DOM.modalCarritoDeCompras.classList.remove("hidden");
  agregarProductosAlCarrito(carritoDeCompras);
  calcularTotales(subTotales);
  calcularAhorro(carritoDeCompras);
});

DOM.btnCerrarCarritoDeCompras.addEventListener("click", function () {
  DOM.modalCarritoDeCompras.classList.add("hidden");
  window.scrollTo(0, 0);
});

DOM.cerrarCatalogo.addEventListener("click", function () {
  DOM.modalCatalogo.classList.add("hidden");
});

DOM.btnCarritoEnCatalogo.addEventListener("click", function () {
  DOM.modalCarritoDeCompras.classList.remove("hidden");
  agregarProductosAlCarrito(carritoDeCompras);
  calcularTotales(subTotales);
  calcularAhorro(carritoDeCompras);
});

DOM.finalizarCompra.addEventListener("click", function () {
  console.log("hola");
  carritoDeCompras.length = 0;

  DOM.contenedorCarrito.innerHTML = "";
  alert("Gracias por tu compra :)");
});

DOM.regresarAComprar.addEventListener("click", function () {
  DOM.modalCarritoDeCompras.classList.add("hidden");
  console.log("hola");
});
//========================================================
//========================================================
