/*
Los productos del catálogo son cargados desde el JSON, si es que el item 
"catalogo" en el local storage está vacío. Toda actualización hecha desde el ABM
se hace sobre los datos en el local storage. En esta implementación, existe la
consecuencia que si se elimina todo el catálogo, se populará nuevamente desde el
JSON. No vi utilidad en poner validaciones extras para evitar esto, si es que la
verdadera solución sería conectar a una BBDD verdadera. Esto siendo un concepto
de prueba, es suficiente a mi parecer.
*/

const catalogo = JSON.parse(localStorage.getItem("catalogo")) || [];
const contenedorABMCatalogo = document.getElementById("contenedorABMCatalogo") || [];
const botonOfertas = document.getElementById("ofertas");
const botonHabilitados = document.getElementById("habilitados");
const botonSuspendidos = document.getElementById("suspendidos");
const botonTodos = document.getElementById("todos");
const barraBusqueda = document.getElementById("busqueda");

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
        <button type=button onclick="suspenderProducto(${producto.id});" ${(producto.habilitado)? "" : "disabled"}>Suspender</button>
        <button type=button onclick="reanudarProducto(${producto.id});" ${(!producto.habilitado)? "" : "disabled"}>Reanudar</button>
        <button type=button onclick="borrarProducto(${producto.id});">Eliminar</button>
        `;

        contenedorABMCatalogo.appendChild(div);
    });
}

const agregarProductos = (id, nombre, precio, descripcion, img) => {
    let mensaje = "Confirme la creación y agregado del producto al catálogo.";
    if (confirm(mensaje)) {
        const producto = new Producto(id, nombre, precio, descripcion, img);
        catalogo.push(producto);
        Toastify({
            text: "Producto agregado.",
            duration: 5000,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function(){} // Callback after click
        }).showToast();
    }
}

const borrarProducto = (id) => {
    let mensaje = "Confirme el borrado del producto del catálogo."

    if (confirm(mensaje)) {
        let index = catalogo.map(element => element.id).indexOf(id);
        if (index !== -1) {
            catalogo.splice(index, 1);
            guardarCatalogo();
            renderizarABMProductos(catalogo);
            Toastify({
                text: "Producto borrado.",
                duration: 5000,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                onClick: function(){} // Callback after click
            }).showToast();
        }
    } 
}

const modificarProducto = (productoAModificar) => {
    let mensaje = "No se encontró el producto.";
    for (let i = 0; i < catalogo.length; i++) {
        if (catalogo[i].nombre === productoAModificar) {
            catalogo[i].precio = prompt("Ingrese el nuevo precio del producto.");
            catalogo[i].descripcion = prompt("Ingrese la nueva descripción del producto.");
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

const guardarCatalogo = () => {
    localStorage.setItem("catalogo", JSON.stringify(catalogo));
};

window.addEventListener("DOMContentLoaded", (e) => {
    if (catalogo === undefined || catalogo.length == 0) {
        getCatalogo();
    }
    else {
        renderizarABMProductos(catalogo);
    }
});
