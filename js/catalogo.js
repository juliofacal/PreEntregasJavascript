const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const catalogo = JSON.parse(localStorage.getItem("catalogo")) || [];
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
        const productos = await response.json();
        productos.forEach((producto) => {
            catalogo.push(producto);
        })
        guardarCatalogo();
        renderizarProductos(catalogo);

    } catch (error) {
        console.error(error.message);
    }
}

const guardarCatalogo = () => {
    localStorage.setItem("catalogo", JSON.stringify(catalogo))
}

const renderizarProductos = (array) => {
    contenedorCatalogo.innerHTML = "";
    
    array.forEach((producto) => {
        if (producto.habilitado) {
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
        }
    });
}


const agregarCarrito = (id) => {
    let producto = catalogo.find((prod) => prod.id === id);

    if (carrito.some((prd) => prd.id === id)) {
        const index = carrito.findIndex((prd) => prd.id === id);
        carrito[index].cantidad++;
    } else {
        producto.cantidad = 1;
        carrito.push(producto);
    }
    guardarCarrito();
    Toastify({
        text: "Producto agregado",
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