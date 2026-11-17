// =========================================================
// TOMAS FORTTE — main.js
// Cada bloque hace una sola cosa. Leelos de a uno.
// =========================================================

// Le avisamos al CSS que hay JavaScript (activa las animaciones de aparición)
document.documentElement.classList.add('js')


// ---------- 1. Header: se esconde al bajar, vuelve al subir ----------
// (es tu lógica de antes, con un agregado: le pone fondo cuando ya no estás arriba de todo)

const header = document.querySelector('.header')
const menu = document.querySelector('#menu')
let lastScroll = 0

window.addEventListener('scroll', function () {
    const currentScroll = window.scrollY
    const menuAbierto = menu.classList.contains('abierto')

    if (currentScroll > lastScroll && currentScroll > 120 && !menuAbierto) {
        header.classList.add('header--oculto')
    } else {
        header.classList.remove('header--oculto')
    }

    if (currentScroll > 40) {
        header.classList.add('header--fondo')
    } else {
        header.classList.remove('header--fondo')
    }

    lastScroll = currentScroll
})


// ---------- 2. Menú del celular: abre y cierra ----------

const menuBtn = document.querySelector('.header__menu-btn')

menuBtn.addEventListener('click', function () {
    const abierto = menu.classList.toggle('abierto')
    menuBtn.setAttribute('aria-expanded', abierto)
    menuBtn.textContent = abierto ? 'Cerrar' : 'Menú'
    header.classList.add('header--fondo')
})

// al tocar un link del menú, se cierra solo
menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
        menu.classList.remove('abierto')
        menuBtn.setAttribute('aria-expanded', false)
        menuBtn.textContent = 'Menú'
    })
})


// ---------- 3. Aparición al scrollear ----------
// IntersectionObserver "mira" cada sección y avisa cuando entra en pantalla

const observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('visible')
            observador.unobserve(entrada.target)
        }
    })
}, { threshold: 0.15 })

document.querySelectorAll('.reveal').forEach(function (el) {
    observador.observe(el)
})


// ---------- 4. Galería: se puede arrastrar con el mouse ----------
// (con el dedo o el trackpad ya funciona sola)

const galeria = document.querySelector('.galeria__track')
let arrastrando = false
let inicioX = 0
let scrollInicial = 0

galeria.addEventListener('mousedown', function (e) {
    arrastrando = true
    inicioX = e.pageX
    scrollInicial = galeria.scrollLeft
    galeria.classList.add('arrastrando')
})

window.addEventListener('mouseup', function () {
    arrastrando = false
    galeria.classList.remove('arrastrando')
})

galeria.addEventListener('mousemove', function (e) {
    if (!arrastrando) return
    e.preventDefault()
    galeria.scrollLeft = scrollInicial - (e.pageX - inicioX)
})


// ---------- 5. Año del footer, siempre actualizado ----------

document.querySelector('#anio').textContent = new Date().getFullYear()
