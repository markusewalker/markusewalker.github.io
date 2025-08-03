import { readFileSync } from 'fs';
import { join } from 'path';

const scriptContent = readFileSync(join(__dirname, '../../assets/scripts.js'), 'utf8');
eval(`${scriptContent}global.isMobileDevice = isMobileDevice;`);

describe('isMobileDevice', () => {
  test('test that this is a mobile device', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      writable: true,
      value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)'
    });

    global.isMobileDevice = isMobileDevice;
    
    const result = isMobileDevice();
    expect(result).toBe(true);
  });
});

describe('isMobileDevice', () => {
  test('test that this is not a mobile device', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      writable: true,
      value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    });

    global.isMobileDevice = isMobileDevice;
    
    const result = isMobileDevice();
    expect(result).toBe(false);
  });
});

describe('isMobileDevice', () => {
  test('test that window width is less than or equal to 768', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500
    });

    global.isMobileDevice = isMobileDevice;
    
    const result = isMobileDevice();
    expect(result).toBe(true);
  });
});

describe('isMobileDevice', () => {
  test('test that window width is greater than 768', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024
    });

    global.isMobileDevice = isMobileDevice;
    
    const result = isMobileDevice();
    expect(result).toBe(false);
  });
});
