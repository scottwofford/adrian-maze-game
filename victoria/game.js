// El Videojuego de Victoria / Victoria's Video Game
// Diseñado por / Designed by: Victoria
// Estilo / Style: Unicornio mágico vs. dragón / Magical unicorn vs. dragon
//
// Visión de Victoria: montas un unicornio mágico que salta, con alguien encima,
// viajando por todo el mundo (selva, castillo, bosque, nubes). Un dragón malo te
// persigue y trata de comerte; controlas al unicornio para escapar y atacar con lo
// mágico. Dos jugadores: el otro lado son dos que trabajan en equipo.
//
// Victoria's vision: ride a magical unicorn that jumps, with someone on top,
// traveling all over the world (jungle, castle, forest, clouds). A bad dragon chases
// you and tries to eat you; you control the unicorn to escape and attack with magic.
// Two players: the other side is two players who work as a team.
//
// Esto es un prototipo v0.1 para que Victoria lo vea y reaccione.
// This is a v0.1 prototype for Victoria to see and react to.

// El mundo es ancho para poder "viajar por todo el mundo" / The world is wide so we can "travel all over the world"
const WORLD_W = 3200;
const WORLD_H = 500;

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: WORLD_H,
    parent: 'game-container',
    backgroundColor: '#a7d8ff', // cielo azul suave / soft blue sky
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 900 }, debug: false }
    },
    scene: { preload, create, update }
};

let unicorn, rider, dragon, sparkles, goal;
let cursors, spaceKey;
let sparkleCount = 0;
let scoreText, messageText;
let gameState = 'playing';
let dragonReady = false; // el dragón espera un poco antes de perseguir / the dragon waits a bit before chasing

const game = new Phaser.Game(config);

function preload() {}

function create() {
    this.physics.world.setBounds(0, 0, WORLD_W, WORLD_H);
    this.cameras.main.setBounds(0, 0, WORLD_W, WORLD_H);

    // ☁️ Nubes en el cielo (parallax: se mueven despacio para dar profundidad)
    // Clouds in the sky (parallax: they move slowly to feel like depth)
    for (let i = 0; i < 14; i++) {
        const c = this.add.text(150 + i * 240, 50 + (i % 3) * 45, '☁️', { fontSize: '44px' });
        c.setScrollFactor(0.3);
    }

    // 🌴 Selva: muchos árboles en el suelo / Jungle: lots of trees on the ground
    for (let x = 200; x < 1600; x += 180) {
        this.add.text(x, 410, '🌴', { fontSize: '48px' }).setOrigin(0.5);
    }

    // 🏰 El castillo a mitad de camino / The castle partway through the world
    this.add.text(1850, 380, '🏰', { fontSize: '90px' }).setOrigin(0.5);

    // 🌲🌲 El bosque del final / The forest at the very end
    for (let x = 2400; x < WORLD_W; x += 130) {
        this.add.text(x, 405, '🌲', { fontSize: '46px' }).setOrigin(0.5);
    }

    // 🟩 El suelo verde para que el unicornio camine y salte / Green ground so the unicorn can walk and jump
    const ground = this.add.rectangle(WORLD_W / 2, 470, WORLD_W, 60, 0x5fbf60);
    ground.setStrokeStyle(2, 0x3f8f40);
    this.physics.add.existing(ground, true);

    // 🦄 El unicornio mágico que Victoria controla / The magical unicorn Victoria controls
    unicorn = this.add.text(120, 400, '🦄', { fontSize: '48px' }).setOrigin(0.5);
    this.physics.add.existing(unicorn);
    unicorn.body.setCollideWorldBounds(true);
    this.physics.add.collider(unicorn, ground);

    // 👧 Alguien va montado encima del unicornio ("alguien esté encima")
    // Someone rides on top of the unicorn ("someone on top") — sigue al unicornio cada frame
    rider = this.add.text(unicorn.x, unicorn.y - 34, '👧', { fontSize: '28px' }).setOrigin(0.5);

    this.cameras.main.startFollow(unicorn, true, 0.1, 0.1);

    // 🐉 El dragón malo que persigue / The bad dragon that chases (vuela, sin gravedad)
    // Empieza atrás del unicornio para que Victoria tenga ventaja / Starts behind the unicorn so Victoria gets a head start
    dragon = this.add.text(-120, 360, '🐉', { fontSize: '52px' }).setOrigin(0.5);
    this.physics.add.existing(dragon);
    dragon.body.setAllowGravity(false);
    this.physics.add.overlap(unicorn, dragon, dragonTouch, null, this);

    // ✨ Magia para recoger por el camino / Magic to collect along the way
    sparkles = this.physics.add.staticGroup();
    for (let x = 350; x < 3000; x += 260) {
        const s = this.add.text(x, 330 - (x % 80), '✨', { fontSize: '32px' }).setOrigin(0.5);
        this.physics.add.existing(s, true);
        sparkles.add(s);
    }
    this.physics.add.overlap(unicorn, sparkles, collectSparkle, null, this);

    // 🚩 La meta en el bosque / The goal in the forest
    goal = this.add.text(3120, 400, '🚩', { fontSize: '60px' }).setOrigin(0.5);
    this.physics.add.existing(goal, true);
    this.physics.add.overlap(unicorn, goal, reachGoal, null, this);

    // Controles muy fáciles para una niña pequeña / Very easy controls for a little kid
    cursors = this.input.keyboard.createCursorKeys();
    spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // Contador de magia arriba a la izquierda / Magic counter top-left
    scoreText = this.add.text(16, 16, '✨ 0', {
        fontSize: '22px',
        fill: '#fff',
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: { x: 10, y: 6 }
    }).setScrollFactor(0);

    messageText = this.add.text(400, 220, '', {
        fontSize: '26px',
        fill: '#fff',
        backgroundColor: 'rgba(0,0,0,0.85)',
        padding: { x: 20, y: 14 },
        align: 'center'
    }).setOrigin(0.5).setScrollFactor(0);

    // El dragón da un respiro: espera 3 segundos antes de empezar a perseguir
    // The dragon gives a grace period: it waits 3 seconds before it starts chasing
    dragonReady = false;
    messageText.setText('¡Prepárate! Viene el dragón 🐉\nGet ready! The dragon is coming');
    this.time.delayedCall(3000, () => {
        dragonReady = true;
        if (gameState === 'playing') messageText.setText('');
    });
}

function update() {
    // El rider siempre va encima del unicornio / The rider always stays on top of the unicorn
    if (rider && unicorn) {
        rider.x = unicorn.x;
        rider.y = unicorn.y - 34;
    }

    if (gameState !== 'playing') {
        // Para volver a empezar, salta / To start again, jump
        if (Phaser.Input.Keyboard.JustDown(cursors.up) || Phaser.Input.Keyboard.JustDown(spaceKey)) {
            sparkleCount = 0;
            gameState = 'playing';
            this.scene.restart();
        }
        return;
    }

    // ← → mueven al unicornio / left and right move the unicorn
    if (cursors.left.isDown) {
        unicorn.body.setVelocityX(-240);
    } else if (cursors.right.isDown) {
        unicorn.body.setVelocityX(240);
    } else {
        unicorn.body.setVelocityX(0);
    }

    // ↑ o ESPACIO para saltar (solo cuando toca el suelo) / up or SPACE to jump (only when on the ground)
    const onGround = unicorn.body.touching.down || unicorn.body.blocked.down;
    if ((cursors.up.isDown || spaceKey.isDown) && onGround) {
        unicorn.body.setVelocityY(-520);
    }

    // Durante el respiro, el dragón se queda quieto / During the grace period, the dragon stays still
    if (!dragonReady) {
        dragon.body.setVelocity(0, 0);
        return;
    }

    // 🐉 El dragón persigue al unicornio, pero más despacio para que Victoria pueda escapar
    // The dragon chases the unicorn, but slower so Victoria can escape
    const DRAGON_SPEED = 150; // el unicornio va a 240, así que siempre puede huir / unicorn is 240, so she can always run
    if (dragon.x < unicorn.x - 5) {
        dragon.body.setVelocityX(DRAGON_SPEED);
    } else if (dragon.x > unicorn.x + 5) {
        dragon.body.setVelocityX(-DRAGON_SPEED);
    } else {
        dragon.body.setVelocityX(0);
    }
    // El dragón también sube y baja suave hacia el unicornio / The dragon also drifts gently up and down toward the unicorn
    if (dragon.y < unicorn.y - 5) {
        dragon.body.setVelocityY(DRAGON_SPEED * 0.5);
    } else if (dragon.y > unicorn.y + 5) {
        dragon.body.setVelocityY(-DRAGON_SPEED * 0.5);
    } else {
        dragon.body.setVelocityY(0);
    }
}

function collectSparkle(unicorn, sparkle) {
    // Recoger magia suma al contador / Collecting magic adds to the counter
    sparkle.destroy();
    sparkleCount++;
    scoreText.setText(`✨ ${sparkleCount}`);
}

function reachGoal() {
    if (gameState !== 'playing') return;
    // ¡Llegó al bosque! Mensaje feliz / Reached the forest! Happy message
    gameState = 'won';
    messageText.setText(
        `¡Lo lograste! Llegaste al bosque 🌲🎉\n` +
        `You did it! You reached the forest!\n` +
        `Magia / Magic: ✨ ${sparkleCount}\n\n` +
        `Presiona ↑ o ESPACIO para jugar otra vez\n` +
        `Press ↑ or SPACE to play again`
    );
}

function dragonTouch() {
    if (gameState !== 'playing') return;
    if (!dragonReady) return; // durante el respiro no atrapa / it can't catch during the grace period
    // Falla suave y amable: nada de "GAME OVER", solo "casi" y a empezar de nuevo
    // Gentle, kind failure: no "GAME OVER", just "almost" and start again
    gameState = 'caught';
    messageText.setText(
        `¡Casi! El dragón casi te come 🐉\n` +
        `Almost! The dragon almost got you\n\n` +
        `Presiona ↑ o ESPACIO para intentar otra vez\n` +
        `Press ↑ or SPACE to try again`
    );
}
