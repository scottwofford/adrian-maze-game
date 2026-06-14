# Codebase Learnings

This file captures architectural patterns, module relationships, and how subsystems work together.

---

## Phaser 3 Architecture (2026-01-01)

### Game Lifecycle
```
preload() → create() → update() [60 times/second]
```

**preload()**: Load assets (images, sounds, sprites)
**create()**: Set up game objects, physics, collisions
**update()**: Game loop - handles movement, collisions, win conditions

### Physics System
- Using Arcade physics (simpler than Matter.js, good for platformers)
- Gravity applied globally: `gravity: { y: 300 }`
- Bodies can be dynamic (players) or static (platforms)
- Colliders detect when objects touch: `this.physics.add.collider(player, platforms)`

### Game Objects
**Static objects** (platforms):
```javascript
platforms = this.physics.add.staticGroup();
platforms.create(x, y, null).setDisplaySize(w, h).setTint(color).refreshBody();
```

**Dynamic objects** (players):
```javascript
player = this.add.rectangle(x, y, 32, 32, color);
this.physics.add.existing(player);
player.body.setBounce(0.2);
player.body.setCollideWorldBounds(true);
```

### Input Handling
- `cursors = this.input.keyboard.createCursorKeys()` - Arrow keys
- `wasd = this.input.keyboard.addKeys({...})` - Custom key mapping
- Check keys in update(): `if (cursors.left.isDown) {...}`

### Coordinate System
- Origin (0, 0) is top-left corner
- X increases to the right
- Y increases downward
- Our game: 800px wide, 600px tall

---

## Current Code Organization (2026-01-01)

### File Structure
```
index.html         → Entry point, loads Phaser + game.js
game.js            → All game logic (monolithic for now)
```

**When to refactor:** When game.js exceeds 500 lines or we add multiple scenes

### Key Variables
- `player1`, `player2` - Player game objects
- `platforms` - Static group for maze walls/floors
- `cursors`, `wasd` - Input handlers
- `player1Health`, `player2Health` - Health values (UI only currently)
- `player1Lives`, `player2Lives` - Lives remaining (UI only currently)

---

## Phaser Patterns Learned

### Creating Platforms
**Current approach** (simple rectangles):
```javascript
platforms.create(x, y, null)
  .setDisplaySize(width, height)
  .setTint(0x8B4513)  // Brown color
  .refreshBody();      // Update physics body
```

**Future approach** (with sprites):
```javascript
platforms.create(x, y, 'platform-sprite');
```

### Player Movement Pattern
```javascript
// Horizontal movement
if (key.isDown) {
    player.body.setVelocityX(speed);
} else {
    player.body.setVelocityX(0);  // Stop when released
}

// Jump (only when touching ground)
if (upKey.isDown && player.body.touching.down) {
    player.body.setVelocityY(-jumpPower);
}
```

**Why `touching.down`?** Prevents double-jumping or jumping in mid-air.

### Win Detection (Current Simple Approach)
```javascript
if (player.x > exitX && player.y < exitY) {
    console.log('Player wins!');
}
```

**Better approach for future:**
```javascript
this.physics.add.overlap(player, exitZone, handleWin, null, this);
```

---

## Known Patterns to Use

### Object Pooling (for projectiles)
When we add arrows, don't create/destroy each arrow. Instead:
1. Create a pool of 20 arrow objects at start
2. Enable/disable arrows as needed
3. Reuse inactive arrows

**Why?** Creating/destroying objects is expensive. Reusing is faster.

### Scene Management
When we add menus:
```javascript
// Switch between scenes
this.scene.start('GameScene');
this.scene.pause('GameScene');
this.scene.resume('GameScene');
```

### Collision Callbacks
```javascript
this.physics.add.overlap(
    bullet,           // Object 1
    enemy,            // Object 2
    hitEnemy,         // Callback function
    null,             // Process callback
    this              // Context
);

function hitEnemy(bullet, enemy) {
    bullet.destroy();
    enemy.health -= 10;
}
```

---

## Performance Considerations

### Current Performance
- 60 FPS stable with 2 players + 6 platforms
- No sprite animations yet (just colored rectangles)
- No projectiles yet

### Expected Bottlenecks (Future)
1. **Many projectiles** - Use object pooling
2. **Sprite animations** - Limit active animated sprites
3. **Collision detection** - Use groups and layers
4. **Particle effects** - Cap particle count

### Monitoring Performance
```javascript
console.log(game.loop.actualFps);  // Check current frame rate
```

---

## Browser-Specific Notes

### Refresh Caching Issue
**Problem:** Browser caches game.js, changes don't show up
**Solution:** Hard refresh
- Mac: Cmd + Shift + R
- Windows: Ctrl + Shift + R
- Or disable cache in DevTools (F12 → Network tab → Disable cache)

### Console Logging
Current approach: `console.log()` everywhere
Future: Toggle debug mode
```javascript
const DEBUG = true;
if (DEBUG) console.log('Debug info');
```

---

## Gotchas & Learnings

### Static vs Dynamic Bodies
- Static bodies don't move (platforms, walls)
- Dynamic bodies have velocity and gravity (players, projectiles)
- **Gotcha:** If platform needs to move, use dynamic body!

### Collision Setup Order Matters
```javascript
// ✅ Correct order
this.physics.add.existing(player);        // Add physics first
this.physics.add.collider(player, walls); // Then add collisions
```

### Text Origin
```javascript
// Default origin is (0, 0) = top-left
this.add.text(100, 100, 'Text');

// Center text
this.add.text(400, 300, 'Text').setOrigin(0.5);
```

---

## Future Learning Areas

### When We Add These Features
- **Tilemaps** - For complex maze layouts
- **Sprite Animations** - Walking, jumping, attacking
- **Tweens** - Smooth animations (health bar, UI)
- **Particles** - Explosion effects, hit sparks
- **Audio** - Sound effects and music
- **Cameras** - Following players, zooming
- **Groups** - Managing multiple similar objects

---

*Keep this updated as we learn more patterns!*
