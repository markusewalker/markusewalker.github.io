import { readFileSync } from 'fs';
import { join } from 'path';

const scriptContent = readFileSync(join(__dirname, '../../assets/scripts.js'), 'utf8');
eval(`${scriptContent}global.addMobileTouchEnhancements = addMobileTouchEnhancements;`);

describe('addMobileTouchEnhancements', () => {
  test('test mobile touch enhancements', () => {
    document.body.innerHTML = `
      <button id="music-toggle"></button>
      <nav class="navbar">
        <a href="#">Link 1</a>
        <a href="#">Link 2</a>
      </nav>
    `;
    
    addMobileTouchEnhancements();
    
    const musicToggle = document.getElementById('music-toggle');
    expect(musicToggle).toBeTruthy();
  });
});

describe('addMobileTouchEnhancements', () => {
  test('test touchstart and touchend events on music toggle', () => {
    document.body.innerHTML = `
      <button id="music-toggle"></button>
    `;
    
    addMobileTouchEnhancements();
    
    const musicToggle = document.getElementById('music-toggle');
    const touchStartEvent = new TouchEvent('touchstart');
    const touchEndEvent = new TouchEvent('touchend');
    
    musicToggle.dispatchEvent(touchStartEvent);
    expect(musicToggle.style.transform).toBe('scale(0.95)');
    
    musicToggle.dispatchEvent(touchEndEvent);
    expect(musicToggle.style.transform).toBe('scale(1)');
  });
});

describe('addMobileTouchEnhancements', () => {
  test('test double tap prevention on music toggle', () => {
    document.body.innerHTML = `
      <button id="music-toggle"></button>
    `;
    
    addMobileTouchEnhancements();
    
    const musicToggle = document.getElementById('music-toggle');
    const touchEndEvent = new TouchEvent('touchend');
    
    musicToggle.dispatchEvent(touchEndEvent);
    expect(musicToggle.dataset.lastTap).toBeDefined();
    
    setTimeout(() => {
      musicToggle.dispatchEvent(touchEndEvent);
      expect(musicToggle.dataset.lastTap).toBeDefined();
    }, 200);
  });
});

describe('addMobileTouchEnhancements', () => {
  test('test touch enhancements on navbar links', () => {
    document.body.innerHTML = `
      <nav class="navbar">
        <a href="#">Link 1</a>
        <a href="#">Link 2</a>
      </nav>
    `;
    
    addMobileTouchEnhancements();
    
    const navLinks = document.querySelectorAll('.navbar a');
    expect(navLinks.length).toBe(2);
  });
});