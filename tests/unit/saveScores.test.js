import { readFileSync } from 'fs';
import { join } from 'path';

const scriptContent = readFileSync(join(__dirname, '../../assets/scripts.js'), 'utf8');
eval(`${scriptContent}global.saveScores = saveScores;`);

describe('saveScores', () => {
    beforeEach(() => {
        global.youScore = 0;
        global.tmzScore = 0;
        localStorage.clear();
    });

    it('saves scores to localStorage', () => {
        saveScores();
        expect(Number(localStorage.getItem('youScore'))).toBe(0);
        expect(Number(localStorage.getItem('tmzScore'))).toBe(0);
    });
});