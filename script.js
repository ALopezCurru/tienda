"use strict";
//========================================================
//Definiendo Objetos del DOM
const contenedorProductosEnOferta = document.querySelector(
  "#productosContenedor",
);
const contenedorCatalogo = document.querySelector(
  "#productosCatalogoContenedor",
);
const modalCatalogo = document.querySelector("#modalCatalogo");
const modalCompraConfirmacion = document.querySelector(
  ".modalCompraConfirmacion",
);
const btnVerCatalogo = document.querySelector("#verCatalogo");

//========================================================
//definiendo arrays de objetos
const descuento = 15;
const productosConDescuento = [];
const productosSinDescuento = [];

const productos = [
  {
    id: 1,
    nombre: "Celular marca patito",
    descripcion: "Telefono celular 8GB ram 1TB almacenamiento",
    precio: 1000,
    oferta: true,
    stock: 100,
    descuento: descuento / 100,
    activo: function () {
      if (this.stock > 0) {
        return true;
      } else {
        return false;
      }
    },
    imagen: "./img/pexels-igchandankumar-16442035.jpg",
    categoria: "prueba",
  },
  {
    id: 2,
    nombre: "Headsets",
    descripcion: "Headsets diseñados para la mayor comodidad",
    precio: 500,
    oferta: true,
    stock: 100,
    descuento: descuento / 100,
    activo: function () {
      if (this.stock > 0) {
        return true;
      } else {
        return false;
      }
    },
    imagen: "./img/productos/Headsets.jpg",
    categoria: "prueba",
  },
  {
    id: 3,
    nombre: "Audifonos inalambricos",
    descripcion: "Audifonos inalambricos color blanco",
    precio: 800,
    oferta: true,
    stock: 100,
    descuento: descuento / 100,
    activo: function () {
      if (this.stock > 0) {
        return true;
      } else {
        return false;
      }
    },
    imagen: "./img/productos/audifonosInalambricos.jpg",
    categoria: "prueba",
  },
  {
    id: 4,
    nombre: "Combo teclado y mouse",
    descripcion: "Combo de teclado y mouse",
    precio: 1000,
    oferta: true,
    stock: 100,
    descuento: descuento / 100,
    activo: function () {
      if (this.stock > 0) {
        return true;
      } else {
        return false;
      }
    },
    imagen: "./img/productos/tecladoMouse.jpg",
    categoria: "prueba",
  },
  {
    id: 5,
    nombre: "USB Hub",
    descripcion: "Hub USB con diferentes entradas",
    precio: 250,
    oferta: false,
    stock: 100,
    descuento: descuento / 100,
    activo: function () {
      if (this.stock > 0) {
        return true;
      } else {
        return false;
      }
    },
    imagen: "./img/productos/usbHub.jpg",
    categoria: "prueba",
  },
  {
    id: 6,
    nombre: "Adaptador tipo C",
    descripcion: "Adaptador tipo C a usb",
    precio: 100,
    oferta: false,
    stock: 100,
    descuento: descuento / 100,
    activo: function () {
      if (this.stock > 0) {
        return true;
      } else {
        return false;
      }
    },
    imagen: "./img/productos/adaptadorUSB.jpg",
    categoria: "prueba",
  },
  {
    id: 7,
    nombre: "Objeto 7 ejemplo",
    descripcion: "Adaptador tipo C a usb",
    precio: 560,
    oferta: true,
    stock: 100,
    descuento: descuento / 100,
    activo: function () {
      if (this.stock > 0) {
        return true;
      } else {
        return false;
      }
    },
    imagen: "./img/productos/adaptadorUSB.jpg",
    categoria: "prueba",
  },
];

//========================================================
//Funcion para agregar los productos al array de productos en oferta y los que no estan en oferta
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

///========================================================
//Destrucurando el array de objetos con descuentos para mostarlo en el array
function mostrandoObjetosConDescuentosEnDOM(array) {
  let tarjetaOfertas;
  const entries = Object.entries(array);
  contenedorProductosEnOferta.innerHTML = "";
  for (let [
    key,
    { id, nombre, descripcion, precio, imagen, activo, precioAnterior },
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
                </div>
                <div class="productoBotones">
                    <button class="comprar" id="${id}">Comprar!</button>
                    <button class="productoMasInformacion">Ver detalles!</button>
                </div>
            </div>
      `;
    }
    //
    contenedorProductosEnOferta.insertAdjacentHTML(
      "afterbegin",
      tarjetaOfertas,
    );
  }
}

mostrandoObjetosConDescuentosEnDOM(productosConDescuento);

//========================================================
// Destructurando array de objetos en general para agregar los productos al catalogo
function agregarObjetosAlCatalogo(array) {
  contenedorCatalogo.innerHTML = " ";
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

    contenedorCatalogo.insertAdjacentHTML("afterbegin", htmlCatalogo);
  }
}

agregarObjetosAlCatalogo(productosGeneral);

//========================================================
// Definiendo active listeners
btnVerCatalogo.addEventListener("click", function () {
  modalCatalogo.classList.remove("hidden");
  // modalCatalogo.classList.add("center");
  console.log("si funca");
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
          console.log(`${id}`);
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
            <button id="compra-producto${id}" class="confirmarCompra">Confirmar Compra</button>
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
    });
  });
});

function cerrarModalCompraConfirmacion() {
  const btnCerrarConfirmacionCompra = document.querySelectorAll(
    ".cerrarModalCompraFinal",
  );

  btnCerrarConfirmacionCompra.forEach((el) => {
    el.addEventListener("click", function (e) {
      let modalSeleccionado = e.target;
      console.log(modalSeleccionado);
      modalCompraConfirmacion.classList.remove("center");
      modalCompraConfirmacion.classList.add("hidden");
    });
  });
}
