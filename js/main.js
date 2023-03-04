/*
PRIMERA PRE ENTREGA

function calcular_impuesto (precio){
    let precioFinal = impuestos * precio
    return console.log("El precio final del juego con un total de impuestos del 75% es: "+"$"+precioFinal+ " (AR$)")
}


let impuestos = 1.75
let precio = 0
let rta = ""

while(rta != "salir"){
    precio = (prompt("Ingrese el precio del juego en AR$"))
    if (precio <= 0 || isNaN(precio)){
        console.log("Por favor ingrese un número valido")
    }    
    else{
        calcular_impuesto(precio)
    rta = prompt("Ingrese la palabra \"salir\" para finalizar o presione ENTER para continuar") .toLowerCase()
    }
}
*/

/*
CONSTRUCTORES

class Producto{
    constructor(id,nombre,precio,anio){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.anio = anio;
    }
    descripcion(){
    return `ID: ${this.id}
            /nJuego: ${this.nombre}
            /nPrecio: ${this.nombre}
            /nFecha de salida: ${this.anio}
            `
    }
}

class Carrito{
    constructor(){
        this.userList = []
    }
    agregarJuego(Producto){
        this.userList.push(Producto)
    }
}
*/

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



/*
CONSTRUIDOS CON CONSTRUCTOR

const juego = new Producto(1,"Red Dead Redemption 2", 11299, 2019)
const juego2 = new Producto(2,"Sea of Thieves", 3999, 2020)
const juego3 = new Producto(3,"Cyberpunk 2077", 3999, 2020)
const juego4 = new Producto(4,"Dark Souls 3", 8599, 2016)
const juego5 = new Producto(5,"Hades", 1750, 2020)

*/
