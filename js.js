// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    
    // ... (código anterior mantido) ...

    // Funcionalidade do carrossel de anúncios
    const adsCarousel = document.getElementById('ads-carousel');
    const carouselPrev = document.getElementById('carousel-prev');
    const carouselNext = document.getElementById('carousel-next');
    const carouselIndicators = document.getElementById('carousel-indicators');
    const indicators = document.querySelectorAll('.indicator');
    const adSlides = document.querySelectorAll('.ad-slide');
    
    let currentSlide = 0;
    const totalSlides = adSlides.length;
    
    // Função para mostrar slide específico
    function showSlide(slideIndex) {
        // Remove classe active de todos os slides e indicadores
        adSlides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Adiciona classe active ao slide e indicador atual
        adSlides[slideIndex].classList.add('active');
        indicators[slideIndex].classList.add('active');
        
        currentSlide = slideIndex;
    }
    
    // Event listeners para navegação do carrossel
    if (carouselNext) {
        carouselNext.addEventListener('click', function() {
            let nextSlide = currentSlide + 1;
            if (nextSlide >= totalSlides) {
                nextSlide = 0;
            }
            showSlide(nextSlide);
        });
    }
    
    if (carouselPrev) {
        carouselPrev.addEventListener('click', function() {
            let prevSlide = currentSlide - 1;
            if (prevSlide < 0) {
                prevSlide = totalSlides - 1;
            }
            showSlide(prevSlide);
        });
    }
    
    // Event listeners para os indicadores
    indicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            showSlide(slideIndex);
        });
    });
    
    // Auto-play do carrossel
    let carouselInterval = setInterval(() => {
        let nextSlide = currentSlide + 1;
        if (nextSlide >= totalSlides) {
            nextSlide = 0;
        }
        showSlide(nextSlide);
    }, 5000); // Muda a cada 5 segundos
    
    // Pausa o auto-play quando o mouse está sobre o carrossel
    if (adsCarousel) {
        adsCarousel.addEventListener('mouseenter', function() {
            clearInterval(carouselInterval);
        });
        
        adsCarousel.addEventListener('mouseleave', function() {
            carouselInterval = setInterval(() => {
                let nextSlide = currentSlide + 1;
                if (nextSlide >= totalSlides) {
                    nextSlide = 0;
                }
                showSlide(nextSlide);
            }, 5000);
        });
    }


});

    // Funcionalidade do carrossel de anúncios
    const adSlides = document.querySelectorAll('.ad-slide');
    const indicators = document.querySelectorAll('.indicator');
    const carouselPrev = document.getElementById('carousel-prev');
    const carouselNext = document.getElementById('carousel-next');
    
    let currentSlide = 0;
    const totalSlides = adSlides.length;
    
    // Função para mostrar slide específico
    function showSlide(slideIndex) {
        // Remove classe active de todos os slides e indicadores
        adSlides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Adiciona classe active ao slide e indicador atual
        adSlides[slideIndex].classList.add('active');
        indicators[slideIndex].classList.add('active');
        
        currentSlide = slideIndex;
    }
    
    // Event listeners para navegação do carrossel
    if (carouselNext) {
        carouselNext.addEventListener('click', function() {
            let nextSlide = currentSlide + 1;
            if (nextSlide >= totalSlides) {
                nextSlide = 0;
            }
            showSlide(nextSlide);
        });
    }
    
    if (carouselPrev) {
        carouselPrev.addEventListener('click', function() {
            let prevSlide = currentSlide - 1;
            if (prevSlide < 0) {
                prevSlide = totalSlides - 1;
            }
            showSlide(prevSlide);
        });
    }
    
    // Event listeners para os indicadores
    indicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            showSlide(slideIndex);
        });
    });
    
    // Auto-play do carrossel
    let carouselInterval = setInterval(() => {
        let nextSlide = currentSlide + 1;
        if (nextSlide >= totalSlides) {
            nextSlide = 0;
        }
        showSlide(nextSlide);
    }, 5000); // Muda a cada 5 segundos