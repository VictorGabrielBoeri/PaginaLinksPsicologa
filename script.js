// Carregar configurações do config.json
async function loadConfig() {
    try {
        const response = await fetch('config.json');
        const config = await response.json();
        
        // Aplicar configurações ao site
        applyConfig(config);
    } catch (error) {
        console.error('Erro ao carregar configurações:', error);
    }
}

function applyConfig(config) {
    // Atualizar título do site
    document.title = config.siteName;
    
    // Atualizar informações do perfil
    const profileName = document.querySelector('.profile-name');
    if (profileName) profileName.textContent = config.profile.name;
    
    const profileTitle = document.querySelector('.profile-title');
    if (profileTitle) profileTitle.textContent = config.profile.title;
    
    const profileBio = document.querySelector('.profile-bio');
    if (profileBio) profileBio.textContent = config.profile.bio;
    
    const profileLocation = document.querySelector('.profile-location');
    if (profileLocation) profileLocation.textContent = config.profile.location;
    
    // Atualizar foto do perfil
    const profilePhoto = document.querySelector('.profile-photo');
    if (profilePhoto && config.profile.photoUrl) {
        profilePhoto.src = config.profile.photoUrl;
    }
    
    // Aplicar cores do tema
    if (config.theme) {
        document.documentElement.style.setProperty('--primary-color', config.theme.primaryColor);
        document.documentElement.style.setProperty('--secondary-color', config.theme.secondaryColor);
        document.documentElement.style.setProperty('--accent-color', config.theme.accentColor);
    }
    
    // Configurar agendamento
    if (config.appointment && config.appointment.enabled) {
        const whatsappNumber = config.appointment.whatsappNumber;
        const whatsappLinks = document.querySelectorAll('.whatsapp-link');
        whatsappLinks.forEach(link => {
            link.href = `https://wa.me/${whatsappNumber}`;
        });
    }
}

// Carregar configurações quando a página carregar
document.addEventListener('DOMContentLoaded', loadConfig);

// Configuração
const config = {
    socialLinks: {
        whatsapp: '5511999887766',
        instagram: 'mariasilva_designer',
        portfolio: 'https://mariasilva-designer.com'
    }
};

// Declarar o objeto links
const links = {};

function customizePage() {
    // Atualizar links
    links.whatsapp = `https://wa.me/${config.socialLinks.whatsapp}?text=Olá! Gostaria de solicitar um orçamento para design.`;
    links.instagram = `https://instagram.com/${config.socialLinks.instagram}`;
    links.portfolio = config.socialLinks.portfolio;
}

function openLink(platform) {
    if (links[platform]) {
        window.open(links[platform], '_blank');
    }
}

// Adicionar eventos de clique aos cards
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar os links
    customizePage();
    
    // Modal de Agendamento
    const appointmentBtn = document.getElementById('appointmentBtn');
    const appointmentModal = document.getElementById('appointmentModal');
    const closeModal = document.getElementById('closeModal');
    const confirmAppointment = document.getElementById('confirmAppointment');
    
    // Abrir modal de agendamento
    appointmentBtn.addEventListener('click', function() {
        appointmentModal.style.display = 'block';
        trackClick('Agendamento');
    });
    
    // Fechar modal
    closeModal.addEventListener('click', function() {
        appointmentModal.style.display = 'none';
    });
    
    // Fechar modal clicando fora dele
    window.addEventListener('click', function(event) {
        if (event.target === appointmentModal) {
            appointmentModal.style.display = 'none';
        }
    });
    
    // Confirmar agendamento
    document.getElementById('confirmAppointment').addEventListener('click', function() {
        console.log('Botão confirmar clicado');
        
        const appointmentType = document.getElementById('appointmentType').value;
        const appointmentDate = selectedDate;
        const appointmentTime = selectedTime;
        const clientName = document.getElementById('clientName').value;
        const clientPhone = document.getElementById('clientPhone').value;
        const clientEmail = document.getElementById('clientEmail').value;
        const observations = document.getElementById('observations').value;
        
        console.log('Valores:', {
            appointmentType,
            appointmentDate,
            appointmentTime,
            clientName,
            clientPhone,
            clientEmail
        });
        
        if (appointmentType && appointmentDate && appointmentTime && clientName && clientPhone && clientEmail) {
            // NOVA ABORDAGEM: usar split e parseInt para garantir a data correta
            const dateParts = appointmentDate.split('-');
            const year = parseInt(dateParts[0]);
            const month = parseInt(dateParts[1]);
            const day = parseInt(dateParts[2]);
            
            // Formatar manualmente sem usar Date()
            const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
            
            let message = `Olá! Gostaria de agendar uma reunião:\n\n` +
                         `Tipo: ${appointmentType}\n` +
                         `Data: ${formattedDate}\n` +
                         `Horário: ${appointmentTime}\n` +
                         `Nome: ${clientName}\n` +
                         `Telefone: ${clientPhone}`;
            
            // Adicionar observações se houver
            if (observations.trim()) {
                message += `\nObservações: ${observations}`;
            }
            
            const whatsappUrl = `https://wa.me/5511999887766?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            
            // Fechar modal após enviar
            appointmentModal.style.display = 'none';
            
            // Limpar formulário e resetar seleções
            document.getElementById('appointmentForm').reset();
            selectedDate = null;
            selectedTime = null;
            
            // Voltar para o primeiro step
            document.getElementById('step3').style.display = 'none';
            document.getElementById('step1').style.display = 'block';
        } else {
            // Substituir alert por Notiflix
            // Verificar quais campos estão faltando
            let missingFields = [];
            
            if (!appointmentDate) missingFields.push('Data');
            if (!appointmentTime) missingFields.push('Horário');
            if (!appointmentType) missingFields.push('Tipo de reunião');
            if (!clientName) missingFields.push('Nome');
            if (!clientPhone) missingFields.push('WhatsApp');
            if (!clientEmail) missingFields.push('E-mail');
            
            let message = '⚠️ Preencha todos os campos obrigatórios!';
            if (missingFields.length > 0) {
                message += `\n\nCampos faltando: ${missingFields.join(', ')}`;
            }
            
            Notiflix.Notify.warning(message, {
                timeout: 6000,
                position: 'center-top',
                fontSize: '15px',
                width: '450px',
                borderRadius: '8px',
                showOnlyTheLastOne: true,
                clickToClose: true
            });
        }
    });
    
    // WhatsApp
    document.querySelector('.whatsapp-card').addEventListener('click', function() {
        openLink('whatsapp');
        trackClick('WhatsApp');
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

// Remover esta linha:
// new AppointmentSystem();

// Adicionar após a linha 28 (depois de customizePage();)

// Variáveis do calendário
let currentDate = new Date();
let selectedDate = null;
let selectedTime = null;

// Função para gerar o calendário
function generateCalendar(year, month) {
    const calendar = document.getElementById('calendar');
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    let calendarHTML = '<div class="calendar-grid">';
    
    // Cabeçalho dos dias da semana
    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    daysOfWeek.forEach(day => {
        calendarHTML += `<div class="calendar-header">${day}</div>`;
    });
    
    // Células vazias para os dias antes do primeiro dia do mês
    for (let i = 0; i < startingDayOfWeek; i++) {
        calendarHTML += '<div class="calendar-day empty"></div>';
    }
    
    // Dias do mês
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Zerar as horas para comparação correta
    
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        date.setHours(12, 0, 0, 0); // Definir meio-dia para evitar problemas de fuso horário
        
        const isToday = date.toDateString() === today.toDateString();
        const isPast = date < today && !isToday;
        const isWeekend = date.getDay() === 0 || date.getDay() === 6;
        
        let classes = 'calendar-day';
        if (isToday) classes += ' today';
        if (isPast) classes += ' past';
        if (isWeekend) classes += ' weekend';
        
        // Corrigir: usar formatação manual para evitar problemas de fuso horário
        const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        
        calendarHTML += `<div class="${classes}" data-date="${dateString}">${day}</div>`;
    }
    
    calendarHTML += '</div>';
    calendar.innerHTML = calendarHTML;
    
    // Adicionar eventos de clique nos dias
    document.querySelectorAll('.calendar-day:not(.empty):not(.past)').forEach(dayElement => {
        dayElement.addEventListener('click', function() {
            // Remover seleção anterior
            document.querySelectorAll('.calendar-day.selected').forEach(el => el.classList.remove('selected'));
            
            // Adicionar seleção atual
            this.classList.add('selected');
            selectedDate = this.dataset.date;
            
            // Debug: verificar a data selecionada
            console.log('Data selecionada:', selectedDate);
            
            // Habilitar botão próximo
            document.getElementById('nextToTime').disabled = false;
        });
    });
}

// Função para atualizar o display do mês/ano
function updateMonthDisplay() {
    const monthNames = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    
    document.getElementById('currentMonth').textContent = 
        `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
}

// Função para gerar horários disponíveis
function generateTimeSlots() {
    const timeSlots = document.getElementById('timeSlots');
    const slots = [
        '08:00', '09:00', '10:00', '11:00', 
        '14:00', '15:00', '16:00', '17:00'
    ];
    
    let slotsHTML = '';
    slots.forEach(time => {
        slotsHTML += `<div class="time-slot" data-time="${time}">${time}</div>`;
    });
    
    timeSlots.innerHTML = slotsHTML;
    
    // Adicionar eventos de clique nos horários
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.addEventListener('click', function() {
            document.querySelectorAll('.time-slot.selected').forEach(el => el.classList.remove('selected'));
            this.classList.add('selected');
            selectedTime = this.dataset.time;
            document.getElementById('nextToForm').disabled = false;
        });
    });
} // <- Esta chave estava faltando

// Adicionar dentro do DOMContentLoaded, após os eventos do modal

// Eventos do calendário
document.getElementById('prevMonth').addEventListener('click', function() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateMonthDisplay();
});

document.getElementById('nextMonth').addEventListener('click', function() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateMonthDisplay();
});

// Navegação entre steps
document.getElementById('nextToTime').addEventListener('click', function() {
    document.getElementById('step1').style.display = 'none';
    document.getElementById('step2').style.display = 'block';
    
    // CORRIGIR: usar formatação manual em vez de new Date()
    const dateParts = selectedDate.split('-');
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]);
    const day = parseInt(dateParts[2]);
    const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
    
    document.getElementById('selectedDateText').textContent = formattedDate;
    generateTimeSlots();
});

document.getElementById('backToCalendar').addEventListener('click', function() {
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step1').style.display = 'block';
});

document.getElementById('nextToForm').addEventListener('click', function() {
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step3').style.display = 'block';
    document.getElementById('summaryDate').textContent = new Date(selectedDate).toLocaleDateString('pt-BR');
    document.getElementById('summaryTime').textContent = selectedTime;
});

document.getElementById('backToTime').addEventListener('click', function() {
    document.getElementById('step3').style.display = 'none';
    document.getElementById('step2').style.display = 'block';
});

// Inicializar calendário quando o modal abrir
appointmentBtn.addEventListener('click', function() {
    appointmentModal.style.display = 'block';
    updateMonthDisplay(); // Gerar o calendário
    trackClick('Agendamento');
});
