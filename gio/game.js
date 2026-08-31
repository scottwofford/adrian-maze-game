// Gio's Lava Game
// Created by: Gio (Game Designer)
// Date: August 31, 2026
// Gio's words: "volcanoes and a bunch of lava and you gotta try to get through the lava
//               and there's cracks you've been falling thru"

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

// Game Variables
let player;
let rocks;      // the rock you can stand on
let lavaPools;  // the lava that burns you
let cursors;
let livesText;
let messageText;
let scene;
let gameOver = false;

// Constants
const STARTING_LIVES = 3;
const START_X = 60;
const START_Y = 420;
const FALL_LINE = 640;   // below this you fell through a crack
const MOVE_SPEED = 200;
const JUMP_SPEED = -330;

let lives = STARTING_LIVES;
let lastHit = 0;
const HIT_COOLDOWN = 800;

function preload() {
    console.log('🌋 Loading Gio\'s Lava Game...');
}

function create() {
    scene = this;

    // Sky above a lava world
    this.add.rectangle(400, 300, 800, 600, 0x3b1f1f);

    // Volcanoes in the background / Volcanes en el fondo
    createVolcano(this, 150, 500, 150);
    createVolcano(this, 430, 500, 190);
    createVolcano(this, 700, 500, 140);

    // Title
    this.add.text(400, 30, 'GIO\'S LAVA GAME 🌋', {
        fontSize: '30px',
        fill: '#ffd54f',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(400, 62, 'Get through the lava! / ¡Pasa por la lava!', {
        fontSize: '16px',
        fill: '#ff8a65'
    }).setOrigin(0.5);

    // ============================================
    // 🪨 ROCK + 🕳️ CRACKS
    // The gaps between the rocks are the cracks you fall through
    // ============================================
    rocks = this.physics.add.staticGroup();

    createRock(this, 0, 520, 180);    // start
    // crack from 180 to 235
    createRock(this, 235, 520, 145);
    createRock(this, 470, 520, 90);
    // crack from 560 to 615
    createRock(this, 615, 520, 185);  // finish

    // ============================================
    // 🔥 LAVA - it burns you
    // ============================================
    lavaPools = this.physics.add.staticGroup();

    createLava(this, 425, 528, 90, 26);   // lava pit filling the middle gap - jump it!
    createLava(this, 300, 380, 60, 20);   // floating lava, do not jump into it
    createLava(this, 660, 455, 70, 20);   // lava hanging right before the flag

    // Finish flag / La bandera
    this.add.text(760, 480, '🏁', { fontSize: '40px' }).setOrigin(0.5);

    // Player (Gio picks who this is!) / ¡Gio escoge quién es!
    player = this.add.text(START_X, START_Y, '🏃', { fontSize: '48px' }).setOrigin(0.5);
    this.physics.add.existing(player);
    player.body.setSize(36, 48);
    player.body.setCollideWorldBounds(false);

    this.physics.add.collider(player, rocks);
    this.physics.add.overlap(player, lavaPools, hitLava, null, this);

    // Lives / Vidas
    livesText = this.add.text(20, 100, livesLabel(), {
        fontSize: '18px',
        fill: '#ffffff'
    });

    cursors = this.input.keyboard.createCursorKeys();

    console.log(`✅ Game created! Arrow keys to move. ${STARTING_LIVES} lives.`);
}

function update() {
    if (gameOver) return;

    // Move left and right
    if (cursors.left.isDown) {
        player.body.setVelocityX(-MOVE_SPEED);
    } else if (cursors.right.isDown) {
        player.body.setVelocityX(MOVE_SPEED);
    } else {
        player.body.setVelocityX(0);
    }

    // Jump (only when standing on rock)
    if (cursors.up.isDown && player.body.blocked.down) {
        player.body.setVelocityY(JUMP_SPEED);
    }

    // Keep the player on the screen left and right
    if (player.x < 20) player.x = 20;
    if (player.x > 790) player.x = 790;

    // Fell through a crack! / ¡Te caíste por una grieta!
    if (player.y > FALL_LINE) {
        loseLife('🕳️ You fell through a crack! / ¡Te caíste por una grieta!');
    }

    // Made it to the flag / Llegaste a la bandera
    if (player.x > 740 && player.y < 520) {
        win();
    }
}

// ============================================
// HELPERS
// ============================================

function livesLabel() {
    return `Lives / Vidas: ${'❤️'.repeat(Math.max(lives, 0))}`;
}

// A rock slab you can stand on. The space between slabs is a crack.
function createRock(scene, leftX, y, width) {
    const rock = scene.add.rectangle(leftX + width / 2, y, width, 40, 0x5d4037);
    rocks.add(rock);
    // A crumbly top edge so it looks like rock
    scene.add.rectangle(leftX + width / 2, y - 18, width, 6, 0x8d6e63);
    return rock;
}

// A pool of lava. Touching it burns you.
function createLava(scene, x, y, width, height) {
    const lava = scene.add.rectangle(x, y, width, height, 0xff5722);
    lavaPools.add(lava);

    scene.tweens.add({
        targets: lava,
        scaleY: 1.25,
        duration: 400,
        yoyo: true,
        repeat: -1
    });

    scene.add.text(x, y - height, '🔥', { fontSize: '20px' }).setOrigin(0.5);
    return lava;
}

// A volcano in the background
function createVolcano(scene, x, baseY, size) {
    const shape = new Phaser.Geom.Triangle(
        x - size / 2, baseY,
        x + size / 2, baseY,
        x, baseY - size
    );
    const volcano = scene.add.graphics();
    volcano.fillStyle(0x4e342e, 1);
    volcano.fillTriangleShape(shape);
    scene.add.text(x, baseY - size + 6, '🌋', { fontSize: `${Math.round(size / 4)}px` }).setOrigin(0.5);
    return volcano;
}

// The lava got you
function hitLava() {
    loseLife('🔥 The lava burned you! / ¡La lava te quemó!');
}

// Lose one life and go back to the start
function loseLife(why) {
    if (gameOver) return;

    const now = Date.now();
    if (now - lastHit < HIT_COOLDOWN) return;
    lastHit = now;

    lives -= 1;
    livesText.setText(livesLabel());
    console.log(`${why} (${lives} lives left)`);

    flashMessage(why);

    if (lives <= 0) {
        endGame('GAME OVER 🌋');
        return;
    }

    // Back to the start
    player.setPosition(START_X, START_Y);
    player.body.setVelocity(0, 0);
}

function flashMessage(text) {
    if (messageText) messageText.destroy();
    messageText = scene.add.text(400, 160, text, {
        fontSize: '20px',
        fill: '#ffeb3b',
        fontStyle: 'bold',
        stroke: '#000000',
        strokeThickness: 4,
        align: 'center'
    }).setOrigin(0.5);

    scene.tweens.add({
        targets: messageText,
        alpha: 0,
        duration: 1500,
        onComplete: () => { if (messageText) messageText.destroy(); }
    });
}

function win() {
    endGame('YOU GOT THROUGH THE LAVA! 🏁\n¡PASASTE LA LAVA!');
}

function endGame(text) {
    if (gameOver) return;
    gameOver = true;
    player.body.setVelocity(0, 0);
    player.body.setAllowGravity(false);

    scene.add.text(400, 300, text, {
        fontSize: '34px',
        fill: '#ffeb3b',
        fontStyle: 'bold',
        stroke: '#000000',
        strokeThickness: 6,
        align: 'center'
    }).setOrigin(0.5);

    scene.add.text(400, 380, 'Refresh to play again / Recarga para jugar otra vez', {
        fontSize: '18px',
        fill: '#ffffff'
    }).setOrigin(0.5);

    console.log('🎮 Game over:', text);
}

console.log('🌋 Gio\'s Lava Game loaded!');
console.log('👾 Designed by Gio');
