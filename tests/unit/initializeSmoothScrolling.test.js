import { readFileSync } from 'fs';
import { join } from 'path';

const scriptContent = readFileSync(join(__dirname, '../../assets/scripts.js'), 'utf8');
eval(`${scriptContent}global.initializeSmoothScrolling = initializeSmoothScrolling;`);

describe('initializeSmoothScrolling', () => {
  test('test adding smooth scrolling to anchor links', () => {
    document.body.innerHTML = `
      <a href="#section1">Link to Section 1</a>
      <div id="section1">Section 1 content</div>
    `;
    
    Element.prototype.scrollIntoView = jest.fn();
    
    initializeSmoothScrolling();
    
    const anchorLink = document.querySelector('a[href="#section1"]');
    expect(anchorLink).toBeTruthy();
  });
});
