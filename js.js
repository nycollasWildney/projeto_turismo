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