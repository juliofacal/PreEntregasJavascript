const simulador = () => {
  let opcion = -1;
  let continuar = true;
  let mensaje = "";

  do {
    opcion = prompt(
      `Ingrese número para seleccionar una opción:\n
      (1) Mostrar catálogo\n
      (2) Agregar producto\n
      (3) Eliminar producto\n
      (4) Modificar producto\n
      (0) Salir`
    );

    if (opcion != null) {
      opcion = parseInt(opcion);
    } 

    switch (opcion) {
      case 1:
        alert(mostrarProductos());
        break;
      case 2:
        mensaje = agregarProductos();
        alert(mensaje);
        break;
      case 3:
        let productoABorrar = prompt("Ingrese el nombre del producto a borrar.");
        mensaje = borrarProducto(productoABorrar);
        alert(mensaje);
        break;
      case 4:
        let productoAModificar = prompt("Ingrese el nombre del producto a modificar.");
        mensaje = modificarProducto(productoAModificar);
        alert(mensaje);
        break;
      /* 
      ==== TODO ====
      case 5:
        console.log("carrito");
        break;
      */
      case 0:
      case null:
        continuar = false;
        break;
      default:
        alert("La opción ingresada no es válida.");
    }
  } while (continuar);
}

class Producto {
  constructor(nombre, precio, descripcion) {
    this.nombre = nombre.toLowerCase();
    this.precio = parseInt(precio);
    this.descripcion = descripcion.toLowerCase();
  }
}

const productos = [];

const agregarProductos = () => {
  let mensaje = "No se pudo agregar el producto.";
  let nombre = "";
  let precio = "";
  let descripcion = "";

  do {
    nombre = prompt("Ingrese nombre del producto.");
    if (nombre === null)
      return mensaje;
  } while (nombre === "");
  do {
    precio = prompt("Ingrese precio del producto.");
    if (precio === null)
      return mensaje;
  } while (precio === "");
  do {
    descripcion = prompt("Ingrese descripción del producto.");
    if (descripcion === null)
      return mensaje;
  } while (descripcion === "");
  
  let producto = new Producto(nombre, precio, descripcion);

  productos.push(producto);
  mensaje = "Producto agregado correctamente.";

  return mensaje;
}

const mostrarProductos = () => {
  let mensaje = `Catálogo: \n`;

  if (productos.length > 0) {
    for (let producto of productos) {
      mensaje += `•${producto.nombre} | $${producto.precio} | ${producto.descripcion} \n`;
    }
  }
  else {
    mensaje = `El Catálogo está vacío.`;
  }

  return mensaje;
}

const borrarProducto = (productoABorrar) => {
  let mensaje = "No se encontró el producto.";
  for (let i = 0; i < productos.length; i++) {
    if (productos[i].nombre === productoABorrar) {
      productos.splice(i);
      mensaje = `Producto "${productoABorrar}" fue eliminado.`
    }
  }
  return mensaje;
}

const modificarProducto = (productoAModificar) => {
  let mensaje = "No se encontró el producto.";
  for (let i = 0; i < productos.length; i++) {
    if (productos[i].nombre === productoAModificar) {
      productos[i].precio = prompt("Ingrese el nuevo precio del producto.");
      productos[i].descripcion = prompt("Ingrese la nueva descripción del producto.");
      mensaje = `Producto "${productoAModificar}" fue actualizado.`
    }
  }
  return mensaje;
}

simulador();
