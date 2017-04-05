/*
* @constructor
*/

function GameEntity(cr, map, width, height) {
  this.col = cr[0];
  this.row = cr[1];
  this.map = map;
  this.map.occupy([this.col, this.row], this);
  this.startX = this.col*40-1;
  this.startY = this.row*40-5;
  this.width = width;
  this.height = height;
  this.unit = unit;

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
    this.currentAnimation.onGraphicsUpdate(context, this.startX, this.startY, this.unit);
  };

  function PlayerEntity(player) {
    $.extend(this, new GameEntity(cr, this.map, this.width, this.height));

    
  }

};
