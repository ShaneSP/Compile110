/*
* 2 TODO
*/

function GameEntity(cr, map, type, name="") {
  this.cr = cr;
  switch(type) {
    case 'player' : return new PlayerEntity(this.cr[0], this.cr[1], "fcRight");
    break;

    case 'bit' : return new BitEntity(this.cr[0], this.cr[1], "idle", name);
    break;

    case 'sword' : return new SwordEntity(this.cr[0], this.cr[1], "idle");
    break;

    case 'portal' : return new PortalEntity(this.cr[0], this.cr[1], "idle");
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
    this.name = "player";
    this.isShielding = false;
    this.hasSword = false;

    // Game Logc
    this.col = col;
    this.row = row;
    this.health = 5;
    this.current = current;

    // Animation
    this.viscol = col;
    this.visrow = row;
    this.vishealth = this.health;
    this.animation = current;
    this.facing = "Right";
    this.player = new createjs.Sprite(PLAYER_SHEET, this.current);
    this.player.framerate = .5;
    CURRENT_STAGE.addChild(this.player);
    this.player.x = this.col*50-12;
    this.player.y = this.row*50-15;
    this.removed = false;

    this.getHealth = function() {
      return this.vishealth;
    }

    this.setCR = function(cr) {
      CURRENT_MAP.unoccupy([this.col, this.row]);
      this.col = cr[0];
      this.row = cr[1];
      CURRENT_MAP.occupy(cr, this.player);
    }

    this.setVisCR = function(cr) {
      this.viscol = cr[0];
      this.visrow = cr[1];
    }

    // ANIMATION

    this.nextXY = function() {
      if (this.viscol*50-12 - this.player.x > 3) {
        this.player.x = this.player.x + 3;
      }
      else if (this.viscol*50-12 - this.player.x < -3) {
        this.player.x = this.player.x - 3;
      }
      if (this.visrow*50-15 - this.player.y > 3) {
        this.player.y = this.player.y + 3;
      }
      else if (this.visrow*50-15 - this.player.y < -3) {
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
      return this.movementDone() && this.shieldDone() && this.hurtDone() && this.deathDone() && this.attackDone();
    }

    this.movementDone = function() {
      if (this.player.x == this.viscol*50-12
        && this.player.y == this.visrow*50-15) {
        return true;
      }
      else if (Math.abs(this.visrow*50-15 - this.player.y) < 4
      && Math.abs(this.viscol*50-12 - this.player.x) < 4) {
        this.player.x = this.viscol*50-12;
        this.player.y = this.visrow*50-15;
        this.changePosition("fc" + this.animation.substring(2, 10));
        return true;
      }
      return false;
    }

    this.shieldDone = function() {
      if (this.isShielding) {
        if (this.animation.substring(this.animation.length-3) == "Ani") {
          if (this.player.currentAnimationFrame == 6) {
              this.changePosition(this.animation.substring(0,this.animation.length-3) + "Done");
              return true;
            }
          else {
            return false;
          }
        }
      }
      return true;
    }

    this.deathDone = function() {
      if(this.vishealth <= 0) {
        if(this.player.currentAnimationFrame >= 14){
          this.remove();
          return true;
        }
        return false;
      }
      return true;
    }

    this.hurtDone = function() {
      if(this.animation.substring(0, 4) == "hurt") {
        if(this.player.currentAnimationFrame >= 10){
          this.changePosition("fc" + this.facing);
          return true;
        }
        return false;
      }
      return true;
    }

    this.attackDone = function() {
      if(this.animation.substring(0,6) == "attack") {
        if(this.player.currentAnimationFrame >= 25){
          this.changePosition("fc" + this.facing);
          return true;
        }
        return false;
      }
      return true;
    }

    this.remove = function() {
        this.removed =true;
        CURRENT_MAP.unoccupy([this.col,this.row]);
        loc = GAME_ENTITIES.lastIndexOf(PLAYER);
        GAME_ENTITIES.splice(loc, 1);
        CURRENT_STAGE.removeChild(this.player);
    }

    this.changePosition = function(pos) {
      this.animation = pos;
      this.player.gotoAndPlay(pos);
    }

    this.processAnimation = function(e) {
      var nextEvent = e;
      if(nextEvent == "wkRight") {
        this.facing = "Right";
        this.changePosition("wkRight");
        this.setVisCR([this.viscol+1,this.visrow]);
      } else if(nextEvent == "wkLeft") {
        this.facing = "Left";
        this.changePosition("wkLeft");
        this.setVisCR([this.viscol-1,this.visrow]);
      } else if(nextEvent == "wkUp") {
        this.facing = "Up";
        this.changePosition("wkUp");
        this.setVisCR([this.viscol,this.visrow-1]);
      } else if(nextEvent == "wkDown") {
        this.facing = "Down";
        this.changePosition("wkDown");
        this.setVisCR([this.viscol,this.visrow+1]);
      } else if(nextEvent == "shRight") {
        this.facing = "Right";
        this.changePosition("shRightAni");
      } else if(nextEvent == "shLeft") {
        this.facing = "Left";
        this.changePosition("shLeftAni");
      } else if(nextEvent == "shUp") {
        this.facing = "Up";
        this.changePosition("shUpAni");
      } else if(nextEvent == "shDown") {
        this.facing = "Down";
        this.changePosition("shDownAni");
      } else if(nextEvent == "attackDown") {
        this.facing = "Down";
        this.changePosition("attackDown");
      } else if(nextEvent == "attackRight") {
        this.facing = "Right";
        this.changePosition("attackRight");
      } else if(nextEvent == "attackLeft") {
        this.facing = "Left";
        this.changePosition("attackLeft");
      } else if(nextEvent == "attackUp") {
        this.facing = "Up";
        this.changePosition("attackUp");
      } else if(nextEvent == "fcDown") {
        this.facing = "Down";
        this.changePosition("fcDown");
      } else if(nextEvent == "fcRight") {
        this.facing = "Right";
        this.changePosition("fcRight");
      } else if(nextEvent == "fcLeft") {
        this.facing = "Left";
        this.changePosition("fcLeft");
      } else if(nextEvent == "fcUp") {
        this.facing = "Up";
        this.changePosition("fcUp");
      } else if(nextEvent == "bumpDown") {
        playBump();
        this.facing = "Down";
        this.changePosition("fcDown");
      } else if(nextEvent == "bumpRight") {
        playBump();
        this.facing = "Right";
        this.changePosition("fcRight");
      } else if(nextEvent == "bumpLeft") {
        playBump();
        this.facing = "Left";
        this.changePosition("fcLeft");
      } else if(nextEvent == "bumpUp") {
        playBump();
        this.facing = "Up";
        this.changePosition("fcUp");
      } else if(nextEvent == "hurt") {
        this.hurt();
      } else if(nextEvent == "die") {
        this.die();
      } else if(nextEvent == "pickUpSword") {
        MODEL.entityRemoved.notify();
      }
    }

    // GAME LOGIC
    this.getXY = function(){return [this.player.x, this.player.y];}

    this.getX = function() {return this.player.x;}

    this.getY = function() {return this.player.y;}

    this.getPlayer = function() {return this.player;}

    this.setCurrent = function(pos) {this.current = pos;}

    this.hurt = function() {
      this.player.x = this.viscol*50-10;
      this.player.y = this.visrow*50-15;
      if (this.movementDone()) {
        this.changePosition("hurt" + this.facing);
      }
      this.vishealth--;
    }

    this.die = function() {
      this.player.x = this.viscol*50-10;
      this.player.y = this.visrow*50-15;
      if (this.movementDone()) {
        this.changePosition("die" + this.facing);
      }
      this.vishealth--;
    }

    this.loseHealth = function () {
      this.health--;
      if(this.health > 0) {
        return "hurt";
      } else {
        return "die";
      }
    }

    this.processInput = function(e) {
      var nextEvent = e;
      if(nextEvent == "wkRight") {
        if(!CURRENT_MAP.tileOccupied([this.col+1,this.row])
          && CURRENT_MAP.tileWalkable([this.col+1,this.row])) {
          this.setCR([this.col+1,this.row]);
          this.setCurrent("fcRight");
          this.isShielding = false;
          return "wkRight";
        }
        else {
          this.setCurrent("fcRight");
          this.isShielding = false;
          return "bumpRight";
        }
      } else if(nextEvent == "wkLeft") {
        if(!CURRENT_MAP.tileOccupied([this.col-1,this.row])
          && CURRENT_MAP.tileWalkable([this.col-1,this.row])) {
          this.setCR([this.col-1,this.row]);
          this.setCurrent("fcLeft");
          this.isShielding = false;
          return "wkLeft";
        }
        else {
          this.setCurrent("fcLeft");
          this.isShielding = false;
          return "bumpLeft";
        }
      } else if(nextEvent == "wkUp") {
        if(!CURRENT_MAP.tileOccupied([this.col,this.row-1])
          && CURRENT_MAP.tileWalkable([this.col,this.row-1])) {
          this.setCR([this.col,this.row-1]);
          this.setCurrent("fcUp");
          this.isShielding = false;
          return "wkUp";
        }
        else {
          this.setCurrent("fcUp");
          this.isShielding = false;
          return "bumpUp";
        }
      } else if(nextEvent == "wkDown") {
        if(!CURRENT_MAP.tileOccupied([this.col,this.row+1])
          && CURRENT_MAP.tileWalkable([this.col,this.row+1])) {
          this.setCR([this.col,this.row+1]);
          this.setCurrent("fcDown");
          this.isShielding = false;
          return "wkDown";
        }
        else {
          this.setCurrent("fcDown");
          this.isShielding = false;
          return "bumpDown";
        }

      } else if(nextEvent == "attackUp") {
        if(PLAYER.hasSword) {
          this.setCR([this.col,this.row]);
          this.setCurrent("fcUp");
          this.isShielding = false;
          return "attackUp";
        }
        else {
          this.setCurrent("fcUp");
          this.isShielding=false;
          return "fcUp";
        }
      } else if(nextEvent == "attackDown" && PLAYER.hasSword) {
        if(PLAYER.hasSword) {
          this.setCR([this.col,this.row]);
          this.setCurrent("fcDown");
          this.isShielding = false;
          return "attackDown";
        }
        else {
          this.setCurrent("fcDown");
          this.isShielding=false;
          return "fcDown";
        }
      } else if(nextEvent == "attackLeft" && PLAYER.hasSword) {
        if(PLAYER.hasSword) {
          this.setCR([this.col,this.row]);
          this.setCurrent("fcLeft");
          this.isShielding = false;
          return "attackLeft";
        }
        else {
          this.setCurrent("fcLeft");
          this.isShielding = false;
          return "fcLeft";
        }
      } else if(nextEvent == "attackRight" && PLAYER.hasSword) {
        if(PLAYER.hasSword) {
          this.setCR([this.col,this.row]);
          this.setCurrent("fcRight");
          this.isShielding = false;
          return "attackRight";
        }
        else {
          this.setCurrent("fcRight");
          this.isShielding = false;
          return "fcRight";
        }
//----------------SHIELD--------------------//
      } else if(nextEvent == "shRight") {
          this.setCR([this.col,this.row]);
          this.setCurrent("shRightDone");
          this.isShielding=true;
          return "shRight";
      } else if(nextEvent == "shLeft") {
          this.setCR([this.col,this.row]);
          this.setCurrent("shLeftDone");
          this.isShielding=true;
          return "shLeft";
      } else if(nextEvent == "shUp") {
          this.setCR([this.col,this.row-1]);
          this.setCurrent("shUpDone");
          this.isShielding=true;
          return "shUp";
      } else if(nextEvent == "shDown") {
          this.setCR([this.col,this.row+1]);
          this.setCurrent("shDownDone");
          this.isShielding=true;
          return "shDown";
//----------------PICK UP-------------------//
      } else if(nextEvent == "pickUpSword") {
        return "pickUpSword";
      }
    }

    this.setCR([this.col,this.row]);
  };

//---------BIT_ENTITY CODE-----------------//

  function BitEntity(col, row, current, name) {
    this.health = 1;
    this.name = name;
    this.hasAttacked = false;
    this.beam = null;

    // Game Logc
    this.col = col;
    this.row = row;
    this.current = current;
    this.agrocount = 0;
    // this.spawned = true;
    this.removed = false;

    // Animation
    this.spawn = function() {
      if(!this.spawned) {
        this.viscol = col;
        this.visrow = row;
        this.animation = current;
        this.bit = new createjs.Sprite(BIT_SHEET, this.current);
        CURRENT_STAGE.addChild(this.bit);
        this.setCR([this.col, this.row]);
        this.bit.x = this.col*50 + 20;
        this.bit.y = this.row*50 + 25;
        this.spawned = true;
      }
    }

    this.getHealth = function() {
      return this.health;
    }

    this.setCR = function(cr) {
      CURRENT_MAP.unoccupy([this.col, this.row]);
      this.col = cr[0];
      this.row = cr[1];
      CURRENT_MAP.occupy(cr, this.bit);
    }

    // ANIMATION

    this.updateGraphics = function(name) {
      if(!this.spawned) {
        if(SPAWN) {
          this.spawn();
        }
        return;
      }
    };

    this.processAnimation = function(e) {
      var nextEvent = e;
      if(nextEvent == "shootRight" || nextEvent == "shootLeft" || nextEvent == "shootUp" || nextEvent == "shootDown") {
        this.changePosition("charge")
      } else if(nextEvent == "idle") {
        this.changeIdle();
      } else if(nextEvent == "die") {
        this.health--;
        this.die();
      }
    }

    this.die = function() {
      this.changePosition("die");
    }

    this.charge = function() {
      this.changePosition("charge");
    }

    this.changePosition = function(pos) {
      this.animation = pos;
      this.bit.gotoAndPlay(pos);
    }

    this.remove = function() {
      console.log("remove called");
      this.removed =true;
      CURRENT_MAP.unoccupy([this.col,this.row]);
      loc = GAME_ENTITIES.lastIndexOf(BIT);
      GAME_ENTITIES.splice(loc, 1);
      CURRENT_STAGE.removeChild(BIT.bit);
    }

    this.changeIdle = function() {
      if (this.inRange([PLAYER.col, PLAYER.row])) {
        this.changePosition("agro");
      }
      else {
        this.changePosition("idle");
      }
    }

    // Will also do non-movement animation
    this.animationDone = function() {
      if(!this.spawned) {
        return true;
      }
      return this.chargeDone() && this.deathDone();
    }

    this.chargeDone = function() {
      if (this.bit.currentAnimation == "charge" && this.agrocount > 10) {
        this.agrocount = 0;
        this.changeIdle();
        return true;
      }
      else if (this.bit.currentAnimation == "charge") {
        this.agrocount++;
        return false;
      }
      return true;
    }

    this.deathDone = function() {
      if(this.health <=0) {
        if(this.bit.currentAnimationFrame >= 8){
          this.remove();
          return true;
        }
        return false;
      }
      return true;
    }

    // GAME LOGIC
    this.getXY = function(){return [this.bit.x, this.bit.y];}

    this.getX = function() {return this.bit.x;}

    this.getY = function() {return this.bit.y;}

    this.getBit = function() {return this.bit;}

    this.setCurrent = function(pos) {this.current = pos;}

    this.turn = function() {
      if(this.inRange([PLAYER.col, PLAYER.row]) && ATTACK) {
        MODEL.inputEvent.notify([this.name, this.inRange([PLAYER.col, PLAYER.row])]);
      } else {
        MODEL.inputEvent.notify([this.name, "idle"]);
      }
    }

    // delete this function and have a set interval that the bit attacks in a certain direction
    // JK WE'RE KEEPING THIS.
    this.inRange = function(cr) {
      var c = cr[0];
      var r = cr[1];
      var d = this.col - c;
      var s = this.row - r;
      if (this.row == r && Math.abs(d) <= BIT_RANGE) {
        if (d > 0) {
          return "shootLeft";
        }
        else {
          return "shootRight";
        }
      }
      else if (this.col == c && Math.abs(s) <= BIT_RANGE) {
        if (s > 0) {
          return "shootUp";
        }
        else {
          return "shootDown";
        }
      }
      return false;
    }

    this.processInput = function(e) {
      if(this.spawned) {
        var nextEvent = e;
        if (!this.hasAttacked) {
          if (nextEvent == "shootLeft") {
            this.hasAttacked = true;
            if (this.inRange([PLAYER.col, PLAYER.row]) == "shootLeft") {
              var direction = [-1, 0];
              var endloc = [PLAYER.col, PLAYER.row];
              if (PLAYER.current == "shRightDone") {
                BEAM = new bitAttack([this.col, this.row], direction, endloc);
                GAME_ENTITIES[GAME_ENTITIES.length] = BEAM;
                return [[this.name, "shootLeft"], ["beam", "bounce"], [this.name, "die"]];
              }
              else {
                BEAM = new bitAttack([this.col, this.row], direction, endloc);
                GAME_ENTITIES[GAME_ENTITIES.length] = BEAM;
                var playeranimation = PLAYER.loseHealth();
                return [[this.name, "shootLeft"], ["beam", "hit"], ["player", playeranimation]];
              }
            }
          }
          else if (nextEvent == "shootRight") {
            this.hasAttacked = true;
            if (this.inRange([PLAYER.col, PLAYER.row]) == "shootRight") {
              var direction = [1, 0];
              var endloc = [PLAYER.col, PLAYER.row];
              if (PLAYER.current == "shLeftDone") {
                BEAM = new bitAttack([this.col, this.row], direction, endloc);
                GAME_ENTITIES[GAME_ENTITIES.length] = BEAM;
                return [[this.name, "shootRight"], ["beam", "bounce"], [this.name, "die"]];
              }
              else {
                BEAM = new bitAttack([this.col, this.row], direction, endloc);
                GAME_ENTITIES[GAME_ENTITIES.length] = BEAM;
                var playeranimation = PLAYER.loseHealth();
                return [[this.name, "shootRight"], ["beam", "hit"], ["player", playeranimation]];
              }
            }
          }
          else if (nextEvent == "shootUp") {
            this.hasAttacked = true;
            if (this.inRange([PLAYER.col, PLAYER.row]) == "shootUp") {
              var direction = [0, -1];
              var endloc = [PLAYER.col, PLAYER.row];
              if (PLAYER.current == "shDownDone") {
                BEAM = new bitAttack([this.col, this.row], direction, endloc);
                GAME_ENTITIES[GAME_ENTITIES.length] = BEAM;
                return [[this.name, "shootUp"], ["beam", "bounce"], [this.name, "die"]];
              }
              else {
                BEAM = new bitAttack([this.col, this.row], direction, endloc);
                GAME_ENTITIES[GAME_ENTITIES.length] = BEAM;
                var playeranimation = PLAYER.loseHealth();
                return [[this.name, "shootUp"], ["beam", "hit"], ["player", playeranimation]];
              }
            }
          }
          else if (nextEvent == "shootDown") {
            this.hasAttacked = true;
            if (this.inRange([PLAYER.col, PLAYER.row]) == "shootDown") {
              var direction = [0, 1];
              var endloc = [PLAYER.col, PLAYER.row];
              if (PLAYER.current == "shUpDone") {
                BEAM = new bitAttack([this.col, this.row], direction, endloc);
                GAME_ENTITIES[GAME_ENTITIES.length] = BEAM;
                return [[this.name, "shootDown"], ["beam", "bounce"], [this.name, "die"]];
              }
              else {
                BEAM = new bitAttack([this.col, this.row], direction, endloc);
                GAME_ENTITIES[GAME_ENTITIES.length] = BEAM;
                var playeranimation = PLAYER.loseHealth();
                return [[this.name, "shootDown"], ["beam", "hit"], ["player", playeranimation]];
              }
            }
          }
        }
        else if (nextEvent == "attackRight") {
          if(PLAYER.col==this.col-1 && PLAYER.row==this.row) {
            return "die";
          }
        }
        else if (nextEvent == "attackLeft") {
          if(PLAYER.col==this.col+1 && PLAYER.row==this.row) {
            return "die";
          }
        }
        else if (nextEvent == "attackDown") {
          if(PLAYER.col==this.col && PLAYER.row==this.row-1) {
            return "die";
          }
        }
        else if (nextEvent == "attackUp") {
          if(PLAYER.col==this.col && PLAYER.row==this.row+1) {
            return "die";
          }
        }
        else if (nextEvent == "idle") {
          return [this.name, "idle"];
        }
      }
    }

    this.setCR([this.col,this.row]);
  };

//----------BIT_ATTACK------------//

this.bitAttack = function(cr, direction=[-1,0], endloc=cr) {
  this.name = "beam";
  this.col = cr[0] + direction[0];
  this.row = cr[1] + direction[1];
  this.bspeed = 5;
  this.bounced = false;
  this.hit = false;
  this.endloc = endloc;
  this.bounce = false;
  this.bitloc = cr;
  this.direction = direction;
  this.spawned = false;

  this.spawn = function() {
    this.beam = new createjs.Sprite(BEAM_SHEET, "idle");
    CURRENT_STAGE.addChild(this.beam);
    this.beam.x = this.col*50-10 - direction[0]*15;
    this.beam.y = this.row*50-10 - direction[1]*15;
    this.spawned = true;
  }

  this.setbCR = function(cr) {
    this.col = cr[0];
    this.row = cr[1];
  }

  this.changePosition = function(pos) {
    this.animation = pos;
    this.beam.gotoAndPlay(pos);
  }

  this.nextXY = function() {
    if (this.col*50-10 - this.beam.x > 10) {
      this.beam.x = this.beam.x + this.bspeed;
    }
    else if (this.col*50-10 - this.beam.x < -10) {
      this.beam.x = this.beam.x - this.bspeed;
    }
    if (this.row*50-10 - this.beam.y > 10) {
      this.beam.y = this.beam.y + this.bspeed;
    }
    else if (this.row*50-10 - this.beam.y < -10) {
      this.beam.y = this.beam.y - this.bspeed;
    }
    if (Math.abs(this.beam.x - (this.endloc[0]*50-10)) < 30 && Math.abs(this.beam.y - (this.endloc[1]*50-10) < 30)) {
      if (this.bounce == true) {
        this.bounced = true;
      } else {
        this.remove();
      }
    }
    else if (Math.abs(BIT.bit.x - this.beam.x) < 50 && Math.abs(BIT.bit.y - this.beam.y) < 50 && this.bounced) {
      this.remove();
    }
    // if(this.beam.x - PLAYER.player.x < 40 & PLAYER.isShielding){
    //   this.bounced = true;
    // }
    // if(!this.hit && !this.bounced && this.beam.x - PLAYER.player.x < 40) {
    //   this.remove();
    // } else if(!this.hit && this.bounced && BIT.bit.x - this.beam.x < 60) {
    //   this.remove();
    // }
  }

  this.animationDone = function() {
    if (this.spawned == false) {
      return true;
    } else if (this.removed == true) {
      return true;
    }
    return false;
  }

  this.remove = function() {
    console.log("beam removed?");
    var loc = GAME_ENTITIES.lastIndexOf(BEAM);
    GAME_ENTITIES.splice(loc,1);
    CURRENT_STAGE.removeChild(BEAM.beam);
    this.removed = true;
  }

  this.processAnimation = function(e) {
    var nextEvent = e;
    if (nextEvent == "bounce") {
      this.spawn();
      this.bounce = true;
    } else if (nextEvent == "hit") {
      this.spawn();
      this.bounce = false;
    }
  }

  this.processInput = function(e) {}

  this.updateGraphics = function() {
    if(this.spawned) {
      if(!this.bounced && (this.col != this.endloc[0] || this.row != this.endloc[1])) {
        this.setbCR([this.col+this.direction[0],this.row+this.direction[1]]);
      } else if(this.bounced && (this.col != this.bitloc[0] || this.row != this.bitloc[1])) {
          this.setbCR([this.col-this.direction[0],this.row-this.direction[1]]);
      }
      this.nextXY();
    }
  }
  this.setbCR([this.col,this.row]);
};

//----------------SWORD_ENTITY----------------//
function SwordEntity(col, row, current) {
  // Game Logc
  this.name = "sword";
  this.col = col;
  this.row = row;
  this.current = current;

  // Animation
  this.animation = current;
  this.sword = new createjs.Sprite(SWORD_SHEET, this.current);
  CURRENT_STAGE.addChild(this.sword);
  this.sword.x = this.col*50;
  this.sword.y = this.row*50;

  this.setCR = function(cr) {
    CURRENT_MAP.unoccupy([this.col, this.row]);
    this.col = cr[0];
    this.row = cr[1];
    CURRENT_MAP.occupy(cr, this.sword);
  }

  this.remove = function() {
    CURRENT_MAP.unoccupy([this.col,this.row]);
    var loc = GAME_ENTITIES.lastIndexOf(SWORD);
    GAME_ENTITIES.splice(loc,1);
    CURRENT_STAGE.removeChild(SWORD.sword);
  }

  // ANIMATION
  this.updateGraphics = function(name) {
    if(!name==undefined){
      this.changePosition(name);
    }
  }

  // Will also do non-movement animation
  this.animationDone = function() {return true;}

  this.changePosition = function(pos) {
    this.animation = pos;
    this.sword.gotoAndPlay(pos);
  }

  this.processAnimation = function(e) {}

  // GAME LOGIC

  this.getXY = function(){return [this.sword.x, this.sword.y];}

  this.getX = function() {return this.sword.x;}

  this.getY = function() {return this.sword.y;}

  this.getBit = function() {return this.sword;}

  this.setCurrent = function(pos) {this.current = pos;}

  this.processInput = function(e) {}

  this.setCR([this.col,this.row]);
};

//----------------PORTAL_ENTITY----------------//
function PortalEntity(col, row, current) {
  // Game Logc
  this.name = "portal";
  this.col = col;
  this.row = row;
  this.current = current;

  // Animation
  this.animation = current;
  this.portal = new createjs.Sprite(PORTAL_SHEET, this.current);
  CURRENT_STAGE.addChild(this.portal);
  this.portal.x = this.col*50.5;
  this.portal.y = this.row*49;

  this.setCR = function(cr) {
    //CURRENT_MAP.unoccupy([this.col, this.row]);
    this.col = cr[0];
    this.row = cr[1];
    //CURRENT_MAP.occupy(cr, this.portal);
  }

  this.remove = function() {
    //CURRENT_MAP.unoccupy([this.col,this.row]);
    var loc = GAME_ENTITIES.lastIndexOf(PORTAL);
    GAME_ENTITIES.splice(loc,1);
    CURRENT_STAGE.removeChild(PORTAL.portal);
  }

  // ANIMATION
  this.updateGraphics = function(name) {
    if(!name==undefined){
      this.changePosition(name);
    }
  }

  // Will also do non-movement animation
  this.animationDone = function() {return true;}

  this.changePosition = function(pos) {
    this.animation = pos;
    this.portal.gotoAndPlay(pos);
  }

  this.processAnimation = function(e) {}

  // GAME LOGIC

  this.getXY = function(){return [this.portal.x, this.portal.y];}

  this.getX = function() {return this.portal.x;}

  this.getY = function() {return this.portal.y;}

  this.getPortal = function() {return this.portal;}

  this.processInput = function(e) {
    if(PLAYER.hasSword && PLAYER.col == this.col && PLAYER.row==this.row) {

    } else if(!PLAYER.hasSword && PLAYER.col == this.col && PLAYER.row==this.row) {

    }
  }

  this.setCR([this.col,this.row]);
};
