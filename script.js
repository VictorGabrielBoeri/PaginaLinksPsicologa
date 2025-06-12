// Configuração
const config = {
    socialLinks: {
        whatsapp: '5585986106410',
        instagram: 'psicologoelildsonlima',
        portfolio: 'https://elildson-lima-psicologo.com'
    }
};

// Declarar o objeto links
const links = {};

function customizePage() {
    // Atualizar links
    links.whatsapp = `https://wa.me/${config.socialLinks.whatsapp}`;
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
        
        // Remove a linha do appointmentType
        // const appointmentType = document.getElementById('appointmentType')?.value || '';
        const clientName = document.getElementById('clientName')?.value || '';
        const clientPhone = document.getElementById('clientPhone')?.value || '';
        const clientEmail = document.getElementById('clientEmail')?.value || '';
        const observations = document.getElementById('observations')?.value || '';
        
        // Pegar os novos campos adicionados com null checks
        const tiposAbordagem = document.getElementById('tiposAbordagem')?.value || '';
        const esportes = document.getElementById('esportes')?.value || '';
        const dependenciaDigital = document.getElementById('dependenciaDigital')?.value || '';
        const neuropsicologia = document.getElementById('neuropsicologia')?.value || '';
        const appointmentDate = selectedDate;
        const appointmentTimes = selectedTimes; // Array de horários múltiplos
        
        // Remove these duplicate declarations (lines 77-80):
        // const tiposAbordagem = document.getElementById('tiposAbordagem').value;
        // const esportes = document.getElementById('esportes').value;
        // const dependenciaDigital = document.getElementById('dependenciaDigital').value;
        // const neuropsicologia = document.getElementById('neuropsicologia').value;
        
        console.log('Valores:', {
            // appointmentType, // Remove esta linha
            appointmentDate,
            appointmentTimes,
            clientName,
            clientPhone,
            clientEmail
        });
        
        // Remove appointmentType da validação
        if (appointmentDate && appointmentTimes.length > 0 && clientName && clientPhone && clientEmail) {
            // NOVA ABORDAGEM: usar split e parseInt para garantir a data correta
            const dateParts = appointmentDate.split('-');
            const year = parseInt(dateParts[0]);
            const month = parseInt(dateParts[1]);
            const day = parseInt(dateParts[2]);
            
            // Formatar manualmente sem usar Date()
            const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
            
            // CORREÇÃO: Usar appointmentTimes em vez de appointmentTime
            let message = `*AGENDAMENTO DE CONSULTA*\n\n`;
            message += `*Nome:* ${clientName}\n`;
            message += `*WhatsApp:* ${clientPhone}\n`;
            message += `*Email:* ${clientEmail}\n`;
            message += `*Data:* ${formattedDate}\n`;
            message += `*Horários:* ${appointmentTimes.join(', ')}\n`;
            
            // Adicionar observações se houver
            if (observations.trim()) {
                message += `\n *Observações:* ${observations}`;
            }
            
            const whatsappUrl = `https://wa.me/5585986106410?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            
            // Fechar modal após enviar
            document.getElementById('appointmentModal').style.display = 'none';
            
            // Limpar formulário e resetar seleções
            document.getElementById('appointmentForm').reset();
            selectedDate = null;
            selectedTimes = []; // CORREÇÃO: limpar array de horários
            
            // Limpar seleções visuais
            document.querySelectorAll('.calendar-day.selected').forEach(el => el.classList.remove('selected'));
            document.querySelectorAll('.time-slot.selected').forEach(el => el.classList.remove('selected'));
            
            // Voltar para o primeiro step
            document.getElementById('step3').style.display = 'none';
            document.getElementById('step1').style.display = 'block';
            
            // Mostrar notificação de sucesso
            Notiflix.Notify.success('Redirecionando para WhatsApp...', {
                timeout: 3000,
                position: 'center-top'
            });
            
        } else {
            // Verificar quais campos estão faltando
            let missingFields = [];
            
            if (!appointmentType) missingFields.push('Tipo de consulta');
            if (!appointmentDate) missingFields.push('Data');
            if (!appointmentTimes.length) missingFields.push('Horário'); // CORREÇÃO: verificar array
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
    
    // LinkedIn
    // Remover estas linhas duplicadas (495-499):
    // document.querySelector('.linkedin-card').addEventListener('click', function() {
    //     openLink('linkedin');
    //     trackClick('LinkedIn');
    // });
    
    // Instagram
    document.querySelector('.instagram-card').addEventListener('click', function() {
        openLink('instagram');
        trackClick('Instagram');
    });
    
    // Conheça meu trabalho (abre modal)
    document.querySelector('.work-card').addEventListener('click', function() {
        document.getElementById('workModal').style.display = 'block';
        trackClick('Portfolio Modal');
    });
    
    // Remover estas linhas:
    // openLink('portfolio');
    // trackClick('Portfolio');
    
    // Efeito de parallax suave no scroll (desabilitado no Safari mobile)
    // window.addEventListener('scroll', function() {
    //     const scrolled = window.pageYOffset;
    //     const parallax = document.querySelector('.container');
    //     const speed = scrolled * 0.5;
    //     parallax.style.transform = `translateY(${speed}px)`;
    // });
    
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
let selectedTimes = []; // Mudança: array para múltiplos horários

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
    
    // Organizar horários por turnos
    const shifts = {
        manha: {
            title: 'Manhã',
            icon: '🌅',
            times: ['10:30', '11:30']
        },
        tarde: {
            title: 'Tarde',
            icon: '☀️',
            times: ['14:00', '15:00', '16:00', '17:00']
        },
        noite: {
            title: 'Noite',
            icon: '🌙',
            times: ['18:00', '19:00', '20:00', '21:00']
        }
    };
    
    let slotsHTML = '';
    
    // Gerar HTML para cada turno
    Object.keys(shifts).forEach(shiftKey => {
        const shift = shifts[shiftKey];
        slotsHTML += `
            <div class="shift-section">
                <h4 class="shift-title">
                    <span class="shift-icon">${shift.icon}</span>
                    ${shift.title}
                </h4>
                <div class="shift-slots">
        `;
        
        shift.times.forEach(time => {
            slotsHTML += `<div class="time-slot" data-time="${time}">${time}</div>`;
        });
        
        slotsHTML += `
                </div>
            </div>
        `;
    });
    
    timeSlots.innerHTML = slotsHTML;
    
    // Adicionar eventos de clique nos horários - MODIFICADO para múltipla seleção
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.addEventListener('click', function() {
            const timeValue = this.dataset.time;
            
            if (this.classList.contains('selected')) {
                // Se já está selecionado, remove da seleção
                this.classList.remove('selected');
                selectedTimes = selectedTimes.filter(time => time !== timeValue);
            } else {
                // Se não está selecionado, adiciona à seleção
                this.classList.add('selected');
                selectedTimes.push(timeValue);
            }
            
            // Habilitar botão "Próximo" se pelo menos um horário estiver selecionado
            document.getElementById('nextToForm').disabled = selectedTimes.length === 0;
            
            // Atualizar o texto do resumo
            updateTimeSummary();
        });
    });
}

// Nova função para atualizar o resumo dos horários
function updateTimeSummary() {
    const summaryElement = document.getElementById('summaryTime');
    if (selectedTimes.length > 0) {
        summaryElement.textContent = selectedTimes.sort().join(', ');
    } else {
        summaryElement.textContent = '';
    }
}

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

// Around line 453 - Fix the summary display
document.getElementById('nextToForm').addEventListener('click', function() {
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step3').style.display = 'block';
    document.getElementById('summaryDate').textContent = new Date(selectedDate).toLocaleDateString('pt-BR');
    document.getElementById('summaryTime').textContent = selectedTimes.join(', '); // Fixed: use selectedTimes array
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


function confirmAppointment() {
    const name = document.getElementById('clientName').value;
    const phone = document.getElementById('clientPhone').value;
    const email = document.getElementById('clientEmail').value;
    const appointmentType = document.getElementById('appointmentType').value;
    const approachType = document.getElementById('approachType').value;
    const sportsArea = document.getElementById('sportsArea').value;
    const digitalDependency = document.getElementById('digitalDependency').value;
    const neuropsychology = document.getElementById('neuropsychology').value;
    const observations = document.getElementById('observations').value;
    
    // Verificar campos obrigatórios
    const missingFields = [];
    if (!name) missingFields.push('Nome');
    if (!phone) missingFields.push('WhatsApp');
    if (!email) missingFields.push('E-mail');
    if (!appointmentType) missingFields.push('Tipo de consulta');
    if (!approachType) missingFields.push('Tipos de abordagem');
    if (!selectedDate) missingFields.push('Data');
    if (!selectedTime) missingFields.push('Horário');
    
    if (missingFields.length > 0) {
        let message = 'PREENCHA OS CAMPOS OBRIGATÓRIOS:\n\n';
        missingFields.forEach(field => {
            message += `\u2022 ${field}\n`;
        });
        
        Notiflix.Notify.warning(message, {
            timeout: 5000,
            fontSize: '16px',
            width: '300px'
        });
        return;
    }
    
    // Construir mensagem do WhatsApp
    const parts = selectedDate.split('-');
    const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
    
    let message = `\u{1F4C5} *AGENDAMENTO DE CONSULTA*\n\n`;
    message += `\u{1F464} *Nome:* ${name}\n`;
    message += `\u{1F4F1} *WhatsApp:* ${phone}\n`;
    message += `\u{1F4E7} *E-mail:* ${email}\n`;
    message += `\u{1F4C5} *Data:* ${formattedDate}\n`;
    message += `\u{1F551} *Horário:* ${selectedTime}\n`;
    message += `\u{1F4CB} *Tipo de consulta:* ${appointmentType}\n`;
    message += `\u{1F9E0} *Abordagem:* ${approachType}\n`;
    
    if (sportsArea) {
        message += `\u{26BD} *Esporte:* ${sportsArea}\n`;
    }
    
    if (digitalDependency) {
        message += `\u{1F4F1} *Dependência digital:* ${digitalDependency}\n`;
    }
    
    if (neuropsychology) {
        message += `\u{1F9E0} *Neuropsicologia:* ${neuropsychology}\n`;
    }
    
    if (observations) {
        message += `\n\u{1F4DD} *Observações:*\n${observations}`;
    }
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/5511999999999?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
}


// Modal Conheça meu trabalho
document.getElementById('workBtn').addEventListener('click', function() {
    document.getElementById('workModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
});

document.getElementById('closeWorkModal').addEventListener('click', function() {
    document.getElementById('workModal').style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Fechar modal clicando fora
window.addEventListener('click', function(event) {
    const workModal = document.getElementById('workModal');
    if (event.target === workModal) {
        workModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

function phoneMask(value) {
    // Remove tudo que não é dígito
    value = value.replace(/\D/g, '');
    
    // Aplica a máscara baseada no tamanho
    if (value.length <= 10) {
        // Telefone fixo: (11) 1234-5678
        value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
        // Celular: (11) 91234-5678
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    
    return value;
}

// Aplicar máscara ao campo de telefone
document.getElementById('clientPhone').addEventListener('input', function(e) {
    let value = e.target.value;
    
    // Remove caracteres não numéricos para validação
    let numbersOnly = value.replace(/\D/g, '');
    
    // Limita a 11 dígitos (DDD + 9 dígitos)
    if (numbersOnly.length > 11) {
        numbersOnly = numbersOnly.slice(0, 11);
    }
    
    // Aplica a máscara
    e.target.value = phoneMask(numbersOnly);
});

// Permitir apenas números e alguns caracteres especiais
document.getElementById('clientPhone').addEventListener('keypress', function(e) {
    // Permite: números, backspace, delete, tab, escape, enter
    if ([8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
        // Permite: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
        (e.keyCode === 65 && e.ctrlKey === true) ||
        (e.keyCode === 67 && e.ctrlKey === true) ||
        (e.keyCode === 86 && e.ctrlKey === true) ||
        (e.keyCode === 88 && e.ctrlKey === true)) {
        return;
    }
    
    // Permite apenas números
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});
