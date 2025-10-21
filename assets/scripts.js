let youScore = Number(localStorage.getItem('youScore')) || 0;
let tmzScore = Number(localStorage.getItem('tmzScore')) || 0;
let gameOver = false;

const WINNING_SCORE = 100;

function updateScoreboard() {
    const youScoreElement = document.getElementById('score-you');
    const tmzScoreElement = document.getElementById('score-tmz');

    const you = typeof global !== 'undefined' && typeof global.youScore !== 'undefined' ? global.youScore : youScore;
    const tmz = typeof global !== 'undefined' && typeof global.tmzScore !== 'undefined' ? global.tmzScore : tmzScore;

    if (youScoreElement) {
        youScoreElement.textContent = you;
    }

    if (tmzScoreElement) {
        tmzScoreElement.textContent = tmz;
    }
}

// saveScores saves the current scores to localStorage
function saveScores() {
    localStorage.setItem('youScore', youScore);
    localStorage.setItem('tmzScore', tmzScore);
}

// randomScore generates a random score between 1 and 3 to simulate basketball
function randomScore() {
    return Math.floor(Math.random() * 3) + 1;
}

// randomTeam randomly selects either 'you' or 'tmz' to receive the score
function randomTeam() {
    return Math.random() < 0.5 ? 'you' : 'tmz';
}

// checkWinner checks if either team has reached the winning score
function checkWinner() {
    if (!gameOver && (youScore >= WINNING_SCORE || tmzScore >= WINNING_SCORE)) {
        gameOver = true;
    }
}

setInterval(() => {
    if (!gameOver) {
        const points = randomScore();
        const team = randomTeam();

        if (team === 'you') {
            youScore = Math.min(youScore + points, WINNING_SCORE);
        } else {
            tmzScore = Math.min(tmzScore + points, WINNING_SCORE);
        }

        updateScoreboard();
        saveScores();
        checkWinner();
    }
}, 5000);

// initializeStars is a function that creates a starry background effect
function initializeStars() {
    const starsContainer = document.querySelector('.stars');

    if (!starsContainer) return;
    
    const numStars = 120;

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 2 + 1;
        
        star.className = 'star';
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.animationDuration = `${1.5 + Math.random() * 2.5}s`;

        starsContainer.appendChild(star);
    }
}

// isMobileDevice is a function that detects if the user is on a mobile device
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
}

// initializeBackgroundMusic is a function that sets up the background music player
function initializeBackgroundMusic() {
    const backgroundMusic = document.getElementById('background-music');
    const musicToggle = document.getElementById('music-toggle');
    const musicIcon = document.querySelector('#music-toggle i');

    if (!backgroundMusic || !musicToggle) return;

    const musicEnabled = localStorage.getItem('musicEnabled') !== 'false';
    const savedPosition = localStorage.getItem('musicCurrentTime');
    
    if (savedPosition) {
        backgroundMusic.currentTime = parseFloat(savedPosition);
    }
    
    if (musicEnabled) {
        backgroundMusic.play().catch(e => {
            console.log('Auto-play prevented by browser policy');
        });

        musicIcon.className = 'fas fa-volume-up';
    } else {
        musicIcon.className = 'fas fa-volume-mute';
    }

    musicToggle.addEventListener('click', function() {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicIcon.className = 'fas fa-volume-up';
            localStorage.setItem('musicEnabled', 'true');
        } else {
            backgroundMusic.pause();
            musicIcon.className = 'fas fa-volume-mute';
            localStorage.setItem('musicEnabled', 'false');
        }
    });

    if (!isMobileDevice()) {
        keyBoardSupport();
    } else {
        addMobileTouchEnhancements();
    }

    setInterval(function() {
        if (!backgroundMusic.paused && !backgroundMusic.ended) {
            localStorage.setItem('musicCurrentTime', backgroundMusic.currentTime.toString());
        }
    }, 1000);

    window.addEventListener('beforeunload', function() {
        if (!backgroundMusic.paused && !backgroundMusic.ended) {
            localStorage.setItem('musicCurrentTime', backgroundMusic.currentTime.toString());
        }
    });

    backgroundMusic.volume = 0.3;
}

// keyboardSupport is a function that adds keyboard controls for volume adjustment
function keyBoardSupport() {
    document.addEventListener('keydown', function(e) {
        if (e.code === 'VolumeUp' || e.code === 'AudioVolumeUp' || e.code === 'ArrowUp') {
            e.preventDefault();
            if (backgroundMusic.paused) {
                backgroundMusic.play();
                musicIcon.className = 'fas fa-volume-up';
                localStorage.setItem('musicEnabled', 'true');
            } else {
                backgroundMusic.volume = Math.min(1, backgroundMusic.volume + 0.1);
            }
        }
        
        if (e.code === 'VolumeDown' || e.code === 'AudioVolumeDown' || e.code === 'ArrowDown') {
            e.preventDefault();
            if (!backgroundMusic.paused) {
                backgroundMusic.volume = Math.max(0, backgroundMusic.volume - 0.1);
                if (backgroundMusic.volume === 0) {
                    backgroundMusic.pause();
                    musicIcon.className = 'fas fa-volume-mute';
                    localStorage.setItem('musicEnabled', 'false');
                }
            }
        }
        
        if (e.code === 'VolumeMute' || e.code === 'AudioVolumeMute') {
            e.preventDefault();
            if (backgroundMusic.paused) {
                backgroundMusic.play();
                musicIcon.className = 'fas fa-volume-up';
                localStorage.setItem('musicEnabled', 'true');
            } else {
                backgroundMusic.pause();
                musicIcon.className = 'fas fa-volume-mute';
                localStorage.setItem('musicEnabled', 'false');
            }
        }
    });
}

// addMobileTouchEnhancements is a function that improves mobile touch experience
function addMobileTouchEnhancements() {
    const musicToggle = document.getElementById('music-toggle');
    
    if (musicToggle) {
        musicToggle.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        musicToggle.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
        
        musicToggle.addEventListener('touchend', function(e) {
            const now = Date.now();
            const lastTap = this.dataset.lastTap || 0;
            const timeDiff = now - lastTap;
            
            if (timeDiff < 300 && timeDiff > 0) {
                e.preventDefault();
            }
            
            this.dataset.lastTap = now;
        });
    }
    
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.addEventListener('touchstart', function() {
            this.style.background = '#333';
        });
        
        link.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.background = '';
            }, 150);
        });
    });
    
    if (window.innerWidth <= 600) {
        console.log('Mobile device detected - touch controls enabled');
    }
}

// initializeNavigation is a function that highlights the current page in the navigation bar
function initializeNavigation(currentPath = (window.location.pathname.split('/').pop() || 'index.html')) {
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });
}

// initializeSmoothScrolling is a function that enables smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// initializeBackToTop sets up the sticky back-to-top button for relevant pages
function initializeBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) {
        return;
    }

    const showAfter = 300;
    let lastScrollY = window.scrollY || window.pageYOffset;

    function updateButtonVisibility() {
        const currentY = window.scrollY || window.pageYOffset;
        if (currentY > showAfter) {
            btn.classList.add('show');
            try { 
                btn.style.display = 'block'; 
            } catch (e) {}

            btn.setAttribute('aria-hidden', 'false');
        } else {
            btn.classList.remove('show');
            try { 
                btn.style.display = 'none'; 
            } catch (e) {}

            btn.setAttribute('aria-hidden', 'true');
        }

        lastScrollY = currentY;
    }

    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateButtonVisibility();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) {
            window.scrollTo(0, 0);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        document.body.focus({ preventScroll: true });
    });

    try { 
        btn.style.display = 'block'; 
    } catch (e) {}

    btn.setAttribute('aria-hidden', 'false');

    window.requestAnimationFrame(updateButtonVisibility);
}

document.addEventListener('DOMContentLoaded', function() {
    initializeStars();
    initializeBackgroundMusic();
    initializeNavigation();
    initializeSmoothScrolling();
    initializeBackToTop();
});