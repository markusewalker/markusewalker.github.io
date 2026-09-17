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

    const musicEnabled = sessionStorage.getItem('musicEnabled') !== 'false';
    const savedPosition = sessionStorage.getItem('musicCurrentTime');
    
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
            sessionStorage.setItem('musicEnabled', 'true');
        } else {
            backgroundMusic.pause();
            musicIcon.className = 'fas fa-volume-mute';
            sessionStorage.setItem('musicEnabled', 'false');
        }
    });

    if (!isMobileDevice()) {
        keyBoardSupport();
    } else {
        addMobileTouchEnhancements();
    }

    setInterval(function() {
        if (!backgroundMusic.paused && !backgroundMusic.ended) {
            sessionStorage.setItem('musicCurrentTime', backgroundMusic.currentTime.toString());
        }
    }, 1000);

    window.addEventListener('beforeunload', function() {
        if (!backgroundMusic.paused && !backgroundMusic.ended) {
            sessionStorage.setItem('musicCurrentTime', backgroundMusic.currentTime.toString());
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
                sessionStorage.setItem('musicEnabled', 'true');
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
                    sessionStorage.setItem('musicEnabled', 'false');
                }
            }
        }
        
        if (e.code === 'VolumeMute' || e.code === 'AudioVolumeMute') {
            e.preventDefault();
            if (backgroundMusic.paused) {
                backgroundMusic.play();
                musicIcon.className = 'fas fa-volume-up';
                sessionStorage.setItem('musicEnabled', 'true');
            } else {
                backgroundMusic.pause();
                musicIcon.className = 'fas fa-volume-mute';
                sessionStorage.setItem('musicEnabled', 'false');
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
            const menuToggle = document.getElementById('menu__toggle');
            if (menuToggle) {
                menuToggle.checked = false;
            }
        });
    });
}

function initializeIntroAnimation() {
    const quote = document.getElementById('twilight-quote');
    const title = document.getElementById('markus-zone-title');

    if (!quote || !title) return;

    function runIntroLoop() {
        quote.style.display = 'block';
        quote.classList.remove('twilight-fade-out', 'twilight-fade-in');
        void quote.offsetWidth;
        quote.classList.add('twilight-fade-in');

        title.style.display = 'block';
        title.style.opacity = 0;
        title.classList.remove('twilight-fade-in', 'twilight-fade-out');

        setTimeout(() => {
            quote.classList.remove('twilight-fade-in');
            quote.classList.add('twilight-fade-out');

            setTimeout(() => {
                quote.style.display = 'none';
                title.style.opacity = 1;
                void title.offsetWidth;
                title.classList.add('twilight-fade-in');

                setTimeout(() => {
                    title.classList.remove('twilight-fade-in');
                    title.classList.add('twilight-fade-out');

                    setTimeout(() => {
                        title.style.opacity = 0;
                        title.style.display = 'none';
                        runIntroLoop();
                    }, 1200);
                }, 10000);
            }, 1200);
        }, 10000);
    }

    runIntroLoop();
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
    initializeIntroAnimation();
    initializeBackToTop();
});