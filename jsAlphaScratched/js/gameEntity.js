/*
* 2 TODO
*/

function GameEntity(cr, map, type) {
  this.cr = cr;
  switch(type) {
    case 'player' : return new PlayerEntity(this.cr[0], this.cr[1], "fcRight");
    break;

    case 'bit' : return new BitEntity(this.cr[0], this.cr[1], "idle");
    break;
  }

  //TODO: player is the only one processing input?
  this.processAnimation = function(e) {
    return this.processAnimation(e);
  }

  this.processInput = function(e) {
    return this.processInput(e);
  };

  this.updateLogic = function(context) {
    this.updateLogic(context);
  };

  this.updateGraphics = function(context) {
    this.updateGraphics(context);
  };

  this.animationDone = function() {
    return this.animationDone();
  };

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
      LEVEL_MAP.unoccupy([this.col, this.row]);
      this.col = cr[0];
      this.row = cr[1];
      LEVEL_MAP.occupy(cr, this.player);
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

    this.setCR([this.col,this.row]);
  };

//---------BIT_ENTITY CODE-----------------//

  function BitEntity(col, row, current) {
    this.health = 1;

    // Game Logc
    this.col = col;
    this.row = row;
    this.current = current;
    this.agrocount = 0;

    // Animation
    this.viscol = col;
    this.visrow = row;
    this.animation = current;
    this.bit = new createjs.Sprite(BIT_SHEET, this.current);
    STAGE.addChild(this.bit);
    this.bit.x = this.col*42-1;
    this.bit.y = this.row*45-5;

    this.getHealth = function() {
      return this.health;
    }

    this.setCR = function(cr) {
      LEVEL_MAP.unoccupy([this.col, this.row]);
      this.col = cr[0];
      this.row = cr[1];
      LEVEL_MAP.occupy(cr, this.bit);
    }

    this.setVisCR = function(cr) {
      this.viscol = cr[0];
      this.visrow = cr[1];
    }

    // ANIMATION

    this.nextXY = function() {
      if (this.viscol*40-1 - this.bit.x > 3) {
        this.bit.x = this.bit.x + 3;
      }
      else if (this.viscol*40-1 - this.bit.x < -3) {
        this.bit.x = this.bit.x - 3;
      }
      if (this.visrow*40-5 - this.bit.y > 3) {
        this.bit.y = this.bit.y + 3;
      }
      else if (this.visrow*40-5 - this.bit.y < -3) {
        this.bit.y = this.bit.y - 3;
      }
    }

    this.updateGraphics = function(name) {
      if ((PLAYER.col == this.col - 1 && PLAYER.row == this.row - 1)
      || (PLAYER.col == this.col - 1 && PLAYER.row == this.row + 1)
      || (PLAYER.col == this.col && PLAYER.row == this.row + 1)
      || (PLAYER.col == this.col && PLAYER.row == this.row - 1)
      || (PLAYER.col == this.col - 1 && PLAYER.row == this.row)) {
        if (this.animation == "idle") {
          this.agrocount = this.agrocount + 1;
          if (this.agrocount > 3) {
            this.changePosition("agro");
          }
        }
        else if (this.animation == "agro") {
          this.agrocount = this.agrocount + 1;
          if (this.agrocount > 21) {
            this.changePosition("charge");
            this.agrocount = 0;
          }
        }
        else if (this.animation == "charge") {
          this.agrocount = this.agrocount + 1;
          if (this.agrocount > 6) {
            this.changePosition("idle");
            this.agrocount = 0;
          }
        }
      } else if (this.animation != "idle") {
        this.changePosition("idle");
      }
    }

    // Will also do non-movement animation
    this.animationDone = function() {
      return true;
    }

    this.movementDone = function() {

    }

    this.changePosition = function(pos) {
      this.animation = pos;
      this.bit.gotoAndPlay(pos);
    }

    this.processAnimation = function(e) {

    }

    // GAME LOGIC

    //TODO: steadily move player to next position
    this.setXY = function(){
      // this.player.x = this.col*40-1;
      // this.player.y = this.row*40-5;
    }

    this.getXY = function(){
      return [this.bit.x, this.bit.y];
    }

    this.getX = function() {
      return this.bit.x;
    }

    this.getY = function() {
      return this.bit.y;
    }

    this.getBit = function() {
      return this.bit;
    }

    this.setCurrent = function(pos) {
      this.current = pos;
    }

    this.processInput = function(e) {

    }

    this.setCR([this.col,this.row]);
  };
