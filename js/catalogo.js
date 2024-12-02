class Producto {
    constructor(nombre, precio, descripcion) {
        this.nombre = nombre.toLowerCase();
        this.precio = parseInt(precio);
        this.descripcion = descripcion.toLowerCase();
    }
}

class itemCarrito {
    constructor(nombre, cantidad, precio) {
        this.nombre = nombre.toLowerCase();
        this.cantidad = parseInt(cantidad);
        this.precio = parseInt(precio);
    }
}

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let catalogo = JSON.parse(localStorage.getItem("catalogo")) || [];
const contenedorCatalogo = document.getElementById("contenedorCatalogo") || [];
const botonOfertas = document.getElementById("ofertas");
const botonTodos = document.getElementById("todos");
const barraBusqueda = document.getElementById("busqueda");

const getCatalogo = async () => {
    const url = "./js/stock.json";
    try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        catalogo = await response.json();
        renderizarProductos(catalogo);

    } catch (error) {
        console.error(error.message);
    }
}

const renderizarProductos = (array) => {
    contenedorCatalogo.innerHTML = "";
    
    array.forEach((producto) => {
        let div = document.createElement("div");

        div.classList.add("producto");
        div.innerHTML = `
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio}</p>
        <img src="${producto.img}" alt="${producto.descripcion}">
        <button id="agregar${producto.id}">Comprar</button>
        `;

        contenedorCatalogo.appendChild(div);

        let boton = document.getElementById(`agregar${producto.id}`);
        boton.addEventListener("click", () => {
            agregarCarrito(producto.id);
        });
    });
    
    requestAnimationFrame(() => {});
}


const agregarCarrito = (id) => {
    let producto = stockProductos.find((prod) => prod.id === id)

    if (carrito.some((prd) => prd.id === id)) {
        const index = carrito.findIndex((prd) => prd.id === id)
        carrito[index].cantidad++
    } else {
        producto.cantidad = 1
        carrito.push(producto)
    }

    guardarCarrito()
}

const guardarCarrito = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

botonOfertas.addEventListener("click", () => {
    let productosOfertas = catalogo.filter((prd) => prd.oferta === true)

    renderizarProductos(productosOfertas)
});

botonTodos.addEventListener("click", () => {
    renderizarProductos(catalogo)
});

barraBusqueda.addEventListener("input", () => {
    let textoBusqueda = barraBusqueda.value.toLowerCase()
    let productosFiltrados = catalogo.filter(prd => prd.nombre.toLowerCase().includes(textoBusqueda))

    renderizarProductos(productosFiltrados)
});


window.addEventListener("DOMContentLoaded", (e) => {
    if (catalogo === undefined || catalogo.length == 0) {
        getCatalogo();
    }
    else {
        renderizarProductos(catalogo);
    }
});