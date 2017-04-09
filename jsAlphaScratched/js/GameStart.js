var player; //eventListener
var gameEntity;

function main() {
  createInputQueueGame();
}

function createInputQueueGame() {
  var cr = [1, 4];
  var bcr = [8,4];
  //player = new playerclass(cr, levelmap, stage, PLAYER_SHEET);
  //bit = new monsterclass(bcr, levelmap, stage, BIT_SHEET, player);
  gameEntity = new GameEntity(cr, LEVEL_MAP);
  var gameEntities = new Array();
  gameEntities[0] = gameEntity;

  var inputQueue = new Queue(USER_INPUT_BUFFER_CAPACITY);
  var gameLoop = new GameLoop(gameEntities, inputQueue, STAGE);
  player = new EventListener(inputQueue);

  gameLoop.start();
}

//need to implement an exception catch

function runCode() {
  var code = editor.getValue();
  eval(code);
}
