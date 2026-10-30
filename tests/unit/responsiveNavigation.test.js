import { readFileSync } from 'fs';
import { join } from 'path';

const html = readFileSync(join(__dirname, '../../index.html'), 'utf8');
const css = readFileSync(join(__dirname, '../../assets/styles.css'), 'utf8');

describe('responsive navigation', () => {
  test('declares a device-width viewport at the default zoom level', () => {
    const page = new DOMParser().parseFromString(html, 'text/html');
    expect(page.querySelector('meta[name="viewport"]').content)
      .toBe('width=device-width, initial-scale=1.0');
  });

  test('keeps desktop navigation hidden throughout the mobile breakpoints', () => {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    try {
      const mobileRules = [...style.sheet.cssRules].filter(rule => {
        const maxWidth = rule.conditionText?.match(/^\(max-width:\s*(\d+)px\)$/);
        return maxWidth && Number(maxWidth[1]) <= 900;
      });
      const navigationRules = mobileRules.flatMap(rule => [...rule.cssRules])
        .filter(rule => rule.selectorText === '.nav-links' && rule.style.display);

      expect(navigationRules.length).toBeGreaterThan(0);
      navigationRules.forEach(rule => expect(rule.style.display).toBe('none'));

      const hamburgerRules = mobileRules.flatMap(rule => [...rule.cssRules])
        .filter(rule => rule.selectorText === '.hamburger-menu' && rule.style.display);
      hamburgerRules.forEach(rule => expect(rule.style.display).not.toBe('none'));
    } finally {
      style.remove();
    }
  });
});
