//1 TODO

var player; //eventListener
var gameEntity;
var view;
var tick =0;

function main1() {
  createInputQueueGame1();
}

function createInputQueueGame1() {
  var cr = [1, 5];
  var bcr = [8,5];
  CURRENT_STAGE = STAGE1;
  CURRENT_MAP = LEVEL_MAP1;
  PORTAL = new GameEntity(bcr, LEVEL_MAP1, "portal");
  PLAYER = new GameEntity(cr, LEVEL_MAP1, "player");
  GATE0 = new GameEntity([0,6], LEVEL_MAP1, "gate");
  BIT = new GameEntity([5,9], LEVEL_MAP1, "bit", "bit");
  GAME_ENTITIES[0] = PLAYER;
  GAME_ENTITIES[1] = PORTAL;
  GAME_ENTITIES[2] = GATE0;
  GAME_ENTITIES[3] = BIT;
  SPAWN = true;

  var inputQueue = new Queue(200);

  MODEL = new GameModel(GAME_ENTITIES,inputQueue);
  view = new GameView(MODEL, {
            'button' : $('input[type=button]')
          });
  var controller = new GameController(MODEL, view);

  createjs.Ticker.addEventListener("tick", handleTick);
  createjs.Ticker.setInterval(15);
  createjs.Ticker.setFPS(15);

  CURRENT_STAGE.on("stagemousedown", function(evt) {
    if(BIT.spawned && evt.stageX>=BIT.bit.x-18 && evt.stageX<=BIT.bit.x+18 && evt.stageY>=BIT.bit.y-18 && evt.stageY<=BIT.bit.y+18) {
      getEnemyCode();
    }
    if(evt.stageX >= PORTAL.portal.x && evt.stageX <= PORTAL.portal.x+50 && evt.stageY >= PORTAL.portal.y && evt.stageY <= PORTAL.portal.y+50) {
      getPortalCode();
    }
    if(evt.stageX >= PLAYER.player.x && evt.stageX <= PLAYER.player.x+50 && evt.stageY >= PLAYER.player.y && evt.stageY <= PLAYER.player.y+50) {
      getPlayerCode();
    }
  })
}

function handleTick() {
  if(tick % 4 == 0) {
    view.show();
    CURRENT_STAGE.update();
  }
  tick++;
}
