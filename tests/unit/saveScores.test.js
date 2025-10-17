import { readFileSync } from 'fs';
import { join } from 'path';

const scriptContent = readFileSync(join(__dirname, '../../assets/scripts.js'), 'utf8');
eval(`${scriptContent}global.saveScores = saveScores;`);

describe('saveScores', () => {
    beforeEach(() => {
        global.youScore = 0;
        global.tmzScore = 0;
        sessionStorage.clear();
    });

    it('saves scores to sessionStorage', () => {
        saveScores();
        expect(Number(sessionStorage.getItem('youScore'))).toBe(0);
        expect(Number(sessionStorage.getItem('tmzScore'))).toBe(0);
    });
});