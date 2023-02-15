function calcular_impuesto (precio){
    let precioFinal = impuestos * precio
    return console.log("El precio final del producto es: "+"$"+precioFinal)
}

let impuestos = 1.75
let precio = 0
let rta = ""

/*
let precio = (prompt("Ingrese el precio del juego en AR$"))
    if (precio <= 0 || isNaN(precio)){
        console.log("Por favor ingrese un número valido")
    }    
    else{
        calcular_impuesto(precio)
}
*/

while(rta == ""){
    precio = (prompt("Ingrese el precio del juego en AR$"))
    calcular_impuesto(precio)
    rta = prompt("Ingrese la palabra salir para finalizar o presione ENTER para continuar")
}





