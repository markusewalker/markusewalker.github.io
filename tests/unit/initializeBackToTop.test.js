import { readFileSync } from 'fs';
import { join } from 'path';

const scriptContent = readFileSync(join(__dirname, '../../assets/scripts.js'), 'utf8');
eval(`${scriptContent}global.initializeBackToTop = initializeBackToTop;`);

describe('initializeBackToTop', () => {
  test('test back to top button visibility', () => {
    document.body.innerHTML = `
      <button id="back-to-top" class="back-to-top" style="display: none;">Back to Top</button>
    `;

    initializeBackToTop();

    const backToTopButton = document.getElementById('back-to-top');
    expect(backToTopButton.style.display).toBe('block');
  });
});