# TODO List - Adrian's Maze Game

Last updated: 2026-01-01

## 🎮 Core Gameplay Features

### Combat System
- [ ] **Bow & Arrow weapon**
  - [ ] Shooting mechanics (hold to aim, release to fire)
  - [ ] Arrow projectile physics
  - [ ] Collision detection with other player
  - [ ] Damage calculation (10 HP per hit?)
  - [ ] Visual feedback (arrow sprite, hit animation)

- [ ] **Lightsaber weapon**
  - [ ] Melee attack range
  - [ ] Swing animation
  - [ ] Collision detection (close range)
  - [ ] Higher damage than bow (15 HP per hit?)
  - [ ] Visual effects (glowing blade, swing trail)

- [ ] **Weapon crafting/selection**
  - [ ] Button to craft/build weapons (Adrian mentioned this)
  - [ ] Choose weapon at game start OR craft during game?
  - [ ] Material gathering system if crafting

### Superpower System
- [ ] **Superpower selection at start** (alternative to weapons)
- [ ] Implement 2-3 superpowers for Level 1:
  - [ ] Super Speed (move faster)
  - [ ] X-Ray Vision (see through walls)
  - [ ] Teleport (jump to different spots)
  - [ ] Shield (block attacks)
  - [ ] Fire Blast (ranged attack)
  - [ ] Freeze (stop other player temporarily)
- [ ] Cooldown system for powers
- [ ] Visual effects for each power

### Health & Lives System (Logic Implementation)
- [ ] **Health system** (currently UI only)
  - [ ] Actual damage when hit by weapons
  - [ ] Actual damage from traps
  - [ ] Health regeneration? (or health pickups?)
  - [ ] Death when health reaches 0

- [ ] **Lives system** (currently UI only)
  - [ ] Lose 1 life when health reaches 0
  - [ ] Respawn with full health
  - [ ] Respawn location (start? checkpoint? random safe spot?)
  - [ ] Game over when all 3 lives lost

### Trap System
- [ ] **Pre-built traps** (generated with maze)
  - [ ] Lava floors (hidden? visible?)
  - [ ] Spike pits
  - [ ] Falling platforms
  - [ ] Moving barriers
  - [ ] Surprise walls
  - [ ] Trap damage amount (20 HP?)

- [ ] **Player-built traps**
  - [ ] Dig holes
  - [ ] Fill holes with lava
  - [ ] Build lava barriers
  - [ ] Combo material traps
  - [ ] Trap placement UI

### Maze Generation
- [ ] **Random maze algorithm**
  - [ ] Research algorithms (Depth-First, Prim's, Recursive Backtracking)
  - [ ] Ensure path to exit always exists
  - [ ] Place pre-built traps randomly
  - [ ] Balanced difficulty
  - [ ] Small-medium size (3-5 minute completion)

- [ ] **Checkpoints**
  - [ ] Place checkpoints every 1/3 of maze
  - [ ] Visual indicator (flag? glowing spot?)
  - [ ] Save progress for respawns

### Material & Crafting System
- [ ] **Base materials** (Water, Wood, Fire/Lava, Stone)
- [ ] **Material gathering**
  - [ ] Find in maze (treasure chests?)
  - [ ] Dig from ground/walls
  - [ ] Both?

- [ ] **Crafting recipes**
  - [ ] Water + Lava → Rock/Obsidiana
  - [ ] Fire + Wood → Coal
  - [ ] Water + Wood → Damaged Wood
  - [ ] More combinations to discover

- [ ] **Inventory system**
  - [ ] Show collected materials
  - [ ] Crafting UI
  - [ ] Quick-select for building

---

## 🎨 UI/UX Improvements

### Character Selection
- [ ] **Monster selection screen** (before game starts)
  - [ ] 6+ monster options (Dinosaur, Robot, Alien, Dragon, Zombie, Ghost)
  - [ ] Preview of each monster
  - [ ] Cosmetic only (all same stats)
  - [ ] Save selection

### Loadout Selection
- [ ] **Choose weapon OR superpower** screen
  - [ ] Visual display of options
  - [ ] Show stats/descriptions
  - [ ] Confirm selection

### HUD (Heads-Up Display)
- [ ] Real-time health bars (not just text)
- [ ] Lives displayed with hearts ❤️
- [ ] Current weapon/power indicator
- [ ] Minimap of maze?
- [ ] Timer showing match duration

### Win/Lose Screens
- [ ] Winner announcement (with emoji!)
- [ ] Stats summary (damage dealt, traps avoided, etc.)
- [ ] Play again button
- [ ] Return to menu button

### Main Menu
- [ ] Title screen
- [ ] Start game button
- [ ] Settings/options
- [ ] Credits (Adrian's name as designer!)
- [ ] How to play instructions

---

## 🎨 Visual & Audio

### Graphics
- [ ] Replace colored rectangles with actual sprites
  - [ ] Player sprites (monster designs)
  - [ ] Platform sprites (different materials)
  - [ ] Trap sprites (lava, spikes, etc.)
  - [ ] Weapon sprites (bow, arrow, lightsaber)
  - [ ] Background art

- [ ] Animations
  - [ ] Walking animation
  - [ ] Jumping animation
  - [ ] Attack animations
  - [ ] Hit/damage animation
  - [ ] Death animation
  - [ ] Win celebration

### Audio
- [ ] **Sound effects**
  - [ ] Jump sound
  - [ ] Landing sound
  - [ ] Weapon sounds (bow twang, lightsaber hum)
  - [ ] Hit sounds
  - [ ] Trap trigger sounds
  - [ ] Win/lose sounds

- [ ] **Music**
  - [ ] Main menu music
  - [ ] Gameplay music (fast-paced, exciting)
  - [ ] Win music
  - [ ] Game over music

---

## 🧪 Testing & Quality

### Browser Compatibility
- [ ] Test on Chrome
- [ ] Test on Firefox
- [ ] Test on Safari
- [ ] Test on mobile browsers (touch controls?)

### Performance
- [ ] Monitor frame rate
- [ ] Optimize sprite counts
- [ ] Implement object pooling for projectiles
- [ ] Reduce lag with many objects

### Bug Fixes
- [ ] Test edge cases (falling off map, getting stuck in walls)
- [ ] Handle rapid key presses
- [ ] Prevent exploits (invincibility, wall clipping)

### Automated Tests
- [ ] Unit tests for game logic
  - [ ] Damage calculation
  - [ ] Maze generation
  - [ ] Collision detection
  - [ ] Win/lose conditions

- [ ] Integration tests
  - [ ] Player-weapon interaction
  - [ ] Trap-player interaction
  - [ ] Powerup collection

---

## 📚 Documentation

- [ ] Update README with latest features
- [ ] Create CONTRIBUTING.md for future contributors
- [ ] Add code comments for complex logic
- [ ] Create video demo/gameplay footage
- [ ] Write dev blog post about building with a 6-year-old designer

---

## 🚀 Future Levels & Features (Post-Level 1)

### Level 2+
- [ ] More players (4-player mode)
- [ ] Larger mazes
- [ ] New trap types
- [ ] New weapons
- [ ] New superpowers
- [ ] Boss battles?

### Advanced Features
- [ ] Online multiplayer (WebRTC?)
- [ ] Leaderboard
- [ ] Player profiles with stats
- [ ] Unlockable monsters/skins
- [ ] Level editor (let players create mazes!)
- [ ] Tournament mode

### Monetization (If ever needed)
- [ ] Cosmetic purchases only (no pay-to-win)
- [ ] Support the developer button
- [ ] Premium monster skins

---

## 🔧 Technical Debt & Refactoring

- [ ] Split game.js into multiple files
  - [ ] scenes/ (MenuScene, GameScene, GameOverScene)
  - [ ] entities/ (Player, Weapon, Trap)
  - [ ] systems/ (CombatSystem, HealthSystem)
  - [ ] utils/ (helpers, constants)

- [ ] Add TypeScript? (better type safety)
- [ ] Set up build process (Webpack, Rollup)
- [ ] Add linting (ESLint)
- [ ] Add formatting (Prettier)

---

## 💡 Ideas to Validate with Adrian

### Questions for Next Session
- [ ] Should weapons do different damage amounts?
- [ ] How long should superpowers last?
- [ ] Where should players respawn after death?
- [ ] What should traps look like?
- [ ] Should there be power-ups (speed boost, extra life)?
- [ ] Friendly fire (can you damage yourself with traps)?
- [ ] Can you change weapons during the game?

---

## 📊 Priority Levels

**P0 (Must Have for Level 1):**
- Combat system (weapons)
- Health/lives logic
- Basic traps
- Win/lose screens

**P1 (Should Have for Level 1):**
- Random maze generation
- Monster selection
- Sound effects
- Better sprites

**P2 (Nice to Have):**
- Superpowers
- Material crafting
- Advanced traps
- Animations

**P3 (Future):**
- Online multiplayer
- Level 2+
- Mobile support

---

## 🎮 Next Steps

**Immediate:**
1. Get Adrian's feedback on current prototype
2. Choose next objective based on feedback
3. Create feature branch for next objective
4. Start development!

**This Week:**
- Focus on making combat fun
- Add at least one weapon
- Make health system actually work

**This Month:**
- Complete Level 1 with all core features
- Polish UI/UX
- Deploy to GitHub Pages
- Share with friends for testing

---

*Remember: Adrian is the designer. When in doubt, ask Adrian!* 🎮✨
