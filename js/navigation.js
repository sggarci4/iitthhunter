/* ============================================
   NAVIGATION - Funcionalidad del menú
   - Menú móvil (hamburguesa)
   - Smooth scroll
   - Header sticky con cambio de estilo
============================================ */

// ===== VARIABLES GLOBALES =====
const header = document.getElementById('header');
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// ===== MENÚ MÓVIL (HAMBURGUESA) =====
// Abrir/cerrar menú al hacer clic en hamburguesa
if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', function() {
        // Toggle de clases para animar
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });
}

// Cerrar menú al hacer clic en un link (móvil)
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        // Solo cerrar en móvil (cuando el menú está visible)
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    });
});

// Cerrar menú al hacer clic fuera (móvil)
document.addEventListener('click', function(event) {
    const isClickInsideNav = navMenu.contains(event.target);
    const isClickOnToggle = mobileToggle.contains(event.target);
    
    // Si el clic es fuera del menú y no es en el botón toggle
    if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
    }
});

// ===== HEADER STICKY CON SCROLL =====
// Agregar clase "scrolled" cuando se hace scroll
let lastScrollY = window.scrollY;

window.addEventListener('scroll', function() {
    const currentScrollY = window.scrollY;
    
    // Agregar sombra al header después de 100px
    if (currentScrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Opcional: Ocultar header al hacer scroll hacia abajo
    // Descomentar si quieres este efecto
    /*
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    */
    
    lastScrollY = currentScrollY;
});

// ===== SMOOTH SCROLL =====
// Scroll suave al hacer clic en enlaces ancla (#)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        
        // Si es solo "#", ir al inicio
        if (targetId === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }
        
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Obtener altura del header para compensar
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== MARCAR LINK ACTIVO SEGÚN SECCIÓN =====
// Opcional: Resaltar el link del menú según la sección visible
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150; // Offset para activar antes
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            // Quitar clase active de todos
            navLinks.forEach(link => link.classList.remove('active'));
            // Agregar clase active al link actual
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

// Ejecutar al hacer scroll (opcional)
// Descomentar si quieres este efecto
/*
window.addEventListener('scroll', highlightNavLink);
*/

// ===== PREVENIR SCROLL HORIZONTAL =====
// Prevenir desbordamiento horizontal accidental
document.body.style.overflowX = 'hidden';

console.log('Navigation JS cargado correctamente');