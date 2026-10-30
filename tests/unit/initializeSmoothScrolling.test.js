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

  test('scrolls to the selected section and closes the mobile menu', () => {
    document.body.innerHTML = `
      <input id="menu__toggle" type="checkbox" checked>
      <a class="menu__item" href="#about">About</a>
      <section id="about"></section>
    `;
    Element.prototype.scrollIntoView = jest.fn();

    initializeSmoothScrolling();
    document.querySelector('.menu__item').click();

    expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    expect(document.getElementById('menu__toggle').checked).toBe(false);
  });
});
