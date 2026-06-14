# End-to-End Tests

E2E tests simulate real player interactions from start to finish.

## What to Test

### Complete User Flows
- Launch game → Select monster → Choose weapon → Play → Win/Lose
- Navigate menu → Start game → Play level → Return to menu
- Full gameplay session → Victory screen → Play again

### User Interactions
- Keyboard controls work correctly
- UI responds to clicks/inputs
- Game state persists correctly
- Multiple rounds work

## Example Test Structure

```javascript
// Example: Complete game flow
describe('Full Game Playthrough', () => {
    it('should complete a full game from start to win', async () => {
        // Launch game
        await browser.goto('http://localhost:8080');

        // Check game loaded
        expect(await page.title()).toBe("Adrian's Maze Game 🎮");

        // Simulate Player 1 winning
        await page.keyboard.press('ArrowRight'); // Move right
        await page.keyboard.press('ArrowUp');    // Jump
        // ... navigate to exit ...

        // Verify win condition
        const winText = await page.$eval('.win-message', el => el.textContent);
        expect(winText).toContain('Player 1 Wins!');
    });
});
```

## Test Framework Options

- **Playwright** (modern, fast, recommended)
- **Cypress** (popular, good DX)
- **Puppeteer** (Chrome only)

## Running Tests

```bash
# To be added when we implement tests
npm run test:e2e
```

## Performance Testing

E2E tests are SLOW. Run them:
- Before deploying to production
- After major features
- NOT on every commit (too slow)

## Visual Regression Testing

Take screenshots and compare:
```javascript
await page.screenshot({ path: 'screenshots/main-menu.png' });
```

Compare against baseline to catch visual bugs.

## When to Write E2E Tests

**Write E2E tests AFTER:**
- Game is feature-complete
- Manual testing is tedious
- You want to prevent regressions before release

**Don't write E2E tests:**
- Too early (game is changing too much)
- For every little thing (unit/integration tests are faster)
- If manual testing is still fast

## Test Scenarios

### Critical Paths (Must Test)
1. **Happy path:** Player 1 reaches exit first, wins
2. **Combat:** Player attacks, kills opponent, wins
3. **Death:** Player dies from trap, respawns, continues
4. **Game over:** Player loses all lives, game over screen

### Edge Cases
1. Both players reach exit at same time
2. Players fall off map
3. Rapid key presses
4. Browser resize during game

---

*This folder is currently empty. E2E tests are lowest priority - add after game is stable.*

## Priority

**Testing Priority for This Project:**
1. ✅ **Manual testing** (highest priority - play the game!)
2. 🔄 **Unit tests** (when logic is stable)
3. 🔄 **Integration tests** (when systems interact)
4. ⏸️ **E2E tests** (lowest priority - maybe never needed)

**Why this order?**
- Game dev is iterative and visual
- Manual playtesting gives best feedback
- Automated tests are great for preventing regressions
- But not worth writing until features are stable
