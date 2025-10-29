// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos dos botões
    const calendarBtn = document.getElementById('calendar-btn');
    const cartBtn = document.getElementById('cart-btn');
    const userBtn = document.getElementById('user-btn');
    
    // Event listeners para os botões da barra superior
    calendarBtn.addEventListener('click', function() {
        alert('Calendário clicado! Aqui você pode adicionar funcionalidade de calendário.');
    });
    
    cartBtn.addEventListener('click', function() {
        alert('Carrinho clicado! Aqui você pode mostrar os itens do carrinho.');
    });
    
    userBtn.addEventListener('click', function() {
        alert('Usuário clicado! Aqui você pode adicionar login/perfil do usuário.');
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
            
            alert(`Você clicou em: ${title}\nPreço: ${price}\n\nAqui você pode adicionar ao carrinho ou ver mais detalhes.`);
        });
    });
    
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