//1 TODO

var player; //eventListener
var gameEntity;
var view;
var tick =0;

function main() {
  createInputQueueGame();
}

function createInputQueueGame() {
  var cr = [1, 5];
  var bcr = [8,5];
  //player = new playerclass(cr, levelmap, stage, PLAYER_SHEET);
  //bit = new monsterclass(bcr, levelmap, stage, BIT_SHEET, player);

  PLAYER = new GameEntity(cr, LEVEL_MAP, "player");
  SWORD = new GameEntity([6,1], LEVEL_MAP, "sword");
  PORTAL = new GameEntity(bcr, LEVEL_MAP, "portal");
  GAME_ENTITIES[0] = PLAYER;
  GAME_ENTITIES[1] = SWORD;
  GAME_ENTITIES[2] = PORTAL;

  var inputQueue = new Queue(30);
  //var gameLoop = new GameLoop(gameEntities, inputQueue, STAGE);
  //player = new EventListener(inputQueue);

  //gameLoop.start();

  var model = new GameModel(GAME_ENTITIES,inputQueue);
  view = new GameView(model, {
            'button' : $('input[type=button]') //TODO: add Run Code button here
          });
  var controller = new GameController(model, view);

  createjs.Ticker.addEventListener("tick", handleTick);
  // createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
  createjs.Ticker.setInterval(15);
  createjs.Ticker.setFPS(15);
  //view.show();
}

function handleTick() {
  if(tick % 4 == 0) {
    view.show();
    STAGE.update();
  }
  tick++;
}

//need to implement an exception catch

// function runCode() {
//   var code = editor.getValue();
//   eval(code);
// }
