// El Tigre Contra Los Leones / The Tiger vs The Lions
// Diseñado por / Designed by: Rafa (4)
//
// Visión de Rafa: el tigre lucha contra los leones.
// Rafa's vision: the tiger fights against the lions.

const GAME_W = 800;
const GAME_H = 600;
const TOTAL_LIONS = 6;
const ATTACK_RADIUS = 90;
const ATTACK_COOLDOWN_MS = 450;
const HIT_COOLDOWN_MS = 800;

const config = {
    type: Phaser.AUTO,
    width: GAME_W,
    height: GAME_H,
    parent: 'game-container',
    backgroundColor: '#f59e0b',
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 0 }, debug: false }
    },
    scene: { preload, create, update }
};

let tiger, cursors, spaceKey;
let lions;
let tigerHealth = 100;
let lionsDefeated = 0;
let healthText, scoreText, messageText;
let gameState = 'playing';
let attackCooldown = 0;
let lastHit = 0;

const game = new Phaser.Game(config);

function preload() {}

function create() {
    for (let i = 0; i < 30; i++) {
        const x = Math.random() * GAME_W;
        const y = Math.random() * GAME_H;
        const tuft = this.add.text(x, y, '🌾', { fontSize: '20px' }).setOrigin(0.5);
        tuft.setAlpha(0.6);
    }

    tiger = this.add.text(GAME_W / 2, GAME_H / 2, '🐅', { fontSize: '48px' }).setOrigin(0.5);
    this.physics.add.existing(tiger);
    tiger.body.setCollideWorldBounds(true);

    lions = this.physics.add.group();
    const spawnPoints = [
        [80, 80], [GAME_W - 80, 80], [80, GAME_H - 80], [GAME_W - 80, GAME_H - 80],
        [GAME_W / 2, 60], [GAME_W / 2, GAME_H - 60]
    ];
    spawnPoints.forEach(([x, y]) => spawnLion.call(this, x, y));

    this.physics.add.overlap(tiger, lions, hitLion, null, this);

    cursors = this.input.keyboard.createCursorKeys();
    spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    healthText = this.add.text(16, 16, '🐅 Vida: 100', {
        fontSize: '20px',
        fill: '#fff',
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: { x: 10, y: 6 }
    });
    scoreText = this.add.text(16, 50, `🦁 0/${TOTAL_LIONS}`, {
        fontSize: '20px',
        fill: '#fff',
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: { x: 10, y: 6 }
    });

    messageText = this.add.text(GAME_W / 2, GAME_H / 2 - 20, '', {
        fontSize: '28px',
        fill: '#fff',
        backgroundColor: 'rgba(0,0,0,0.85)',
        padding: { x: 20, y: 14 },
        align: 'center'
    }).setOrigin(0.5);
}

function spawnLion(x, y) {
    const lion = this.add.text(x, y, '🦁', { fontSize: '40px' }).setOrigin(0.5);
    this.physics.add.existing(lion);
    lion.body.setCollideWorldBounds(true);
    lions.add(lion);
}

function update(time, delta) {
    if (gameState !== 'playing') {
        if (Phaser.Input.Keyboard.JustDown(cursors.up) || Phaser.Input.Keyboard.JustDown(spaceKey)) {
            tigerHealth = 100;
            lionsDefeated = 0;
            gameState = 'playing';
            this.scene.restart();
        }
        return;
    }

    let vx = 0, vy = 0;
    if (cursors.left.isDown) vx = -240;
    else if (cursors.right.isDown) vx = 240;
    if (cursors.up.isDown) vy = -240;
    else if (cursors.down.isDown) vy = 240;
    tiger.body.setVelocity(vx, vy);

    if (attackCooldown > 0) attackCooldown -= delta;
    if (Phaser.Input.Keyboard.JustDown(spaceKey) && attackCooldown <= 0) {
        doAttack.call(this);
        attackCooldown = ATTACK_COOLDOWN_MS;
    }

    lions.children.iterate(lion => {
        if (!lion) return;
        const dx = tiger.x - lion.x;
        const dy = tiger.y - lion.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 1) {
            const speed = 90;
            lion.body.setVelocity((dx / dist) * speed, (dy / dist) * speed);
        }
    });

    if (lionsDefeated >= TOTAL_LIONS) winGame.call(this);
}

function doAttack() {
    const claw = this.add.text(tiger.x, tiger.y, '💥', { fontSize: '72px' }).setOrigin(0.5);
    this.tweens.add({
        targets: claw,
        scale: { from: 0.5, to: 1.4 },
        alpha: { from: 1, to: 0 },
        duration: 250,
        onComplete: () => claw.destroy()
    });

    lions.children.iterate(lion => {
        if (!lion) return;
        const dx = lion.x - tiger.x;
        const dy = lion.y - tiger.y;
        if (Math.sqrt(dx * dx + dy * dy) < ATTACK_RADIUS) {
            const poof = this.add.text(lion.x, lion.y, '⭐', { fontSize: '40px' }).setOrigin(0.5);
            this.tweens.add({
                targets: poof,
                scale: { from: 1, to: 2 },
                alpha: { from: 1, to: 0 },
                duration: 400,
                onComplete: () => poof.destroy()
            });
            lion.destroy();
            lionsDefeated++;
            scoreText.setText(`🦁 ${lionsDefeated}/${TOTAL_LIONS}`);
        }
    });
}

function hitLion(tiger, lion) {
    if (gameState !== 'playing') return;
    const now = this.time.now;
    if (now - lastHit < HIT_COOLDOWN_MS) return;
    lastHit = now;

    tigerHealth -= 15;
    healthText.setText(`🐅 Vida: ${Math.max(0, tigerHealth)}`);

    const dx = tiger.x - lion.x;
    const dy = tiger.y - lion.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    tiger.body.setVelocity((dx / dist) * 350, (dy / dist) * 350);

    this.tweens.add({
        targets: tiger,
        alpha: { from: 0.3, to: 1 },
        duration: 300
    });

    if (tigerHealth <= 0) loseGame.call(this);
}

function winGame() {
    if (gameState !== 'playing') return;
    gameState = 'won';
    messageText.setText(`¡GANÓ EL TIGRE! 🐅🏆\nThe tiger won!\n\nPresiona ↑ o ESPACIO\nPress ↑ or SPACE`);
}

function loseGame() {
    if (gameState !== 'playing') return;
    gameState = 'lost';
    messageText.setText(`Los leones ganaron 🦁\nThe lions won!\n\nPresiona ↑ o ESPACIO\nPress ↑ or SPACE`);
}
