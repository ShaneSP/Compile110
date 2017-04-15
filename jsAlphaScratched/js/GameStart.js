//1 TODO

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
  GAME_ENTITIES[0] = gameEntity;

  var inputQueue = new Queue(USER_INPUT_BUFFER_CAPACITY);
  //var gameLoop = new GameLoop(gameEntities, inputQueue, STAGE);
  //player = new EventListener(inputQueue);

  //gameLoop.start();

  var model = new GameModel(GAME_ENTITIES,inputQueue);
  var view = new GameView(model, {
            'button' :($'button') //TODO: add Run Code button here
          });
  var controller = new GameController(model, view);
  view.show();
}

//need to implement an exception catch

function runCode() {
  var code = editor.getValue();
  eval(code);
}
