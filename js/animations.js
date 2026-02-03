/* ============================================
   ANIMATIONS - Efectos visuales sutiles
   - Scroll reveal (elementos aparecen al scroll)
   - Animaciones de entrada
============================================ */

// ===== INTERSECTION OBSERVER (Detección de scroll) =====
// Esta API moderna detecta cuando un elemento entra en la vista

const observerOptions = {
    threshold: 0.15, // Elemento debe estar 15% visible
    rootMargin: '0px 0px -50px 0px' // Activar 50px antes del viewport
};

// Crear el observer
const scrollObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Elemento entró en vista - agregar clase
            entry.target.classList.add('animate-in');
            
            // Opcional: Dejar de observar después de animar
            // scrollObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// ===== ELEMENTOS A ANIMAR =====
// Seleccionar elementos que queremos animar
const elementsToAnimate = document.querySelectorAll(`
    .section-header,
    .about-card,
    .service-card,
    .timeline-item,
    .industry-item,
    .hero-content,
    .hero-image
`);

// Agregar clase inicial (antes de animar)
elementsToAnimate.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    // Observar el elemento
    scrollObserver.observe(element);
});

// ===== ESTILOS DE ANIMACIÓN =====
// Crear estilos dinámicamente
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    /* Delays escalonados para cards */
    .about-card:nth-child(1),
    .service-card:nth-child(1) {
        transition-delay: 0s;
    }
    
    .about-card:nth-child(2),
    .service-card:nth-child(2) {
        transition-delay: 0.1s;
    }
    
    .about-card:nth-child(3),
    .service-card:nth-child(3) {
        transition-delay: 0.2s;
    }
    
    .about-card:nth-child(4),
    .service-card:nth-child(4) {
        transition-delay: 0.3s;
    }
    
    /* Industrias con delays menores */
    .industry-item {
        transition-delay: 0.05s;
    }
`;
document.head.appendChild(styleSheet);

// ===== ANIMACIÓN DE STATS (CONTADORES) =====
// Animar números del hero stats
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target); // Solo animar una vez
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalValue = parseInt(stat.textContent);
        const duration = 2000; // 2 segundos
        const increment = finalValue / (duration / 16); // 60fps
        let currentValue = 0;
        
        const timer = setInterval(() => {
            currentValue += increment;
            
            if (currentValue >= finalValue) {
                stat.textContent = finalValue + '+';
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(currentValue) + '+';
            }
        }, 16);
    });
}

// ===== PARALLAX SUTIL (OPCIONAL) =====
// Efecto parallax muy sutil en el hero
const heroImage = document.querySelector('.hero-image');

if (heroImage && window.innerWidth > 768) {
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.3; // Velocidad del parallax
        
        if (scrolled < 800) { // Solo hasta cierto punto
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    });
}

// ===== LAZY LOADING DE IMÁGENES =====
// Las imágenes con loading="lazy" ya funcionan nativamente
// Este código es respaldo para navegadores viejos
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    // Observar imágenes con data-src
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

console.log('Animations JS cargado correctamente');