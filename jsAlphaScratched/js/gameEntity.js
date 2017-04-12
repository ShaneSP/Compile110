/*
* @constructor
*/

function GameEntity(cr, map) {
  this.cr = cr;
  PLAYER = new PlayerEntity(this.cr[0], this.cr[1], new Animation("fcRight", 30));
  //console.log("made PlayerEntity");

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
    //change this when implementing child entities
    this.finiteStateMachine.onUnitUpdateState();
    this.currentAnimation.onGameStateUpdate();
  };

  this.baseUpdateGraphics = function(context) {
    //need to make PlayerEntity extend GameEntity
    PLAYER.updateGraphics();
  };

  function PlayerEntity(col, row, current) {
    this.health = 5;
    this.col = col;
    this.row = row;
    this.current = current;
    this.player = new createjs.Sprite(PLAYER_SHEET, this.current);
    STAGE.addChild(this.player);
    this.player.x = this.col*40-1;
    this.player.y = this.row*40-5;

    this.getHealth = function() {
      return this.health;
    }

    this.setCR = function(cr) {
      //implement velocity of animations
      LEVEL_MAP.unoccupy([this.col, this.row]);
      this.col = cr[0];
      this.row = cr[1];
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
    this.setCR([this.col,this.row]);
  };

};
