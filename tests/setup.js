const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

global.localStorage = localStorageMock;

global.Audio = jest.fn().mockImplementation(() => ({
  play: jest.fn().mockResolvedValue(undefined),
  pause: jest.fn(),
  currentTime: 0,
  volume: 1,
  paused: true,
  ended: false,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}));

const createMediaElementMock = () => {
  let isPaused = true;
  let currentTimeValue = 0;
  let volumeValue = 1;
  
  return {
    play: jest.fn().mockImplementation(() => {
      isPaused = false;
      return Promise.resolve();
    }),
    pause: jest.fn().mockImplementation(() => {
      isPaused = true;
    }),
    get paused() { return isPaused; },
    set paused(value) { isPaused = value; },
    get currentTime() { return currentTimeValue; },
    set currentTime(value) { currentTimeValue = value; },
    get volume() { return volumeValue; },
    set volume(value) { volumeValue = value; },
    ended: false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  };
};

const originalCreateElement = document.createElement;

document.createElement = jest.fn().mockImplementation((tagName) => {
  if (tagName === 'audio') {
    return createMediaElementMock();
  }

  return originalCreateElement.call(document, tagName);
});

Object.defineProperty(HTMLMediaElement.prototype, 'play', {
  writable: true,
  value: function() {
    this._paused = false;
    return Promise.resolve();
  },
});

Object.defineProperty(HTMLMediaElement.prototype, 'pause', {
  writable: true,
  value: function() {
    this._paused = true;
  },
});

Object.defineProperty(HTMLMediaElement.prototype, 'paused', {
  get: function() { return !!this._paused; },
  set: function(value) { this._paused = value; },
  configurable: true,
});

Object.defineProperty(HTMLMediaElement.prototype, 'currentTime', {
  writable: true,
  value: 0,
});

Object.defineProperty(HTMLMediaElement.prototype, 'volume', {
  writable: true,
  value: 1,
});

Object.defineProperty(HTMLMediaElement.prototype, 'ended', {
  writable: true,
  value: false,
});

global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
  document.body.innerHTML = '';
  localStorageMock.getItem.mockClear();
  localStorageMock.setItem.mockClear();
  localStorageMock.removeItem.mockClear();
  localStorageMock.clear.mockClear();
});