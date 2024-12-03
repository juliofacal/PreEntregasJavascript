class Producto {
    constructor(id, nombre, precio, descripcion, img) {
        this.id = id;
        this.nombre = String(nombre);
        this.precio = parseInt(precio);
        this.descripcion = String(descripcion);
        this.img = String(img);
        this.oferta = false;
    }
}

const catalogo = JSON.parse(localStorage.getItem("catalogo")) || [];
const contenedorABMCatalogo = document.getElementById("contenedorABMCatalogo") || [];
const botonOfertas = document.getElementById("ofertas");
const botonHabilitados = document.getElementById("habilitados");
const botonSuspendidos = document.getElementById("suspendidos");
const botonTodos = document.getElementById("todos");
const barraBusqueda = document.getElementById("busqueda");

const renderizarABMProductos = (array) => {
    contenedorABMCatalogo.innerHTML = "";
    
    array.forEach((producto) => {
        let div = document.createElement("div");

        div.classList.add("producto");
        div.innerHTML = `
        <p>Id: ${producto.id}</p>
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio}</p>
        <img src="${producto.img}" alt="${producto.descripcion}">
        <button type=button id="suspenderProducto(${producto.id})" ${(producto.habilitado)? "" : "disabled"}>Suspender</button>
        <button type=button id="reanudarProducto(${producto.id})" ${(!producto.habilitado)? "" : "disabled"}>Reanudar</button>
        <button type=button id="eliminarProducto(${producto.id})">Eliminar</button>
        `;

        contenedorABMCatalogo.appendChild(div);
    });
}

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

botonHabilitados.addEventListener("click", () => {
    let productosOfertas = catalogo.filter((prd) => prd.habilitado)

    renderizarABMProductos(productosOfertas)
});

botonSuspendidos.addEventListener("click", () => {
    let productosOfertas = catalogo.filter((prd) => !prd.habilitado)

    renderizarABMProductos(productosOfertas)
});

botonOfertas.addEventListener("click", () => {
    let productosOfertas = catalogo.filter((prd) => prd.oferta)

    renderizarABMProductos(productosOfertas)
});

botonTodos.addEventListener("click", () => {
    renderizarABMProductos(catalogo)
});

barraBusqueda.addEventListener("input", () => {
    let textoBusqueda = barraBusqueda.value.toLowerCase()
    let productosFiltrados = catalogo.filter(prd => prd.nombre.toLowerCase().includes(textoBusqueda))

    renderizarABMProductos(productosFiltrados)
});

window.addEventListener("DOMContentLoaded", (e) => {
    if (catalogo === undefined || catalogo.length == 0) {
        getCatalogo();
    }
    else {
        renderizarABMProductos(catalogo);
    }
});