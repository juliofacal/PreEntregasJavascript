const contenedorCarrito = document.getElementById("contenedorCarrito")
const totalCarrito = document.getElementById("totalCarrito")
const carrito = JSON.parse(localStorage.getItem("carrito")) || []

const actualizarCarrito = () => {

    contenedorCarrito.innerHTML = "";

    carrito.forEach((elm) => {
        let div = document.createElement("div");
        div.classList.add("producto");

        div.innerHTML = `
            <h3>${elm.nombre}</h3>
            <p>$${elm.precio}</p>
            <p>Cantidad: 
                <button id="incrementar${elm.id}"> + </button> 
                <span id="cantidad${elm.id}">${elm.cantidad}</span> 
                <button id="decrementar${elm.id}"> - </button>
            </p>
            <button id="borrar${elm.id}">Borrar</button>
        `;

        contenedorCarrito.append(div);

        let botonBorrar = document.getElementById(`borrar${elm.id}`);
        botonBorrar.addEventListener("click", () => {
            borrarDelCarrito(elm.id);
            actualizarCarrito();
            Toastify({
                text: "Producto borrado",
                duration: 5000,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                onClick: function(){} // Callback after click
            });
        });

        let botonIncrementar = document.getElementById(`incrementar${elm.id}`)
        botonIncrementar.addEventListener("click", () => {
            elm.cantidad++;
            guardarCarrito();
            actualizarCarrito();
        });

        const botonDecrementar = document.getElementById(`decrementar${elm.id}`)
        botonDecrementar.addEventListener("click", () => {
            if (elm.cantidad > 1) {
                elm.cantidad--;
                guardarCarrito();
                actualizarCarrito();
            }
        });
    });

    totalCarrito.textContent = `Total: $${carrito.reduce((accumulator, prod) => accumulator + (prod.precio * prod.cantidad), 0)}`;
}

const borrarDelCarrito = (id) => {
    let index = carrito.findIndex((prd) => prd.id === id)
    carrito.splice(index, 1);
    guardarCarrito();
}

const vaciarCarrito = () => {
    carrito.length = 0;
    guardarCarrito();
    actualizarCarrito();
    Toastify({
        text: "Carrito vaciado",
        duration: 5000,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #ff5f6d, #ffc371)",
        },
        onClick: function(){} // Callback after click
    }).showToast();
}

const completarCompra = () => {
    let total = carrito.reduce((accumulator, prod) => accumulator + (prod.precio * prod.cantidad), 0);
    carrito.length = 0;
    guardarCarrito();
    actualizarCarrito();
    Toastify({
        text: "Compra completada. Se debitaron $" + total,
        duration: 5000,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #ff5f6d, #ffc371)",
        },
        onClick: function(){} // Callback after click
    }).showToast();
}

const guardarCarrito = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

actualizarCarrito();