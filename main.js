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


// ---------- 5. El nombre del hero entra letra por letra ----------
// Parte cada palabra en letras sueltas (<span class="char">) y le da a cada una
// un número (--i) para que el CSS las haga entrar una atrás de la otra.

document.querySelectorAll('.split').forEach(function (palabra) {
    const letras = palabra.textContent.trim().split('')
    palabra.textContent = ''
    letras.forEach(function (letra, i) {
        const span = document.createElement('span')
        span.className = 'char'
        span.textContent = letra
        span.style.setProperty('--i', i + (palabra.classList.contains('outline') ? 5 : 0))
        palabra.appendChild(span)
    })
})


// ---------- 6. Artistas: entran de a uno, con un pequeño retraso cada uno ----------

document.querySelectorAll('.artistas__lista li').forEach(function (li, i) {
    li.style.transitionDelay = (i * 70) + 'ms'
})


// ---------- 7. Movimientos atados al scroll (estilo Apple) ----------
// Una sola función que corre en cada frame mientras scrolleás:
// a) la foto grande se abre según cuánto bajaste (--p va de 0 a 1)
// b) las fotos de las puertas se mueven un poco más lento que la página (parallax)

const expand = document.querySelector('.expand')
const parallaxFotos = document.querySelectorAll('.parallax')
const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
let pedido = false

function actualizarScroll() {
    pedido = false
    const alto = window.innerHeight

    if (expand) {
        const caja = expand.getBoundingClientRect()
        const recorrido = caja.height - alto
        let p = -caja.top / (recorrido * 0.75)
        p = Math.min(Math.max(p, 0), 1)
        expand.style.setProperty('--p', p.toFixed(3))
    }

    parallaxFotos.forEach(function (foto) {
        const caja = foto.parentElement.getBoundingClientRect()
        if (caja.bottom < 0 || caja.top > alto) return
        const centro = caja.top + caja.height / 2 - alto / 2
        foto.style.setProperty('--y', (centro * -0.12).toFixed(1) + 'px')
    })
}

if (!sinMovimiento) {
    window.addEventListener('scroll', function () {
        if (!pedido) {
            pedido = true
            requestAnimationFrame(actualizarScroll)
        }
    }, { passive: true })
    actualizarScroll()
}


// ---------- 8. Año del footer, siempre actualizado ----------

document.querySelector('#anio').textContent = new Date().getFullYear()
