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
  PLAYER = new GameEntity(cr, LEVEL_MAP1, "player");
  SWORD = new GameEntity([6,1], LEVEL_MAP1, "sword");
  PORTAL = new GameEntity(bcr, LEVEL_MAP1, "portal");
  BIT = new GameEntity(bcr, LEVEL_MAP1, "bit", "bit");
  GAME_ENTITIES[0] = PLAYER;
  GAME_ENTITIES[1] = PORTAL;
  GAME_ENTITIES[2] = SWORD;

  var inputQueue = new Queue(200);

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
  if(BIT.spawned && evt.stageX>=BIT.bit.x-18 && evt.stageX<=BIT.bit.x+18 && evt.stageY>=BIT.bit.y-18 && evt.stageY<=BIT.bit.y+18) {
    getEnemyCode();
  }
  if(evt.stageX >= SWORD.sword.x && evt.stageX <= SWORD.sword.x+50 && evt.stageY >= SWORD.sword.y && evt.stageY <= SWORD.sword.y+50) {
    getSwordCode();
  }
  if(evt.stageX >= PORTAL.portal.x && evt.stageX <= PORTAL.portal.x+50 && evt.stageY >= PORTAL.portal.y && evt.stageY <= PORTAL.portal.y+50) {
    getPortalCode();
  }
  if(evt.stageX >= PLAYER.player.x && evt.stageX <= PLAYER.player.x+50 && evt.stageY >= PLAYER.player.y && evt.stageY <= PLAYER.player.y+50) {
    getPlayerCode();
  }


})

function handleTick() {
  if(tick % 4 == 0) {
    view.show();
    STAGE.update();
  }
  tick++;
}
