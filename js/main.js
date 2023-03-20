/*
function total(arr){
    let resultado = 0;
    let impuestos = 1.75;
    arr.forEach(producto => {
        resultado += impuestos * producto.precio
    })
    return resultado
}

const carrito = []
const listaJuegos = [
                    {id: 1, nombre: "Red Dead Redemption 2", precio: 11299, anio: 2019,},
                    {id: 2, nombre: "Sea of Thieves", precio: 3999, anio: 2020},
                    {id: 3, nombre: "Cyberpunk 2077", precio: 3999, anio: 2020},
                    {id: 4, nombre: "Dark Souls 3", precio: 8599, anio: 2016},
                    {id: 5, nombre: "Hades", precio: 1750, anio: 2020},
]

let i=0

while(i < listaJuegos.length){
    console.log("Nombre: "+listaJuegos[i].nombre)
    console.log("ID: "+listaJuegos[i].id)
    console.log("Precio: $"+listaJuegos[i].precio)
    console.log("Año de salida: "+listaJuegos[i].anio)
    console.log("______________________________")

    i++;
}

let rta = ""

do{

    let id = Number(prompt("Ingrese el ID del juego a comprar.",1))
    if( isNaN(id) )
    console.log ("Por favor ingrese un ID valido")
    else{
        if(listaJuegos.some( producto => producto.id == id) ){
            const producto = listaJuegos.find( producto => producto.id == id)
            carrito.push( producto ) 

        }else{
                console.log("Por favor ingrese un ID existente")
                break;
            }

        rta = prompt("¿Desea comprar algún otro juego? (si/no)").toLowerCase()
    }

}while(rta != "no")

alert("El precio a pagar con impuestos es un total de $"+ total(carrito));

*/

class ProductoController{
    construcor(){
        this.listaJuegos = []
    }

    levantar(){
        let obtenerListaJSON = localStorage.getItem("listaJuegos")

        if(obtenerListaJSON){
            this.listaJuegos = JSON.parse(obtenerListaJSON)
            
        }
    }

    mostrarEnDOM(contenedor_productos){
        this.listaJuegos.forEach( producto => {
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

class CarritoController{
    constructor(){
        this.listaCarrito = []
    }

    levantar(){
        let obtenerListaJSON = localStorage.getItem("listaCarrito")

        if(obtenerListaJSON){
            this.listaCarrito = JSON.parse(obtenerListaJSON)
            
        }
    }
    añadir(producto){
        this.listaCarrito.push(producto)
        let arrFormatoJSON = JSON.parse(this.listaCarrito)
        localStorage.setItem("listaCarrito", arrFormatoJSON)
    }

    mostrarEnDOM(contenedor_carrito){
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
    
}

const controladorProducto = new ProductoController()
controladorProducto.levantar()

const controladorCarrito = new CarritoController()
controladorCarrito.levantar()

const contenedor_productos = document.getElementById("contenedor_productos")
const contenedor_carrito = document.getElementById("contenedor_carrito")


controladorProducto.mostrarEnDOM(contenedor_productos)
controladorCarrito.mostrarEnDOM(contenedor_carrito)



controladorProducto.listaJuegos.forEach( producto => {
    const enEsperaDeCompra = document.getElementById(`juego${producto.id}`)

    enEsperaDeCompra.addEventListener("click",() =>{

        controladorCarrito.añadir(producto)

        contenedor_carrito.innerHTML = ``

        controladorCarrito.mostrarEnDOM(controladorCarrito)

    })
})