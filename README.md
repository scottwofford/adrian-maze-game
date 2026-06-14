# 🎮 Kids' Game Studio / Estudio de Juegos de los Niños

A collection of simple browser games, **each one designed by a kid**. This is the game
studio behind [Tío Escott's Summer Day Camp 2026](https://scottwofford.com/projects/summer-camp-2026.html),
a Spanish-immersion day camp (ages 5-7) where kids build their own playable games with AI.

Una colección de juegos sencillos en el navegador, **cada uno diseñado por un niño**. Este
es el estudio de juegos del [Campamento de Verano de Tío Escott 2026](https://scottwofford.com/projects/summer-camp-2026.html),
donde los niños construyen sus propios juegos.

## 🕹️ Play the games / Juega los juegos

Live / En vivo: **https://scottwofford.github.io/adrian-maze-game/**

| Kid / Niño | Game / Juego | Play / Jugar |
|---|---|---|
| 🌀 Adrian | Maze racing + combat (2 players) / Laberinto y combate (2 jugadores) | [adrian/](https://scottwofford.github.io/adrian-maze-game/adrian/) |
| 🦖 Rafa | Mario-style platformer / Plataformas estilo Mario | [rafa/](https://scottwofford.github.io/adrian-maze-game/rafa/) |
| 🦄 Victoria | Magical unicorn vs. dragon / Unicornio mágico vs. dragón | [victoria/](https://scottwofford.github.io/adrian-maze-game/victoria/) |

The root page (`index.html`) is a landing menu linking to every kid's game.

## 📂 How it's organized / Cómo está organizado

Each kid gets a **self-contained folder** with their own game, vision, and dev notes:

```
adrian-maze-game/
├── index.html        # Landing page linking to every game
├── adrian/           # Adrian's game (one folder per kid)
├── rafa/             # Rafa's game
└── victoria/         # Victoria's game
```

Because every game is self-contained, multiple kids can be worked on in parallel using git
branches or worktrees without stepping on each other.

## ➕ Add a new kid's game / Agregar el juego de un nuevo niño

See [`CLAUDE.md`](CLAUDE.md) → **"Kick Off a New Kid's Game"**. The short version: copy an
existing kid's folder as the template, record the kid describing their game, capture their
exact words (Spanish + English) in their `README.md`, and add them to the landing page. No
other setup required.

## 🛠️ Run locally / Ejecutar localmente

```bash
python3 -m http.server 8080
# then open / luego abre: http://localhost:8080
```

**Tech / Tecnología:** Phaser 3 (via CDN), plain JavaScript, deployed on GitHub Pages.

---

*Built WITH the kids, not FOR them. / Construido CON los niños, no PARA ellos.* 🎮✨
