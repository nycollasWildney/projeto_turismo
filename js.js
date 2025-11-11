// js.js (corrigido e unificado)
// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos dos botões
    const calendarBtn = document.getElementById('calendar-btn');
    const cartBtn = document.getElementById('cart-btn');
    const userBtn = document.getElementById('user-btn');
    const userDropdown = document.getElementById('user-dropdown');
    
    // Event listeners para os botões da barra superior
    calendarBtn.addEventListener('click', function() {
        console.log('Calendário clicado');
        // Redirecionar para a página do calendário
        window.location.href = 'calendario.html';
    });
    
    cartBtn.addEventListener('click', function() {
        console.log('Carrinho clicado');
    });
    
    // Menu dropdown do usuário
    userBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        userDropdown.classList.toggle('active');
    });
    
    // Fechar dropdown ao clicar fora
    document.addEventListener('click', function(e) {
        if (!userDropdown.contains(e.target) && !userBtn.contains(e.target)) {
            userDropdown.classList.remove('active');
        }
    });
    
    // Ações do menu dropdown
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            
            switch(action) {
                case 'packages':
                    console.log('Navegando para Meus Pacotes...');
                    break;
                case 'calendar':
                    console.log('Navegando para Meu Calendário...');
                    window.location.href = 'calendario.html';
                    break;
                case 'settings':
                    console.log('Abrindo Configurações da Conta...');
                    break;
                case 'switch':
                    console.log('Trocar de Conta...');
                    break;
                case 'logout':
                    console.log('Saindo da conta...');
                    break;
            }
            
            userDropdown.classList.remove('active');
        });
    });
    
    // Funcionalidade para os cards de dias da semana
    const dayCards = document.querySelectorAll('.day-card');
    
    dayCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove classe active de todos os cards
            dayCards.forEach(c => c.classList.remove('active'));
            
            // Adiciona classe active ao card clicado
            this.classList.add('active');
            
            // Pega o nome do dia
            const dayName = this.querySelector('h3').textContent;
            const dayNumber = this.querySelector('.day-number').textContent;
            
            console.log(`Dia selecionado: ${dayName} - ${dayNumber}`);
        });
    });
    
    // Funcionalidade para os cards de ofertas
    const offerCards = document.querySelectorAll('.offer-card');
    const offersContainer = document.getElementById('offers-container');
    const scrollRightBtn = document.getElementById('scroll-right');
    const scrollLeftBtn = document.getElementById('scroll-left');
    
    // Botão de scroll para a direita
    if (scrollRightBtn) {
        scrollRightBtn.addEventListener('click', function() {
            offersContainer.scrollBy({
                left: 320,
                behavior: 'smooth'
            });
        });
    }
    
    // Botão de scroll para a esquerda
    if (scrollLeftBtn) {
        scrollLeftBtn.addEventListener('click', function() {
            offersContainer.scrollBy({
                left: -320,
                behavior: 'smooth'
            });
        });
    }
    
    offerCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            const price = this.querySelector('.price').textContent;
            
            console.log(`Oferta clicada: ${title} - ${price}`);
        });
    });
    
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
    let carouselInterval;
    
    function startCarousel() {
        carouselInterval = setInterval(() => {
            let nextSlide = currentSlide + 1;
            if (nextSlide >= totalSlides) {
                nextSlide = 0;
            }
            showSlide(nextSlide);
        }, 5000); // Muda a cada 5 segundos
    }
    
    // Iniciar auto-play apenas se existir o carrossel
    if (adsCarousel && adSlides.length > 0) {
        startCarousel();
        
        // Pausa o auto-play quando o mouse está sobre o carrossel
        adsCarousel.addEventListener('mouseenter', function() {
            clearInterval(carouselInterval);
        });
        
        adsCarousel.addEventListener('mouseleave', function() {
            startCarousel();
        });
    }
    
    // Efeito de scroll suave para a página
    window.addEventListener('scroll', function() {
        const topBar = document.querySelector('.top-bar');
        
        if (window.scrollY > 50) {
            topBar.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        } else {
            topBar.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Animação de entrada para os cards de ofertas
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.5s, transform 0.5s';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    offerCards.forEach(card => {
        observer.observe(card);
    });
    
    // Log de inicialização
    console.log('Site de Turismo carregado com sucesso!');
    console.log(`Total de ofertas disponíveis: ${offerCards.length}`);
});