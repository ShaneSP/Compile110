var canvas, stage;
var maplayout, game, tileSheet, tiles;
var player;
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

maplayout = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

function handleTick() {
  stage.update();
}

function init() {
  canvas = document.getElementById("canvas");
  stage = new createjs.Stage(canvas);
  createjs.Ticker.addEventListener("tick", handleTick);

  tileSheet = new createjs.SpriteSheet({
    "images": ["assets/floortiles40px.png"],
    "frames": {
      "height": 40,
      "width": 40,
      "regX": 0,
      "regY": 0,
      "count": 14
    }
  });

  var characterSheet = new createjs.SpriteSheet({
    "images": ["assets/spritesheet-42px.png"],
    "frames": {"height": 42, "width": 42, "count": 36, "regX": 0, "regY": 1, "spacing": 1, "margin": 1},
    "animations": {
      "wkForward": [0, 6,],
      "wkRight": [9, 17,],
      "wkLeft": [18, 26],
      "wkBackward": [27, 33],
      "fcForward": [0],
      "fcRight": [9],
      "fcLeft": [26],
      "fcBackward": [27]
    }
  });

  levelmap = new map(maplayout, stage, tileSheet);
  var cr = [1, 4];
  player = new playerclass(cr, levelmap, stage, characterSheet);

}

init();
