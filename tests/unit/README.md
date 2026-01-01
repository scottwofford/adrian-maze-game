# Unit Tests

Unit tests verify individual functions and components in isolation.

## What to Test

### Game Logic
- Damage calculations
- Health/lives system
- Win/lose conditions
- Score calculations
- Collision detection logic

### Pure Functions
- Maze generation algorithms
- Coordinate transformations
- Utility functions
- Math helpers

## Example Test Structure

```javascript
// Example: damage calculation test
describe('Combat System', () => {
    describe('calculateDamage', () => {
        it('should deal 10 damage with bow and arrow', () => {
            const damage = calculateDamage('bow', target);
            expect(damage).toBe(10);
        });

        it('should deal 15 damage with lightsaber', () => {
            const damage = calculateDamage('lightsaber', target);
            expect(damage).toBe(15);
        });

        it('should deal 20 damage from lava trap', () => {
            const damage = calculateDamage('lava', target);
            expect(damage).toBe(20);
        });
    });
});
```

## Test Framework

To be decided when we add tests. Options:
- **Jest** (most popular, good for JavaScript)
- **Mocha** (flexible, older)
- **Vitest** (fast, modern)

## Running Tests

```bash
# To be added when we implement tests
npm test
# or
npm run test:unit
```

## Coverage Goal

- Aim for 80%+ coverage of game logic
- 100% coverage of critical systems (health, combat, win conditions)
- UI/rendering doesn't need unit tests (use integration tests)

## When to Write Tests

**Write tests AFTER:**
- Core feature works
- You've played it and confirmed it's fun
- You're about to refactor

**Don't write tests BEFORE:**
- You know what you're building
- Feature is stable

**Why:** Game development is iterative. Test too early = wasted effort.

---

*This folder is currently empty. We'll add tests once core gameplay is stable.*
