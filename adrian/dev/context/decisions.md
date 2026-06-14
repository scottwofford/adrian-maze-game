# Technical Decisions

This file records technical decisions made and their rationale.

---

## Game Engine Selection (2026-01-01)

**Decision:** Use Phaser 3

**Alternatives Considered:**
1. **Pygame** (Python)
   - Pros: Python is familiar, good tutorials
   - Cons: Harder to deploy in browser, needs conversion layer

2. **Godot** (Visual engine)
   - Pros: Visual editor, export to web
   - Cons: Steeper learning curve, larger export size

3. **Unity** (Professional engine)
   - Pros: Industry standard, powerful
   - Cons: Overkill for 2D game, complex, large file sizes

4. **Phaser 3** (JavaScript)
   - Pros: Browser-native, 2D-focused, great docs, easy deployment
   - Cons: JavaScript can be quirky

**Rationale:**
- Browser-based deployment (no installation needed)
- Easy to share (just send a link!)
- 2D platformer is Phaser's sweet spot
- Active community and examples
- Can deploy to GitHub Pages for free
- Adrian can play it on any device

**Trade-offs Accepted:**
- Learning JavaScript instead of Python
- No visual editor (code-based)
- Less powerful than Unity/Godot for 3D

---

## No Build Process (Yet) (2026-01-01)

**Decision:** Use Phaser via CDN, no Webpack/Rollup

**Rationale:**
- Simplify initial setup
- Faster iteration (just edit and refresh)
- Lower barrier to entry
- Can add build process later if needed

**When to Reconsider:**
- File gets too large (> 1000 lines)
- Need to split into modules
- Want TypeScript
- Need to optimize load time

---

## Local Multiplayer Only (Level 1) (2026-01-01)

**Decision:** Same keyboard, 2 players

**Alternatives Considered:**
1. **Online multiplayer** (WebRTC, WebSockets)
   - Pros: Play with anyone
   - Cons: Complex, needs server, lag issues

2. **Pass-and-play** (take turns)
   - Pros: Very simple
   - Cons: Less fun, no competition

3. **Gamepad support**
   - Pros: Better controls
   - Cons: Not everyone has gamepad

**Rationale:**
- Simplest to implement
- Perfect for siblings/friends playing together
- No networking complexity
- No lag issues
- Can add online later if game is popular

**Controls Chosen:**
- Player 1: Arrow keys (standard for gaming)
- Player 2: WASD (FPS standard, left-hand position)

---

## Cosmetic-Only Monsters (2026-01-01)

**Decision:** All monsters have same stats, visual differences only

**Adrian's Original Thought:** Different monsters could have different abilities

**Our Recommendation:** Start with cosmetic only

**Rationale:**
- **Game Balance:** Fair competition (no "best" monster)
- **Simplicity:** Less code, easier to test
- **Fortnite Model:** Proven approach (skins don't affect gameplay)
- **Expandable:** Can add abilities in Level 2+ if desired

**Adrian Agreed:** ✅ Cosmetic only for Level 1

**Future Consideration:**
- Level 2: Maybe add monster-specific abilities
- Keep balanced (rock-paper-scissors style)

---

## Health: 50 HP Starting (2026-01-01)

**Decision:** 50 health points per player

**Rationale:**
- Nice round number
- Divisible by common damage amounts (5, 10, 25)
- Not too high (games don't drag on)
- Not too low (instant deaths aren't fun)

**Damage Scale (Proposed):**
- Bow/Arrow: 10 HP (5 hits to kill)
- Lightsaber: 15 HP (4 hits to kill)
- Traps: 20 HP (2-3 hits to kill)

**Why These Numbers?**
- Bow: Ranged advantage = lower damage
- Lightsaber: Risk of close combat = higher damage
- Traps: Environmental hazard = high damage

---

## 3 Lives System (2026-01-01)

**Decision:** 3 lives per player

**Rationale:**
- Classic video game convention (Mario, Pac-Man)
- Allows mistakes without instant game over
- Creates tension (last life = high stakes)
- Matches "fast game" goal (3-5 minutes)

**Alternative Considered:**
- Single life (permadeath): Too harsh for kids
- 5+ lives: Games would take too long
- Infinite lives: No stakes, less exciting

---

## Random Maze Generation (2026-01-01)

**Decision:** Generate new maze each game

**Alternatives Considered:**
1. **Static maze** (same every time)
   - Pros: Can optimize, players can learn routes
   - Cons: Gets boring, memorization over skill

2. **Hand-designed levels**
   - Pros: Perfect balance, artistic
   - Cons: Limited content, lots of work

3. **Random generation**
   - Pros: Infinite variety, always surprising
   - Cons: Sometimes unbalanced, needs constraints

**Rationale:**
- Adrian wanted unpredictability
- Increases replay value
- Algorithm is educational (maze generation is cool!)
- Can always add hand-designed levels later

**Algorithm Choice (To Be Decided):**
- Depth-First Search (simple, creates long corridors)
- Prim's Algorithm (creates lots of branches)
- Recursive Backtracking (balance of both)

---

## GitHub Pages Deployment (2026-01-01)

**Decision:** Deploy to GitHub Pages

**Alternatives Considered:**
1. **Vercel/Netlify** (Modern hosting)
   - Pros: Better features, CI/CD
   - Cons: Another account, more complexity

2. **Self-hosted** (Own server)
   - Pros: Full control
   - Cons: Costs money, maintenance

3. **GitHub Pages** (Free GitHub hosting)
   - Pros: Free, integrated with repo, simple setup
   - Cons: Static only (but that's all we need!)

**Rationale:**
- Free forever
- Automatic deployment from main branch
- Already using GitHub
- HTTPS included
- Custom domain possible later

---

## No TypeScript (Yet) (2026-01-01)

**Decision:** Plain JavaScript

**Rationale:**
- One less thing to learn
- Faster initial setup
- JavaScript is fine for small projects
- Can migrate to TypeScript later if needed

**When to Reconsider:**
- Project grows beyond 2000 lines
- Multiple developers join
- Lots of refactoring needed
- Want better IDE support

---

## Test Strategy (2026-01-01)

**Decision:** Manual testing first, automated later

**Rationale:**
- Game is visual and interactive (hard to automate)
- Quick iteration more important than test coverage initially
- Manual playtesting gives best feedback
- Can add unit tests for game logic later (damage calc, maze gen)

**Manual Testing Process:**
1. Play the game after each change
2. Check console for errors (F12)
3. Test both players
4. Try edge cases (fall off map, rapid key presses)
5. Test in multiple browsers

**Future Automated Testing:**
- Unit tests: Pure functions (damage calc, maze generation)
- Integration tests: System interactions (collision detection)
- E2E tests: Full gameplay scenarios (maybe not needed)

---

## Asset Strategy (2026-01-01)

**Decision:** Start with colored shapes, add sprites later

**Rationale:**
- Focus on gameplay first
- Don't block on art
- Shapes are fast to iterate
- Can commission art later
- Adrian can focus on game design, not graphics

**Future Asset Plan:**
1. Find free sprites online (OpenGameArt, itch.io)
2. Commission custom sprites (if needed)
3. Adrian draws his own monster designs?
4. Pixel art style (easier than high-res)

---

## Feature Prioritization Philosophy (2026-01-01)

**Decision:** Adrian decides what's fun, we implement

**Process:**
1. Build prototype
2. Adrian plays it
3. Ask: "What would make this more fun?"
4. Build that next
5. Repeat

**Why This Works:**
- Adrian is the target audience (6-year-old)
- He knows what's fun for kids
- Keeps him engaged in the project
- Teaches iterative development

**Our Role:**
- Suggest technical feasibility
- Warn about scope creep
- Ensure game is balanced
- But defer to Adrian on "fun"

---

## Code Organization Philosophy (2026-01-01)

**Decision:** Start simple, refactor when needed

**Current State:** Single game.js file (~200 lines)

**Refactor Triggers:**
1. File exceeds 500 lines
2. Adding multiple scenes
3. Code duplication appears
4. Hard to find things

**Future Structure:**
```
src/
├── scenes/      (Menu, Game, GameOver)
├── entities/    (Player, Weapon, Trap)
├── systems/     (Combat, Health, Maze)
└── utils/       (Helpers, Constants)
```

**Philosophy:**
- "Make it work, make it right, make it fast" (in that order)
- Don't over-engineer early
- Refactor when pain points emerge

---

## Version Control Strategy (2026-01-01)

**Decision:** Feature branches, PR to main, keep main deployable

**Workflow:**
1. Create feature branch for each objective
2. Commit frequently with clear messages
3. Open draft PR
4. When done: update CHANGELOG, mark PR ready
5. Merge to main
6. Main branch always works (deployable)

**Commit Message Style:**
```
feat(scope): description
fix(scope): description
docs: description
```

**Why:**
- Clear history
- Easy to revert bad changes
- Main is always demo-ready
- Good habits for Adrian to learn

---

*Update this file whenever we make significant technical decisions!*
