// Matrix effect - Vert Kali pur
const canvas = document.getElementById('matrix-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let x = 0; x < columns; x++) {
        drops[x] = Math.random() * canvas.height / fontSize;
    }

    function draw() {
        ctx.fillStyle = 'rgba(12, 12, 12, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff00';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars.charAt(Math.floor(Math.random() * chars.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 30);
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Typing effect - style commande terminal
const phrases = [
    "echo 'Bac Pro CIEL'",
    "nmap -sV 127.0.0.1", 
    "python3 exploit.py",
    "ssh student@entreprise.com"
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typing');

function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 30 : 80;
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }
    
    setTimeout(type, typeSpeed);
}

if (typingElement) {
    type();
}

// Command history effect sur les sections
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
            
            // Animation des barres de progression
            const fills = entry.target.querySelectorAll('.pkg-fill');
            fills.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.terminal-section, .skill-pkg').forEach(el => {
    el.style.opacity = '0.9';
    el.style.transform = 'translateX(-10px)';
    el.style.transition = 'all 0.5s ease';
    observer.observe(el);
});

// Form submission - style terminal response
document.getElementById('contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button');
    const originalText = btn.textContent;
    
    btn.textContent = '[SENDING...]';
    btn.style.opacity = '0.7';
    
    setTimeout(() => {
        btn.textContent = '[200 OK] Message envoyé';
        btn.style.background = '#00ff00';
        btn.style.color = '#0c0c0c';
        
        // Ajouter une ligne de log
        const logLine = document.createElement('div');
        logLine.className = 'terminal-line';
        logLine.innerHTML = '<span style="color: #00ff00">[SUCCESS]</span> Email transmis à laszlo@kali';
        this.appendChild(logLine);
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.opacity = '1';
            btn.style.background = '';
            btn.style.color = '';
            this.reset();
            logLine.remove();
        }, 3000);
    }, 1500);
});

// Konami code - easter egg Kali style
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            document.body.style.filter = 'hue-rotate(180deg) brightness(1.2)';
            setTimeout(() => {
                document.body.style.filter = '';
                alert('root@kali:~# ./rooted.sh\nAccès root temporaire accordé !');
            }, 2000);
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// Random glitch sur le titre
setInterval(() => {
    const glitch = document.querySelector('.glitch-kali');
    if (glitch && Math.random() > 0.9) {
        glitch.style.textShadow = '2px 0 #ff0000, -2px 0 #00ff00';
        setTimeout(() => {
            glitch.style.textShadow = '';
        }, 100);
    }
}, 5000);
