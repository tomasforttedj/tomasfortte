/*
console.log("oh mundo, HIII")

console.log(2+2)

console.log( "tomas" + "fortte")

let nombre = "Tomas"

console.log (nombre)

let edad = 25

edad = 26

console.log(edad)

const ciudad = "Buenos Aires"

console.log(ciudad)

function saludar (nombre) {
console.log ("hola " + nombre )
}

saludar("Mendoza")
saludar("aa")
*/



const carrusel = document.querySelector('.fotos-scroll')

setInterval(function() {
    carrusel.scrollLeft += 1
}, 30)