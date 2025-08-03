import { readFileSync } from 'fs';
import { join } from 'path';

const scriptContent = readFileSync(join(__dirname, '../../assets/scripts.js'), 'utf8');
eval(`${scriptContent}global.keyBoardSupport = keyBoardSupport;`);

describe('keyBoardSupport', () => {
  test('test that keyboard events are supported', () => {
    document.body.innerHTML = `
      <audio id="background-music"></audio>
      <button id="music-toggle"><i class="fas fa-volume-up"></i></button>
    `;

    global.keyBoardSupport();

    const musicToggle = document.getElementById('music-toggle');
    expect(musicToggle).not.toBeNull();
  });
});

describe('keyBoardSupport', () => {
  test('test that volume can be adjusted with keyboard', () => {
    document.body.innerHTML = `
      <audio id="background-music"></audio>
      <button id="music-toggle"><i class="fas fa-volume-up"></i></button>
    `;

    const backgroundMusic = document.getElementById('background-music');
    const musicIcon = document.querySelector('#music-toggle i');

    globalThis.backgroundMusic = backgroundMusic;
    globalThis.musicIcon = musicIcon;

    backgroundMusic.volume = 0.5;
    backgroundMusic.play();

    global.keyBoardSupport();

    const initialVolume =  backgroundMusic.volume;

    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' }));
    expect(backgroundMusic.volume).toBeGreaterThan(initialVolume);

    const higherVolume = backgroundMusic.volume;
    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
    expect(backgroundMusic.volume).toBeLessThan(higherVolume);
  });
});

describe('keyBoardSupport', () => {
  test('test that volume does not exceed maximum or minimum limits', () => {
    document.body.innerHTML = `
      <audio id="background-music"></audio>
      <button id="music-toggle"><i class="fas fa-volume-up"></i></button>
    `;

    const backgroundMusic = document.getElementById('background-music');
    const musicIcon = document.querySelector('#music-toggle i');

    globalThis.backgroundMusic = backgroundMusic;
    globalThis.musicIcon = musicIcon;

    backgroundMusic.play();

    global.keyBoardSupport();

    backgroundMusic.volume = 1;
    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'VolumeUp' }));
    expect(backgroundMusic.volume).toBe(1);

    backgroundMusic.volume = 0.1;
    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'VolumeDown' }));
    expect(backgroundMusic.volume).toBe(0);
    expect(backgroundMusic.paused).toBe(true);
  });
});

describe('keyBoardSupport', () => {
  test('test that keyboard events do not interfere with other interactions', () => {
    document.body.innerHTML = `
      <audio id="background-music"></audio>
      <button id="music-toggle"><i class="fas fa-volume-up"></i></button>
    `;

    global.backgroundMusic = document.getElementById('background-music');
    global.musicIcon = document.querySelector('#music-toggle i');

    global.backgroundMusic.volume = 0.5;
    global.backgroundMusic._paused = true;

    const musicToggle = document.getElementById('music-toggle');
  
    musicToggle.addEventListener('click', function() {
      if (global.backgroundMusic.paused) {
        global.backgroundMusic.play();
        global.musicIcon.className = 'fas fa-volume-up';
      } else {
        global.backgroundMusic.pause();
        global.musicIcon.className = 'fas fa-volume-mute';
      }
    });

    global.keyBoardSupport();

    const initialVolume = global.backgroundMusic.volume;

    musicToggle.click();
    expect(global.backgroundMusic.paused).toBe(false);
    expect(global.backgroundMusic.volume).toBe(initialVolume);

    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'VolumeUp' }));
    expect(global.backgroundMusic.volume).toBeGreaterThan(initialVolume);
  });
});