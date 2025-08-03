import { readFileSync } from 'fs';
import { join } from 'path';

const scriptContent = readFileSync(join(__dirname, '../../assets/scripts.js'), 'utf8');
eval(`${scriptContent}global.initializeStars = initializeStars;`);

describe('initializeStars', () => {
    test('test stars do not create if there is no container', () => {
        document.body.innerHTML = '';
        
        global.initializeStars();
        
        const starsContainer = document.querySelector('.stars');
        expect(starsContainer).toBeNull();
    });
});

describe('initializeStars', () => {
  test('test creating stars in the stars container', () => {
    document.body.innerHTML = '<div class="stars"></div>';
    
    global.initializeStars();
    
    const starsContainer = document.querySelector('.stars');
    const stars = starsContainer.querySelectorAll('.star');

    expect(stars.length).toBe(120);
  });
});

describe('initializeStars', () => {
    test('test stars randomly are populated', () => {
        document.body.innerHTML = '<div class="stars"></div>';
        
        global.initializeStars();
        
        const starsContainer = document.querySelector('.stars');
        const stars = starsContainer.querySelectorAll('.star');

        stars.forEach(star => {
            expect(star.style.width).toMatch(/^[0-2](\.\d+)?px$/);
            expect(star.style.height).toMatch(/^[0-2](\.\d+)?px$/);
            expect(star.style.top).toMatch(/^\d+(\.\d+)?vh$/);
            expect(star.style.left).toMatch(/^\d+(\.\d+)?vw$/);
            expect(parseFloat(star.style.animationDuration)).toBeGreaterThanOrEqual(1.5);
            expect(parseFloat(star.style.animationDuration)).toBeLessThanOrEqual(4.0);
        });
    });
});

describe('initializeStars', () => {
    test('test stars container exists', () => {
        document.body.innerHTML = '<div class="stars"></div>';
        
        global.initializeStars();
        
        const starsContainer = document.querySelector('.stars');
        expect(starsContainer).not.toBeNull();
    });
});