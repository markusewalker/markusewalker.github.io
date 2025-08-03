import { readFileSync } from 'fs';
import { join } from 'path';

const scriptContent = readFileSync(join(__dirname, '../../assets/scripts.js'), 'utf8');
eval(`${scriptContent}global.initializeNavigation = initializeNavigation;`);

describe('initializeNavigation', () => {
  test('test current page in navigation', () => {
    document.body.innerHTML = `
      <nav class="navbar">
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
      </nav>
    `;
    
    // Call with explicit path to avoid jsdom navigation warning
    initializeNavigation('index.html');

    const homeLink = document.querySelector('a[href="index.html"]');
    expect(homeLink.classList.contains('active')).toBe(true);
  });
});
