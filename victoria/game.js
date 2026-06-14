// El Videojuego de Victoria / Victoria's Video Game
// Diseñado por / Designed by: Victoria
// Estilo / Style: Unicornio mágico volador que protege casas / Flying magical unicorn that protects houses
//
// Visión de Victoria (v0.2):
// - El unicornio mágico puede VOLAR (con alguien encima).
// - El dragón ya NO te persigue: el dragón trata de destruir las casas, y tú tratas de pararlo.
// - El dragón tiene su propia casa: un lugar con muchas rocas.
//
// Victoria's vision (v0.2):
// - The magical unicorn can FLY (with someone riding on top).
// - The dragon no longer chases you: the dragon tries to destroy the houses, and you try to stop it.
// - The dragon has its own home: a place with lots of rocks.
//
// Es un solo pantallazo (sin scroll) para que una niña pequeña vea todo de un vistazo.
// It's a single screen (no scrolling) so a little kid can see everything at once.

const GAME_W = 800;
const GAME_H = 500;
const GROUND_Y = 440;

const config = {
    type: Phaser.AUTO,
    width: GAME_W,
    height: GAME_H,
    parent: 'game-container',
    backgroundColor: '#a7d8ff', // cielo azul suave / soft blue sky
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 0 }, debug: false } // sin gravedad: el unicornio vuela / no gravity: the unicorn flies
    },
    scene: { create, update }
};

let unicorn, rider, dragon, houses;
let cursors;
let housesSaved = 0;
let scoreText, messageText;

// El dragón tiene su casa de rocas a la derecha / The dragon's rocky home is on the right
const DRAGON_HOME = { x: 720, y: 150 };
let dragonState = 'resting'; // 'resting' (en casa) | 'attacking' (va a una casa) | 'returning' (regresa a casa)
let dragonTarget = null;

const game = new Phaser.Game(config);

function create() {
    // ☁️ Nubes decorativas / Decorative clouds
    [[120, 70], [330, 50], [520, 90], [650, 60]].forEach(([x, y]) => {
        this.add.text(x, y, '☁️', { fontSize: '40px' }).setOrigin(0.5);
    });
    this.add.text(60, 60, '☀️', { fontSize: '44px' }).setOrigin(0.5);

    // 🟩 El suelo verde / The green ground
    const ground = this.add.rectangle(GAME_W / 2, GROUND_Y + 40, GAME_W, 90, 0x5fbf60);
    ground.setStrokeStyle(2, 0x3f8f40);

    // 🪨 La casa del dragón: un lugar con muchas rocas / The dragon's home: a place with lots of rocks
    [[680, 120], [740, 130], [710, 175], [760, 185], [690, 205]].forEach(([x, y]) => {
        this.add.text(x, y, '🪨', { fontSize: '30px' }).setOrigin(0.5);
    });
    this.add.text(720, 95, 'casa del dragón', { fontSize: '11px', fill: '#555' }).setOrigin(0.5);

    // 🏠 Las casas que el dragón quiere destruir / The houses the dragon wants to wreck
    houses = this.physics.add.staticGroup();
    [140, 300, 470].forEach((x) => {
        const h = this.add.text(x, GROUND_Y - 8, '🏠', { fontSize: '46px' }).setOrigin(0.5);
        this.physics.add.existing(h, true);
        h.isBurning = false;
        houses.add(h);
    });

    // 🦄 El unicornio mágico volador que Victoria controla / The flying magical unicorn Victoria controls
    unicorn = this.add.text(120, 320, '🦄', { fontSize: '48px' }).setOrigin(0.5);
    this.physics.add.existing(unicorn);
    unicorn.body.setCollideWorldBounds(true);

    // 👧 Alguien va montado encima / Someone rides on top
    rider = this.add.text(unicorn.x, unicorn.y - 34, '👧', { fontSize: '26px' }).setOrigin(0.5);

    // 🐉 El dragón empieza en su casa de rocas / The dragon starts at its rocky home
    dragon = this.add.text(DRAGON_HOME.x, DRAGON_HOME.y, '🐉', { fontSize: '50px' }).setOrigin(0.5);
    this.physics.add.existing(dragon);

    // Si el unicornio choca con el dragón, lo para con magia / If the unicorn bumps the dragon, it stops it with magic
    this.physics.add.overlap(unicorn, dragon, stopDragon, null, this);
    // Si el dragón llega a una casa, la asusta un ratito / If the dragon reaches a house, it scares it briefly
    this.physics.add.overlap(dragon, houses, dragonReachesHouse, null, this);

    cursors = this.input.keyboard.createCursorKeys();

    // Contador de casas salvadas / Houses-saved counter
    scoreText = this.add.text(16, 16, '🏠 Casas salvadas / saved: 0', {
        fontSize: '18px',
        fill: '#fff',
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: { x: 10, y: 6 }
    });

    messageText = this.add.text(GAME_W / 2, 250, '', {
        fontSize: '22px',
        fill: '#fff',
        backgroundColor: 'rgba(0,0,0,0.85)',
        padding: { x: 18, y: 12 },
        align: 'center'
    }).setOrigin(0.5);

    // Pista de inicio / Intro hint
    messageText.setText(
        'Vuela con las flechas y choca con el dragón 🐉\n' +
        'para pararlo antes de que llegue a las casas 🏠\n\n' +
        'Fly with the arrows and bump the dragon\nto stop it before it reaches the houses!'
    );
    this.time.delayedCall(4000, () => messageText.setVisible(false));

    // El dragón empieza a atacar después de un ratito / The dragon starts attacking after a moment
    this.time.delayedCall(4500, () => startAttack.call(this));
}

function update() {
    // El rider siempre va encima del unicornio / The rider always stays on top of the unicorn
    rider.x = unicorn.x;
    rider.y = unicorn.y - 34;

    // 🦄 Volar en cualquier dirección con las flechas / Fly in any direction with the arrows
    const SPEED = 260;
    unicorn.body.setVelocityX(cursors.left.isDown ? -SPEED : cursors.right.isDown ? SPEED : 0);
    unicorn.body.setVelocityY(cursors.up.isDown ? -SPEED : cursors.down.isDown ? SPEED : 0);

    // 🐉 ¿Qué hace el dragón? / What is the dragon doing?
    const DRAGON_SPEED = 110; // lento, para que Victoria pueda alcanzarlo / slow, so Victoria can catch it
    if (dragonState === 'attacking' && dragonTarget) {
        moveToward(dragon, dragonTarget.x, dragonTarget.y, DRAGON_SPEED);
    } else if (dragonState === 'returning') {
        moveToward(dragon, DRAGON_HOME.x, DRAGON_HOME.y, DRAGON_SPEED);
        if (Phaser.Math.Distance.Between(dragon.x, dragon.y, DRAGON_HOME.x, DRAGON_HOME.y) < 30) {
            dragon.body.setVelocity(0, 0);
            dragonState = 'resting';
            this.time.delayedCall(1500, () => startAttack.call(this)); // descansa y vuelve a intentar / rests then tries again
        }
    } else {
        dragon.body.setVelocity(0, 0);
    }
}

// Mueve un objeto hacia un punto / Moves an object toward a point
function moveToward(obj, tx, ty, speed) {
    const angle = Phaser.Math.Angle.Between(obj.x, obj.y, tx, ty);
    obj.body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
}

// El dragón elige una casa y sale a atacar / The dragon picks a house and sets off to attack
function startAttack() {
    const standing = houses.getChildren().filter(h => !h.isBurning);
    if (standing.length === 0) return;
    dragonTarget = Phaser.Utils.Array.GetRandom(standing);
    dragonState = 'attacking';
}

// El unicornio choca con el dragón: lo para con magia / The unicorn bumps the dragon: stops it with magic
function stopDragon(unicorn, dragon) {
    if (dragonState !== 'attacking') return;
    dragonState = 'returning';
    dragonTarget = null;
    housesSaved++;
    scoreText.setText('🏠 Casas salvadas / saved: ' + housesSaved);
    sparkleBurst.call(this, dragon.x, dragon.y);
    flashMessage.call(this, '¡Lo paraste con magia! ✨\nYou stopped it with magic!', 1200);
}

// El dragón llega a una casa: la asusta un ratito (sin destruirla de verdad) / Dragon reaches a house: scares it briefly (no real destruction)
function dragonReachesHouse(dragon, house) {
    if (dragonState !== 'attacking' || house.isBurning) return;
    house.isBurning = true;
    // La casa se pone roja y tiembla (sin cambiar el emoji, así no falla en ningún navegador)
    // The house turns red and shakes (no emoji swap, so it can't tofu on any browser)
    house.setTint(0xff6b6b);
    const homeX = house.x;
    this.tweens.add({ targets: house, x: homeX + 6, duration: 60, yoyo: true, repeat: 5,
        onComplete: () => { house.x = homeX; } });
    dragonState = 'returning';
    dragonTarget = null;
    flashMessage.call(this, '¡El dragón asustó una casa! 🐉\nThe dragon scared a house!', 1200);
    // La casa se recupera solita / The house recovers on its own
    this.time.delayedCall(2000, () => {
        house.clearTint();
        house.isBurning = false;
    });
}

// Un brillito de magia que aparece y se desvanece / A little magic sparkle that pops and fades
function sparkleBurst(x, y) {
    const s = this.add.text(x, y, '✨', { fontSize: '40px' }).setOrigin(0.5);
    this.tweens.add({ targets: s, alpha: 0, scale: 1.8, duration: 500, onComplete: () => s.destroy() });
}

// Muestra un mensaje corto que se oculta solo / Shows a short message that hides itself
// Ocultamos con setVisible(false) en vez de texto vacío: un texto vacío con fondo deja un cuadrito negro.
// We hide with setVisible(false) instead of empty text: empty text with a background leaves a little black box.
function flashMessage(text, ms) {
    messageText.setText(text).setVisible(true);
    this.time.delayedCall(ms, () => {
        if (messageText.text === text) messageText.setVisible(false);
    });
}
