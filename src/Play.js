class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    preload() {
        this.load.path = './assets/img/'
        this.load.image('grass', 'grass.jpg')
        this.load.image('cup', 'cup.jpg')
        this.load.image('ball', 'ball.png')
        this.load.image('wall', 'wall.png')
        this.load.image('oneway', 'one_way_wall.png')
    }

    create() {
        // //text configuration
        // let readyConfig = {
        //     fontFamily: 'Courier',
        //     fontSize: '28px',
        //     backgroundColor: '#F3B141',
        //     color: '#000000',
        //     align: 'center',
        //     padding: {
        //         top:5,
        //         bottom: 5,
        //     },
        //     fixedWidth: 200
        // }

        // //add text
        // this.shots = 0;
        // this.score = 0;
        // this.shot_percent = 0;

        // this.shotInfo = this.add.text(width / 2, height / 10,  "Shots: " + this.shots.toString(), readyConfig)
        // console.log(this.shotInfo.text)
        //this.scoreInfo = this.add.text()
        //this.precetnInfo = this.add.text()

        // add background grass
        this.grass = this.add.image(0, 0, 'grass').setOrigin(0)

        // add cup
        //place the cup half way the width of the window and 1/10th the way down from the top
        this.cup = this.physics.add.sprite(width /2, height / 10, 'cup');
        //set the collide box to a circle
        this.cup.body.setCircle(this.cup.width / 4)
        //set the circle to center of the cup
        this.cup.body.setOffset(this.cup.width / 4)
        //set the body of the cup to no move
        this.cup.body.setImmovable(true)

        //add ball
        this.ball = this.physics.add.sprite(width / 2, height - height / 10, 'ball')
        //set the ball collide box to a cirlcle
        this.ball.body.setCircle(this.ball.width / 2)
        //set the ball to bounce off walls
        this.ball.body.setCollideWorldBounds(true)
        //make the ball bouncy
        this.ball.body.setBounce(0.5)
        //put drag on the ball
        this.ball.body.setDamping(true).setDrag(0.5)


        //add walls
        let wallA = this.physics.add.sprite(0, height / 4, 'wall')
        //make sure the wall does not hang off half way
        this.wallVelocity = 100
        wallA.setX(Phaser.Math.Between(0 + wallA.width / 2, width - wallA.width / 2))
        wallA.body.setImmovable(true)

        let wallB = this.physics.add.sprite(0, height / 2, 'wall')
        //make sure the wall does not hang off half way
        wallB.setX(Phaser.Math.Between(0 + wallB.width / 2, width - wallB.width / 2))
        wallB.body.setImmovable(true)

        this.walls = this.add.group([wallA, wallB])


        //one way wall
        this.oneWay = this.physics.add.sprite(0, height /4 * 3, 'oneway')
        this.oneWay.setX(Phaser.Math.Between(0 + this.oneWay.width/2, width - this.oneWay.width/2))
        this.oneWay.setVelocityX(this.wallVelocity)
        this.oneWay.body.setCollideWorldBounds(true)
        this.oneWay.body.setBounce(1)
        this.oneWay.body.setImmovable(true)
        this.oneWay.body.checkCollision.down = false

        //variable to control velocity
        this.SHOT_VELOCITY_X = 200
        this.SHOT_VELOCITY_Y_MIN = 700
        this.SHOT_VELOCTY_Y_MAX = 1100

        //pointer input
        this.input.on('pointerdown',(pointer) => {
            let shotDirection
            let shotXDirection
            pointer.y <= this.ball.y ? shotDirection = 1: shotDirection = -1
            pointer.x <= this.ball.x ? shotXDirection = 1: shotXDirection = -1
            this.ball.body.setVelocityX(Phaser.Math.Between(-this.SHOT_VELOCITY_X, this.SHOT_VELOCITY_X))
            this.ball.body.setVelocityY(Phaser.Math.Between(this.SHOT_VELOCITY_Y_MIN, this.SHOT_VELOCTY_Y_MAX) * shotDirection)
            this.ball.body.setVelocityX(Phaser.Math.Between(-this.SHOT_VELOCITY_X, this.SHOT_VELOCITY_X)*shotXDirection)
            
        })


        this.physics.add.collider(this.ball, this.cup, (ball, cup) =>{
            this.ball.setPosition(width / 2, height - height / 10)
        })

        this.physics.add.collider(this.ball, this.walls)
        this.physics.add.collider(this.ball, this.oneWay)

        
        
    }

    update() {

       
    }


}