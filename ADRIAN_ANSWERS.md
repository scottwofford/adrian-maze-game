# 🎮 Adrian's Design Decisions / Decisiones de Diseño de Adrian

**Date / Fecha:** January 1, 2026
**Designer / Diseñador:** Adrian (6 años / 6 years old)

---

## ✅ Decisions Made / Decisiones Tomadas

### 🎯 Core Game Design / Diseño Principal

**Game Type / Tipo de Juego:**
- 2-player competitive maze race with combat
- Carrera competitiva de laberinto para 2 jugadores con combate

**Goal / Objetivo:**
- Be the first to reach the end of the maze
- Ser el primero en llegar al final del laberinto
- Combat is optional but strategic
- El combate es opcional pero estratégico

---

## 📋 Adrian's Answers / Respuestas de Adrian

### 👥 **Players / Jugadores**
**Answer / Respuesta:** 2 players for Level 1 / 2 jugadores para Nivel 1

**Design Note / Nota de Diseño:**
- Start simple with 1v1
- Empezar simple con 1 contra 1
- Can expand to 4+ players in future levels
- Puede expandirse a 4+ jugadores en niveles futuros

---

### 🎨 **Visual Style / Estilo Visual**
**Answer / Respuesta:** 2D, Third-person (like Super Mario or Donkey Kong)

**What this means / Qué significa esto:**
```
    [Player 1: 🦖]              [Player 2: 🤖]
         ↓                           ↓
    You see both players from the side
    Ves ambos jugadores de lado
    Like classic platformers
    Como juegos de plataformas clásicos
```

**Technical Decision / Decisión Técnica:**
- Side-scrolling 2D perspective
- Perspectiva 2D de desplazamiento lateral
- Characters visible on screen at all times
- Personajes visibles en pantalla todo el tiempo

---

### 🌐 **Platform / Plataforma**
**Answer / Respuesta:** Browser-based, runs locally / Basado en navegador, corre localmente

**Game Engine Choice / Elección de Motor:**
## 🎯 **PHASER 3** (Recommended / Recomendado)

**Why Phaser? / ¿Por qué Phaser?**
✅ Runs in browser (HTML5) / Corre en navegador
✅ 2D game engine (perfect for platformers) / Motor 2D (perfecto para plataformas)
✅ JavaScript-based (easy to deploy) / Basado en JavaScript (fácil de desplegar)
✅ Great for side-scrolling games / Excelente para juegos de desplazamiento lateral
✅ Can run locally with simple server / Puede correr localmente con servidor simple
✅ Active community and tutorials / Comunidad activa y tutoriales
✅ Free and open source / Gratis y código abierto

**Alternative Option / Opción Alternativa:**
- **Pygame** (Python) - would need more setup for browser
- **Pygame** (Python) - necesitaría más configuración para navegador

---

### ⚔️ **Weapons / Armas**
**Answer / Respuesta:** 2 weapons / 2 armas

1. **🏹 Bow & Arrow / Arco y Flecha**
   - Range weapon / Arma de rango
   - Shoots projectiles / Dispara proyectiles
   - Good for distance attacks / Bueno para ataques a distancia

2. **⚡ Lightsaber / Sable de Luz**
   - Melee weapon / Arma cuerpo a cuerpo
   - Close combat / Combate cercano
   - Higher damage but need to be close / Más daño pero necesitas estar cerca

**Important Feature / Característica Importante:**
- **Button to craft/build weapons** / Botón para craftear/construir armas
- Players need to gather materials first? / ¿Jugadores necesitan reunir materiales primero?
- Or choose weapon at start? / ¿O elegir arma al inicio?

💡 **Design Question:** Do players start with weapons or build them during game?
💡 **Pregunta de Diseño:** ¿Los jugadores empiezan con armas o las construyen durante el juego?

---

### 💚 **Health System / Sistema de Vida**
**Answer / Respuesta:** 50 health points in Level 1 / 50 puntos de salud en Nivel 1

**How it works / Cómo funciona:**
```
❤️❤️❤️❤️❤️ = 50 HP

Bow & Arrow hit = -10 HP?
Lightsaber hit = -15 HP?
Trap damage = -20 HP?

0 HP = Lose 1 life
```

**Lives System / Sistema de Vidas:**
- 3 lives per player / 3 vidas por jugador
- Die 3 times = Game Over / Morir 3 veces = Fin del Juego
- Respawn after death (if lives remaining) / Reaparecer después de morir (si quedan vidas)

---

### 🏗️ **Maze Generation / Generación de Laberinto**
**Answer / Respuesta:** Random / Aleatorio

**What this means / Qué significa:**
- Every game = different maze! / ¡Cada juego = laberinto diferente!
- Always surprising / Siempre sorprendente
- Can't memorize the path / No puedes memorizar el camino
- Infinite replayability / Rejugabilidad infinita

**Technical Note / Nota Técnica:**
- Need maze generation algorithm / Necesita algoritmo de generación de laberinto
- Options: Depth-First Search, Prim's Algorithm, Recursive Backtracking
- Must ensure there's always a path to exit / Debe asegurar que siempre hay camino a la salida

---

### ⏱️ **Match Duration / Duración de Partida**
**Answer / Respuesta:** "Lo que tenga que durar pero rápido" / "However long it needs but fast"

**Interpretation / Interpretación:**
- Target: **3-5 minutes per match** / Objetivo: 3-5 minutos por partida
- Fast-paced action / Acción rápida
- Not too long (kids get bored) / No muy largo (niños se aburren)
- Not too short (need time for strategy) / No muy corto (necesitas tiempo para estrategia)

**Design Approach / Enfoque de Diseño:**
- Small-to-medium maze size / Tamaño de laberinto pequeño a mediano
- Quick respawns / Reapariciones rápidas
- Fast movement speed / Velocidad de movimiento rápida

---

### 🔄 **Respawn Mechanics / Mecánicas de Reaparición**
**Answer / Respuesta:** 3 lives / 3 vidas

**How it works / Cómo funciona:**
```
Start: ♥️ ♥️ ♥️  (3 lives)

Die once: ♥️ ♥️ ⚫  (2 lives left)
→ Respawn at checkpoint or start

Die twice: ♥️ ⚫ ⚫  (1 life left)
→ Respawn at checkpoint or start

Die third time: ⚫ ⚫ ⚫  (GAME OVER)
→ Other player wins!
```

**Respawn Location Options / Opciones de Ubicación de Reaparición:**
1. Back to start / Volver al inicio
2. At last checkpoint / En último punto de control
3. Random safe spot / Lugar seguro aleatorio

💡 **Recommendation:** Checkpoints every 1/3 of maze
💡 **Recomendación:** Puntos de control cada 1/3 del laberinto

---

### 🦸 **Superpowers / Superpoderes**
**Answer / Respuesta:** Players can choose a superpower instead of a weapon
**Respuesta:** Jugadores pueden escoger un superpoder en vez de un arma

**Design Implications / Implicaciones de Diseño:**

**Choice at game start / Elección al inicio del juego:**
```
[Choose your loadout / Elige tu equipamiento:]

Option A / Opción A:
🏹 Bow & Arrow OR ⚡ Lightsaber
(Weapon / Arma)

Option B / Opción B:
🦸 Superpower
```

**Superpower Ideas / Ideas de Superpoderes:**
- 🏃 **Super Speed** / Súper Velocidad - Move faster through maze / Muévete más rápido por el laberinto
- 👁️ **X-Ray Vision** / Visión de Rayos X - See through walls / Ver a través de paredes
- 🛡️ **Shield** / Escudo - Block attacks / Bloquear ataques
- ⚡ **Teleport** / Teletransporte - Jump to different spots / Saltar a lugares diferentes
- 🔥 **Fire Blast** / Explosión de Fuego - Ranged attack without weapon / Ataque de rango sin arma
- 🧊 **Freeze** / Congelar - Stop other player for 3 seconds / Detener otro jugador por 3 segundos

💡 **Design Question:** How many superpowers to include in Level 1?
💡 **Pregunta de Diseño:** ¿Cuántos superpoderes incluir en Nivel 1?

**Recommendation / Recomendación:** Start with 2-3, add more in later levels
**Recomendación:** Empezar con 2-3, agregar más en niveles posteriores

---

### 👾 **Monster Customization / Personalización de Monstruos**
**Answer / Respuesta:**
- Cosmetic only / Solo cosmético
- All players are monsters / Todos los jugadores son monstruos
- No gameplay differences / Sin diferencias de jugabilidad

**What this means / Qué significa:**
- Different monsters LOOK different / Monstruos diferentes se VEN diferentes
- BUT they all play the same / PERO todos juegan igual
- Fair competition / Competencia justa
- Like skins in Fortnite / Como skins en Fortnite

**Monster Options for Level 1 / Opciones de Monstruos para Nivel 1:**
```
Player 1 chooses:          Player 2 chooses:
🦖 Dinosaur               🤖 Robot
👽 Alien                  🐉 Dragon
🧟 Zombie                 👻 Ghost
```

All have same:
- Speed / Velocidad
- Health (50 HP)
- Jump height / Altura de salto
- Size / Tamaño

---

## 🎯 Level 1 Complete Design Summary / Resumen Completo de Diseño Nivel 1

### **Core Loop / Ciclo Principal:**
```
1. Choose Monster (cosmetic) / Elige Monstruo (cosmético)
   ↓
2. Choose Weapon OR Superpower / Elige Arma O Superpoder
   ↓
3. Race through random maze / Carrera por laberinto aleatorio
   ↓
4. Avoid traps / Evitar trampas
   ↓
5. Fight opponent (optional) / Pelear oponente (opcional)
   ↓
6. First to exit WINS! / ¡Primero en salir GANA!
```

---

### **Stats / Estadísticas:**
- **Players / Jugadores:** 2
- **Health / Vida:** 50 HP
- **Lives / Vidas:** 3
- **Weapons / Armas:** Bow/Arrow OR Lightsaber
- **Superpowers / Superpoderes:** Yes (alternative to weapons / sí, alternativa a armas)
- **Maze / Laberinto:** Random generation / Generación aleatoria
- **Duration / Duración:** 3-5 minutes target / Objetivo 3-5 minutos
- **View / Vista:** 2D side-scrolling (like Mario / como Mario)
- **Platform / Plataforma:** Browser (Phaser 3)

---

## 🚀 Next Steps / Próximos Pasos

### Phase 1: Basic Prototype / Prototipo Básico (Week 1 / Semana 1)
- [ ] Set up Phaser 3 project / Configurar proyecto Phaser 3
- [ ] Create basic player sprite / Crear sprite básico de jugador
- [ ] Implement movement (left, right, jump) / Implementar movimiento (izq, der, salto)
- [ ] Create simple maze (not random yet) / Crear laberinto simple (todavía no aleatorio)
- [ ] Add exit point / Agregar punto de salida
- [ ] Test 2-player controls / Probar controles de 2 jugadores

### Phase 2: Combat / Combate (Week 2 / Semana 2)
- [ ] Add health system (50 HP) / Agregar sistema de vida (50 HP)
- [ ] Implement bow & arrow / Implementar arco y flecha
- [ ] Implement lightsaber / Implementar sable de luz
- [ ] Add damage mechanics / Agregar mecánicas de daño
- [ ] Create 3-lives system / Crear sistema de 3 vidas

### Phase 3: Maze & Traps / Laberinto y Trampas (Week 3 / Semana 3)
- [ ] Random maze generation / Generación aleatoria de laberinto
- [ ] Add pre-built traps / Agregar trampas pre-construidas
- [ ] Trap damage system / Sistema de daño de trampas
- [ ] Checkpoints / Puntos de control

### Phase 4: Polish / Pulido (Week 4 / Semana 4)
- [ ] Monster selection screen / Pantalla de selección de monstruos
- [ ] Weapon/Superpower selection / Selección de arma/superpoder
- [ ] Win/Lose screens / Pantallas de ganar/perder
- [ ] Sound effects / Efectos de sonido
- [ ] Basic music / Música básica

---

## 💡 Design Questions Still to Answer / Preguntas de Diseño por Responder

1. **Weapon Acquisition / Adquisición de Armas:**
   - Do players start with weapons? / ¿Jugadores empiezan con armas?
   - OR find/craft during game? / ¿O encuentran/craftean durante juego?

2. **Superpower Balance / Balance de Superpoderes:**
   - Which 2-3 superpowers for Level 1? / ¿Cuáles 2-3 superpoderes para Nivel 1?
   - How long do they last? / ¿Cuánto duran?

3. **Respawn Location / Ubicación de Reaparición:**
   - Back to start? / ¿Volver al inicio?
   - Checkpoints? / ¿Puntos de control?

4. **Trap Types / Tipos de Trampas:**
   - What traps in Level 1? / ¿Qué trampas en Nivel 1?
   - Lava floors? Spike pits? / ¿Pisos de lava? ¿Hoyos de pinchos?

5. **Controls / Controles:**
   - Keyboard? / ¿Teclado?
   - Gamepad support? / ¿Soporte de gamepad?
   - Player 1: Arrow keys / Jugador 1: Teclas de flecha
   - Player 2: WASD keys? / Jugador 2: ¿Teclas WASD?

---

## 🎮 Technical Stack / Stack Técnico

**Game Engine / Motor de Juego:** Phaser 3
**Language / Lenguaje:** JavaScript
**Platform / Plataforma:** Web Browser (Chrome, Firefox, Safari)
**Server / Servidor:** Simple local HTTP server (Python, Node.js, or Live Server)
**Version Control / Control de Versiones:** Git + GitHub
**Deployment / Despliegue:** GitHub Pages (free hosting / alojamiento gratis)

---

## 🌟 Adrian's Vision Statement / Declaración de Visión de Adrian

> "It's a maze where you have to find the exit before the other person. You can shoot them or use superpowers. There are traps already there. You make your own monster. When you win, you get points. It's fast and fun!"
>
> "Es un laberinto donde tienes que encontrar la salida antes que la otra persona. Puedes dispararles o usar superpoderes. Ya hay trampas ahí. Haces tu propio monstruo. Cuando ganas, obtienes puntos. ¡Es rápido y divertido!"

— Adrian, 6 years old / 6 años, Game Designer

---

✅ **Ready to start coding! / ¡Listo para empezar a programar!** 🚀
