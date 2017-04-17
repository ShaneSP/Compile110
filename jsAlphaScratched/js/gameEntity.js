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

    case 'sword' : return new SwordEntity(this.cr[0], this.cr[1], "idle");
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
    this.isShielding = false;
    this.hasSword = false;

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
    this.player.x = this.col*50-1;
    this.player.y = this.row*50-5;

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
      if (this.viscol*50-1 - this.player.x > 3) {
        this.player.x = this.player.x + 3;
      }
      else if (this.viscol*50-1 - this.player.x < -3) {
        this.player.x = this.player.x - 3;
      }
      if (this.visrow*50-5 - this.player.y > 3) {
        this.player.y = this.player.y + 3;
      }
      else if (this.visrow*50-5 - this.player.y < -3) {
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
      if (this.player.x == this.viscol*50-1
        && this.player.y == this.visrow*50-5) {
        return true;
      }
      else if (Math.abs(this.visrow*50-5 - this.player.y) < 4
      && Math.abs(this.viscol*50-1 - this.player.x) < 4) {
        this.player.x = this.viscol*50-1;
        this.player.y = this.visrow*50-5;
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
      } else if(nextEvent == "wkUp") {
        this.changePosition("wkUp");
        this.setVisCR([this.viscol,this.visrow-1]);
      } else if(nextEvent == "wkDown") {
        this.changePosition("wkDown");
        this.setVisCR([this.viscol,this.visrow+1]);
      } else if(nextEvent == "shRight") {
        this.changePosition("shRight");
        this.isShielding=true;
        //this.setVisCR([this.viscol,this.visrow]);
      } else if(nextEvent == "shLeft") {
        this.changePosition("shLeft");
        this.isShielding=true;
        //this.setVisCR([this.viscol,this.visrow]);
      } else if(nextEvent == "shUp") {
        this.changePosition("shUp");
        this.isShielding=true;
        //this.setVisCR([this.viscol,this.visrow]);
      } else if(nextEvent == "shDown") {
        this.changePosition("shDown");
        this.isShielding=true;
        //this.setVisCR([this.viscol,this.visrow]);
      }
      //console.log([this.viscol,this.visrow]);
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
      }  else if(nextEvent == "wkUp") {
        if(!LEVEL_MAP.tileOccupied([this.col,this.row-1])
          && LEVEL_MAP.tileWalkable([this.col,this.row-1])) {
          this.setCR([this.col,this.row-1]);
          this.setCurrent("fcUp");
          return "wkUp";
        }
        else {
          this.setCurrent("fcUp");
          return "fcUp";
        }
      }  else if(nextEvent == "wkDown") {
        if(!LEVEL_MAP.tileOccupied([this.col,this.row+1])
          && LEVEL_MAP.tileWalkable([this.col,this.row+1])) {
          this.setCR([this.col,this.row+1]);
          this.setCurrent("fcDown");
          return "wkDown";
        }
        else {
          this.setCurrent("fcDown");
          return "fcDown";
        }
//----------------SHIELD--------------------//
      } else if(nextEvent == "shRight") {
          this.setCR([this.col,this.row]);
          this.setCurrent("fcRight");
          this.isShielding=false;
          return "shRight";
      } else if(nextEvent == "shLeft") {
          this.setCR([this.col,this.row]);
          this.setCurrent("fcLeft");
          this.isShielding=false;
          return "shLeft";
      }  else if(nextEvent == "shUp") {
          this.setCR([this.col,this.row-1]);
          this.setCurrent("fcUp");
          this.isShielding=false;
          return "shUp";
      }  else if(nextEvent == "shDown") {
          this.setCR([this.col,this.row+1]);
          this.setCurrent("fcDown");
          this.isShielding=false;
          return "shDown";
      }
    }

    this.setCR([this.col,this.row]);
  };

//---------BIT_ENTITY CODE-----------------//

  function BitEntity(col, row, current) {
    this.health = 1;
    this.hasAttacked = false;

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
    this.bit.x = this.col*52.5;
    this.bit.y = this.row*55-5;

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
      if (this.viscol*50-1 - this.bit.x > 3) {
        this.bit.x = this.bit.x + 3;
      }
      else if (this.viscol*50-1 - this.bit.x < -3) {
        this.bit.x = this.bit.x - 3;
      }
      if (this.visrow*50-5 - this.bit.y > 3) {
        this.bit.y = this.bit.y + 3;
      }
      else if (this.visrow*50-5 - this.bit.y < -3) {
        this.bit.y = this.bit.y - 3;
      }
    }

    this.updateGraphics = function(name) {
      if (this.col == PLAYER.col|| this.row == PLAYER.row) {
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
            //TODO: spawn bit beam
            if(!this.hasAttacked) {
              this.bitAttack([this.col,this.row]);
              that.hasAttacked = true;
            }
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
//----------BIT_ATTACK------------//
    function bitAttack(cr) {
      this.col = cr[0]-1;
      this.row = cr[1];
      this.beam = new createjs.Sprite(BEAM_SHEET, "idle");
      STAGE.addChild(this.beam);
      this.beam.x = this.col*52.5;
      this.beam.y = this.row*55-5;

      this.setCR = function(cr) {
        LEVEL_MAP.unoccupy([this.col, this.row]);
        this.col = cr[0];
        this.row = cr[1];
        LEVEL_MAP.occupy(cr, this.beam);
      }
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

//----------------SWORD_ENTITY----------------//
function SwordEntity(col, row, current) {
  // Game Logc
  this.col = col;
  this.row = row;
  this.current = current;

  // Animation
  this.viscol = col;
  this.visrow = row;
  this.animation = current;
  this.sword = new createjs.Sprite(SWORD_SHEET, this.current);
  STAGE.addChild(this.sword);
  this.sword.x = this.col*50;
  this.sword.y = this.row*55-5;

  this.setCR = function(cr) {
    LEVEL_MAP.unoccupy([this.col, this.row]);
    this.col = cr[0];
    this.row = cr[1];
    LEVEL_MAP.occupy(cr, this.sword);
  }

  this.setVisCR = function(cr) {
    this.viscol = cr[0];
    this.visrow = cr[1];
  }

  // ANIMATION

  this.nextXY = function() {
    if (this.viscol*50-1 - this.sword.x > 3) {
      this.sword.x = this.sword.x + 3;
    }
    else if (this.viscol*50-1 - this.sword.x < -3) {
      this.sword.x = this.sword.x - 3;
    }
    if (this.visrow*50-5 - this.sword.y > 3) {
      this.sword.y = this.sword.y + 3;
    }
    else if (this.visrow*50-5 - this.sword.y < -3) {
      this.sword.y = this.sword.y - 3;
    }
  }

  this.updateGraphics = function(name) {
    if(!name==undefined){
      this.changePosition(name);
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
    this.sword.gotoAndPlay(pos);
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
    return [this.sword.x, this.sword.y];
  }

  this.getX = function() {
    return this.sword.x;
  }

  this.getY = function() {
    return this.sword.y;
  }

  this.getBit = function() {
    return this.sword;
  }

  this.setCurrent = function(pos) {
    this.current = pos;
  }

  this.processInput = function(e) {

  }

  this.setCR([this.col,this.row]);
};
