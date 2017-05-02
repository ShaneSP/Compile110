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
  PLAYER = new GameEntity(cr, LEVEL_MAP, "player");
  SWORD = new GameEntity([6,1], LEVEL_MAP, "sword");
  PORTAL = new GameEntity(bcr, LEVEL_MAP, "portal");
  BIT = new GameEntity(bcr, LEVEL_MAP, "bit");
  GAME_ENTITIES[0] = PLAYER;
  GAME_ENTITIES[1] = PORTAL;
  GAME_ENTITIES[2] = SWORD;

  var inputQueue = new Queue(30);

  MODEL = new GameModel(GAME_ENTITIES,inputQueue);
  view = new GameView(MODEL, {
            'button' : $('input[type=button]')
          });
  var controller = new GameController(MODEL, view);

  createjs.Ticker.addEventListener("tick", handleTick);
  createjs.Ticker.setInterval(15);
  createjs.Ticker.setFPS(15);
}

STAGE.on("stagemousedown", function(evt) {
  console.log("click!");
  if(BIT.spawned && evt.stageX>=BIT.bit.x-18 && evt.stageX<=BIT.bit.x+18 && evt.stageY>=BIT.bit.y-18 && evt.stageY<=BIT.bit.y+18) {
    getEnemyCode();
  }
  if(evt.stageX >= SWORD.sword.x && evt.stageX <= SWORD.sword.x+50 && evt.stageY >= SWORD.sword.y && evt.stageY <= SWORD.sword.y+50) {
    getSwordCode();
  }
})

function handleTick() {
  if(tick % 4 == 0) {
    view.show();
    STAGE.update();
  }
  tick++;
}
