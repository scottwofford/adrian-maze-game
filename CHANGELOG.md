# Changelog

All notable changes to Adrian's Maze Game will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Combat system (bow/arrow, lightsaber)
- Superpower selection
- Trap system
- Random maze generation
- Monster selection screen
- Sound effects and music

---

## [0.1.0] - 2026-01-01

### Added - Initial Prototype 🎮

**Project Setup:**
- Created repository structure inspired by luthien-proxy
- Added CLAUDE.md with repository guidelines
- Added dev/ folder with OBJECTIVE.md, TODO.md, NOTES.md
- Added dev/context/ for persistent knowledge
- Created tests/ structure (unit, integration, e2e)
- Set up .gitignore for game project

**Documentation:**
- README.md with game concept and vision (bilingual EN/ES)
- ADRIAN_ANSWERS.md documenting all design decisions
- TREE_EXPLANATION.md explaining GitHub with tree metaphor
- QUESTIONS_FOR_ADRIAN.md with 15 design questions
- HOW_TO_RUN.md with setup and play instructions
- CHANGELOG.md (this file)

**Game Features:**
- Phaser 3 game engine integration (v3.70.0 via CDN)
- 2-player local multiplayer
  - Player 1: Arrow keys (🦖 Dinosaur)
  - Player 2: WASD keys (🤖 Robot)
- Basic platformer physics
  - Jumping mechanics
  - Gravity simulation
  - Platform collisions
- Simple maze layout with platforms
- Exit point (green door 🚪)
- Win detection (first to exit)
- Health display (50 HP per player)
- Lives display (3 ❤️ per player)
- Browser-based deployment

**Technical:**
- HTML5 Canvas rendering
- Arcade physics engine
- Real-time input handling
- Collision detection system
- Viewport: 800x600px
- Gradient background
- Info overlay with controls

### Design Decisions
- **Game Engine:** Phaser 3 (browser-based, 2D platformer support)
- **Players:** 2 players for Level 1 (can expand later)
- **Perspective:** Side-scrolling 2D (like Super Mario/Donkey Kong)
- **Weapons:** Bow/Arrow (ranged) + Lightsaber (melee)
- **Superpowers:** Alternative to weapons, 2-3 types for Level 1
- **Health System:** 50 HP starting, 3 lives per player
- **Maze:** Random generation, 3-5 minute target completion
- **Monsters:** Cosmetic only, no gameplay differences
- **Platform:** Web browser (Chrome, Firefox, Safari)

### Designer
- Lead Designer: Adrian (6 years old)
- Core game concept and mechanics by Adrian
- Implementation by Scott with Claude Code
- Testing with Luis, Gabriel, Zoe, and Victoria

---

## Version History

### [0.1.0] - 2026-01-01 - "First Playable"
The initial prototype where Adrian's ideas became reality. Players can move, jump, and race to the exit!

---

## Future Milestones

### [0.2.0] - Combat Update (Planned)
- Bow and arrow weapon
- Lightsaber weapon
- Functional health system
- Damage mechanics

### [0.3.0] - Traps & Hazards (Planned)
- Lava floors
- Spike pits
- Pre-built trap generation
- Trap damage system

### [0.4.0] - Superpowers (Planned)
- Super speed
- Teleportation
- X-ray vision
- Power selection UI

### [0.5.0] - Polish & Assets (Planned)
- Character sprites
- Monster selection screen
- Sound effects
- Background music
- Win/lose screens

### [1.0.0] - Level 1 Complete (Target)
- All core features implemented
- Fully playable start to finish
- Tested and polished
- Deployed to GitHub Pages
- Ready for public play!

---

## Notes

- This project is being built WITH Adrian (6 years old), not just FOR him
- All major design decisions come from Adrian
- Changes are documented with both English and Spanish where helpful
- This project also serves as a test case for Scott's Luthien AI proxy system

---

*"It's a maze where you have to find the exit before the other person. You can shoot them or use superpowers. There are traps already there. You make your own monster. When you win, you get points. It's fast and fun!"* — Adrian, Game Designer
