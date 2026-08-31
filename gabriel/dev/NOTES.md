# Development Notes - Gabriel's Star Wars Game

## Session: 2026-08-31 - First playable

### Gabriel's words / Las palabras de Gabriel

> "En el mundo de Star Wars."
> "Como tienes que destruir a los malos con el sable láser."
> "Me encantó Skywalker."
> "No. Bueno, sí. Yo usaba una nave espacial, mi espada, en sables láseres."
> "Dame lo malo. Destruir paquetes en Star Wars."
> "Y que hayan unos volcanes que no los puedes tocar."
> "Sí, muchas" (extraterrestres) ... "Y los tienes que esquivar, sí. Listo."

Recorded while Gabriel was with Adrian. Only Gabriel's own words are kept; the adult and
Adrian prompting questions were stripped.

### What that turned into

- **"nave espacial"** → the 🚀 you fly with the arrow keys
- **"destruir a los malos con el sable láser"** → SPACE swings a blue lightsaber that
  destroys the 👾 bad guys
- **"volcanes que no los puedes tocar"** → three volcanoes along the bottom; touching one
  costs a life
- **"extraterrestres... muchas... los tienes que esquivar"** → 👽 aliens spawn faster than
  the bad guys, move in wavy paths, and the saber does NOT stop them. Dodging is the only
  option, exactly as Gabriel said.

### Packages + the bug Gabriel caught (2026-08-31, later)

> "Falta los malos para el juego de Gabriel. Puedes añadirlos por favor. Y los paquetes, por
> favor, que mandan muchos paquetes por el nave espacial. El campeón sabe la misma nave."

Gabriel was right: **the bad guys were never visible.** They spawned at x=830 with their
velocity set before `badGuys.add(bad)`, and adding a game object to an arcade Group
re-enables its body and wipes the velocity. They sat frozen off the right edge forever.
Same bug in the aliens. Velocity is now set after the add.

A second bug came out of testing that: the lightsaber destroyed nothing in real play,
because the saber's physics body did not stay where the blade was drawn. Replaced with a
distance check in `checkSaberHits()`.

**Packages:** the bad guys now throw 📦 at the ship. The saber cuts them (own counter); a
package that lands costs a life.

**Still to ask Gabriel:** "El campeón sabe la misma nave" was not clear enough to build.
Is the champion a boss who flies the same ship as you?

### Uncertain in the recording / Dudas de la grabación

- **"Me encantó Dios Walker"** was transcribed that way; almost certainly **Skywalker**.
  Written as Skywalker in the README. Confirm with Gabriel.
- **"Destruir paquetes"** is unclear. Packages? Ships? Left out of the game until Gabriel
  explains it.
- Spelling of names came from a voice recording; confirm with Scott.

---

*Clear this file when starting a new objective!*
