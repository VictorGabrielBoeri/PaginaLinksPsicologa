// Configuração dos links
const links = {
    whatsapp: 'https://wa.me/5511999999999?text=Olá! Gostaria de solicitar um orçamento.',
    linkedin: 'https://linkedin.com/in/seu-perfil',
    instagram: 'https://instagram.com/seu-perfil',
    portfolio: 'https://seu-portfolio.com'
};

// Função para abrir links
function openLink(platform) {
    if (links[platform]) {
        window.open(links[platform], '_blank');
    }
}

// Adicionar eventos de clique aos cards
document.addEventListener('DOMContentLoaded', function() {
    // WhatsApp
    document.querySelector('.whatsapp-card').addEventListener('click', function() {
        openLink('whatsapp');
        trackClick('WhatsApp');
    });
    
    // LinkedIn
    document.querySelector('.linkedin-card').addEventListener('click', function() {
        openLink('linkedin');
        trackClick('LinkedIn');
    });
    
    // Instagram
    document.querySelector('.instagram-card').addEventListener('click', function() {
        openLink('instagram');
        trackClick('Instagram');
    });
    
    // Portfólio
    document.querySelector('.portfolio-card').addEventListener('click', function() {
        openLink('portfolio');
        trackClick('Portfolio');
    });
    
    // Efeito de parallax suave no scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.container');
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    });
    
    // Animação de entrada dos cards
    const cards = document.querySelectorAll('.link-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${0.1 * index}s`;
        card.classList.add('animate-in');
    });
    
    // Efeito de hover nos cards
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Função para rastrear cliques (opcional - para analytics)
function trackClick(platform) {
    console.log(`Clique registrado: ${platform}`);
    // Aqui você pode adicionar código para Google Analytics ou outras ferramentas
    // gtag('event', 'click', {
    //     event_category: 'Social Links',
    //     event_label: platform
    // });
}

// Função para atualizar a foto de perfil
function updateProfileImage(imageUrl) {
    const profileImg = document.getElementById('profileImg');
    if (profileImg && imageUrl) {
        profileImg.src = imageUrl;
    }
}

// Função para adicionar efeitos visuais
function addVisualEffects() {
    // Efeito de partículas no fundo (opcional)
    const container = document.querySelector('.container');
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            pointer-events: none;
            animation: float ${3 + Math.random() * 4}s infinite ease-in-out;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            z-index: -1;
        `;
        document.body.appendChild(particle);
    }
}

// CSS para animação das partículas (mantendo apenas uma versão)
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.1; }
        50% { transform: translateY(-20px) rotate(180deg); opacity: 0.3; }
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Inicializar efeitos visuais
addVisualEffects();

// Configurações personalizáveis
const config = {
    // Informações do Elildson Lima
    personalInfo: {
        name: 'Elildson Lima',
        title: 'Psicólogo',
        photo: 'img/perfil.jpg' // Caminho para a foto do Elildson
    },
    
    // Atualize com os links reais do Elildson
    socialLinks: {
        whatsapp: '5511999999999', // Número do Elildson
        linkedin: 'elildson-lima-psicologo', // Perfil LinkedIn do Elildson
        instagram: 'elildsonlima_psi', // Instagram do Elildson
        portfolio: 'https://elildson-lima-psicologo.com' // Site do Elildson
    }
};

// Função para personalizar a página
function customizePage() {
    // Atualizar informações pessoais
    document.querySelector('h1').textContent = config.personalInfo.name;
    document.querySelector('.subtitle').textContent = config.personalInfo.title;
    updateProfileImage(config.personalInfo.photo);
    
    // Atualizar links
    links.whatsapp = `https://wa.me/${config.socialLinks.whatsapp}?text=Olá! Gostaria de solicitar um orçamento.`;
    links.linkedin = `https://linkedin.com/in/${config.socialLinks.linkedin}`;
    links.instagram = `https://instagram.com/${config.socialLinks.instagram}`;
    links.portfolio = config.socialLinks.portfolio;
}

// Executar personalização quando a página carregar
document.addEventListener('DOMContentLoaded', customizePage);

// Sistema de Agendamento
class AppointmentSystem {
    constructor() {
        this.currentDate = new Date();
        this.selectedDate = null;
        this.selectedTime = null;
        this.currentStep = 1;
        
        // Horários disponíveis (pode ser configurado)
        this.availableHours = [
            '08:00', '09:00', '10:00', '11:00',
            '14:00', '15:00', '16:00', '17:00'
        ];
        
        // Dias da semana que atende (0 = domingo, 1 = segunda, etc.)
        this.workingDays = [1, 2, 3, 4, 5]; // Segunda a sexta
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.generateCalendar();
    }
    
    bindEvents() {
        // Abrir modal
        document.getElementById('appointmentBtn').addEventListener('click', () => {
            this.openModal();
        });
        
        // Fechar modal
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeModal();
        });
        
        // Fechar modal clicando fora
        document.getElementById('appointmentModal').addEventListener('click', (e) => {
            if (e.target.id === 'appointmentModal') {
                this.closeModal();
            }
        });
        
        // Navegação do calendário
        document.getElementById('prevMonth').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.generateCalendar();
        });
        
        document.getElementById('nextMonth').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.generateCalendar();
        });
        
        // Botões de navegação
        document.getElementById('nextToTime').addEventListener('click', () => {
            this.goToStep(2);
            this.generateTimeSlots();
        });
        
        document.getElementById('backToCalendar').addEventListener('click', () => {
            this.goToStep(1);
        });
        
        document.getElementById('nextToForm').addEventListener('click', () => {
            this.goToStep(3);
            this.updateSummary();
        });
        
        document.getElementById('backToTime').addEventListener('click', () => {
            this.goToStep(2);
        });
        
        // Confirmar agendamento
        document.getElementById('confirmAppointment').addEventListener('click', () => {
            this.confirmAppointment();
        });
    }
    
    openModal() {
        document.getElementById('appointmentModal').style.display = 'block';
        document.body.style.overflow = 'hidden';
        this.goToStep(1);
    }
    
    closeModal() {
        document.getElementById('appointmentModal').style.display = 'none';
        document.body.style.overflow = 'auto';
        this.resetForm();
    }
    
    goToStep(step) {
        // Esconder todos os steps
        document.querySelectorAll('.step').forEach(s => s.style.display = 'none');
        
        // Mostrar step atual
        document.getElementById(`step${step}`).style.display = 'block';
        this.currentStep = step;
    }
    
    generateCalendar() {
        const calendar = document.getElementById('calendar');
        const monthYear = document.getElementById('currentMonth');
        
        // Atualizar título do mês
        const months = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        monthYear.textContent = `${months[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
        
        // Limpar calendário
        calendar.innerHTML = '';
        
        // Cabeçalho dos dias da semana
        const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        weekDays.forEach(day => {
            const header = document.createElement('div');
            header.className = 'calendar-header';
            header.textContent = day;
            calendar.appendChild(header);
        });
        
        // Primeiro dia do mês
        const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
        
        // Dias do mês anterior para completar a primeira semana
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        
        // Gerar 42 dias (6 semanas)
        for (let i = 0; i < 42; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = date.getDate();
            
            // Verificar se é do mês atual
            if (date.getMonth() !== this.currentDate.getMonth()) {
                dayElement.classList.add('other-month');
            } else if (this.isDateAvailable(date)) {
                dayElement.classList.add('available');
                dayElement.addEventListener('click', () => {
                    this.selectDate(date, dayElement);
                });
            } else {
                dayElement.classList.add('unavailable');
            }
            
            calendar.appendChild(dayElement);
        }
    }
    
    isDateAvailable(date) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Não pode ser no passado
        if (date < today) return false;
        
        // Verificar se é dia útil
        if (!this.workingDays.includes(date.getDay())) return false;
        
        // Aqui você pode adicionar outras regras (feriados, etc.)
        return true;
    }
    
    selectDate(date, element) {
        // Remover seleção anterior
        document.querySelectorAll('.calendar-day.selected').forEach(el => {
            el.classList.remove('selected');
        });
        
        // Selecionar nova data
        element.classList.add('selected');
        this.selectedDate = new Date(date);
        
        // Habilitar botão próximo
        document.getElementById('nextToTime').disabled = false;
    }
    
    generateTimeSlots() {
        const timeSlots = document.getElementById('timeSlots');
        const selectedDateText = document.getElementById('selectedDateText');
        
        // Atualizar texto da data selecionada
        selectedDateText.textContent = this.selectedDate.toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Limpar horários
        timeSlots.innerHTML = '';
        
        // Gerar horários
        this.availableHours.forEach(hour => {
            const timeSlot = document.createElement('div');
            timeSlot.className = 'time-slot';
            timeSlot.textContent = hour;
            
            // Verificar se horário está disponível
            if (this.isTimeAvailable(hour)) {
                timeSlot.addEventListener('click', () => {
                    this.selectTime(hour, timeSlot);
                });
            } else {
                timeSlot.classList.add('unavailable');
            }
            
            timeSlots.appendChild(timeSlot);
        });
    }
    
    isTimeAvailable(time) {
        // Aqui você pode verificar se o horário já está ocupado
        // Por enquanto, todos os horários estão disponíveis
        return true;
    }
    
    selectTime(time, element) {
        // Remover seleção anterior
        document.querySelectorAll('.time-slot.selected').forEach(el => {
            el.classList.remove('selected');
        });
        
        // Selecionar novo horário
        element.classList.add('selected');
        this.selectedTime = time;
        
        // Habilitar botão próximo
        document.getElementById('nextToForm').disabled = false;
    }
    
    updateSummary() {
        document.getElementById('summaryDate').textContent = this.selectedDate.toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        document.getElementById('summaryTime').textContent = this.selectedTime;
    }
    
    confirmAppointment() {
        const form = document.getElementById('appointmentForm');
        const formData = new FormData(form);
        
        // Validar formulário
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        // Coletar dados
        const appointmentData = {
            date: this.selectedDate.toLocaleDateString('pt-BR'),
            time: this.selectedTime,
            name: document.getElementById('clientName').value,
            phone: document.getElementById('clientPhone').value,
            email: document.getElementById('clientEmail').value,
            type: document.getElementById('appointmentType').value,
            observations: document.getElementById('observations').value
        };
        
        // Criar mensagem para WhatsApp
        const message = this.createWhatsAppMessage(appointmentData);
        
        // Abrir WhatsApp
        const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        // Fechar modal
        this.closeModal();
        
        // Mostrar confirmação
        alert('Agendamento enviado! Você será redirecionado para o WhatsApp para confirmar.');
    }
    
    createWhatsAppMessage(data) {
        return `🗓️ *SOLICITAÇÃO DE AGENDAMENTO*\n\n` +
               `📅 *Data:* ${data.date}\n` +
               `🕐 *Horário:* ${data.time}\n` +
               `👤 *Nome:* ${data.name}\n` +
               `📱 *WhatsApp:* ${data.phone}\n` +
               `📧 *E-mail:* ${data.email}\n` +
               `🏥 *Tipo:* ${data.type}\n` +
               (data.observations ? `📝 *Observações:* ${data.observations}\n` : '') +
               `\n✨ Olá Laura! Gostaria de agendar uma consulta. Aguardo confirmação!`;
    }
    
    resetForm() {
        this.selectedDate = null;
        this.selectedTime = null;
        this.currentStep = 1;
        
        // Limpar formulário
        document.getElementById('appointmentForm').reset();
        
        // Desabilitar botões
        document.getElementById('nextToTime').disabled = true;
        document.getElementById('nextToForm').disabled = true;
        
        // Remover seleções
        document.querySelectorAll('.selected').forEach(el => {
            el.classList.remove('selected');
        });
    }
}

// Inicializar sistema de agendamento quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // WhatsApp
    document.querySelector('.whatsapp-card').addEventListener('click', function() {
        openLink('whatsapp');
        trackClick('WhatsApp');
    });
    
    // LinkedIn
    document.querySelector('.linkedin-card').addEventListener('click', function() {
        openLink('linkedin');
        trackClick('LinkedIn');
    });
    
    // Instagram
    document.querySelector('.instagram-card').addEventListener('click', function() {
        openLink('instagram');
        trackClick('Instagram');
    });
    
    // Portfólio
    document.querySelector('.portfolio-card').addEventListener('click', function() {
        openLink('portfolio');
        trackClick('Portfolio');
    });
    
    // Efeito de parallax suave no scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.container');
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    });
    
    // Animação de entrada dos cards
    const cards = document.querySelectorAll('.link-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${0.1 * index}s`;
        card.classList.add('animate-in');
    });
    
    // Efeito de hover nos cards
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Função para rastrear cliques (opcional - para analytics)
function trackClick(platform) {
    console.log(`Clique registrado: ${platform}`);
    // Aqui você pode adicionar código para Google Analytics ou outras ferramentas
    // gtag('event', 'click', {
    //     event_category: 'Social Links',
    //     event_label: platform
    // });
}

// Função para atualizar a foto de perfil
function updateProfileImage(imageUrl) {
    const profileImg = document.getElementById('profileImg');
    if (profileImg && imageUrl) {
        profileImg.src = imageUrl;
    }
}

// Inicializar sistema de agendamento
new AppointmentSystem();