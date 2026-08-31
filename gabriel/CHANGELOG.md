# Changelog

All notable changes to Gabriel's Video Game will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- (Gabriel decide / Gabriel decides)
- Lightsaber color
- Who Gabriel is in the game
- Whether the bad guys shoot back
- A boss at the end?

---

## [0.3.0] - 2026-08-31

### Added - Cinco trampas de roca / Five rock traps 🪨

Gabriel: *"Cinco trampas de roca en la de Gabriel."*

- Five rocks floating in space, drifting slowly up and down
- You cannot cut them with the lightsaber; touching one costs a life
- Their hit areas follow the drift, so what you see is what you hit

**Question for Gabriel:** in Adrian's game the rock traps take 5 lives. Here they take 1,
because you only have 5 lives and one touch would end the game.

---

## [0.2.0] - 2026-08-31

### Added - Los paquetes / The packages 📦

Gabriel's words: *"Y los paquetes, por favor, que mandan muchos paquetes por la nave espacial."*

- The bad guys 👾 now throw packages 📦 straight at your ship
- Cut a package with the lightsaber and it counts on the "Paquetes cortados" counter
- A package that reaches your ship costs a life

### Fixed - Los malos no se movían / The bad guys never moved

- Bad guys and aliens were spawned off-screen with their speed set **before** they were
  added to their group, and joining the group wiped the speed. They sat still at x=830,
  off the right edge, which is why Gabriel could never see them. Speed is now set after
  the add, so they fly in.
- The lightsaber never actually cut anything during real play (its physics body was not
  where the blade was drawn). Saber hits are now a plain distance check every frame.

### Changed - Más justo / Fairer
- 5 lives instead of 3, and 2 seconds of being safe after a hit
- Fewer aliens and slower packages
- When you lose a life, the enemies near your ship are cleared so you do not lose every
  life at once
- Win at 10 bad guys instead of 15

---

## [0.1.0] - 2026-08-31

### Added - Spaceship + lightsaber / Nave espacial y sable láser ⚔️🚀

Gabriel's words: *"Como tienes que destruir a los malos con el sable láser... Yo usaba una
nave espacial, mi espada, en sables láseres."*

- Fly a spaceship 🚀 around space with the arrow keys
- Swing a lightsaber with SPACEBAR to destroy the bad guys 👾
- Bad guys fly in from the right at different speeds
- Volcanoes 🌋 along the bottom that you must not touch
- Lots of aliens 👽 that you have to dodge (the saber does not stop them)
- 3 lives; a bad guy, an alien, or a volcano costs one
- Destroy 15 bad guys to win

---

## [0.0.0] - 2026-08-31

### Added
- Project scaffold created
- Gabriel's vision captured in README.md
