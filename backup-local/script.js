// Smooth scrolling para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar transparente al hacer scroll
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = '#ffffff';
        header.style.backdropFilter = 'none';
    }
    
    lastScroll = currentScroll;
});

// Animación de aparición al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animación a las tarjetas de obra
document.querySelectorAll('.obra-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Aplicar animación a la sección de biografía
const bioContent = document.querySelector('.bio-content');
if (bioContent) {
    bioContent.style.opacity = '0';
    bioContent.style.transform = 'translateY(30px)';
    bioContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(bioContent);
}

// Efecto hover mejorado para las obras
document.querySelectorAll('.obra-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Lazy loading para imágenes (cuando se agreguen imágenes reales)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Lightbox Gallery
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const obraImgs = document.querySelectorAll('.obra-img');

let currentIndex = 0;
const totalImages = obraImgs.length;

// Arreglo con las rutas de las imágenes
const imageSources = Array.from(obraImgs).map(img => img.src);

// Abrir lightbox al hacer click en una imagen
obraImgs.forEach((img, index) => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
        currentIndex = index;
        openLightbox();
    });
});

function openLightbox() {
    lightboxImg.src = imageSources[currentIndex];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevenir scroll
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restaurar scroll
}

function showPrevImage() {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    lightboxImg.src = imageSources[currentIndex];
}

function showNextImage() {
    currentIndex = (currentIndex + 1) % totalImages;
    lightboxImg.src = imageSources[currentIndex];
}

// Event listeners
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    showPrevImage();
});
lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    showNextImage();
});

// Cerrar al hacer click fuera de la imagen
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Navegación con teclado
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    switch(e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            showPrevImage();
            break;
        case 'ArrowRight':
            showNextImage();
            break;
    }
});

// Console log de bienvenida
console.log('%c🎨 Galería de Oscar Berroeta', 'font-size: 20px; font-weight: bold; color: #e74c3c;');
console.log('%cHomenaje al artista (1954 - 1976).', 'font-size: 14px; color: #2c3e50;');
