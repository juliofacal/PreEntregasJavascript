const productos = JSON.parse(localStorage.getItem("catalogo")) || [];

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