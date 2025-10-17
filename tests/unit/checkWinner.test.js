import { readFileSync } from 'fs';
import { join } from 'path';

const scriptContent = readFileSync(join(__dirname, '../../assets/scripts.js'), 'utf8');
eval(`${scriptContent}global.checkWinner = checkWinner; global.setGameOver = val => { gameOver = val; }; global.getGameOver = () => gameOver; global.setScores = (y, t) => { youScore = y; tmzScore = t; };`);

describe('checkWinner', () => {
    beforeEach(() => {
        global.setGameOver(false);
    });

    it('sets gameOver to true if youScore >= WINNING_SCORE', () => {
        global.setScores(100, 87);
        global.setGameOver(false);

        checkWinner();
        expect(global.getGameOver()).toBe(true);
    });

    it('sets gameOver to true if tmzScore >= WINNING_SCORE', () => {
        global.setScores(90, 100);
        global.setGameOver(false);

        checkWinner();
        expect(global.getGameOver()).toBe(true);
    });

    it('does not set gameOver if neither score is >= WINNING_SCORE', () => {
        global.setScores(0, 0);
        global.setGameOver(false);

        checkWinner();
        expect(global.getGameOver()).toBe(false);
    });
});