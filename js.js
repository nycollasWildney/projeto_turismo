// js.js (completo e unificado)
document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos dos botões
    const calendarBtn = document.getElementById('calendar-btn');
    const cartBtn = document.getElementById('cart-btn');
    const userBtn = document.getElementById('user-btn');
    const userDropdown = document.getElementById('user-dropdown');
    
    // Dados de exemplo para eventos
    const eventsData = {
        '2025-05-28': [
            {
                title: 'Praia Paradisíaca',
                time: '09:00',
                description: '5 dias e 4 noites em resort all-inclusive com atividades para toda a família',
                price: 'R$ 3.499',
                image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=250&fit=crop'
            },
            {
                title: 'Aventura na Montanha',
                time: '14:30',
                description: 'Trilhas, cachoeiras e muito contato com a natureza em chalé aconchegante',
                price: 'R$ 2.199',
                image: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=400&h=250&fit=crop'
            }
        ],
        '2025-05-30': [
            {
                title: 'Parque Temático',
                time: '10:00',
                description: 'Diversão garantida com ingressos inclusos e hotel próximo às atrações',
                price: 'R$ 4.299',
                image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop'
            },
            {
                title: 'Praia Tropical',
                time: '13:00',
                description: 'Relaxe em águas cristalinas com toda infraestrutura para sua família',
                price: 'R$ 2.899',
                image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=250&fit=crop'
            }
        ],
        '2025-06-02': [
            {
                title: 'Fazenda Hotel',
                time: '11:30',
                description: 'Experiência rural completa com animais, cavalgadas e comida caseira',
                price: 'R$ 1.599',
                image: 'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=400&h=250&fit=crop'
            }
        ],
        '2025-06-05': [
            {
                title: 'Cidade Histórica',
                time: '10:00',
                description: 'Tour cultural pela cidade com visita a museus e pontos históricos',
                price: 'R$ 1.299',
                image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop'
            },
            {
                title: 'Gastronomia Local',
                time: '19:30',
                description: 'Jantar em restaurante típico com pratos da região',
                price: 'R$ 189',
                image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop'
            },
            {
                title: 'Passeio de Barco',
                time: '15:00',
                description: 'Passeio pelas ilhas próximas com parada para mergulho',
                price: 'R$ 299',
                image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=400&h=250&fit=crop'
            }
        ]
    };

    // Variáveis para o calendário mini
    let currentMiniDate = new Date();
    let currentMiniMonth = currentMiniDate.getMonth();
    let currentMiniYear = currentMiniDate.getFullYear();
    let selectedMiniDate = currentMiniDate;

    // Event listeners para os botões da barra superior
    calendarBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const calendarModalOverlay = document.getElementById('calendar-modal-overlay');
        if (calendarModalOverlay) {
            calendarModalOverlay.classList.add('active');
            renderMiniCalendar(currentMiniMonth, currentMiniYear);
            showTodaysEvents();
        }
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
    
    // Inicializar funcionalidades do modal do calendário
    initCalendarModal();
    
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

    // ========== FUNÇÕES DO CALENDÁRIO MINI ==========

    // Função para renderizar o calendário mini
    function renderMiniCalendar(month, year) {
        const miniCalendar = document.getElementById('mini-calendar');
        const calendarCurrentMonth = document.getElementById('calendar-current-month');
        
        if (!miniCalendar || !calendarCurrentMonth) return;
        
        // Atualizar título do mês
        const monthNames = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        calendarCurrentMonth.textContent = `${monthNames[month]} ${year}`;
        
        // Limpar calendário (exceto cabeçalhos)
        while (miniCalendar.children.length > 7) {
            miniCalendar.removeChild(miniCalendar.lastChild);
        }
        
        // Primeiro dia do mês
        const firstDay = new Date(year, month, 1);
        // Último dia do mês
        const lastDay = new Date(year, month + 1, 0);
        // Dia da semana do primeiro dia
        const firstDayIndex = firstDay.getDay();
        // Número de dias no mês
        const daysInMonth = lastDay.getDate();
        
        // Hoje
        const today = new Date();
        const isToday = (day) => {
            return day === today.getDate() && 
                   month === today.getMonth() && 
                   year === today.getFullYear();
        };
        
        // Verificar se é o dia selecionado
        const isSelected = (day) => {
            return day === selectedMiniDate.getDate() && 
                   month === selectedMiniDate.getMonth() && 
                   year === selectedMiniDate.getFullYear();
        };
        
        // Dias do mês anterior
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = firstDayIndex; i > 0; i--) {
            const dayEl = createMiniDayElement(prevMonthLastDay - i + 1, true, month, year);
            miniCalendar.appendChild(dayEl);
        }
        
        // Dias do mês atual
        for (let i = 1; i <= daysInMonth; i++) {
            const dayEl = createMiniDayElement(i, false, month, year, isToday(i), isSelected(i));
            miniCalendar.appendChild(dayEl);
        }
        
        // Dias do próximo mês
        const totalCells = 42; // 6 semanas * 7 dias
        const remainingCells = totalCells - (firstDayIndex + daysInMonth);
        for (let i = 1; i <= remainingCells; i++) {
            const dayEl = createMiniDayElement(i, true, month, year);
            miniCalendar.appendChild(dayEl);
        }
    }

    // Criar elemento de dia para o calendário mini
    function createMiniDayElement(day, isOtherMonth, month, year, isToday = false, isSelected = false) {
        const dayEl = document.createElement('div');
        dayEl.className = 'mini-calendar-day';
        
        if (isOtherMonth) {
            dayEl.classList.add('other-month');
        }
        
        if (isToday) {
            dayEl.classList.add('today');
        }
        
        if (isSelected) {
            dayEl.classList.add('selected');
        }
        
        const dayNumber = document.createElement('div');
        dayNumber.className = 'mini-calendar-day-number';
        dayNumber.textContent = day;
        dayEl.appendChild(dayNumber);
        
        // Verificar se há eventos para este dia
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const events = eventsData[dateStr] || [];
        
        if (events.length > 0 && !isOtherMonth) {
            // Adicionar indicador de eventos
            const eventIndicator = document.createElement('div');
            eventIndicator.className = 'mini-calendar-event-indicator';
            
            if (events.length === 1) {
                // Apenas uma bola azul
                const eventDot = document.createElement('div');
                eventDot.className = 'mini-calendar-event-dot';
                eventIndicator.appendChild(eventDot);
            } else {
                // "+K" onde K é número de eventos - 1
                const eventCount = document.createElement('div');
                eventCount.className = 'mini-calendar-event-count';
                eventCount.textContent = `+${events.length - 1}`;
                eventIndicator.appendChild(eventCount);
            }
            
            dayEl.appendChild(eventIndicator);
        }
        
        // Adicionar evento de clique para mostrar eventos do dia
        if (!isOtherMonth) {
            dayEl.style.cursor = 'pointer';
            dayEl.addEventListener('click', function() {
                selectedMiniDate = new Date(year, month, day);
                renderMiniCalendar(currentMiniMonth, currentMiniYear);
                showEventsForDayMini(dateStr, events);
            });
        }
        
        return dayEl;
    }

    // Mostrar eventos do dia no calendário mini
    function showEventsForDayMini(dateStr, events) {
        const miniEventsList = document.getElementById('mini-events-list');
        if (!miniEventsList) return;
        
        const date = new Date(dateStr);
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        
        const monthNames = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        
        // Atualizar título
        const eventsTitle = miniEventsList.previousElementSibling;
        if (eventsTitle) {
            eventsTitle.textContent = `Eventos - ${day} de ${monthNames[month]} de ${year}`;
        }
        
        if (events.length === 0) {
            miniEventsList.innerHTML = '<div class="no-events-mini">Nenhum evento agendado para este dia.</div>';
        } else {
            let eventsHTML = '';
            events.forEach(event => {
                eventsHTML += `
                    <div class="mini-event-item">
                        <div class="mini-event-title">${event.title}</div>
                        <div class="mini-event-time">${event.time}</div>
                        <div class="mini-event-price">${event.price}</div>
                    </div>
                `;
            });
            miniEventsList.innerHTML = eventsHTML;
        }
    }

    // Mostrar eventos de hoje ao abrir o modal
    function showTodaysEvents() {
        const today = new Date();
        const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        const events = eventsData[todayStr] || [];
        showEventsForDayMini(todayStr, events);
    }

    // Inicializar funcionalidades do modal do calendário
    function initCalendarModal() {
        const calendarModalOverlay = document.getElementById('calendar-modal-overlay');
        const closeCalendarModal = document.getElementById('close-calendar-modal');
        const calendarPrevMonth = document.getElementById('calendar-prev-month');
        const calendarNextMonth = document.getElementById('calendar-next-month');

        // Fechar modal do calendário
        if (closeCalendarModal) {
            closeCalendarModal.addEventListener('click', function() {
                calendarModalOverlay.classList.remove('active');
            });
        }
        
        // Fechar modal ao clicar fora
        if (calendarModalOverlay) {
            calendarModalOverlay.addEventListener('click', function(e) {
                if (e.target === calendarModalOverlay) {
                    calendarModalOverlay.classList.remove('active');
                }
            });
        }
        
        // Navegação do calendário mini
        if (calendarPrevMonth) {
            calendarPrevMonth.addEventListener('click', function() {
                currentMiniMonth--;
                if (currentMiniMonth < 0) {
                    currentMiniMonth = 11;
                    currentMiniYear--;
                }
                renderMiniCalendar(currentMiniMonth, currentMiniYear);
            });
        }
        
        if (calendarNextMonth) {
            calendarNextMonth.addEventListener('click', function() {
                currentMiniMonth++;
                if (currentMiniMonth > 11) {
                    currentMiniMonth = 0;
                    currentMiniYear++;
                }
                renderMiniCalendar(currentMiniMonth, currentMiniYear);
            });
        }
    }
});

// ========== FUNCIONALIDADE DE DESTAQUE PARA CARDS DE FAMÍLIA ==========

// Dados detalhados para os cards de família
const familyOffersData = {
    'Praia Paradisíaca': {
        title: 'Praia Paradisíaca',
        description: '5 dias e 4 noites em resort all-inclusive com atividades para toda a família. Inclui traslados, alimentação completa, bebidas não alcoólicas, atividades recreativas para crianças e adultos, spa para os pais e muito mais!',
        price: 'R$ 3.499',
        image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&h=400&fit=crop',
        details: [
            'Resort 5 estrelas com vista para o mar',
            'All-inclusive premium',
            'Atividades para crianças de 3-12 anos',
            'Spa e massagens inclusas',
            'Piscinas adulto e infantil'
        ],
        duration: '5 dias / 4 noites',
        location: 'Maceió, AL'
    },
    'Aventura na Montanha': {
        title: 'Aventura na Montanha',
        description: 'Trilhas, cachoeiras e muito contato com a natureza em chalé aconchegante. Experiência completa em meio à natureza com guias especializados, equipamentos de segurança e alimentação típica da região.',
        price: 'R$ 2.199',
        image: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=600&h=400&fit=crop',
        details: [
            'Chalé familiar com lareira',
            'Trilhas guiadas diárias',
            'Cachoeiras privativas',
            'Alimentação orgânica',
            'Observação de aves'
        ],
        duration: '4 dias / 3 noites',
        location: 'Campos do Jordão, SP'
    },
    'Cidade Histórica': {
        title: 'Cidade Histórica',
        description: 'Conheça a história e cultura local com guias especializados e hospedagem charmosa. Roteiro completo pelos principais pontos históricos com transporte exclusivo e ingressos inclusos.',
        price: 'R$ 1.899',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
        details: [
            'Hotel boutique histórico',
            'Guias especializados',
            'Ingressos para museus',
            'Transporte privativo',
            'Jantar temático inclusos'
        ],
        duration: '3 dias / 2 noites',
        location: 'Ouro Preto, MG'
    },
    'Parque Temático': {
        title: 'Parque Temático',
        description: 'Diversão garantida com ingressos inclusos e hotel próximo às atrações. Pacote completo com fast pass, hospedagem temática e refeições nos restaurantes do parque.',
        price: 'R$ 4.299',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop',
        details: [
            'Ingressos 3 dias incluídos',
            'Fast Pass ilimitado',
            'Hospedagem temática',
            'Refeições no parque',
            'Transporte interno'
        ],
        duration: '4 dias / 3 noites',
        location: 'São Paulo, SP'
    },
    'Praia Tropical': {
        title: 'Praia Tropical',
        description: 'Relaxe em águas cristalinas com toda infraestrutura para sua família. Resort familiar com estrutura completa, praia privativa e atividades aquáticas inclusas.',
        price: 'R$ 2.899',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop',
        details: [
            'Praia privativa',
            'Suíte familiar',
            'Atividades aquáticas',
            'Kids club profissional',
            'All-inclusive'
        ],
        duration: '5 dias / 4 noites',
        location: 'Porto de Galinhas, PE'
    },
    'Fazenda Hotel': {
        title: 'Fazenda Hotel',
        description: 'Experiência rural completa com animais, cavalgadas e comida caseira. Imersão total na vida no campo com atividades tradicionais e gastronomia típica.',
        price: 'R$ 1.599',
        image: 'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=600&h=400&fit=crop',
        details: [
            'Cavalgadas guiadas',
            'Alimentação caseira',
            'Contato com animais',
            'Arvorismo e tirolesa',
            'Lago para pesca'
        ],
        duration: '3 dias / 2 noites',
        location: 'Interior de São Paulo'
    }
};

// Criar overlay para destaque dos cards
function createFamilyCardOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'family-card-overlay';
    overlay.innerHTML = `
        <div class="family-card-modal">
            <button class="family-card-close-btn" id="family-card-close-btn">×</button>
            <div class="family-card-modal-content">
                <div class="family-card-image-container">
                    <img id="family-card-modal-image" src="" alt="">
                </div>
                <div class="family-card-details">
                    <h2 id="family-card-modal-title"></h2>
                    <div class="family-card-meta">
                        <span class="family-card-location" id="family-card-location"></span>
                        <span class="family-card-duration" id="family-card-duration"></span>
                    </div>
                    <p id="family-card-modal-description"></p>
                    <div class="family-card-features">
                        <h4>O que está incluído:</h4>
                        <ul id="family-card-features-list"></ul>
                    </div>
                    <div class="family-card-footer">
                        <div class="family-card-price" id="family-card-modal-price"></div>
                        <button class="add-to-cart-btn" id="add-to-cart-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                            Adicionar ao Carrinho
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Event listeners para o overlay
    const closeBtn = document.getElementById('family-card-close-btn');
    const overlayElement = document.querySelector('.family-card-overlay');
    
    closeBtn.addEventListener('click', closeFamilyCardOverlay);
    overlayElement.addEventListener('click', function(e) {
        if (e.target === overlayElement) {
            closeFamilyCardOverlay();
        }
    });
    
    // Event listener para o botão adicionar ao carrinho
    document.getElementById('add-to-cart-btn').addEventListener('click', function() {
        const title = document.getElementById('family-card-modal-title').textContent;
        addToCart(title);
    });
    
    return overlay;
}

// Mostrar overlay do card
function showFamilyCardOverlay(cardTitle) {
    const offerData = familyOffersData[cardTitle];
    if (!offerData) return;
    
    const overlay = document.querySelector('.family-card-overlay') || createFamilyCardOverlay();
    
    // Preencher dados
    document.getElementById('family-card-modal-image').src = offerData.image;
    document.getElementById('family-card-modal-image').alt = offerData.title;
    document.getElementById('family-card-modal-title').textContent = offerData.title;
    document.getElementById('family-card-location').textContent = offerData.location;
    document.getElementById('family-card-duration').textContent = offerData.duration;
    document.getElementById('family-card-modal-description').textContent = offerData.description;
    document.getElementById('family-card-modal-price').textContent = offerData.price;
    
    // Preencher lista de características
    const featuresList = document.getElementById('family-card-features-list');
    featuresList.innerHTML = '';
    offerData.details.forEach(detail => {
        const li = document.createElement('li');
        li.textContent = detail;
        featuresList.appendChild(li);
    });
    
    // Mostrar overlay
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevenir scroll
}

// Fechar overlay do card
function closeFamilyCardOverlay() {
    const overlay = document.querySelector('.family-card-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Restaurar scroll
    }
}

// Adicionar ao carrinho
function addToCart(itemTitle) {
    const offerData = familyOffersData[itemTitle];
    if (!offerData) return;
    
    // Simular adição ao carrinho
    console.log(`Adicionado ao carrinho: ${itemTitle} - ${offerData.price}`);
    
    // Mostrar feedback visual
    const addButton = document.getElementById('add-to-cart-btn');
    const originalText = addButton.innerHTML;
    
    addButton.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        Adicionado!
    `;
    addButton.style.backgroundColor = '#27ae60';
    
    setTimeout(() => {
        addButton.innerHTML = originalText;
        addButton.style.backgroundColor = '';
        closeFamilyCardOverlay();
    }, 1500);
}

// Adicionar event listeners aos cards de família
document.addEventListener('DOMContentLoaded', function() {
    // Esperar um pouco para garantir que os cards estejam carregados
    setTimeout(() => {
        const offerCards = document.querySelectorAll('.offer-card');
        
        offerCards.forEach(card => {
            card.addEventListener('click', function() {
                const title = this.querySelector('h3').textContent;
                showFamilyCardOverlay(title);
            });
            
            // Adicionar cursor pointer para indicar que é clicável
            card.style.cursor = 'pointer';
        });
        
        console.log(`Event listeners adicionados para ${offerCards.length} cards de família`);
    }, 500);
});

// Adicionar suporte para tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeFamilyCardOverlay();
    }
});