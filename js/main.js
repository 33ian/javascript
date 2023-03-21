
class ProductoController {
    constructor() {
        this.listaJuegos = []
    }

    levantar() {
        let obtenerListaJSON = localStorage.getItem("listaJuegos")

        if (obtenerListaJSON) {
            this.listaJuegos = JSON.parse(obtenerListaJSON)

        }
    }

    mostrarEnDOM(contenedor_productos) {
        contenedor_productos.innerHTML = ""
        this.listaJuegos.forEach(producto => {
            contenedor_productos.innerHTML += `
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" alt="..." src=${producto.url}>
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">
                        Precio: $${producto.precio}<br>
                        Fecha de salida: ${producto.anio}
                    </p>
                    <a href="#" id="juego${producto.id}" class="btn btn-primary">Añadir al carrito</a>
                </div>
            </div>
            `
        })

    }
}

class CarritoController {
    constructor() {
        this.listaCarrito = []
    }

    levantar() {
        let obtenerListaJSON = localStorage.getItem("listaCarrito")

        if (obtenerListaJSON) {
            this.listaCarrito = JSON.parse(obtenerListaJSON)

        }
    }
    anadir(producto) {
        this.listaCarrito.push(producto)
        let arrFormatoJSON = JSON.stringify(this.listaCarrito)
        localStorage.setItem("listaCarrito", arrFormatoJSON)
    }

    mostrarEnDOM(contenedor_carrito) {
        contenedor_carrito.innerHTML = ``
        this.listaCarrito.forEach(producto => {
            contenedor_carrito.innerHTML += `
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img class="horizontal-card" src="${producto.url}" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">
                                Precio: $${producto.precio}<br>
                                Fecha de salida: ${producto.anio}
                            </p>
                            <p class="card-text"><small class="text-muted">
                                El precio se encuentra en pesos argentinos (AR$).</small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            `
        })
    }

    limpiar() {
        this.listaCarrito = []
        localStorage.removeItem("listaCarrito")
    }

}

const controladorProducto = new ProductoController()
const controladorCarrito = new CarritoController()

controladorCarrito.levantar()
controladorProducto.levantar()

const contenedor_productos = document.getElementById("contenedor_productos")
const contenedor_carrito = document.getElementById("contenedor_carrito")


controladorProducto.mostrarEnDOM(contenedor_productos)
controladorCarrito.mostrarEnDOM(contenedor_carrito)
const finalizar = document.getElementById("finalizar")
const clear = document.getElementById("clear")



controladorProducto.listaJuegos.forEach(producto => {
    const enEsperaDeCompra = document.getElementById(`juego${producto.id}`)

    enEsperaDeCompra.addEventListener("click", () => {

        controladorCarrito.anadir(producto)

        controladorCarrito.levantar()

        controladorCarrito.mostrarEnDOM(contenedor_carrito)

        Toastify({
            text: "Añadido al carrito",
            duration: 1000,
            gravity: "bottom",
            position: "right",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
        }).showToast();
    })
})

finalizar.addEventListener("click", () => {

    if (controladorCarrito.listaCarrito.length > 0) {
        controladorCarrito.limpiar(contenedor_carrito)
        controladorCarrito.mostrarEnDOM(contenedor_carrito)

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Compra realizada con éxito',
            showConfirmButton: false,
            timer: 1500
        })
    } else {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'El carrito se encuentra vacio',
            showConfirmButton: false,
            timer: 1100
        })
    }


})

clear.addEventListener("click", () => {
    controladorCarrito.limpiar(contenedor_carrito)
    controladorCarrito.mostrarEnDOM(contenedor_carrito)
})
