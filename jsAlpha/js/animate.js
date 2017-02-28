var stage, loader;
var character;
var bit, byte;
var KEYCODE_LEFT = 37;
var KEYCODE_RIGHT = 39;
var KEYCODE_UP = 38;
var KEYCODE_DOWN = 40;
var xVel = 4;
var yVel = 4;
var moveLeft = false;
var moveRight = false;
var moveUp = false;
var moveDown = false;
var characterWidth = 23;
var characterHeight = 38;
var background;

function init() {
  stage = new createjs.Stage(canvas);

  loader = new createjs.LoadQueue(false);
  loader.addEventListener("complete", handleComplete);
  loader.loadFile({id:"character", src:"assets/spritesheet-42px.png"});
  loader.loadFile({id:"bit", src:"assets/bitSpriteIdle.png"});
  loader.loadFile({id:"byte", src:"assets/byteSpriteIdle.png"});
  loader.loadFile({id:"floor", src:"assets/grasstile1.png"});

}

function handleComplete() {
  var spriteSheet = new createjs.SpriteSheet({
    framerate: 1,
    "images": [loader.getResult("character")],
    "frames": {"height": 42, "width": 42, "count": 36, "regX": 0, "regY": 1, "spacing": 1, "margin": 1},
    "animations": {
      "wkForward": [0,6,],
      "wkRight": [9,17,],
      "wkLeft": [18,26],
      "wkBackward": [27, 33]
    }
  });
  var spriteSheetBit = new createjs.SpriteSheet({
    framerate: 1,
    "images": [loader.getResult("bit")],
    "frames": {"height":28, "width": 28, "count": 4, "regX":14, "regY":14, "spacing": 0},
    "animations": {"idle":[0,1,2,3,2,1]}
  });

  var spriteSheetByte = new createjs.SpriteSheet({
    framerate: 1,
    "images": [loader.getResult("byte")],
    "frames": {"height": 26, "width": 28, "count": 4, "regX": 14, "regY": 13, "spacing": 1, "margin": 1},
    "animations": {
      "idle": [0,3]
    }
  });

  var gfx = new createjs.Graphics().beginBitmapFill(loader.getResult("floor")).drawRect(0,0,stage.canvas.width, stage.canvas.height).endFill();

  background = new createjs.Shape(gfx);
  background.x =0;
  stage.addChild(background);

  byte = new createjs.Sprite(spriteSheetByte, "idle");
  byte.x = 60;
  byte.y = 30;
  bit = new createjs.Sprite(spriteSheetBit,"idle");
  bit.x = 30;
  bit.y = 30;
  character = new createjs.Sprite(spriteSheet, 0);


  stage.addChild(character);
  stage.addChild(byte);
  stage.addChild(bit);

  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.addEventListener("tick", tick);
  createjs.Ticker.setInterval(25);
  createjs.Ticker.setFPS(40);
  document.onkeydown = handleKeyDown;
  document.onkeyup = handleKeyUp;
}

function handleKeyDown(e) {
    switch(e.keyCode) {
        case KEYCODE_LEFT:
        case 65:
            moveLeft = true;
            character.spriteSheet.getAnimation("wkLeft").frequency = 0.5;
            if (character.currentAnimation != "wkLeft") {
                moveRight = false;
                moveUp = false;
                moveDown = false;
                character.gotoAndPlay("wkLeft");
            }
            break;
        case KEYCODE_RIGHT:
        case 68:
            moveRight = true;
            character.spriteSheet.getAnimation("wkRight").frequency = 0.5;

            if (character.currentAnimation != "wkRight") {
                moveLeft = false;
                moveUp = false;
                moveDown = false;
                character.gotoAndPlay("wkRight");
            }
            break;
        case KEYCODE_UP:
            moveUp = true;
            character.spriteSheet.getAnimation("wkBackward").frequency = 0.5;

            if(character.currentAnimation != "wkBackward") {
                moveDown = false;
                moveRight = false;
                moveLeft = false;
                character.gotoAndPlay("wkBackward");
            }
            break;
        case KEYCODE_DOWN:
            moveDown = true;
            character.spriteSheet.getAnimation("wkForward").frequency = 0.5;

            if(character.currentAnimation != "wkForward") {
              moveLeft = false;
              moveUp = false;
              moveRight = false;
              character.gotoAndPlay("wkForward");
            }
            break;
    }
}

function handleKeyUp(e) {
    switch(e.keyCode) {
        case KEYCODE_LEFT:
        case 65:
            moveLeft = false;
            moveRight = false;
            moveUp = false;
            moveDown = false;
            if (character.currentAnimationFrame != 0) {
                character.gotoAndStop(0);
            }
            break;
        case KEYCODE_RIGHT:
        case 68:
            moveLeft = false;
            moveRight = false;
            moveUp = false;
            moveDown = false;
            if (character.currentAnimationFrame != 0) {
                character.gotoAndStop(0);
            }
            break;
        case KEYCODE_UP:
            moveLeft = false;
            moveRight = false;
            moveUp = false;
            moveDown = false;
            if (character.currentAnimationFrame != 27) {
                character.gotoAndStop(27);
            }
            break;
        case KEYCODE_DOWN:
            moveLeft = false;
            moveRight = false;
            moveUp = false;
            moveDown = false;
            if (character.currentAnimationFrame != 0) {
                character.gotoAndStop(0);
            }
            break;
    }
}

function tick(event) {
  var speedControl = createjs.Ticker.getTicks() % 4;
  if(speedControl == 0) {
      if(moveLeft) {
          character.x -= xVel;
      } else if(moveRight) {
          character.x += xVel;
      } else if(moveUp) {
        character.y -= yVel;
      } else if(moveDown) {
        character.y += yVel;
      }
      stage.update();
  }
}
