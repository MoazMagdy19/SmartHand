// App State
let appState = {
    isConnected: false,
    batteryLevel: 85,
    connectionStrength: 0,
    isCalibrated: false,
    language: 'en',
    childMode: true,
    emgSensitivity: 'medium',
    deviceName: ''
};

// Game State
let gameState = {
    started: false,
    score: 0,
    timeLeft: 60,
    balls: [],
    basketX: 50,
    encouragement: null,
    confetti: []
};

// Calibration State
let calibrationState = {
    currentStep: 'idle',
    measuring: false,
    emgValue: 0,
    progress: 0
};

// Voice Control State
let voiceState = {
    listening: false,
    recognizedCommand: null
};

// Intervals and Animations
let gameTimerInterval = null;
let ballSpawnInterval = null;
let ballMoveInterval = null;
let emgWaveformInterval = null;
let calibrationProgressInterval = null;

// Translations
const translations = {
    en: {
        'connection-title': 'Connect Device',
        'connection-subtitle': 'Scan for nearby Bluetooth devices',
        'scanning': 'Scanning...',
        'scan': 'Scan Devices',
        'connected': 'Connected',
        'control': 'Control Panel',
        'openHand': 'Open Hand',
        'closeHand': 'Close Hand',
        'lightGrip': 'Light Grip',
        'strongGrip': 'Strong Grip',
        'stop': 'Stop',
        'gripStrength': 'Grip Strength',
        'calibrate': 'Calibrate',
        'training': 'Training',
        'progress': 'Progress',
        'logs': 'Logs',
        'settings': 'Settings',
        'about': 'About',
        'calibration-title': 'EMG Calibration',
        'calibration-instruction': 'Follow the steps to calibrate your EMG sensors for optimal performance',
        'start-calibration': 'Start Calibration',
        'step1': 'Step 1: Relax your muscle',
        'step2': 'Step 2: Contract lightly',
        'step3': 'Step 3: Contract strongly',
        'instruction1': 'Keep your muscle completely relaxed',
        'instruction2': 'Contract your muscle gently',
        'instruction3': 'Contract your muscle as strong as you can',
        'measuring': 'Measuring...',
        'next-step': 'Next Step',
        'calibration-complete': 'Calibration Complete!',
        'calibration-success': 'Your profile has been saved successfully',
        'done': 'Done',
        'training-title': 'Balls Catch Game',
        'catch-ball': 'Close your hand to catch!',
        'start-game': 'Start Game',
        'score': 'Score',
        'time': 'Time',
        'close-hand-catch': 'Close Hand - Catch!',
        'game-over': 'Game Over!',
        'final-score': 'Final Score',
        'play-again': 'Play Again',
        'progress-title': 'Progress Tracking',
        'avg-accuracy': 'Avg Accuracy',
        'avg-time': 'Avg Time',
        'total-grasps': 'Total Grasps',
        'accuracy': 'Accuracy',
        'reaction-time': 'Reaction Time',
        'successful-grasps': 'Successful Grasps',
        'badges': 'Achievements',
        'settings-title': 'Settings',
        'language': 'Language',
        'mode': 'Mode',
        'child-mode': 'Child Mode',
        'emg-sensitivity': 'EMG Sensitivity',
        'low': 'Low',
        'medium': 'Medium',
        'high': 'High',
        'battery-alerts': 'Battery Alerts',
        'alert-20': 'Alert at 20%',
        'alert-10': 'Alert at 10%',
        'logs-title': 'Activity Logs',
        'about-title': 'About',
        'version': 'Version 1.0.0',
        'description': 'An assistive application that helps users control and train with EMG-based prosthetic hands through interactive games and exercises.',
        'how-to-use': 'How to Use',
        'step1': '1. Connect your prosthetic hand via Bluetooth',
        'step2': '2. Calibrate the EMG sensors for your muscle signals',
        'step3': '3. Practice control with interactive training games',
        'step4': '4. Track your progress and improve over time',
        'safety': 'Safety Information',
        'safety-info': 'Always follow your healthcare provider\'s instructions. If you experience discomfort, stop using the device and consult your doctor.',
        'support': 'Contact Support',
        'support-email': 'support@smarthand.com',
        'made-with': 'Made with',
        'for-users': 'for prosthetic hand users worldwide',
        'tap-to-speak': 'Tap to speak',
        'listening': 'Listening...',
        'supported-commands': 'Supported Commands:',
        'cmd-open': 'Open',
        'cmd-close': 'Close',
        'cmd-grip': 'Grip',
        'cmd-stop': 'Stop',
        'recognized': 'Command recognized:',
        'opening-hand': 'Opening Hand...',
        'closing-hand': 'Closing Hand...',
        'light-gripping': 'Light Gripping...',
        'strong-gripping': 'Strong Gripping...',
        'sending-command': 'Sending:'
    },
    ar: {
        'connection-title': 'توصيل الجهاز',
        'connection-subtitle': 'البحث عن أجهزة البلوتوث القريبة',
        'scanning': 'جاري البحث...',
        'scan': 'فحص الأجهزة',
        'connected': 'متصل',
        'control': 'لوحة التحكم',
        'openHand': 'فتح اليد',
        'closeHand': 'إغلاق اليد',
        'lightGrip': 'قبضة خفيفة',
        'strongGrip': 'قبضة قوية',
        'stop': 'توقف',
        'gripStrength': 'قوة القبضة',
        'calibrate': 'معايرة',
        'training': 'التدريب',
        'progress': 'التقدم',
        'logs': 'السجلات',
        'settings': 'الإعدادات',
        'about': 'حول',
        'calibration-title': 'معايرة EMG',
        'calibration-instruction': 'اتبع الخطوات لمعايرة مستشعرات EMG للحصول على أداء مثالي',
        'start-calibration': 'ابدأ المعايرة',
        'step1': 'الخطوة 1: أرح عضلتك',
        'step2': 'الخطوة 2: انقبض بخفة',
        'step3': 'الخطوة 3: انقبض بقوة',
        'instruction1': 'أبق عضلتك مسترخية تماماً',
        'instruction2': 'انقبض عضلتك بلطف',
        'instruction3': 'انقبض عضلتك بأقصى قوة ممكنة',
        'measuring': '...جاري القياس',
        'next-step': 'الخطوة التالية',
        'calibration-complete': '!اكتملت المعايرة',
        'calibration-success': 'تم حفظ ملفك الشخصي بنجاح',
        'done': 'تم',
        'training-title': 'لعبة التقاط الكرات',
        'catch-ball': '!أغلق يدك للإمساك',
        'start-game': 'ابدأ اللعبة',
        'score': 'النقاط',
        'time': 'الوقت',
        'close-hand-catch': 'إغلاق اليد - امسك!',
        'game-over': '!انتهت اللعبة',
        'final-score': 'النتيجة النهائية',
        'play-again': 'العب مرة أخرى',
        'progress-title': 'تتبع التقدم',
        'avg-accuracy': 'متوسط الدقة',
        'avg-time': 'متوسط الوقت',
        'total-grasps': 'إجمالي القبضات',
        'accuracy': 'الدقة',
        'reaction-time': 'وقت رد الفعل',
        'successful-grasps': 'القبضات الناجحة',
        'badges': 'الإنجازات',
        'settings-title': 'الإعدادات',
        'language': 'اللغة',
        'mode': 'الوضع',
        'child-mode': 'وضع الطفل',
        'emg-sensitivity': 'حساسية EMG',
        'low': 'منخفض',
        'medium': 'متوسط',
        'high': 'عالي',
        'battery-alerts': 'تنبيهات البطارية',
        'alert-20': 'تنبيه عند 20%',
        'alert-10': 'تنبيه عند 10%',
        'logs-title': 'سجلات النشاط',
        'about-title': 'حول',
        'version': 'الإصدار 1.0.0',
        'description': 'تطبيق مساعد يساعد المستخدمين على التحكم والتدريب باستخدام الأطراف الاصطناعية القائمة على EMG من خلال ألعاب وتمارين تفاعلية.',
        'how-to-use': 'كيفية الاستخدام',
        'step1': '1. قم بتوصيل يدك الاصطناعية عبر البلوتوث',
        'step2': '2. قم بمعايرة مستشعرات EMG لإشارات عضلاتك',
        'step3': '3. تدرب على التحكم من خلال ألعاب تدريبية تفاعلية',
        'step4': '4. تتبع تقدمك وتحسن بمرور الوقت',
        'safety': 'معلومات السلامة',
        'safety-info': 'اتبع دائماً تعليمات مقدم الرعاية الصحية الخاص بك. إذا شعرت بعدم الراحة، توقف عن استخدام الجهاز واستشر طبيبك.',
        'support': 'الدعم الفني',
        'support-email': 'support@smarthand.com',
        'made-with': 'صنع بـ',
        'for-users': 'لمستخدمي الأطراف الاصطناعية في جميع أنحاء العالم',
        'tap-to-speak': 'اضغط للتحدث',
        'listening': '...جاري الاستماع',
        'supported-commands': 'الأوامر المدعومة:',
        'cmd-open': 'افتح',
        'cmd-close': 'اغلق',
        'cmd-grip': 'امسك',
        'cmd-stop': 'توقف',
        'recognized': 'تم التعرف على الأمر:',
        'opening-hand': 'جاري فتح اليد...',
        'closing-hand': 'جاري إغلاق اليد...',
        'light-gripping': 'قبضة خفيفة...',
        'strong-gripping': 'قبضة قوية...',
        'sending-command': 'إرسال:'
    },
    fr: {
        'connection-title': 'Connecter l\'appareil',
        'connection-subtitle': 'Rechercher des appareils Bluetooth à proximité',
        'scanning': 'Recherche en cours...',
        'scan': 'Scanner les appareils',
        'connected': 'Connecté',
        'control': 'Panneau de contrôle',
        'openHand': 'Ouvrir la main',
        'closeHand': 'Fermer la main',
        'lightGrip': 'Prise légère',
        'strongGrip': 'Prise forte',
        'stop': 'Arrêt',
        'gripStrength': 'Force de préhension',
        'calibrate': 'Calibrer',
        'training': 'Formation',
        'progress': 'Progrès',
        'logs': 'Journaux',
        'settings': 'Paramètres',
        'about': 'À propos',
        'calibration-title': 'Calibration EMG',
        'calibration-instruction': 'Suivez les étapes pour calibrer vos capteurs EMG pour des performances optimales',
        'start-calibration': 'Démarrer la calibration',
        'step1': 'Étape 1: Détendez votre muscle',
        'step2': 'Étape 2: Contractez légèrement',
        'step3': 'Étape 3: Contractez fortement',
        'instruction1': 'Gardez votre muscle complètement détendu',
        'instruction2': 'Contractez votre muscle doucement',
        'instruction3': 'Contractez votre muscle aussi fort que possible',
        'measuring': 'Mesure en cours...',
        'next-step': 'Étape suivante',
        'calibration-complete': 'Calibration terminée!',
        'calibration-success': 'Votre profil a été enregistré avec succès',
        'done': 'Terminé',
        'training-title': 'Jeu d\'attraper les balles',
        'catch-ball': 'Fermez votre main pour attraper!',
        'start-game': 'Commencer le jeu',
        'score': 'Score',
        'time': 'Temps',
        'close-hand-catch': 'Fermer la main - Attraper!',
        'game-over': 'Jeu terminé!',
        'final-score': 'Score final',
        'play-again': 'Rejouer',
        'progress-title': 'Suivi des progrès',
        'avg-accuracy': 'Précision moy.',
        'avg-time': 'Temps moyen',
        'total-grasps': 'Total des prises',
        'accuracy': 'Précision',
        'reaction-time': 'Temps de réaction',
        'successful-grasps': 'Prises réussies',
        'badges': 'Réalisations',
        'settings-title': 'Paramètres',
        'language': 'Langue',
        'mode': 'Mode',
        'child-mode': 'Mode enfant',
        'emg-sensitivity': 'Sensibilité EMG',
        'low': 'Faible',
        'medium': 'Moyen',
        'high': 'Élevé',
        'battery-alerts': 'Alertes de batterie',
        'alert-20': 'Alerte à 20%',
        'alert-10': 'Alerte à 10%',
        'logs-title': 'Journaux d\'activité',
        'about-title': 'À propos',
        'version': 'Version 1.0.0',
        'description': 'Une application d\'assistance qui aide les utilisateurs à contrôler et à s\'entraîner avec des mains prothétiques basées sur EMG grâce à des jeux et des exercices interactifs.',
        'how-to-use': 'Comment utiliser',
        'step1': '1. Connectez votre main prothétique via Bluetooth',
        'step2': '2. Calibrez les capteurs EMG pour vos signaux musculaires',
        'step3': '3. Pratiquez le contrôle avec des jeux d\'entraînement interactifs',
        'step4': '4. Suivez vos progrès et améliorez-vous au fil du temps',
        'safety': 'Informations de sécurité',
        'safety-info': 'Suivez toujours les instructions de votre professionnel de santé. Si vous ressentez une gêne, arrêtez d\'utiliser l\'appareil et consultez votre médecin.',
        'support': 'Contacter le support',
        'support-email': 'support@smarthand.com',
        'made-with': 'Fait avec',
        'for-users': 'pour les utilisateurs de mains prothétiques dans le monde entier',
        'tap-to-speak': 'Appuyez pour parler',
        'listening': 'Écoute en cours...',
        'supported-commands': 'Commandes prises en charge:',
        'cmd-open': 'Ouvrir',
        'cmd-close': 'Fermer',
        'cmd-grip': 'Saisir',
        'cmd-stop': 'Arrêter',
        'recognized': 'Commande reconnue:',
        'opening-hand': 'Ouverture de la main...',
        'closing-hand': 'Fermeture de la main...',
        'light-gripping': 'Prise légère...',
        'strong-gripping': 'Prise forte...',
        'sending-command': 'Envoi:'
    }
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        showScreen('connection-screen');
    }, 2500);
    
    initializeLogs();
    initProgressCharts();
    updateLanguage(appState.language);
});

// Screen Navigation
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        
        if (screenId === 'training-screen') {
            resetTrainingGame();
        } else if (screenId === 'calibration-screen') {
            resetCalibration();
        } else if (screenId.startsWith('hand-')) {
            resetHandAnimation(screenId);
        }
    }
}

// Bluetooth Connection
function startBluetoothScan() {
    const deviceList = document.getElementById('device-list');
    const scanningIndicator = document.getElementById('scanning-indicator');
    const noDevices = document.getElementById('no-devices');
    const scanBtn = document.getElementById('scan-btn');
    
    scanningIndicator.style.display = 'flex';
    noDevices.style.display = 'none';
    deviceList.innerHTML = '';
    scanBtn.disabled = true;
    
    setTimeout(() => {
        const devices = [
            { name: 'SmartHand Pro V2', signal: 95, type: 'BLE', address: '00:11:22:33:44:55' },
            { name: 'HC-05 Module', signal: 78, type: 'Classic', address: 'AA:BB:CC:DD:EE:FF' },
            { name: 'ESP32-Hand', signal: 88, type: 'BLE', address: '12:34:56:78:90:AB' }
        ];
        
        scanningIndicator.style.display = 'none';
        scanBtn.disabled = false;
        
        if (devices.length === 0) {
            noDevices.style.display = 'flex';
        } else {
            devices.forEach((device, index) => {
                const deviceItem = document.createElement('div');
                deviceItem.className = 'device-item';
                deviceItem.innerHTML = `
                    <div class="device-item-info">
                        <div class="device-item-name">${device.name}</div>
                        <div class="device-item-details">Signal: ${device.signal}% • ${device.type}</div>
                    </div>
                    <button class="btn-primary" onclick="connectToDevice('${device.name}', '${device.address}')">${getTranslation('scan')}</button>
                `;
                deviceList.appendChild(deviceItem);
            });
        }
    }, 2000);
}

function connectToDevice(deviceName, address) {
    appState.isConnected = true;
    appState.deviceName = deviceName;
    appState.connectionStrength = 90;
    
    addLog('bluetooth', 'success', `Connected to ${deviceName}`);
    
    setTimeout(() => {
        showScreen('control-screen');
        updateDeviceName(deviceName);
    }, 1000);
}

function updateDeviceName(name) {
    const deviceNameEl = document.getElementById('device-name');
    if (deviceNameEl) {
        deviceNameEl.textContent = name;
    }
}

// Control Panel
function sendCommand(command, event) {
    const bluetoothCommands = {
        'open': 'OPEN',
        'close': 'CLOSE',
        'light_grip': 'LIGHT_GRIP',
        'strong_grip': 'STRONG_GRIP',
        'stop': 'STOP'
    };
    
    const bluetoothCommand = bluetoothCommands[command] || command.toUpperCase();
    
    console.log(`[Bluetooth] Sending command: ${bluetoothCommand}`);
    
    if (event) {
        const btn = event.target?.closest('.control-btn');
        if (btn) {
            btn.classList.add('active');
            setTimeout(() => {
                btn.classList.remove('active');
            }, 300);
        }
    }
    
    switch(command) {
        case 'open':
            showScreen('hand-open-screen');
            break;
        case 'close':
            showScreen('hand-close-screen');
            break;
        case 'light_grip':
            showScreen('hand-light-grip-screen');
            break;
        case 'strong_grip':
            showScreen('hand-strong-grip-screen');
            break;
        case 'stop':
            console.log(`[Bluetooth] Command STOP sent - returning to control`);
            break;
    }
    
    addLog('command', 'info', `Bluetooth command sent: ${bluetoothCommand}`);
}

function updateGripStrength(value) {
    document.getElementById('grip-value').textContent = value;
    console.log(`Grip strength: ${value}%`);
}

// Calibration
function startCalibration() {
    calibrationState.currentStep = 'step1';
    document.getElementById('calibration-idle').style.display = 'none';
    document.getElementById('calibration-active').style.display = 'flex';
    updateCalibrationStep();
}

function nextCalibrationStep() {
    if (calibrationState.measuring) return;
    
    if (calibrationState.currentStep === 'step1') {
        calibrationState.currentStep = 'step2';
        startMeasurement();
    } else if (calibrationState.currentStep === 'step2') {
        calibrationState.currentStep = 'step3';
        startMeasurement();
    } else if (calibrationState.currentStep === 'step3') {
        calibrationState.currentStep = 'complete';
        completeCalibration();
    }
    
    updateCalibrationStep();
}

function startMeasurement() {
    calibrationState.measuring = true;
    calibrationState.progress = 0;
    
    const progressContainer = document.getElementById('progress-container');
    const progressFill = document.getElementById('progress-fill');
    
    progressContainer.style.display = 'block';
    
    const duration = 3000;
    const interval = 50;
    const steps = duration / interval;
    let currentProgress = 0;
    
    calibrationProgressInterval = setInterval(() => {
        currentProgress += 100 / steps;
        calibrationState.progress = currentProgress;
        progressFill.style.width = currentProgress + '%';
        
        if (currentProgress >= 100) {
            clearInterval(calibrationProgressInterval);
            calibrationState.measuring = false;
            progressContainer.style.display = 'none';
        }
    }, interval);
    
    startEMGWaveform();
}

function updateCalibrationStep() {
    const stepTitle = document.getElementById('step-title');
    const stepInstruction = document.getElementById('step-instruction');
    const nextBtn = document.getElementById('calibration-next-btn');
    
    const steps = {
        step1: {
            title: getTranslation('step1'),
            instruction: getTranslation('instruction1'),
            color: '#3b82f6'
        },
        step2: {
            title: getTranslation('step2'),
            instruction: getTranslation('instruction2'),
            color: '#eab308'
        },
        step3: {
            title: getTranslation('step3'),
            instruction: getTranslation('instruction3'),
            color: '#f97316'
        }
    };
    
    if (calibrationState.currentStep !== 'complete' && calibrationState.currentStep !== 'idle') {
        const step = steps[calibrationState.currentStep];
        stepTitle.textContent = step.title;
        stepInstruction.textContent = step.instruction;
        
        if (calibrationState.currentStep === 'step3') {
            nextBtn.textContent = getTranslation('done');
        } else {
            nextBtn.textContent = getTranslation('next-step');
        }
    }
}

function completeCalibration() {
    document.getElementById('calibration-active').style.display = 'none';
    document.getElementById('calibration-complete').style.display = 'block';
    appState.isCalibrated = true;
    addLog('calibration', 'success', 'EMG calibration completed successfully');
}

function resetCalibration() {
    calibrationState.currentStep = 'idle';
    calibrationState.measuring = false;
    calibrationState.progress = 0;
    document.getElementById('calibration-idle').style.display = 'block';
    document.getElementById('calibration-active').style.display = 'none';
    document.getElementById('calibration-complete').style.display = 'none';
}

// EMG Waveform
function startEMGWaveform() {
    const canvas = document.getElementById('emg-waveform');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let phase = 0;
    
    if (emgWaveformInterval) {
        clearInterval(emgWaveformInterval);
    }
    
    emgWaveformInterval = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.strokeStyle = calibrationState.currentStep === 'step1' ? '#3b82f6' : 
                         calibrationState.currentStep === 'step2' ? '#eab308' : '#f97316';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        const centerY = canvas.height / 2;
        const amplitude = calibrationState.currentStep === 'step1' ? 20 : 
                         calibrationState.currentStep === 'step2' ? 40 : 60;
        const frequency = 0.02;
        
        for (let x = 0; x < canvas.width; x++) {
            const y = centerY + Math.sin((x * frequency) + phase) * amplitude;
            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.stroke();
        phase += 0.1;
        
        const emgValue = Math.floor(Math.random() * 50) + (calibrationState.currentStep === 'step1' ? 10 : 
                        calibrationState.currentStep === 'step2' ? 30 : 50);
        calibrationState.emgValue = emgValue;
        document.getElementById('emg-value').textContent = emgValue;
    }, 50);
}

// Training Game
function startTrainingGame() {
    gameState.started = true;
    gameState.score = 0;
    gameState.timeLeft = 60;
    gameState.balls = [];
    gameState.basketX = 50;
    
    document.getElementById('training-start').style.display = 'none';
    document.getElementById('training-game').style.display = 'flex';
    
    updateGameStats();
    
    gameTimerInterval = setInterval(() => {
        gameState.timeLeft--;
        updateGameStats();
        
        if (gameState.timeLeft <= 0) {
            endTrainingGame();
        }
    }, 1000);
    
    ballSpawnInterval = setInterval(() => {
        spawnBall();
    }, 1500);
    
    ballMoveInterval = setInterval(() => {
        moveBalls();
    }, 50);
}

function spawnBall() {
    const ball = {
        id: Date.now() + Math.random(),
        x: Math.random() * 80 + 10,
        y: 0,
        color: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'][Math.floor(Math.random() * 6)]
    };
    
    gameState.balls.push(ball);
    renderBalls();
}

function moveBalls() {
    gameState.balls = gameState.balls.map(ball => ({
        ...ball,
        y: ball.y + 2
    })).filter(ball => ball.y < 100);
    
    renderBalls();
    checkBallCatch();
}

function renderBalls() {
    const gameArea = document.getElementById('game-area');
    const existingBalls = gameArea.querySelectorAll('.ball');
    existingBalls.forEach(ball => ball.remove());
    
    gameState.balls.forEach(ball => {
        const ballEl = document.createElement('div');
        ballEl.className = 'ball';
        ballEl.style.left = ball.x + '%';
        ballEl.style.top = ball.y + '%';
        ballEl.style.backgroundColor = ball.color;
        ballEl.dataset.id = ball.id;
        gameArea.appendChild(ballEl);
    });
}

function moveBasketLeft() {
    gameState.basketX = Math.max(10, gameState.basketX - 15);
    updateBasketPosition();
}

function moveBasketRight() {
    gameState.basketX = Math.min(90, gameState.basketX + 15);
    updateBasketPosition();
}

function updateBasketPosition() {
    const basket = document.getElementById('basket');
    if (basket) {
        basket.style.left = `calc(${gameState.basketX}% - 40px)`;
    }
}

function catchBall() {
    const catchableRange = 15;
    const caughtBall = gameState.balls.find(ball => 
        ball.y > 70 && ball.y < 85 && Math.abs(ball.x - gameState.basketX) < catchableRange
    );
    
    if (caughtBall) {
        gameState.score++;
        gameState.balls = gameState.balls.filter(b => b.id !== caughtBall.id);
        renderBalls();
        updateGameStats();
        showEncouragement();
    }
}

function checkBallCatch() {
    const catchableRange = 15;
    gameState.balls.forEach(ball => {
        if (ball.y > 70 && ball.y < 85 && Math.abs(ball.x - gameState.basketX) < catchableRange) {
            gameState.score++;
            gameState.balls = gameState.balls.filter(b => b.id !== ball.id);
            renderBalls();
            updateGameStats();
            showEncouragement();
        }
    });
}

function showEncouragement() {
    const messages = {
        en: ['Great job!', 'Awesome!', 'Keep going!', 'Amazing!', 'Perfect!'],
        ar: ['عمل رائع!', 'ممتاز!', 'استمر!', 'مذهل!', 'مثالي!'],
        fr: ['Beau travail!', 'Génial!', 'Continuez!', 'Incroyable!', 'Parfait!']
    };
    
    const msg = messages[appState.language][Math.floor(Math.random() * messages[appState.language].length)];
    console.log(msg);
}

function endTrainingGame() {
    gameState.started = false;
    clearInterval(gameTimerInterval);
    clearInterval(ballSpawnInterval);
    clearInterval(ballMoveInterval);
    
    document.getElementById('training-game').style.display = 'none';
    document.getElementById('training-end').style.display = 'block';
    document.getElementById('final-score').textContent = gameState.score;
    
    addLog('training', 'success', `Training session completed - Score: ${gameState.score}`);
}

function restartTrainingGame() {
    resetTrainingGame();
    startTrainingGame();
}

function resetTrainingGame() {
    gameState.started = false;
    gameState.score = 0;
    gameState.timeLeft = 60;
    gameState.balls = [];
    gameState.basketX = 50;
    
    clearInterval(gameTimerInterval);
    clearInterval(ballSpawnInterval);
    clearInterval(ballMoveInterval);
    
    document.getElementById('training-start').style.display = 'block';
    document.getElementById('training-game').style.display = 'none';
    document.getElementById('training-end').style.display = 'none';
    
    const gameArea = document.getElementById('game-area');
    if (gameArea) {
        gameArea.querySelectorAll('.ball').forEach(ball => ball.remove());
    }
}

function updateGameStats() {
    document.getElementById('game-score').textContent = gameState.score;
    document.getElementById('game-timer').textContent = gameState.timeLeft + 's';
}

// Progress Charts
function initProgressCharts() {
    const weeklyData = [
        { day: 'Mon', accuracy: 65, reactionTime: 850, grasps: 12 },
        { day: 'Tue', accuracy: 70, reactionTime: 780, grasps: 15 },
        { day: 'Wed', accuracy: 75, reactionTime: 720, grasps: 18 },
        { day: 'Thu', accuracy: 78, reactionTime: 680, grasps: 20 },
        { day: 'Fri', accuracy: 82, reactionTime: 650, grasps: 22 },
        { day: 'Sat', accuracy: 85, reactionTime: 620, grasps: 25 },
        { day: 'Sun', accuracy: 88, reactionTime: 580, grasps: 28 }
    ];
    
    drawChart('accuracy-chart', weeklyData, 'accuracy', '#3b82f6');
    drawChart('reaction-chart', weeklyData, 'reactionTime', '#10b981');
    drawBarChart('grasps-chart', weeklyData, 'grasps', '#8b5cf6');
}

function drawChart(canvasId, data, key, color) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    const maxValue = Math.max(...data.map(d => d[key]));
    const minValue = Math.min(...data.map(d => d[key]));
    const range = maxValue - minValue || 1;
    
    ctx.clearRect(0, 0, width, height);
    
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = (height / 5) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    data.forEach((point, index) => {
        const x = (width / (data.length - 1)) * index;
        const y = height - ((point[key] - minValue) / range) * height;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
        
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
    });
    
    ctx.stroke();
    
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px Poppins';
    ctx.textAlign = 'center';
    data.forEach((point, index) => {
        const x = (width / (data.length - 1)) * index;
        ctx.fillText(point.day, x, height - 5);
    });
}

function drawBarChart(canvasId, data, key, color) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    const maxValue = Math.max(...data.map(d => d[key]));
    
    ctx.clearRect(0, 0, width, height);
    
    const barWidth = width / data.length - 10;
    const barSpacing = 10;
    
    data.forEach((point, index) => {
        const barHeight = (point[key] / maxValue) * (height - 40);
        const x = index * (barWidth + barSpacing) + barSpacing;
        const y = height - barHeight - 20;
        
        const gradient = ctx.createLinearGradient(0, y, 0, height - 20);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, color + '80');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, barHeight);
        
        ctx.fillStyle = '#1f2937';
        ctx.font = '12px Poppins';
        ctx.textAlign = 'center';
        ctx.fillText(point.day, x + barWidth / 2, height - 5);
        ctx.fillText(point[key], x + barWidth / 2, y - 5);
    });
}

// Settings
function changeLanguage(lang) {
    appState.language = lang;
    updateLanguage(lang);
    addLog('settings', 'info', `Language changed to ${lang}`);
}

function updateLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = translations[lang][key];
        if (translation) {
            el.textContent = translation;
        }
    });
    
    const langSelect = document.getElementById('language-select');
    if (langSelect) {
        langSelect.value = lang;
    }
    
    if (lang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
    }
}

function toggleChildMode(enabled) {
    appState.childMode = enabled;
    addLog('settings', 'info', `Mode changed to ${enabled ? 'Child' : 'Adult'}`);
}

function changeSensitivity(value) {
    appState.emgSensitivity = value;
    addLog('settings', 'info', `EMG Sensitivity set to ${value}`);
}

// Logs
function initializeLogs() {
    const mockLogs = [
        { type: 'bluetooth', status: 'success', message: 'Connected to SmartHand Pro V2', timestamp: '2025-11-08 14:32' },
        { type: 'calibration', status: 'success', message: 'EMG calibration completed successfully', timestamp: '2025-11-08 14:35' },
        { type: 'training', status: 'info', message: 'Training session started - Balls Catch Game', timestamp: '2025-11-08 14:40' },
        { type: 'training', status: 'success', message: 'Training session completed - Score: 28', timestamp: '2025-11-08 14:42' },
        { type: 'voice', status: 'success', message: 'Voice command recognized: "Open"', timestamp: '2025-11-08 14:45' },
        { type: 'bluetooth', status: 'info', message: 'Battery level: 85%', timestamp: '2025-11-08 14:50' },
        { type: 'voice', status: 'success', message: 'Voice command recognized: "Close"', timestamp: '2025-11-08 14:52' },
        { type: 'bluetooth', status: 'error', message: 'Connection lost - Auto-reconnecting...', timestamp: '2025-11-08 14:55' },
        { type: 'bluetooth', status: 'success', message: 'Reconnected to device', timestamp: '2025-11-08 14:56' },
        { type: 'calibration', status: 'info', message: 'EMG sensitivity adjusted to medium', timestamp: '2025-11-08 15:00' }
    ];
    
    mockLogs.forEach(log => renderLog(log));
}

function addLog(type, status, message) {
    const log = {
        type,
        status,
        message,
        timestamp: new Date().toLocaleString('en-US', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit', 
            hour: '2-digit', 
            minute: '2-digit' 
        })
    };
    
    renderLog(log);
}

function renderLog(log) {
    const logsList = document.getElementById('logs-list');
    if (!logsList) return;
    
    const icons = {
        bluetooth: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6.5 6.5l11 11M12 3v6m0 6v6M3 12h6m6 0h6"/></svg>',
        calibration: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
        training: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>',
        voice: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>',
        command: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20"/></svg>'
    };
    
    const badges = {
        success: 'Success',
        error: 'Error',
        info: 'Info'
    };
    
    const logItem = document.createElement('div');
    logItem.className = `log-item ${log.status}`;
    logItem.innerHTML = `
        <div class="log-item-header">
            <div class="log-icon">${icons[log.type] || icons.command}</div>
            <div class="log-content">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 4px;">
                    <p class="log-message">${log.message}</p>
                    <span class="log-badge ${log.status}">${badges[log.status]}</span>
                </div>
                <p class="log-timestamp">${log.timestamp}</p>
            </div>
        </div>
    `;
    
    logsList.insertBefore(logItem, logsList.firstChild);
}

// Voice Control
function toggleVoiceControl() {
    const modal = document.getElementById('voice-modal');
    if (modal.style.display === 'none' || !modal.style.display) {
        modal.style.display = 'flex';
    } else {
        closeVoiceControl();
    }
}

function closeVoiceControl() {
    const modal = document.getElementById('voice-modal');
    if (!modal) return;
    
    modal.style.display = 'none';
    voiceState.listening = false;
    voiceState.recognizedCommand = null;
    
    const micBtn = document.getElementById('voice-mic-btn');
    const statusEl = document.getElementById('voice-status');
    const recognizedEl = document.getElementById('voice-recognized');
    
    if (micBtn) micBtn.classList.remove('listening');
    if (statusEl) statusEl.textContent = getTranslation('tap-to-speak');
    if (recognizedEl) recognizedEl.style.display = 'none';
    
    if (window.currentRecognition) {
        window.currentRecognition.stop();
        window.currentRecognition = null;
    }
}

function startVoiceListening() {
    if (voiceState.listening) return;
    
    voiceState.listening = true;
    const micBtn = document.getElementById('voice-mic-btn');
    const statusEl = document.getElementById('voice-status');
    const recognizedEl = document.getElementById('voice-recognized');
    
    if (!micBtn || !statusEl) return;
    
    micBtn.classList.add('listening');
    statusEl.textContent = getTranslation('listening');
    if (recognizedEl) recognizedEl.style.display = 'none';
    
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        try {
            const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new Recognition();
            
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = appState.language === 'en' ? 'en-US' : 
                              appState.language === 'ar' ? 'ar-SA' : 'fr-FR';
            
            recognition.onstart = () => {
                console.log('Speech recognition started');
                statusEl.textContent = getTranslation('listening');
            };
            
            recognition.onresult = (event) => {
                if (event.results.length > 0) {
                    const command = event.results[event.results.length - 1][0].transcript.trim();
                    console.log('Recognized:', command);
                    handleVoiceCommand(command);
                }
            };
            
            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                micBtn.classList.remove('listening');
                voiceState.listening = false;
                
                let errorMsg = getTranslation('tap-to-speak');
                if (event.error === 'no-speech') {
                    errorMsg = 'No speech detected. Try again.';
                } else if (event.error === 'not-allowed') {
                    errorMsg = 'Microphone permission denied. Please allow microphone access.';
                } else if (event.error === 'network') {
                    errorMsg = 'Network error. Please check your connection.';
                }
                statusEl.textContent = errorMsg;
                
                setTimeout(() => {
                    closeVoiceControl();
                }, 3000);
            };
            
            recognition.onend = () => {
                console.log('Speech recognition ended');
                voiceState.listening = false;
                micBtn.classList.remove('listening');
                if (!voiceState.recognizedCommand) {
                    statusEl.textContent = getTranslation('tap-to-speak');
                }
            };
            
            recognition.start();
            window.currentRecognition = recognition;
        } catch (error) {
            console.error('Error initializing speech recognition:', error);
            micBtn.classList.remove('listening');
            statusEl.textContent = 'Speech recognition not available. Using fallback.';
            voiceState.listening = false;
            
            setTimeout(() => {
                const commands = {
                    en: ['Open', 'Close', 'Light Grip', 'Strong Grip', 'Stop'],
                    ar: ['افتح', 'اغلق', 'قبضة خفيفة', 'قبضة قوية', 'توقف'],
                    fr: ['Ouvrir', 'Fermer', 'Prise légère', 'Prise forte', 'Arrêter']
                };
                
                const randomCommand = commands[appState.language][Math.floor(Math.random() * commands[appState.language].length)];
                handleVoiceCommand(randomCommand);
            }, 2000);
        }
    } else {
        console.log('Web Speech API not supported, using fallback');
        statusEl.textContent = 'Speech API not supported. Using simulation...';
        
        setTimeout(() => {
            const commands = {
                en: ['Open', 'Close', 'Light Grip', 'Strong Grip', 'Stop'],
                ar: ['افتح', 'اغلق', 'قبضة خفيفة', 'قبضة قوية', 'توقف'],
                fr: ['Ouvrir', 'Fermer', 'Prise légère', 'Prise forte', 'Arrêter']
            };
            
            const randomCommand = commands[appState.language][Math.floor(Math.random() * commands[appState.language].length)];
            handleVoiceCommand(randomCommand);
        }, 2000);
    }
}

function handleVoiceCommand(command) {
    const micBtn = document.getElementById('voice-mic-btn');
    const statusEl = document.getElementById('voice-status');
    const recognizedEl = document.getElementById('voice-recognized');
    
    voiceState.recognizedCommand = command;
    voiceState.listening = false;
    
    micBtn.classList.remove('listening');
    statusEl.textContent = getTranslation('tap-to-speak');
    recognizedEl.style.display = 'block';
    document.getElementById('recognized-command').textContent = command;
    
    if (window.currentRecognition) {
        window.currentRecognition.stop();
        window.currentRecognition = null;
    }
    
    const commandLower = command.toLowerCase();
    let actionCommand = null;
    
    if (commandLower.includes('open') || commandLower.includes('افتح') || commandLower.includes('ouvrir')) {
        actionCommand = 'open';
    } else if (commandLower.includes('close') || commandLower.includes('اغلق') || commandLower.includes('fermer')) {
        actionCommand = 'close';
    } else if (commandLower.includes('light') || commandLower.includes('خفيفة') || commandLower.includes('légère')) {
        actionCommand = 'light_grip';
    } else if (commandLower.includes('strong') || commandLower.includes('قوية') || commandLower.includes('forte')) {
        actionCommand = 'strong_grip';
    } else if (commandLower.includes('grip') || commandLower.includes('قبضة') || commandLower.includes('prise')) {
        actionCommand = 'light_grip';
    } else if (commandLower.includes('stop') || commandLower.includes('توقف') || commandLower.includes('arrêter')) {
        actionCommand = 'stop';
    }
    
    if (actionCommand) {
        setTimeout(() => {
            closeVoiceControl();
            sendCommand(actionCommand);
        }, 1000);
        
        addLog('voice', 'success', `Voice command recognized: "${command}" → ${actionCommand}`);
    } else {
        addLog('voice', 'error', `Voice command not recognized: "${command}"`);
        statusEl.textContent = 'Command not recognized. Try: Open, Close, Light Grip, or Strong Grip';
        
        setTimeout(() => {
            closeVoiceControl();
        }, 3000);
    }
}

// About
function contactSupport() {
    window.open(`mailto:${getTranslation('support-email')}`, '_blank');
}

// Hand Animation Reset
function resetHandAnimation(screenId) {
    const handModel = document.querySelector(`#${screenId} .hand-model`);
    if (handModel?.classList) {
        const animationClass = Array.from(handModel.classList).find(cls => cls.includes('animation'));
        if (animationClass) {
            handModel.classList.remove(animationClass);
            void handModel.offsetWidth;
            handModel.classList.add(animationClass);
        }
    }
    
    const videoMap = {
        'hand-open-screen': 'hand-open-video',
        'hand-close-screen': 'hand-close-video',
        'hand-light-grip-screen': 'hand-light-grip-video',
        'hand-strong-grip-screen': 'hand-strong-grip-video'
    };
    
    const videoId = videoMap[screenId];
    if (videoId) {
        const video = document.getElementById(videoId);
        if (video) {
            video.currentTime = 0;
            video.play().catch(err => {
                console.log('Video autoplay prevented:', err);
            });
        }
    }
    
    const commandMap = {
        'hand-open-screen': 'OPEN',
        'hand-close-screen': 'CLOSE',
        'hand-light-grip-screen': 'LIGHT_GRIP',
        'hand-strong-grip-screen': 'STRONG_GRIP'
    };
    
    const command = commandMap[screenId];
    if (command) {
        const indicator = document.querySelector(`#${screenId} .bluetooth-indicator span`);
        if (indicator) {
            const sendingText = getTranslation('sending-command');
            indicator.textContent = `${sendingText} ${command}`;
        }
    }
}

// Utility Functions
function getTranslation(key) {
    return translations[appState.language][key] || key;
}

// Cleanup
window.addEventListener('beforeunload', () => {
    clearInterval(gameTimerInterval);
    clearInterval(ballSpawnInterval);
    clearInterval(ballMoveInterval);
    clearInterval(emgWaveformInterval);
    clearInterval(calibrationProgressInterval);
});
