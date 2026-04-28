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

const header = document.querySelector('header')
let lastScroll = 0

window.addEventListener('scroll', function() {
    const currentScroll = window.scrollY
    
    if (currentScroll > lastScroll) {
        header.style.transform = 'translateY(-100%)'
    } else {
        header.style.transform = 'translateY(0)'
    }
    
    lastScroll = currentScroll
})

const carrusel = document.querySelector('.fotos-scroll')
let direccion = 1

setInterval(function() {
    if (carrusel.scrollLeft >= carrusel.scrollWidth - carrusel.clientWidth) {
        direccion = -1
    } else if (carrusel.scrollLeft <= 0) {
        direccion = 1
    }
    carrusel.scrollLeft += direccion
}, 30)