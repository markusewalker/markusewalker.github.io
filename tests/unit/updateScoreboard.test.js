import { readFileSync } from 'fs';
import { join } from 'path';

const scriptContent = readFileSync(join(__dirname, '../../assets/scripts.js'), 'utf8');
eval(`${scriptContent}global.updateScoreboard = updateScoreboard;`);

describe('updateScoreboard', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <span id="score-you"></span>
            <span id="score-tmz"></span>
        `;
        global.youScore = 28;
        global.tmzScore = 30;
    });

    it('updates the #score-you element with youScore', () => {
        updateScoreboard();
        expect(document.getElementById('score-you').textContent).toBe('28');
    });

    it('updates the #score-tmz element with tmzScore', () => {
        updateScoreboard();
        expect(document.getElementById('score-tmz').textContent).toBe('30');
    });

    it('does nothing if elements do not exist', () => {
        document.body.innerHTML = '';
        expect(() => updateScoreboard()).not.toThrow();
    });
});