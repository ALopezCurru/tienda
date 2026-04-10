"use strict";
const descuento = 15;
export const productos = [
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
  {
    id: 7,
    nombre: "Objeto 7 ejemplo",
    descripcion: "Adaptador tipo C a usb",
    precio: 50,
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
