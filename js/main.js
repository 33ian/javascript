
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
            <div class="card juegos" style="width: 18rem;">
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

    borrar(producto) {
        let indice = this.listaCarrito.indexOf(producto)
        this.listaCarrito.splice(indice,1)
    }

    levantar() {
        let obtenerListaJSON = localStorage.getItem("listaCarrito")
        if (obtenerListaJSON) {
            this.listaCarrito = JSON.parse(obtenerListaJSON)
            return true
        }
    return false
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
                            <p class="card-text"><small class="peso-texto">
                                El precio se encuentra en pesos argentinos (AR$).</small>
                            </p>
                            <div class="icono-card">
                            <button class="boton trash" id="borrar${producto.id}"> <i class="fa-solid fa-trash-can"></i> </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        })

        this.listaCarrito.forEach( producto => {
            document.getElementById(`borrar${producto.id}`).addEventListener("click", () => {
                this.borrar(producto)
                localStorage.setItem("listaCarrito", JSON.stringify(this.listaCarrito))
                this.mostrarEnDOM(contenedor_carrito)
                this.mostrarPreciosEnDOM(precio, precio_con_impuestos)
            })
            
        })
    }

    limpiar() {
        this.listaCarrito = []
        localStorage.removeItem("listaCarrito")
    }

    mostrarPreciosEnDOM(precio, precio_con_impuestos){
        precio.innerHTML = '$'+this.calcularTotal()
        precio_con_impuestos.innerHTML = '$'+ this.calcularPrecioConImpuestos()
    }

    calcularTotal(){
        return this.listaCarrito.reduce((acumulador, producto)=> acumulador + producto.precio ,0)
    }

    calcularPrecioConImpuestos(){
        return this.calcularTotal() * 1.75
    }

}

const controladorProducto = new ProductoController()
const controladorCarrito = new CarritoController()

const levantoAlgo = controladorCarrito.levantar()
controladorProducto.levantar()



const contenedor_productos = document.getElementById("contenedor_productos")
const contenedor_carrito = document.getElementById("contenedor_carrito")
const precio = document.getElementById("precio")
const precio_con_impuestos = document.getElementById("precio_con_impuestos")

if (levantoAlgo){
    controladorCarrito.mostrarPreciosEnDOM(precio, precio_con_impuestos)
}


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

        controladorCarrito.mostrarPreciosEnDOM(precio, precio_con_impuestos)

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
        controladorCarrito.mostrarPreciosEnDOM(precio, precio_con_impuestos)

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
    controladorCarrito.mostrarPreciosEnDOM(precio, precio_con_impuestos)
})



