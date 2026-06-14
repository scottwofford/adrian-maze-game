# Repository Guidelines - Kids' Game Studio

This repo is a **collection of browser games, one per kid**. Each kid gets their own
subfolder (`adrian/`, `rafa/`, `victoria/`, ...) holding a self-contained game plus its
own dev tracking. The root holds a landing page that links to every kid's game and this
shared guide. **This file is generic and applies to every game.** A kid's folder may add
its own `CLAUDE.md` with game-specific design notes; when it does, that file wins for
anything inside that folder.

Este repo es una **colección de juegos en el navegador, uno por cada niño**. Cada niño
tiene su propia carpeta (`adrian/`, `rafa/`, `victoria/`, ...). Este archivo es genérico y
aplica a todos los juegos.

## Language / Idioma

**Always reply in both English and Spanish.** These games are for Scott's kids and are bilingual!

**Siempre responde en inglés y español.** ¡Estos juegos son para los hijos de Scott y son bilingües!

---

## Purpose & Scope

**Core Goal:** Build simple, fun, browser-based games designed BY the kids themselves. Each
kid is the game designer; our job is to bring their ideas to life.

**Objetivo Principal:** Construir juegos sencillos y divertidos en el navegador, diseñados
POR los propios niños. Cada niño es el diseñador del juego; nuestro trabajo es darle vida a
sus ideas.

**Target Audience:** Kids ages 4-12, families playing together

**Tech Stack:**
- **Game Engine:** Phaser 3 (JavaScript HTML5 game framework, loaded via CDN)
- **Language:** JavaScript (ES6+)
- **Platform:** Web browsers (Chrome, Firefox, Safari)
- **Deployment:** GitHub Pages (free static hosting)
- **Development Server:** Python's http.server or Node.js http-server

---

## Kick Off a New Kid's Game (no setup required)

When a new kid wants a game, copy an existing kid's folder as the template (`rafa/` is the
smallest, cleanest scaffold) and capture their vision. Steps:

1. **Create the folder:** `mkdir -p <kid>/dev/context <kid>/tests/{unit,integration,e2e} <kid>/learning`
2. **Capture their vision verbatim.** Record the kid describing their game and write their
   EXACT words into `<kid>/README.md`, Spanish first then an English translation. Never
   paraphrase or invent details. Strip out the adult's prompting questions; keep only what
   the kid said. Put the design bullets into `<kid>/dev/OBJECTIVE.md`.
3. **Scaffold the rest** by mirroring an existing kid: `CHANGELOG.md`, `index.html`
   (Phaser CDN + `<script src="game.js">`), a placeholder `game.js`, empty `dev/NOTES.md`,
   `dev/TODO.md`, `dev/context/*`, `tests/*/README.md`, `learning/*`.
4. **Add the kid to the root landing page** (`index.html`) so their game is reachable.
5. Commit: `feat(<kid>): add <kid>'s game project`.

That's the whole setup. Building the actual game is a separate objective the kid drives.

---

## Development Workflow

1. **Start with an OBJECTIVE** (e.g., 'add bow and arrow weapon', 'build the first playable prototype')
2. Make sure we're on a feature branch (not `main`) when the work is substantial
3. Commit changes regularly with clear messages
4. Push to origin and open a draft PR (to `main`) for substantial work
5. Implement the OBJECTIVE. Add out-of-scope items to `<kid>/dev/TODO.md`
6. Test gameplay manually (and automated tests when applicable)
7. When OBJECTIVE is complete:
   - Update `<kid>/CHANGELOG.md`
   - Clear `<kid>/dev/OBJECTIVE.md` and `<kid>/dev/NOTES.md`
   - Mark PR as ready

All paths below are relative to the kid's folder you're working in.

### Maintaining Context

Update files in `<kid>/dev/context/` as we learn:

- **`codebase_learnings.md`**: Phaser patterns, game architecture, how systems interact
- **`decisions.md`**: Technical decisions (why Phaser over Pygame, collision system choices, etc.)
- **`gotchas.md`**: Non-obvious Phaser behaviors, browser quirks, physics edge cases

Include timestamps (YYYY-MM-DD) when adding entries.

**File Encoding:** For CSV files with Spanish/non-ASCII text, add UTF-8 BOM to ensure proper display in GitHub, Excel, and editors. See a kid's `dev/context/gotchas.md` for details.

### Objective Workflow

1. **Start a new objective**
   ```bash
   git checkout main
   git pull
   git checkout -b feature/<kid>-<short-handle>
   ```

   Update `<kid>/dev/OBJECTIVE.md`, then:
   ```bash
   git add <kid>/dev/OBJECTIVE.md
   git commit -m "chore(<kid>): set objective to <description>"
   git push -u origin feature/<kid>-<short-handle>
   gh pr create --draft --fill --title "<Objective Title>"
   ```

2. **Develop**
   - Test in browser frequently (refresh with Cmd+Shift+R to clear cache)
   - Check browser console (F12) for errors
   - Commit in small chunks with clear messages
   - Use emojis in commits if it helps! (The kids like them 🎮)

3. **Wrap up the objective**
   ```bash
   git status
   ```
   - Update `<kid>/CHANGELOG.md` with a bullet referencing the objective
   - Clear `<kid>/dev/NOTES.md` and `<kid>/dev/OBJECTIVE.md`
   ```bash
   git commit -a -m "feat(<kid>): <objective> is ready"
   gh pr ready
   ```

## Repo Structure

```
adrian-maze-game/                 # repo (named after the first game)
├── index.html                    # Landing page: links to every kid's game
├── README.md                     # Repo overview
├── CHANGELOG.md                  # Repo-level change history
├── CLAUDE.md                     # This shared guide
├── adrian/                       # Adrian's game (one folder per kid)
├── rafa/                         # Rafa's game
└── victoria/                     # Victoria's game
```

Each kid's folder follows the same shape:

```
<kid>/
├── index.html                    # Entry point (Phaser CDN + game.js)
├── game.js                       # Main game code
├── README.md                     # The kid's vision, in their exact words (ES + EN)
├── CHANGELOG.md                  # Record of changes
├── CLAUDE.md                     # (optional) game-specific design notes
├── dev/                          # Development tracking
│   ├── OBJECTIVE.md              # Current objective
│   ├── NOTES.md                  # Implementation scratchpad
│   ├── TODO.md                   # Future work
│   └── context/                  # Persistent knowledge
│       ├── codebase_learnings.md
│       ├── decisions.md
│       └── gotchas.md
├── tests/                        # unit / integration / e2e
└── learning/                     # Learning materials for the kid
```

## Build, Test, and Development Commands

### Running the Games
```bash
# Option 1: Python (simplest)
python3 -m http.server 8080

# Option 2: Node.js
npx http-server -p 8080

# Then open: http://localhost:8080  (landing page)
# A specific game: http://localhost:8080/victoria/
```

### Testing
- **Manual Testing:** Play the game in browser, check console for errors
- **Unit Tests:** (Future) Test game logic in isolation
- **Integration Tests:** (Future) Test system interactions
- **E2E Tests:** (Future) Automated gameplay testing

### Browser Dev Tools
- **F12 or Cmd+Option+I:** Open console
- **Cmd+Shift+R (Mac) / Ctrl+Shift+R (PC):** Hard refresh (clear cache)
- **Console tab:** See errors and our console.log messages
- **Network tab:** Check if assets loaded

## Coding Style & Naming Conventions

### JavaScript Style
- **Variables:** `camelCase` (e.g., `playerHealth`, `currentLevel`)
- **Constants:** `UPPER_SNAKE_CASE` (e.g., `MAX_HEALTH`, `GAME_WIDTH`)
- **Functions:** `camelCase` (e.g., `createPlayer()`, `handleCollision()`)
- **Classes:** `PascalCase` (e.g., `Player`, `Weapon`, `TrapSystem`)

### Phaser Conventions
- **Scenes:** PascalCase class names (e.g., `MainMenuScene`, `GameScene`, `GameOverScene`)
- **Game Objects:** Descriptive names (e.g., `player1`, `exitDoor`, `lavaFloor`)
- **Groups:** Plural names (e.g., `platforms`, `enemies`, `traps`)

### Code Organization
- Keep functions small and focused
- Comment the "why", not the "what"
- Use console.log for debugging (with emojis! 🎮)
- Group related code together

### Example:
```javascript
// Good ✅
function createPlayer(x, y, color) {
    const player = this.add.rectangle(x, y, 32, 32, color);
    this.physics.add.existing(player);
    player.body.setBounce(0.2);
    return player;
}

// Not as good ❌
function cp(a,b,c){return this.add.rectangle(a,b,32,32,c);}
```

## Git Commit Messages

### Format
```
<type>(<scope>): <description>

[optional body]
```

Use the kid's name as the scope for game-specific work (e.g., `feat(victoria): ...`).

### Types
- **feat:** New feature (weapons, traps, levels)
- **fix:** Bug fix
- **docs:** Documentation changes
- **style:** Formatting, visual changes
- **refactor:** Code restructuring
- **test:** Adding tests
- **chore:** Maintenance (dependencies, config)

### Examples
```bash
feat(adrian): add bow and arrow weapon
fix(rafa): prevent players from passing through walls
feat(victoria): build the first playable prototype
docs: update repo README with the new game
style(ui): improve health bar display
chore(adrian): set objective to implement trap system
```

## Testing Guidelines

### Manual Testing Checklist
- [ ] Players can move and jump
- [ ] Collisions work correctly
- [ ] Win condition triggers properly
- [ ] No console errors
- [ ] Works in Chrome, Firefox, Safari
- [ ] Responsive to different screen sizes

### Future Automated Testing
- **Unit Tests:** Test pure functions (damage calculation, maze generation)
- **Integration Tests:** Test system interactions (weapon hits player)
- **E2E Tests:** Test full gameplay scenarios (complete level)

## Security & Configuration

- No secrets/API keys needed for now (client-side only games)
- Assets must be publicly accessible
- Be careful with user input if we add it later (leaderboards, names)

## Working with the Kid Designer

Each game is designed by a kid. Their folder's `CLAUDE.md` (if present) captures who they
are and what they want. General guidance for working with any of them:

### Communication Guidelines
- **Show, don't tell:** Let the kid play and give feedback
- **Ask questions:** "What should happen when...?"
- **Use visual examples:** Show options rather than describe
- **Keep it fun:** This is a learning experience for a kid!
- **Document everything:** The kid's ideas are gold 💡

### Getting Feedback
1. Let the kid play the current version
2. Ask: "What do you like?"
3. Ask: "What should we change?"
4. Ask: "What should we add next?"
5. Document in `<kid>/dev/NOTES.md`

### Design Decisions
- The kid has final say on game design
- Technical implementation is our job
- Balance fun vs. technical feasibility
- Start simple, add complexity gradually

## Performance Considerations

- Keep sprite counts reasonable (< 100 active sprites)
- Use object pooling for bullets/projectiles
- Optimize collision detection (use groups)
- Test on different devices (not just development machine)
- Monitor frame rate (Phaser.Game.loop.actualFps)

## Common Phaser Patterns

### Creating Game Objects
```javascript
// Sprite with physics
const player = this.physics.add.sprite(x, y, 'player');

// Simple shape
const platform = this.add.rectangle(x, y, width, height, color);
this.physics.add.existing(platform, true); // true = static

// Emoji as a sprite (the house style for these games)
const hero = this.add.text(x, y, '🦄', { fontSize: '40px' }).setOrigin(0.5);
this.physics.add.existing(hero);
```

### Collisions
```javascript
this.physics.add.collider(player, platforms);
this.physics.add.overlap(bullet, enemy, hitEnemy, null, this);
```

### Input
```javascript
const cursors = this.input.keyboard.createCursorKeys();
const spacebar = this.input.keyboard.addKey('SPACE');
```

## Deployment

### GitHub Pages Setup
1. Go to repo Settings → Pages
2. Source: Deploy from branch `main`
3. Folder: `/` (root)
4. Save
5. Live at: `https://scottwofford.github.io/adrian-maze-game/` (landing page)
   - A specific game: `https://scottwofford.github.io/adrian-maze-game/victoria/`

Use relative links everywhere so games work under the Pages subpath.

### Pre-Deployment Checklist
- [ ] Test in multiple browsers
- [ ] Check all assets load correctly
- [ ] No console errors
- [ ] Game is playable start-to-finish
- [ ] Landing page links to every game

## Learning Resources

### For the Kids
- Phaser examples: https://phaser.io/examples
- Game mechanics videos on YouTube
- Play similar games for inspiration

### For Developers
- Phaser 3 docs: https://photonstorm.github.io/phaser3-docs/
- Phaser tutorials: https://phaser.io/learn
- Game dev patterns: https://gameprogrammingpatterns.com/

## Project Philosophy

**From the kid's perspective:**
- **Fun first:** If it's not fun, change it
- **Fast iteration:** Build → Play → Feedback → Improve
- **Learn by doing:** Don't overthink, just try it
- **Creative freedom:** Wild ideas welcome!

**From Developer perspective:**
- **Start simple:** MVP → feedback → iterate
- **Document decisions:** Future us will thank us
- **Clean commits:** Small, focused, reversible
- **Test often:** Play the game frequently during development

## Notes for Claude Code

- These are learning projects for kid designers
- Prioritize clarity and fun over technical perfection
- Explain trade-offs in simple terms
- Suggest visual examples when possible
- Keep code comments friendly and educational
- Use emojis in communication (the kids love them!)
- Balance "doing it right" with "shipping something playable"

## Questions to Ask When Stuck

1. **Does this make the game more fun?**
2. **Would the kid understand this?**
3. **Can we test this easily?**
4. **Is this the simplest solution?**
5. **What would break if we did this?**

---

**Remember:** These games are built WITH the kids, not FOR them. Their ideas drive the design.
Our job is to bring them to life! 🎮✨

**Testing with Luthien:** This project also serves as a real-world test case for Scott's
Luthien AI proxy system. Document interesting interactions!

---

*Last updated: 2026-06-14*
