# Current Objective

## ✅ COMPLETED: Level 1 Prototype - Playable Foundation

**Date Started:** 2026-01-01
**Date Completed:** 2026-01-01

### What Was Built
- [x] Phaser 3 game engine setup with browser-based deployment
- [x] 2-player movement system (Player 1: Arrow keys, Player 2: WASD)
- [x] Basic platformer physics (jumping, gravity, collisions)
- [x] Simple maze layout with platforms
- [x] Exit point with win detection
- [x] Health and lives UI (50 HP, 3 lives per player)
- [x] Player representations (🦖 Dinosaur, 🤖 Robot)
- [x] Project organization (dev/, tests/, documentation)

### Outcome
✅ **SUCCESS!** First playable version complete. Team tested and provided feedback!

---

## 🎯 NEXT: Design Phase 2 - Trap System

**Status:** Planning Phase
**Priority:** 🔥🔥🔥 TOP PRIORITY (from Adrian's feedback!)
**Start Date:** TBD (after clarifying questions answered)

### Background

From feedback session 2026-01-01, the team (Adrian, Gabriel, Zoe, Victoria) decided:
- **Phase 2 = ALL ABOUT TRAPS** 🕳️
- **Phase 3 = Creature Selection** 🦄 (unicorn, princess, fairy, etc.)
- **Phase 4 = Combat & Polish** ⚔️ (weapons, sounds, graphics)

### Adrian's Vision

> "Trampas que nadie hizo, trampas que hacen los jugadores y todo eso. Y tú puedes ver todas las trampas."

**Translation:** Traps that nobody built (pre-existing), traps that players build, and you can see all the traps.

### Three Trap Types Requested

1. **Player-Built Traps** - Players can construct traps during gameplay
2. **Pre-Existing Traps** - Generated with maze, already there
3. **Super Traps** ✨ - Gabriel's idea: "Trampas fuertes que nadie les puede pasar" (strong traps that nobody can pass)

---

## ✅ Clarifying Questions - ANSWERED! (2026-01-01)

### Adrian's Answers:

#### About Super Traps:
- [x] **What makes them "super"?** → ¡No puedes salir! You're stuck forever = YOU LOSE
- [x] **How many per maze?** → **1** for Level 1 (Adrian's decision after team discussion)
- [x] **Where do they appear?** → Anywhere (random placement)

#### About Trap Visibility:
- [x] **Can you see all traps?** → YES! All traps visible always ("puedes ver todas las trampas")

#### About Material System:
- [x] **Need materials?** → NO LIMIT on materials (unlimited building!)
- [x] **What materials make what traps?** → Example: Dig hole + fill with lava = lava trap

#### About Building:
- [x] **How choose where?** → Wherever you want ("donde quieras")
- [x] **Build while running?** → Must STOP to build (except for very big traps?)

### Points System (NEW INFO! 🎮)
> "La única forma que pierdes puntos es que algo malo te pase"

**Two ways to lose points:**
1. Fall in a trap
2. Get hit by weapons

### 🔨 TRAP BUILDING SYSTEM (Updated 2026-01-02)

**Adrian's clarification:** No pre-existing traps! Players build ALL traps.

#### Materials / Materiales:
- 🔥 Fire / Fuego
- 💧 Water / Agua
- 🪵 Wood / Leña
- 🏖️ Sand / Arena

#### Controls / Controles:
1. **Material selector buttons** - Choose which material to use
2. **Dig button** - Press to excavate parts of green platforms
3. **Build button** - Place trap at location

#### Key Rules:
- ❌ **NO pre-existing traps** - Players build everything
- ❌ **NO super traps** - Removed for now
- ✅ **Can't fall in your OWN trap** - "Sería injusto"
- ✅ **Trap color = Player color** - P1 (🦖) = Red traps, P2 (🤖) = Blue traps
- ✅ **Remember your traps** - You have to remember where you placed them

### Victoria's Requests (Phase 3):
- 🦄 Unicorn
- 👸 Princess
- 🧚 Fairy
- Mounting mechanic ("si las montas es trampa")

---

## 🎯 Objective (Once Questions Answered)

**Goal:** Implement basic trap system (simplest version first)

### Acceptance Criteria (Tentative - depends on answers):

#### Minimum Viable Trap System:
- [x] Lava traps live in the maze (7 of them in Level 1, all visible) - 2026-08-31
- [ ] Traps spawn randomly in maze (hand-placed for now)
- [x] Stepping on a trap costs 1 life (Adrian's rule, replaces the HP damage idea) - 2026-08-31
- [x] Visual feedback (bubbling lava, player flash, "¡Perdiste una vida!" message) - 2026-08-31
- [x] Game over when a player runs out of lives - 2026-08-31
- [x] Starting lives by level: 10 / 5 / 3 / 1 - 2026-08-31

#### Stretch Goals (if time permits):
- [ ] Player-built trap (simplest type)
- [ ] Material collection system
- [ ] Trap visibility feature
- [ ] Super trap (1 per maze)

---

## 🚀 Proposed Approach

### Step 1: Design (1-2 hours)
1. Get clarifying answers from Adrian
2. Sketch trap system architecture
3. Choose simplest trap to implement first
4. Document decisions in `dev/context/decisions.md`

### Step 2: Implement Pre-Existing Traps (2-3 hours)
1. Create Trap class/object
2. Add 2 trap types (lava, spikes)
3. Spawn traps in maze
4. Collision detection
5. Damage system
6. Visual effects

### Step 3: Test & Iterate (1 hour)
1. Playtest with team
2. Adjust damage, spawn rate, visuals
3. Get feedback from Adrian

### Step 4: Add Player-Built Traps (if feasible) (3-4 hours)
1. Material collection (simplified)
2. Build UI
3. Trap placement
4. Test with team

---

## 📝 Success Metrics

**How we'll know Phase 2 is complete:**
1. ✅ Traps add fun/challenge to gameplay (Adrian confirms!)
2. ✅ Players can avoid traps with skill
3. ✅ Traps change strategy (not just racing, need to be careful)
4. ✅ No major bugs (traps work consistently)
5. ✅ Team wants to keep playing

---

## 🔄 Next Session Plan

1. **Show Adrian** the feedback document (FEEDBACK_SESSION_1.md)
2. **Ask clarifying questions** (10-15 minutes)
3. **Choose first trap** to implement (5 minutes)
4. **Design trap system** (30 minutes)
5. **Start implementation** (remainder of session)

---

## 📚 Resources

- Phaser trap examples: https://phaser.io/examples (search "trap", "damage", "hazard")
- Maze generation with obstacles: Research needed
- Trap game mechanics: Study games like "Don't Starve", "Minecraft"

---

## 🎨 Phase Roadmap Reminder

```
✅ Phase 1: Prototype (DONE!)
   - Movement, maze, win condition

🎯 Phase 2: Traps (CURRENT)
   - Pre-existing, player-built, super traps
   - Material system
   - Trap visibility

🦄 Phase 3: Creatures (AFTER Phase 2)
   - Unicorn, princess, fairy
   - Dinosaur, robot (improve)
   - Mounting mechanic

⚔️ Phase 4: Combat & Polish (AFTER Phase 3)
   - Weapons (bow, lightsaber)
   - Superpowers
   - Sounds, music, graphics

🚀 Phase 5: Launch! (AFTER Phase 4)
   - GitHub Pages deployment
   - Share with friends
   - Celebrate! 🎉
```

---

## 💬 Quotes from Feedback Session

> "Trampas fuertes y atrapadas que nadie les puede pasar"
> — Gabriel (about super traps)

> "Tú puedes ver todas las trampas que hay"
> — Adrian (trap visibility feature)

> "Yo quiero también un unicornio, una princesa, el unicornio de mi hija y una hada"
> — Victoria (Phase 3 creatures)

> "Si las montas es trampa, ¿ok?"
> — Adrian (establishing game rules!)

---

**Status:** ✅ Questions answered! Ready to implement!

**Ready to proceed:** ▶️ GO!

---

## Objective Workflow Reminder

When starting implementation:
```bash
git checkout main
git pull
git checkout -b feature/trap-system-phase-2
# Update this file with implementation details
git add dev/OBJECTIVE.md
git commit -m "chore: begin Phase 2 - trap system"
git push -u origin feature/trap-system-phase-2
gh pr create --draft --fill
```
