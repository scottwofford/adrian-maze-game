// Adrian's Maze Game - Level 1
// Created by: Adrian (6 years old)
// Date: January 1, 2026

// Game Configuration
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
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
let player1;
let player2;
let platforms;
let cursors;
let wasd;
let scoreText;
let player1Health = 50;
let player2Health = 50;
let player1Lives = 3;
let player2Lives = 3;

function preload() {
    // This function will load assets (images, sounds, etc.)
    // For now, we'll use simple shapes
    console.log('🎮 Loading Adrian\'s Maze Game...');
}

function create() {
    // Background
    this.add.rectangle(400, 300, 800, 600, 0x2d3436);

    // Title
    this.add.text(400, 30, 'ADRIAN\'S MAZE GAME', {
        fontSize: '32px',
        fill: '#fff',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    // Subtitle
    this.add.text(400, 65, 'Level 1: Race to the Exit!', {
        fontSize: '18px',
        fill: '#00ff00'
    }).setOrigin(0.5);

    // Create platforms (simple maze)
    platforms = this.physics.add.staticGroup();

    // Ground
    platforms.create(400, 580, null).setDisplaySize(800, 40).setTint(0x8B4513).refreshBody();

    // Simple maze walls for testing
    platforms.create(200, 500, null).setDisplaySize(300, 20).setTint(0x8B4513).refreshBody();
    platforms.create(600, 420, null).setDisplaySize(300, 20).setTint(0x8B4513).refreshBody();
    platforms.create(300, 340, null).setDisplaySize(200, 20).setTint(0x8B4513).refreshBody();
    platforms.create(650, 260, null).setDisplaySize(250, 20).setTint(0x8B4513).refreshBody();
    platforms.create(200, 180, null).setDisplaySize(150, 20).setTint(0x8B4513).refreshBody();

    // Exit (goal)
    const exit = this.add.rectangle(750, 140, 40, 40, 0x00ff00);
    this.add.text(750, 140, '🚪', {
        fontSize: '32px'
    }).setOrigin(0.5);

    // Player 1 (Dinosaur 🦖)
    player1 = this.add.rectangle(100, 450, 32, 32, 0xff0000);
    this.physics.add.existing(player1);
    player1.body.setBounce(0.2);
    player1.body.setCollideWorldBounds(true);

    // Player 1 Label
    this.add.text(100, 420, '🦖', {
        fontSize: '24px'
    }).setOrigin(0.5);

    // Player 2 (Robot 🤖)
    player2 = this.add.rectangle(150, 450, 32, 32, 0x0000ff);
    this.physics.add.existing(player2);
    player2.body.setBounce(0.2);
    player2.body.setCollideWorldBounds(true);

    // Player 2 Label
    this.add.text(150, 420, '🤖', {
        fontSize: '24px'
    }).setOrigin(0.5);

    // Collisions
    this.physics.add.collider(player1, platforms);
    this.physics.add.collider(player2, platforms);

    // Health Display
    this.add.text(20, 100, 'Player 1 (🦖)', {
        fontSize: '16px',
        fill: '#ff0000'
    });

    const p1HealthText = this.add.text(20, 125, `Health: ${player1Health} HP`, {
        fontSize: '14px',
        fill: '#fff'
    });

    const p1LivesText = this.add.text(20, 145, `Lives: ${'❤️'.repeat(player1Lives)}`, {
        fontSize: '14px',
        fill: '#fff'
    });

    this.add.text(20, 180, 'Player 2 (🤖)', {
        fontSize: '16px',
        fill: '#0000ff'
    });

    const p2HealthText = this.add.text(20, 205, `Health: ${player2Health} HP`, {
        fontSize: '14px',
        fill: '#fff'
    });

    const p2LivesText = this.add.text(20, 225, `Lives: ${'❤️'.repeat(player2Lives)}`, {
        fontSize: '14px',
        fill: '#fff'
    });

    // Controls
    cursors = this.input.keyboard.createCursorKeys();
    wasd = this.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        right: Phaser.Input.Keyboard.KeyCodes.D
    });

    console.log('✅ Game created! Player 1: Arrow Keys | Player 2: WASD');
}

function update() {
    // Player 1 Controls (Arrow Keys)
    if (cursors.left.isDown) {
        player1.body.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        player1.body.setVelocityX(160);
    } else {
        player1.body.setVelocityX(0);
    }

    if (cursors.up.isDown && player1.body.touching.down) {
        player1.body.setVelocityY(-250);
    }

    // Player 2 Controls (WASD)
    if (wasd.left.isDown) {
        player2.body.setVelocityX(-160);
    } else if (wasd.right.isDown) {
        player2.body.setVelocityX(160);
    } else {
        player2.body.setVelocityX(0);
    }

    if (wasd.up.isDown && player2.body.touching.down) {
        player2.body.setVelocityY(-250);
    }

    // Check if player reached exit (simple version)
    if (player1.x > 730 && player1.y < 160) {
        console.log('🏆 Player 1 (🦖) WINS!');
        // TODO: Show win screen
    }

    if (player2.x > 730 && player2.y < 160) {
        console.log('🏆 Player 2 (🤖) WINS!');
        // TODO: Show win screen
    }
}

console.log('🎮 Adrian\'s Maze Game Loaded!');
console.log('👾 Created by Adrian (6 years old)');
console.log('🚀 Ready to play!');
