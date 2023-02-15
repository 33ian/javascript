function calcular_impuesto (precio){
    let precioFinal = impuestos * precio
    return console.log("El precio final del producto es: "+"$"+precioFinal)
}

let impuestos = 1.75

let precio = Number(prompt("Ingrese el precio del juego en AR$"))
    if (precio <= 0 || isNaN(precio)){
        console.log("Por favor ingrese un número valido")
    }    
    else{
        calcular_impuesto(precio)
    }







