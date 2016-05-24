var AM = new AssetManager();

function Animation(spriteSheet, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    if (frame > 9) {
        frame = 18 - frame;
    }
    xindex = frame % 5;
    yindex = Math.floor(frame / 5);

    console.log(frame + " " + xindex + " " + yindex);

    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth,
                 this.frameHeight);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

function Background(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

Background.prototype = new Entity();
Background.prototype.constructor = Background;



function Bird(game, spritesheet) {
    this.animation = new Animation(spritesheet, 184, 165, 0.09, 12,  true, false);
    this.x = 0;
    this.y = 0;
    this.game = game;
    this.ctx = game.ctx;
}

Bird.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

Bird.prototype.update = function() {


    if(this.y <= 700 && this.x < 400){
         this.y += 1;
         this.x += 1;
    }else if(this.x < 695 && this.x >= 400) {
        this.x += 1;
        this.y -= 1;
    } else {
        this.x -= 1    
    }

   
};



AM.queueDownload("./img/angrybird.png");
AM.queueDownload("./img/background.jpg");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");



    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();
    
    //gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/background.jpg")));
    gameEngine.addEntity(new Bird(gameEngine, AM.getAsset("./img/angrybird.png")));

    var bg = new Background(gameEngine);
    //var unicorn = new Unicorn(gameEngine);

    gameEngine.addEntity(bg);

    console.log("All Done!");
});