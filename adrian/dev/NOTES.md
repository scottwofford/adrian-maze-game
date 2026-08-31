# Development Notes

Current session: Prototype development

---

## Session: 2026-08-31 - Trap and lives decisions

### Adrian's words / Las palabras de Adrian

> "¿Trampas como? Necesitamos generar trampas. Si no, ¿para qué van a funcionar las vidas? Ya. Pero ¿cómo van a ser las trampas? ¿Cuántas y cómo? ¿Qué pasa cuando estás en las trampas? Así que las trampas te quitan una vida. Empezamos con tres vidas en el primer.. Empezamos con cinco vidas. Con 10 vidas en el primer nivel, con 5 vidas en el segundo nivel, con tres en el tercer nivel y con una en el El cuarto nivel."

### Decisions captured / Decisiones registradas

- Traps are needed so the lives system has a purpose.
- Falling into a trap removes one life.
- Starting lives by level: 10 in Level 1, 5 in Level 2, 3 in Level 3, and 1 in Level 4.
- Trap appearance, number, and behavior still need Adrian's design decisions.

### Built on 2026-08-31 / Construido el 2026-08-31

- `LIVES_BY_LEVEL = [10, 5, 3, 1]` in `game.js`; Level 1 uses 10 lives for both players.
- Lava traps are switched ON. Every trap costs exactly one life (1 second cooldown so one
  trap cannot eat two lives).
- Seven traps in Level 1, all visible with a 🔥 label (Adrian's rule: "puedes ver todas las trampas").
- Losing your last life ends the game and the other player wins.
- The old 50 HP health bar is gone: lives are now the only way to get hurt. Health can come
  back with weapons in Phase 4 if Adrian wants it.
- Levels 2, 3, and 4 are not built yet, but their lives (5, 3, 1) are already in the code.

### Trap tuning / Ajuste de trampas (2026-08-31, later)

> "Como en por todo el tablero... pero no pongas demasiado, como solo cuatro o algo asi,
> cuatro trampas de lava. Son trampas de lava? Algunas. Algunas no y algunas..." - Adrian

- Went from 7 lava traps down to **4**, spread across the whole board (bottom, left, right, top).
- Adrian says only SOME traps are lava. The other trap types are still undecided; he was
  thinking out loud ("a ver"). His material list from Phase 2 planning: 🔥 fuego, 💧 agua,
  🪵 leña, 🏖️ arena.
- Open question for Adrian: what are the not-lava traps, and what do they do?

### Next: el mago / the wizard

> "Después de las trampas quiero añadir un mago." - Adrian, 2026-08-31

Questions for Adrian before we build him / Preguntas para Adrian:
- ¿El mago es un jugador, un enemigo, o un ayudante?
- ¿Qué hace su magia? (¿te quita vidas, te da vidas, te mueve, hace trampas?)
- ¿Dónde vive en el laberinto? ¿Se mueve o se queda quieto?
- ¿Cómo se ve? 🧙 🧙‍♂️ 🧙‍♀️

---

## Session: 2026-01-01 - Initial Prototype Build

### Context
- Building game WITH Adrian (6 years old)
- Also testing Scott's Luthien proxy system
- Adrian's dad Luis is present with friends Gabriel, Zoe, and Victoria

### Design Decisions Made Today

**1. Game Engine: Phaser 3**
- Runs in browser (easy to demo)
- 2D platformer support built-in
- Good documentation and community
- No installation needed for players

**2. Player Count: 2 players for Level 1**
- Start simple, can expand later
- Local multiplayer (same keyboard)
- Player 1: Arrow keys, Player 2: WASD

**3. Camera Perspective: Side-scrolling 2D**
- Like Super Mario / Donkey Kong
- Both players visible on screen
- Classic platformer feel

**4. Combat System**
- 2 weapons: Bow/Arrow (ranged), Lightsaber (melee)
- Alternative: Choose superpower instead of weapon
- Button to craft/build weapons (need to clarify with Adrian)

**5. Health & Lives**
- 50 HP starting health
- 3 lives per player
- Respawn after death (if lives remain)

**6. Maze**
- Random generation (different every game)
- Fast completion (3-5 minutes target)
- Pre-built traps + player-built traps

**7. Monsters**
- Cosmetic only (no gameplay differences)
- All players are monsters
- Fair competition

### Technical Implementation Notes

**Phaser Setup:**
- Using CDN version (v3.70.0) for simplicity
- No build process yet (may add later)
- Simple file structure: index.html + game.js

**Physics:**
- Arcade physics (good for platformers)
- Gravity: 300 (feels good for jumping)
- Player velocity: 160 (horizontal), -250 (jump)
- Bounce: 0.2 (slight bounce on landing)

**Current Limitations:**
- Health/lives are UI only (not functional yet)
- No actual combat system
- No traps
- Static maze (not random yet)
- Basic rectangles instead of sprites

### Questions Still to Answer

1. **Weapon Acquisition:**
   - Do players START with weapons?
   - OR find/craft during game?
   - Adrian mentioned "button to build weapons" - need clarification

2. **Respawn Location:**
   - Back to start?
   - Last checkpoint?
   - Random safe spot?

3. **Superpower Selection:**
   - Which 2-3 for Level 1?
   - How long do they last?
   - Cooldown period?

4. **Trap Types:**
   - Lava floors (hidden? visible?)
   - Spike pits
   - What else?

5. **Controls:**
   - Attack button? (Spacebar for P1, Shift for P2?)
   - Build trap button?

### Next Session Prep

**Show Adrian:**
- Current playable prototype
- Both players moving/jumping
- Racing to the exit

**Ask Adrian:**
- What do you like?
- What should we change?
- What should we add first? (weapons, traps, or powers?)
- How should weapons work?

**Prepare to implement:**
- Whatever Adrian wants most!
- Likely: One weapon first (probably bow/arrow as it's simpler)

### Code Organization Plans

**Current:** Single game.js file (~200 lines)

**Future refactor (when > 500 lines):**
```
src/
├── scenes/
│   ├── MenuScene.js
│   ├── CharacterSelectScene.js
│   ├── GameScene.js
│   └── GameOverScene.js
├── entities/
│   ├── Player.js
│   ├── Weapon.js
│   └── Trap.js
├── systems/
│   ├── CombatSystem.js
│   ├── HealthSystem.js
│   └── MazeGenerator.js
└── utils/
    ├── constants.js
    └── helpers.js
```

### Performance Considerations

**Target:**
- 60 FPS on modern browsers
- < 50 active game objects at once
- Fast load time (< 2 seconds)

**Monitor:**
- Frame drops with many projectiles
- Collision detection performance
- Memory usage with sprite animations

### Browser Compatibility

**Primary targets:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest)

**Nice to have:**
- Mobile browsers (would need touch controls)

### Deployment Plan

**Phase 1 (Current):** Local development
- Run with Python http.server
- Test on localhost

**Phase 2 (Soon):** GitHub Pages
- Push to main branch
- Enable GitHub Pages in settings
- Live at: luthienresearch.github.io/adrian-maze-game

**Phase 3 (Future):** Custom domain?
- adrian-maze-game.com?
- Only if game becomes popular!

---

## Teaching Moments for Adrian

**Concepts Explained Today:**
1. ✅ Branches (like tree branches)
2. ✅ Commits (like taking photos)
3. ✅ GitHub (like a magical garden for code)
4. ✅ Bugs (bichitos in code)
5. ✅ Roots (system fundamentals)

**Concepts to Explain Later:**
- Variables (boxes that hold information)
- Functions (recipes that do specific tasks)
- Loops (doing something many times)
- If/Else (making decisions)
- Events (when something happens, do this)

**Game Dev Concepts:**
- Sprites (pictures that move)
- Collision detection (when things touch)
- Game loop (update 60 times per second)
- Scene management (different screens)

---

## Interesting Luthien Observations

**Using Luthien while building:**
- This conversation is being proxied through Luthien
- All interactions logged for Scott's product testing
- Real-world use case: family project + teaching
- Helps validate Luthien's value for collaborative work

**Potential Luthien Features to Test:**
- Long conversations (this one is getting long!)
- Code generation quality
- Educational context (explaining to a 6-year-old)
- Project setup and organization

---

## Random Ideas to Explore

- [ ] Easter eggs (hidden secrets in the game)
- [ ] Cheat codes (infinite lives, super speed)
- [ ] Unlockable content (new monsters after wins)
- [ ] Daily challenges
- [ ] Share replay videos
- [ ] Spectator mode (watch others play)

---

## Blockers & Risks

**Current Blockers:** None! 🎉

**Potential Risks:**
- Adrian might lose interest (mitigate: keep it fun!)
- Scope creep (mitigate: focus on Level 1 first)
- Technical complexity (mitigate: start simple, add gradually)
- Browser compatibility issues (mitigate: test frequently)

---

## Success Metrics

**For Adrian:**
- Is it fun to play?
- Does it match his vision?
- Does he want to keep working on it?
- Does he show it to friends?

**For Scott/Luthien:**
- Does conversation flow smoothly?
- Are design decisions captured clearly?
- Is code quality good?
- Is project organization helpful?

**For Learning:**
- Does Adrian understand new concepts?
- Can he explain what we built?
- Does he feel ownership?
- Is he excited about programming?

---

*Clear this file when starting a new objective!*
