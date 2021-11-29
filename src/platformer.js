var config = {
    type: Phaser.AUTO,
    width: 960,
    height: 540,
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

var platforms;
var player
var cursors;
var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('platform', 'assets/platform.png');
    this.load.image('bg', 'assets/bg.png');
    this.load.image('boy', 'assets/boy.png');
}

function create ()
{
    let bg = this.add.image(480, 270, 'bg');
    let platforms = this.physics.add.staticGroup();

    platforms.create(400, 650, 'platform').setScale(6, 1).refreshBody();

    platforms.create(800, 300, 'platform').setScale(2, .105).refreshBody();
    platforms.create(900, 100, 'platform').setScale(2, .105).refreshBody();
    platforms.create(100, 200, 'platform').setScale(2, .105).refreshBody();

    player = this.physics.add.sprite(100, 350, 'boy');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.setScale(.25)
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    this.physics.add.collider(player, platforms);
    cursors = this.input.keyboard.createCursorKeys();
}

function update ()
{
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

    }
    else
    {
        player.setVelocityX(0);

    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
}
