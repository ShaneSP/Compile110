/*
* @constructor
*/

function GameEntity(cr, map, width, height) {
  this.col = cr[0];
  this.row = cr[1];
  PLAYER = new PlayerEntity(this.col, this.row, new Animation("wkRight", 9));
  LEVEL_MAP.occupy([this.col, this.row], this.player);
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

  this.baseUpdateGraphics = function(context) {
    //need to make PlayerEntity extend GameEntity
    PLAYER.updateGraphics();
  };

  function PlayerEntity(col, row, current) {
    this.col = col;
    this.row = row;
    this.current = current;
    this.player = new createjs.Sprite(PLAYER_SHEET, "fcLeft");
    STAGE.addChild(this.player);
    this.player.x = col*40-1;
    this.player.y = row*40-5;
    this.startX = this.player.x;
    this.startY = this.player.y;

    this.setCR = function(cr) {
      LEVEL_MAP.unoccupy([this.col, this.row]);
      col = cr[0];
      row = cr[1];
      LEVEL_MAP.occupy(cr, this.player);
      this.setXY();
    }

    this.setXY = function(){
      this.player.x = this.col*40-1;
      this.player.y = this.row*40-5;
    }

    this.getX = function() {
      return this.player.x;
    }

    this.getPlayer = function() {
      return this.player;
    }

    this.updateGraphics = function(context) {
      this.current.onGraphicsUpdate(context, this.startX, this.startY);
    }
    this.setXY();
  };

};
