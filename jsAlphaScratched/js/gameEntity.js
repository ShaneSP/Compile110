/*
* @constructor
*/

function GameEntity(cr, map, width, height) {
  this.col = cr[0];
  this.row = cr[1];
  LEVEL_MAP.occupy([this.col, this.row], new PlayerEntity());
  this.startX = this.col*40-1;
  this.startY = this.row*40-5;
  this.width = width;
  this.height = height;

  this.accumulatedTimeMs = 0;
  this.currentAnimationImageIdx = 0;

  this.currentAnimation = null;

  this.finiteStateMachine = new FiniteStateMachine(this);


  /*
  * @public
  */

  this.processInput = function(e) {
    this.finiteStateMachine.onUnitProcessInput(e);
  };

  /*
  * @public
  */

  this.updateState = function() {
    this.finiteStateMachine.onUnitUpdateState();
    this.currentAnimation.onGameStateUpdate();
  };

  this.updateGraphics = function(context) {
    this.currentAnimation.onGraphicsUpdate(context, this.startX, this.startY);
  };

  function PlayerEntity() {
    this.player = new createjs.Sprite(PLAYER_SHEET);
    this.currentAnimation = new Animation("fcRight",1,this.player);
    this.player.x = this.col*40-1;
    this.player.y = this.row*40-5;
    STAGE.addChild(this.player);

    this.setCR = function(cr) {
      this.map.unoccupy([this.col, this.row]);
      this.col = cr[0];
      this.row = cr[1];
      this.map.occupy(cr, this);
      this.setXY();
    }

    this.setXY = function() {
      this.finalx = this.col*40 - 1;
      this.finaly = this.row*40 - 5;
    }

    this.setXY();
  };

};
