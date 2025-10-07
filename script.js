
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 ToolHub iniciado!');
    setupNavigation();
    setupHomeCards();
    loadSavedData();
    setupTipRange();
});


function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            
            navButtons.forEach(btn => btn.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            this.classList.add('active');
            const targetElement = document.getElementById(targetSection + '-section');
            if (targetElement) {
                targetElement.classList.add('active');
            }
        });
    });
}

function setupHomeCards() {
    const toolCards = document.querySelectorAll('.tool-card');
    
    toolCards.forEach(card => {
        card.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            const targetButton = document.querySelector(`.nav-btn[data-section="${targetSection}"]`);
            if (targetButton) targetButton.click();
        });
    });
}


let currentDisplay = '0';
let shouldResetDisplay = false;

function appendToDisplay(value) {
    if (currentDisplay === '0' || shouldResetDisplay) {
        currentDisplay = value;
        shouldResetDisplay = false;
    } else {
        currentDisplay += value;
    }
    document.getElementById('calc-display').value = currentDisplay;
}

function clearDisplay() {
    currentDisplay = '0';
    document.getElementById('calc-display').value = currentDisplay;
}

function deleteLast() {
    if (currentDisplay.length > 1) {
        currentDisplay = currentDisplay.slice(0, -1);
    } else {
        currentDisplay = '0';
    }
    document.getElementById('calc-display').value = currentDisplay;
}

function calculate() {
    try {
        let expression = currentDisplay.replace(/×/g, '*');
        let result = eval(expression);
        
        if (!isFinite(result)) throw new Error('Divisão por zero');
        
        currentDisplay = result.toString();
        document.getElementById('calc-display').value = currentDisplay;
        shouldResetDisplay = true;
    } catch (error) {
        currentDisplay = 'Erro';
        document.getElementById('calc-display').value = currentDisplay;
        shouldResetDisplay = true;
    }
}


function setupTipRange() {
    const tipRange = document.getElementById('tip-range');
    const tipValue = document.getElementById('tip-value');
    
    if (tipRange && tipValue) {
        tipRange.addEventListener('input', function() {
            tipValue.textContent = this.value + '%';
        });
    }
}

function calculateTip() {
    const billAmount = parseFloat(document.getElementById('bill-amount').value);
    const tipPercentage = parseFloat(document.getElementById('tip-range').value);
    const peopleCount = parseInt(document.getElementById('people-count').value);
    
    if (!billAmount || billAmount <= 0) {
        alert('Por favor, insira um valor válido para a conta.');
        return;
    }
    
    const tipAmount = (billAmount * tipPercentage) / 100;
    const totalAmount = billAmount + tipAmount;
    const perPerson = totalAmount / peopleCount;
    
    const result = document.getElementById('tip-result');
    if (result) {
        result.innerHTML = `
            <strong>💡 Resultado:</strong><br>
            Gorjeta (${tipPercentage}%): R$ ${tipAmount.toFixed(2)}<br>
            Total: R$ ${totalAmount.toFixed(2)}<br>
            ${peopleCount > 1 ? `Por pessoa: R$ ${perPerson.toFixed(2)}` : ''}
        `;
    }
}


function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    
    if (!weight || !height || weight <= 0 || height <= 0) {
        alert('Por favor, insira valores válidos para peso e altura.');
        return;
    }
    
    const bmi = weight / (height * height);
    let classification = '';
    let color = '';
    
    if (bmi < 18.5) {
        classification = 'Abaixo do peso';
        color = '#ff6b6b';
    } else if (bmi < 25) {
        classification = 'Peso normal';
        color = '#51cf66';
    } else if (bmi < 30) {
        classification = 'Sobrepeso';
        color = '#ffd43b';
    } else if (bmi < 35) {
        classification = 'Obesidade Grau I';
        color = '#ff922b';
    } else if (bmi < 40) {
        classification = 'Obesidade Grau II';
        color = '#f76707';
    } else {
        classification = 'Obesidade Grau III';
        color = '#e03131';
    }
    
    const result = document.getElementById('bmi-result');
    if (result) {
        result.innerHTML = `
            <strong>📊 Seu IMC: ${bmi.toFixed(1)}</strong><br>
            <span style="color: ${color}; font-weight: bold;">${classification}</span>
        `;
    }
}


function convertUnits() {
    const value = parseFloat(document.getElementById('converter-value').value);
    const fromUnit = document.getElementById('converter-from').value;
    const toUnit = document.getElementById('converter-to').value;
    
    if (!value || value <= 0) {
        alert('Por favor, insira um valor válido.');
        return;
    }
    
    let result;
    let unitName = '';
    
    if (fromUnit === 'km' && toUnit === 'm') {
        result = value * 1000;
        unitName = 'metros';
    } else if (fromUnit === 'km' && toUnit === 'cm') {
        result = value * 100000;
        unitName = 'centímetros';
    } else if (fromUnit === 'm' && toUnit === 'km') {
        result = value / 1000;
        unitName = 'quilômetros';
    } else if (fromUnit === 'm' && toUnit === 'cm') {
        result = value * 100;
        unitName = 'centímetros';
    } else if (fromUnit === 'cm' && toUnit === 'm') {
        result = value / 100;
        unitName = 'metros';
    } else if (fromUnit === 'cm' && toUnit === 'km') {
        result = value / 100000;
        unitName = 'quilômetros';
    } else if (fromUnit === 'kg' && toUnit === 'lb') {
        result = value * 2.20462;
        unitName = 'libras';
    } else if (fromUnit === 'lb' && toUnit === 'kg') {
        result = value / 2.20462;
        unitName = 'quilogramas';
    } else if (fromUnit === 'c' && toUnit === 'f') {
        result = (value * 9/5) + 32;
        unitName = '°F';
    } else if (fromUnit === 'f' && toUnit === 'c') {
        result = (value - 32) * 5/9;
        unitName = '°C';
    } else {
        result = value;
        unitName = toUnit;
    }
    
    const resultElement = document.getElementById('converter-result');
    if (resultElement) {
        resultElement.innerHTML = `
            <strong>📏 Resultado:</strong><br>
            ${value} ${fromUnit} = ${result.toFixed(2)} ${unitName}
        `;
    }
}


function textToPDF() {
    const text = document.getElementById('pdf-text').value;
    const filename = document.getElementById('pdf-filename').value || 'documento';
    
    if (!text.trim()) {
        alert('Por favor, digite algum texto.');
        return;
    }
    
    try {
        
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        
        doc.setFont("helvetica");
        doc.setFontSize(12);
        
        
        const lines = doc.splitTextToSize(text, 180);
        
        
        doc.text(lines, 10, 10);
        
        
        doc.save(filename + '.pdf');
        
        showStatus('✅ PDF gerado com sucesso!', 'success');
    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        showStatus('❌ Erro ao gerar PDF. Tente novamente.', 'error');
    }
}

function htmlToPDF() {
    const htmlContent = document.getElementById('html-content').value;
    
    if (!htmlContent.trim()) {
        alert('Por favor, cole algum conteúdo HTML.');
        return;
    }
    
    try {
        
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;
        tempDiv.style.padding = '20px';
        document.body.appendChild(tempDiv);
        
        
        html2canvas(tempDiv).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            const imgWidth = 190;
            const pageHeight = 280;
            const imgHeight = canvas.height * imgWidth / canvas.width;
            let heightLeft = imgHeight;
            let position = 10;
            
            doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                doc.addPage();
                doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            
            doc.save('html-document.pdf');
            document.body.removeChild(tempDiv);
            showStatus('✅ PDF do HTML gerado com sucesso!', 'success');
        });
    } catch (error) {
        console.error('Erro ao gerar PDF do HTML:', error);
        showStatus('❌ Erro ao gerar PDF do HTML.', 'error');
    }
}

function imageToPDF() {
    const imageInput = document.getElementById('image-input');
    
    if (!imageInput.files || !imageInput.files[0]) {
        alert('Por favor, selecione uma imagem.');
        return;
    }
    
    const file = imageInput.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            const imgData = e.target.result;
            
            
            const img = new Image();
            img.src = imgData;
            
            img.onload = function() {
                const imgWidth = 190;
                const imgHeight = (img.height * imgWidth) / img.width;
                
                doc.addImage(imgData, 'JPEG', 10, 10, imgWidth, imgHeight);
                doc.save('imagem-convertida.pdf');
                showStatus('✅ Imagem convertida para PDF!', 'success');
            };
        } catch (error) {
            console.error('Erro ao converter imagem:', error);
            showStatus('❌ Erro ao converter imagem.', 'error');
        }
    };
    
    reader.readAsDataURL(file);
}


function loadSavedData() {
    
    const savedNotes = localStorage.getItem('studyNotes');
    if (savedNotes && document.getElementById('study-notes')) {
        document.getElementById('study-notes').value = savedNotes;
        showStatus('📝 Notas carregadas automaticamente!', 'success');
    }
    
    
    const savedFlashcards = localStorage.getItem('flashcards');
    if (savedFlashcards) {
        flashcards = JSON.parse(savedFlashcards);
        displayFlashcards(flashcards);
    }
}

function saveNotes() {
    const notes = document.getElementById('study-notes').value;
    
    if (!notes.trim()) {
        showStatus('⚠️ Digite algo antes de salvar.', 'error');
        return;
    }
    
    localStorage.setItem('studyNotes', notes);
    showStatus('✅ Notas salvas com sucesso!', 'success');
}

function clearNotes() {
    if (confirm('Tem certeza que deseja limpar todas as notas?')) {
        document.getElementById('study-notes').value = '';
        localStorage.removeItem('studyNotes');
        showStatus('🗑️ Notas limpas!', 'success');
    }
}

function exportNotes() {
    const notes = document.getElementById('study-notes').value;
    
    if (!notes.trim()) {
        showStatus('⚠️ Não há notas para exportar.', 'error');
        return;
    }
    
    
    document.getElementById('pdf-text').value = notes;
    document.getElementById('pdf-filename').value = 'minhas-anotacoes';
    textToPDF();
}


function downloadNotes() {
    const notes = document.getElementById('study-notes').value;
    
    if (!notes.trim()) {
        showStatus('⚠️ Não há notas para download.', 'error');
        return;
    }
    
    const blob = new Blob([notes], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'minhas-anotacoes.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showStatus('📥 Notas baixadas como TXT!', 'success');
}


let flashcards = [];

function addFlashcard() {
    const front = document.getElementById('flashcard-front').value.trim();
    const back = document.getElementById('flashcard-back').value.trim();
    
    if (!front || !back) {
        showStatus('⚠️ Preencha ambos os lados do flashcard.', 'error');
        return;
    }
    
    flashcards.push({ front, back });
    saveFlashcards();
    displayFlashcards(flashcards);
    
    document.getElementById('flashcard-front').value = '';
    document.getElementById('flashcard-back').value = '';
    showStatus('✅ Flashcard adicionado!', 'success');
}

function displayFlashcards(cards) {
    const container = document.getElementById('flashcards-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'flashcard-item';
        cardElement.innerHTML = `
            <div>
                <strong>${card.front}</strong> → ${card.back}
            </div>
            <button onclick="removeFlashcard(${index})">❌</button>
        `;
        container.appendChild(cardElement);
    });
}

function removeFlashcard(index) {
    flashcards.splice(index, 1);
    saveFlashcards();
    displayFlashcards(flashcards);
    showStatus('🗑️ Flashcard removido!', 'success');
}

function saveFlashcards() {
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
}

function clearFlashcards() {
    if (confirm('Tem certeza que deseja limpar todos os flashcards?')) {
        flashcards = [];
        saveFlashcards();
        displayFlashcards(flashcards);
        showStatus('🗑️ Todos os flashcards foram limpos!', 'success');
    }
}

function studyFlashcards() {
    if (flashcards.length === 0) {
        showStatus('⚠️ Não há flashcards para estudar.', 'error');
        return;
    }
    
    showStatus(`🎴 Você tem ${flashcards.length} flashcards para estudar!`, 'success');
}

function exportFlashcards() {
    if (flashcards.length === 0) {
        showStatus('⚠️ Não há flashcards para exportar.', 'error');
        return;
    }
    
    const flashcardsText = flashcards.map((card, index) => 
        `Card ${index + 1}:\nFrente: ${card.front}\nVerso: ${card.back}\n${'-'.repeat(30)}`
    ).join('\n\n');
    
    document.getElementById('pdf-text').value = flashcardsText;
    document.getElementById('pdf-filename').value = 'meus-flashcards';
    textToPDF();
}


let pomodoroInterval;
let isRunning = false;
let timeLeft = 25 * 60;
let isBreakTime = false;

function startPomodoro() {
    if (isRunning) return;
    
    let studyTime = parseInt(document.getElementById('study-time').value) || 25;
    let breakTime = parseInt(document.getElementById('break-time').value) || 5;
    
    studyTime = Math.min(Math.max(studyTime, 1), 120);
    breakTime = Math.min(Math.max(breakTime, 1), 30);
    
    timeLeft = (isBreakTime ? breakTime : studyTime) * 60;
    
    isRunning = true;
    pomodoroInterval = setInterval(updateTimer, 1000);
    updateDisplay();
    
    showStatus(`⏰ Timer ${isBreakTime ? 'de pausa' : 'de estudo'} iniciado!`, 'success');
}

function pausePomodoro() {
    isRunning = false;
    clearInterval(pomodoroInterval);
    showStatus('⏸️ Timer pausado!', 'success');
}

function resetPomodoro() {
    isRunning = false;
    isBreakTime = false;
    clearInterval(pomodoroInterval);
    
    let studyTime = parseInt(document.getElementById('study-time').value) || 25;
    studyTime = Math.min(Math.max(studyTime, 1), 120);
    
    timeLeft = studyTime * 60;
    updateDisplay();
    showStatus('⏹️ Timer resetado!', 'success');
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
    } else {
        clearInterval(pomodoroInterval);
        isRunning = false;
        isBreakTime = !isBreakTime;
        
        const message = isBreakTime ? 
            `⏰ Tempo de estudo acabou! Hora de uma pausa de ${document.getElementById('break-time').value} minutos.` :
            `🎯 Pausa terminada! Hora de voltar aos estudos por ${document.getElementById('study-time').value} minutos.`;
        
        alert(message);
        showStatus(isBreakTime ? '🔄 Modo pausa ativado!' : '🎯 Modo estudo ativado!', 'success');
        resetPomodoro();
    }
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    document.getElementById('timer-minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('timer-seconds').textContent = seconds.toString().padStart(2, '0');
    
    const timerDisplay = document.querySelector('.timer-display');
    if (timerDisplay) {
        timerDisplay.style.color = isBreakTime ? '#ff6b6b' : '#51cf66';
    }
}


function showStatus(message, type) {
    let statusElement = document.getElementById('notes-status');
    if (!statusElement) {
    
        statusElement = document.createElement('div');
        statusElement.id = 'notes-status';
        statusElement.className = 'status-message';
        document.querySelector('.notes-container').appendChild(statusElement);
    }
    
    statusElement.textContent = message;
    statusElement.className = `status-message status-${type}`;
    
    setTimeout(() => {
        statusElement.textContent = '';
        statusElement.className = 'status-message';
    }, 5000);
}

console.log('✅ ToolHub carregado com sucesso!');

// ===== PWA SERVICE WORKER =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js')
      .then(function(registration) {
        console.log('✅ Service Worker registrado com sucesso:', registration.scope);
      })
      .catch(function(error) {
        console.log('❌ Falha no Service Worker:', error);
      });
  });
}

// Detectar se é PWA
function isRunningAsPWA() {
  return window.matchMedia('(display-mode: standalone)').matches || 
         window.navigator.standalone === true;
}

if (isRunningAsPWA()) {
  console.log('📱 Executando como PWA');
  document.body.classList.add('pwa-mode');
}