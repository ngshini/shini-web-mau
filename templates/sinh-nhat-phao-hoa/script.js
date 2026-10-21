document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const envelopeContainer = document.getElementById('envelopeContainer');
    const unfoldButton = document.getElementById('unfoldButton');
    const finalGreetingElement = document.getElementById('finalGreeting');

    const steps = {
        step1: document.getElementById('step1'),
        step2: document.getElementById('step2'),
        step3: document.getElementById('step3'),
        step4: document.getElementById('step4'),
    };

    const cfg = window.TPL_CFG || {};
    const messageGreeting = (cfg.loiChucNgan && String(cfg.loiChucNgan).trim()) || 'Chúc mừng sinh nhật,'; // Lời chào gõ chữ — chỉnh trong trình chỉnh sửa

    // --- Nhạc: giai điệu "Happy Birthday" (nhạc truyền thống, đã hết bản quyền) phát bằng WebAudio ---
    let audioCtx = null;
    function playBirthdayMelody() {
        try {
            audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
            const notes = [ // G G A G C' B | G G A G D' C' | G G G' E' C' B A | F F E' C' D' C'
                [392,.75],[392,.25],[440,1],[392,1],[523,1],[494,2],
                [392,.75],[392,.25],[440,1],[392,1],[587,1],[523,2],
                [392,.75],[392,.25],[784,1],[659,1],[523,1],[494,1],[440,2],
                [698,.75],[698,.25],[659,1],[523,1],[587,1],[523,2]
            ];
            const beat = 0.42; let t = audioCtx.currentTime + 0.05;
            notes.forEach(([freq, len]) => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'sine'; osc.frequency.value = freq;
                gain.gain.setValueAtTime(0.0001, t);
                gain.gain.exponentialRampToValueAtTime(0.18, t + 0.03);
                gain.gain.exponentialRampToValueAtTime(0.0001, t + len * beat);
                osc.connect(gain); gain.connect(audioCtx.destination);
                osc.start(t); osc.stop(t + len * beat + 0.05);
                t += len * beat;
            });
        } catch (e) { /* Trình duyệt không hỗ trợ WebAudio: bỏ qua nhạc, trải nghiệm vẫn đầy đủ. */ }
    }

    // --- Utility Function to Transition Steps ---
    function transitionToStep(targetStepId) {
        const currentActive = document.querySelector('.step.active');
        if (currentActive) {
            currentActive.classList.remove('active');
        }
        steps[targetStepId].classList.add('active');
    }

    // --- Step 1: Welcome Screen Interactions ---
    startButton.addEventListener('click', () => {
        transitionToStep('step2');
        playBirthdayMelody(); // Bắt đầu sau thao tác chạm của người dùng nên không bị chặn autoplay
    });

    // --- Step 2: Envelope Interactions ---
    envelopeContainer.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); envelopeContainer.click(); }
    });
    envelopeContainer.addEventListener('click', () => {
        envelopeContainer.classList.add('open');
        envelopeContainer.querySelector('.click-instruction').style.opacity = '0'; // Hide instruction
        setTimeout(() => {
            transitionToStep('step3');
            setTimeout(() => {
                document.getElementById('letterContainer').classList.add('show');
            }, 100); // Small delay for letter reveal animation
        }, 700); // Duration matches envelope flap animation
    });

    // --- Step 3: Letter Unfold Interactions ---
    unfoldButton.addEventListener('click', () => {
        transitionToStep('step4');
        startCelebrationAnimations();
    });

    // --- Step 4: Grand Celebration Animations ---
    function startCelebrationAnimations() {
        // --- Typewriter Effect for Main Greeting ---
        let i = 0;
        finalGreetingElement.textContent = ''; // Clear content
        finalGreetingElement.style.borderRight = '3px solid var(--accent-yellow)'; // Ensure cursor is visible
        
        const typingInterval = setInterval(() => {
            if (i < messageGreeting.length) {
                finalGreetingElement.textContent += messageGreeting.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
                finalGreetingElement.classList.add('typed'); // Add class to manage cursor animation after typing
            }
        }, 100); // Typing speed

        // --- Confetti Cannon Effect ---
        createConfettiCannon(100, 0.5); // Count, delay
        setTimeout(() => createConfettiCannon(80, 0.3), 500); // Second burst
        setTimeout(() => createConfettiCannon(60, 0.2), 1000); // Third burst

        // --- Rising Balloons ---
        createBalloons(15);

        // --- Background Fireworks (Subtle) ---
        createFireworks(5); // Number of firework bursts
    }

    // --- Confetti Cannon Helper ---
    function createConfettiCannon(count, delayMultiplier) {
        const confettiCannonContainer = document.querySelector('.confetti-cannon-container');
        const colors = ['var(--primary-red)', 'var(--accent-yellow)', 'var(--text-light)', '#00d8d6', '#8e44ad']; // Use CSS variables

        for (let i = 0; i < count; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');

            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = `${Math.random() * 100}vw`; // Random start X
            confetti.style.top = `${Math.random() * 20 - 10}vh`; // Slightly above/below top of screen

            // Randomize duration and delay
            const duration = Math.random() * 2 + 3; // 3-5 seconds
            const delay = Math.random() * delayMultiplier;
            confetti.style.animationDuration = `${duration}s`;
            confetti.style.animationDelay = `${delay}s`;
            
            // Randomize size and shape
            const size = Math.random() * 8 + 4; // 4-12px
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            if (Math.random() > 0.5) confetti.style.borderRadius = '50%'; // Make some circular

            // Randomize initial rotation for confetti
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

            confettiCannonContainer.appendChild(confetti);

            // Remove after animation to prevent DOM bloat
            confetti.addEventListener('animationend', () => confetti.remove());
        }
    }

    // --- Balloons Helper ---
    function createBalloons(count) {
        const balloonsContainer = document.querySelector('.balloons-container');
        const colors = ['var(--primary-red)', 'var(--accent-yellow)', '#00d8d6', '#8e44ad', '#3498db'];

        for (let i = 0; i < count; i++) {
            const balloon = document.createElement('div');
            balloon.classList.add('balloon');

            balloon.style.left = `${Math.random() * 80 + 10}vw`; // Avoid edges
            balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            balloon.style.animationDuration = `${Math.random() * 6 + 10}s`; // 10-16s duration
            balloon.style.animationDelay = `${Math.random() * 5}s`; // Staggered start

            balloonsContainer.appendChild(balloon);

            // Remove after animation
            balloon.addEventListener('animationend', () => balloon.remove());
        }
    }

    // --- Fireworks Helper ---
    function createFireworks(count) {
        const fireworksContainer = document.querySelector('.fireworks-container');
        const colors = ['var(--primary-red)', 'var(--accent-yellow)', 'var(--text-light)', '#00d8d6'];

        for (let i = 0; i < count; i++) {
            const firework = document.createElement('div');
            firework.classList.add('firework');
            
            firework.style.left = `${Math.random() * 80 + 10}vw`;
            firework.style.bottom = `${Math.random() * 20}vh`; // Launch from bottom 20%
            firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            firework.style.boxShadow = `0 0 5px ${firework.style.backgroundColor}`; // Match box shadow to color
            
            // Stagger animation delay
            const delay = Math.random() * 3; // 0-3 second delay
            firework.style.animationDelay = `${delay}s, ${delay + 3}s`; // Launch and then explode
            
            fireworksContainer.appendChild(firework);

            firework.addEventListener('animationend', () => firework.remove());
        }
    }
});
