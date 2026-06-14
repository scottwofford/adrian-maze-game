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
// Todavía no está construido. Victoria decide qué construir primero.
// Not built yet. Victoria decides what to build first.

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    parent: 'game-container',
    backgroundColor: '#a18cd1',
    scene: { create }
};

const game = new Phaser.Game(config);

function create() {
    this.add.text(400, 200, '🦄', { fontSize: '96px' }).setOrigin(0.5);
    this.add.text(400, 320, '¡Próximamente!\nComing soon!', {
        fontSize: '28px',
        fill: '#fff',
        align: 'center'
    }).setOrigin(0.5);
}
