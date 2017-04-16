/*
* 2 TODO
*/

function GameEntity(cr, map) {
  this.cr = cr;
  PLAYER = new PlayerEntity(this.cr[0], this.cr[1], "fcRight");
  //console.log("made PlayerEntity");

  this.accumulatedTimeMs = 0;
  this.currentAnimationImageIdx = 0;

  this.currentAnimation = null;

  //this.finiteStateMachine = new FiniteStateMachine(this);


  /*
  * @public
  */

  this.processAnimation = function(e) {
    return PLAYER.processAnimation(e);
  }

  this.processInput = function(e) {
    //this.finiteStateMachine.onUnitProcessInput(e);
    return PLAYER.processInput(e);
  };

  /*
  * @public
  */

  this.updateState = function() {
    //change this when implementing child entities
    // this.finiteStateMachine.onUnitUpdateState();
    // this.currentAnimation.onGameStateUpdate();
  };

  this.updateLogic = function(context) {
    //need to make PlayerEntity extend GameEntity
    PLAYER.updateLogic(context);
  };

  this.updateGraphics = function(context) {
    PLAYER.updateGraphics(context);
  };

  this.animationDone = function() {
    return PLAYER.animationDone();
  };

  function PlayerEntity(col, row, current) {
    this.health = 5;

    // Game Logc
    this.col = col;
    this.row = row;
    this.current = current;

    // Animation
    this.viscol = col;
    this.visrow = row;
    this.animation = current;
    this.player = new createjs.Sprite(PLAYER_SHEET, this.current);
    this.player.framerate = .5;
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
      //this.setXY();
    }

    this.setVisCR = function(cr) {
      this.viscol = cr[0];
      this.visrow = cr[1];
    }

    // ANIMATION

    this.nextXY = function() {
      if (this.viscol*40-1 - this.player.x > 3) {
        this.player.x = this.player.x + 3;
      }
      else if (this.viscol*40-1 - this.player.x < -3) {
        this.player.x = this.player.x - 3;
      }
      if (this.visrow*40-5 - this.player.y > 3) {
        this.player.y = this.player.y + 3;
      }
      else if (this.visrow*40-5 - this.player.y < -3) {
        this.player.y = this.player.y - 3;
      }
    }

    this.updateGraphics = function(name) {
      var nextAnim = name;
      if(nextAnim != this.player.animation && nextAnim != undefined) {
        this.changePosition(name);
      }
      this.nextXY();
    }

    // Will also do non-movement animation
    this.animationDone = function() {
      return this.movementDone();
    }

    this.movementDone = function() {
      if (this.player.x == this.viscol*40-1
        && this.player.y == this.visrow*40-5) {
        return true;
      }
      else if (Math.abs(this.visrow*40-5 - this.player.y) < 4
      && Math.abs(this.viscol*40-1 - this.player.x) < 4) {
        this.player.x = this.viscol*40-1;
        this.player.y = this.visrow*40-5;
        this.changePosition("fc" + this.animation.substring(2, 10));
        return true;
      }
      return false;
    }

    this.changePosition = function(pos) {
      this.animation = pos;
      this.player.gotoAndPlay(pos);
    }

    this.processAnimation = function(e) {
      var nextEvent = e;
      if(nextEvent == "wkRight") {
        this.changePosition("wkRight");
        this.setVisCR([this.viscol+1,this.visrow]);
      } else if(nextEvent == "wkLeft") {
        this.changePosition("wkLeft");
        this.setVisCR([this.viscol-1,this.visrow]);
      }
      console.log([this.viscol,this.visrow]);
    }

    // GAME LOGIC

    //TODO: steadily move player to next position
    this.setXY = function(){
      // this.player.x = this.col*40-1;
      // this.player.y = this.row*40-5;
    }

    this.getXY = function(){
      return [this.player.x, this.player.y];
    }

    this.getX = function() {
      return this.player.x;
    }

    this.getY = function() {
      return this.player.y;
    }

    this.getPlayer = function() {
      return this.player;
    }

    this.setCurrent = function(pos) {
      this.current = pos;
    }

    this.processInput = function(e) {
      var nextEvent = e;
      if(nextEvent == "wkRight") {
        if(!LEVEL_MAP.tileOccupied([this.col+1,this.row])
          && LEVEL_MAP.tileWalkable([this.col+1,this.row])) {
          this.setCR([this.col+1,this.row]);
          this.setCurrent("fcRight");
          return "wkRight";
        }
        else {
          this.setCurrent("fcRight");
          return "fcRight";
        }
      } else if(nextEvent == "wkLeft") {
        if(!LEVEL_MAP.tileOccupied([this.col-1,this.row])
          && LEVEL_MAP.tileWalkable([this.col-1,this.row])) {
          this.setCR([this.col-1,this.row]);
          this.setCurrent("fcLeft");
          return "wkLeft";
        }
        else {
          this.setCurrent("fcLeft");
          return "fcLeft";
        }
      }
    }


    //TODO: workout handling animations here
    // this.updateLogic = function(name) {
    //   var nextAnim = name;
    //   this.setXY();
    // }

    this.setCR([this.col,this.row]);
  };

};
