# Integration Tests

Integration tests verify that multiple systems work together correctly.

## What to Test

### System Interactions
- Player movement + collision detection
- Weapon firing + damage system
- Trap activation + health reduction
- Powerup collection + stat boost
- Win condition + scene transition

### Multi-Component Workflows
- Complete combat scenario (shoot → hit → damage → death → respawn)
- Maze navigation (spawn → move → avoid traps → reach exit)
- Crafting workflow (gather materials → open menu → craft → equip)

## Example Test Structure

```javascript
// Example: weapon combat integration
describe('Weapon Combat', () => {
    let game, player1, player2;

    beforeEach(() => {
        // Set up test game instance
        game = createTestGame();
        player1 = game.createPlayer(100, 100);
        player2 = game.createPlayer(200, 100);
    });

    it('should reduce health when arrow hits player', () => {
        const initialHealth = player2.health;

        player1.equipWeapon('bow');
        player1.shootAt(player2);

        // Wait for arrow to travel
        game.update(1000);

        expect(player2.health).toBe(initialHealth - 10);
    });

    it('should kill player and reduce lives at 0 HP', () => {
        player2.health = 10;
        const initialLives = player2.lives;

        player1.equipWeapon('bow');
        player1.shootAt(player2);
        game.update(1000);

        expect(player2.health).toBe(0);
        expect(player2.lives).toBe(initialLives - 1);
        expect(player2.alive).toBe(false);
    });
});
```

## Test Environment

- Use Phaser's headless mode (no actual rendering)
- Mock keyboard input
- Control time (no real-time waiting)
- Deterministic random (reproducible tests)

## Running Tests

```bash
# To be added when we implement tests
npm run test:integration
```

## Coverage Goal

- All major gameplay paths tested
- Critical interactions verified
- Edge cases covered

## When to Write Tests

**Write integration tests AFTER:**
- Multiple systems are implemented
- They work together in manual testing
- You want to prevent regressions

**Example Scenarios to Test:**
1. Complete game: spawn → navigate → reach exit → win
2. Combat loop: attack → take damage → die → respawn
3. Trap interaction: touch trap → take damage → die if health = 0
4. Power-up: collect → activate → benefit → expire

---

*This folder is currently empty. We'll add tests once systems are integrated.*
