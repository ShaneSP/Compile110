function main() {
  createInputQueueGame();
}

function createInputQueueGame() {
  var canvas, stage;
  var maplayout;
  var tiles;
  var player;
  var bit;

  canvas = document.getElementById("canvas");
  stage = new createjs.Stage(canvas);
  createjs.Ticker.setInterval(15);
  createjs.Ticker.setFPS(15);

  var cr = [1, 4];
  var bcr = [8,4];
  player = new playerclass(cr, levelmap, stage, PLAYER_SHEET);
  //bit = new monsterclass(bcr, levelmap, stage, BIT_SHEET, player);

  //var gameEntity = new GameEntity(cr, levelmap, 42, 42, player);

  var gameEntities = new Array();
  //gameEntities[0] = gameEntity;

  var inputQueue = new Queue(USER_INPUT_BUFFER_CAPACITY);
  var gameLoop = new GameLoop(gameEntities, inputQueue, stage);

  gameLoop.start();
}

function runCode() {
  var code = editor.getValue();
  eval(code);
}
