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
    this.player = new createjs.Sprite(PLAYER_SHEET, this.current);
    this.player.framerate = .5;
    STAGE.addChild(this.player);
    this.player.x = this.col*50-12;
    this.player.y = this.row*50-15;
    this.removed = false;

    this.getHealth = function() {
      return this.vishealth;
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
      return this.movementDone() && this.shieldDone() && this.hurtDone() && this.deathDone();
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
      if(this.health <= 0) {
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
          this.changePosition("fc" + this.animation.substring(4));
          return true;
        }
        return false;
      }
      return true;
    }

    this.remove = function() {
        this.removed =true;
        LEVEL_MAP.unoccupy([this.col,this.row]);
        loc = GAME_ENTITIES.lastIndexOf(PLAYER);
        GAME_ENTITIES.splice(loc, 1);
        STAGE.removeChild(this.player);
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
        this.changePosition("shRightAni");
      } else if(nextEvent == "shLeft") {
        this.changePosition("shLeftAni");
      } else if(nextEvent == "shUp") {
        this.changePosition("shUpAni");
      } else if(nextEvent == "shDown") {
        this.changePosition("shDownAni");
      } else if(nextEvent == "attackDown") {
        this.changePosition("attackDown");
      } else if(nextEvent == "attackRight") {
        this.changePosition("attackRight");
      } else if(nextEvent == "attackLeft") {
        this.changePosition("attackLeft");
      } else if(nextEvent == "attackUp") {
        this.changePosition("attackUp");
      } else if(nextEvent == "fcDown") {
        this.changePosition("fcDown");
      } else if(nextEvent == "fcRight") {
        this.changePosition("fcRight");
      } else if(nextEvent == "fcLeft") {
        this.changePosition("fcLeft");
      } else if(nextEvent == "fcUp") {
        this.changePosition("fcUp");
      } else if(nextEvent == "bumpDown") {
        playBump();
        this.changePosition("fcDown");
      } else if(nextEvent == "bumpRight") {
        playBump();
        this.changePosition("fcRight");
      } else if(nextEvent == "bumpLeft") {
        playBump();
        this.changePosition("fcLeft");
      } else if(nextEvent == "bumpUp") {
        playBump();
        this.changePosition("fcUp");
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
        this.changePosition("hurtRight");
      }
    }
    this.die = function() {
      this.player.x = this.viscol*50-10;
      this.player.y = this.visrow*50-15;
      if (this.movementDone()) {
        this.changePosition("dieRight");
      }
    }

    this.loseHealth = function () {
      this.health--;
      if(this.health > 0) {
        this.hurt();
      } else {
        this.die();
      }
    }

    this.processInput = function(e) {
      var nextEvent = e;
      if(nextEvent == "wkRight") {
        if(!LEVEL_MAP.tileOccupied([this.col+1,this.row])
          && LEVEL_MAP.tileWalkable([this.col+1,this.row])) {
          this.setCR([this.col+1,this.row]);
          this.setCurrent("fcRight");
          this.isShielding=false;
          return "wkRight";
        }
        else {
          this.setCurrent("fcRight");
          this.isShielding=false;
          return "bumpRight";
        }
      } else if(nextEvent == "wkLeft") {
        if(!LEVEL_MAP.tileOccupied([this.col-1,this.row])
          && LEVEL_MAP.tileWalkable([this.col-1,this.row])) {
          this.setCR([this.col-1,this.row]);
          this.setCurrent("fcLeft");
          this.isShielding=false;
          return "wkLeft";
        }
        else {
          this.setCurrent("fcLeft");
          this.isShielding=false;
          return "bumpLeft";
        }
      }  else if(nextEvent == "wkUp") {
        if(!LEVEL_MAP.tileOccupied([this.col,this.row-1])
          && LEVEL_MAP.tileWalkable([this.col,this.row-1])) {
          this.setCR([this.col,this.row-1]);
          this.setCurrent("fcUp");
          this.isShielding=false;
          return "wkUp";
        }
        else {
          this.setCurrent("fcUp");
          this.isShielding=false;
          return "bumpUp";
        }
      }  else if(nextEvent == "wkDown") {
        if(!LEVEL_MAP.tileOccupied([this.col,this.row+1])
          && LEVEL_MAP.tileWalkable([this.col,this.row+1])) {
          this.setCR([this.col,this.row+1]);
          this.setCurrent("fcDown");
          this.isShielding=false;
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
          this.isShielding=false;
          return "attackUp";
        }
        else {
          this.setCurrent("fcUp");
          this.isShielding=false;
          return "fcUp";
        }
      }   else if(nextEvent == "attackDown" && PLAYER.hasSword) {
        if(PLAYER.hasSword) {
          this.setCR([this.col,this.row]);
          this.setCurrent("fcDown");
          this.isShielding=false;
          return "attackDown";
        }
        else {
          this.setCurrent("fcDown");
          this.isShielding=false;
          return "fcDown";
        }
      }   else if(nextEvent == "attackLeft" && PLAYER.hasSword) {
        if(PLAYER.hasSword) {
          this.setCR([this.col,this.row]);
          this.setCurrent("fcLeft");
          this.isShielding=false;
          return "attackLeft";
        }
        else {
          this.setCurrent("fcLeft");
          this.isShielding=false;
          return "fcLeft";
        }
      }   else if(nextEvent == "attackRight" && PLAYER.hasSword) {
        if(PLAYER.hasSword) {
          this.setCR([this.col,this.row]);
          this.setCurrent("fcRight");
          this.isShielding=false;
          return "attackRight";
        }
        else {
          this.setCurrent("fcRight");
          this.isShielding=false;
          return "fcRight";
        }
//----------------SHIELD--------------------//
      }  else if(nextEvent == "shRight") {
          this.setCR([this.col,this.row]);
          this.setCurrent("shRightDone");
          this.isShielding=true;
          return "shRight";
      } else if(nextEvent == "shLeft") {
          this.setCR([this.col,this.row]);
          this.setCurrent("shLeftDone");
          this.isShielding=true;
          return "shLeft";
      }  else if(nextEvent == "shUp") {
          this.setCR([this.col,this.row-1]);
          this.setCurrent("shUpDone");
          this.isShielding=true;
          return "shUp";
      }  else if(nextEvent == "shDown") {
          this.setCR([this.col,this.row+1]);
          this.setCurrent("shDownDone");
          this.isShielding=true;
          return "shDown";
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
    this.spawned = false;
    this.removed = false;

    // Animation
    this.spawn = function() {
      if(!this.spawned) {
        this.viscol = col;
        this.visrow = row;
        this.animation = current;
        this.bit = new createjs.Sprite(BIT_SHEET, this.current);
        STAGE.addChild(this.bit);
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
      LEVEL_MAP.unoccupy([this.col, this.row]);
      this.col = cr[0];
      this.row = cr[1];
      LEVEL_MAP.occupy(cr, this.bit);
    }

    // ANIMATION

    this.updateGraphics = function(name) {
      if(!this.spawned) {
        if(SPAWN) {
          this.spawn();
        }
        return;
      }
      else if (this.animation == "die") {
        if(this.deathDone()) {
          this.remove();
        }
      }
      else {
        if (!PLAYER.animationDone()) {
          this.agrocount = 0;
        }
        else if (this.inRange([PLAYER.col,PLAYER.row])) {
          if (this.animation == "idle") {
            this.agrocount = this.agrocount + 1;
            if (this.agrocount > 3) {
              if(!this.hasAttacked) {
                this.changePosition("agro");
              }
            }
          } else if (this.animation == "agro") {
            this.agrocount = this.agrocount + 1;
            if (this.agrocount > 13) {
              if(!this.hasAttacked && ATTACK) {
                this.changePosition("charge");
                MODEL.inputEvent.notify(["bit","shoot"]);
                // MODEL.inputEvent.notify(["bit",this.inRange([PLAYER.col,PLAYER.row])]);
              }
              this.agrocount = 0;
            }
          } else if (this.animation == "charge") {
            this.agrocount = this.agrocount + 1;
            if (this.agrocount > 6) {
              this.changePosition("idle");
              this.agrocount = 0;
            }
          }
        } else if (this.animation != "idle") {
          this.agrocount = 0;
          this.changePosition("idle");
        }

     }

   };


    this.processAnimation = function(e) {}

    this.die = function() {
      this.changePosition("die");
    }

    this.deathDone = function() {
      if(this.health <=0) {
        if(this.bit.currentAnimationFrame >= 8){
          return true;
        }
        return false;
      }
      return false;
    }

    this.changePosition = function(pos) {
      this.animation = pos;
      this.bit.gotoAndPlay(pos);
    }

    this.remove = function() {
        console.log("remove called");
        this.removed =true;
        LEVEL_MAP.unoccupy([this.col,this.row]);
        loc = GAME_ENTITIES.lastIndexOf(BIT);
        GAME_ENTITIES.splice(loc, 1);
        STAGE.removeChild(BIT.bit);
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

    // Will also do non-movement animation
    this.animationDone = function() {
      if(this.animation == "idle") {
        return true;
      }
      return false;
    }

    // GAME LOGIC
    this.getXY = function(){return [this.bit.x, this.bit.y];}

    this.getX = function() {return this.bit.x;}

    this.getY = function() {return this.bit.y;}

    this.getBit = function() {return this.bit;}

    this.setCurrent = function(pos) {this.current = pos;}

    this.processInput = function(e) {
      if(this.spawned) {
        var nextEvent = e;
        if(nextEvent == "shoot" && !this.hasAttacked) {
          BEAM = new bitAttack([this.col,this.row]);
          GAME_ENTITIES[GAME_ENTITIES.length] = BEAM;
          BEAM.spawn();
          this.hasAttacked = true;
        }
        else if (!this.hasAttacked) {
          if (nextEvent == "shootLeft") {
            if (this.inRange([PLAYER.col, PLAYER.row]) == "shootLeft") {
              var direction = [-1, 0];
              var endloc = [PLAYER.col, PLAYER.row];
              if (PLAYER.current == "shieldRight") {
                BEAM = new bitAttack([this.col, this.row], true, direction, endloc);
                return [[this.name, "shootLeft"], ["beam", "bounce"], [this.name, "die"]];
              }
              else {
                BEAM = new bitAttack([this.col, this.row], false, direction, endloc);
                return [[this.name, "shootLeft"], ["beam", "hit"], ["player","hurt"]];
              }
            }
          }
          else if (nextEvent == "shootRight") {
            var direction = [1, 0];
            var endloc = [PLAYER.col, PLAYER.row];
            if (this.inRange([PLAYER.col, PLAYER.row]) == "shootRight") {
              if (PLAYER.current == "shieldLeft") {
                BEAM = new bitAttack([this.col, this.row], true, direction, endloc);
                return [[this.name, "shootRight"], ["beam", "bounce"], [this.name, "die"]];
              }
              else {
                BEAM = new bitAttack([this.col, this.row], false, direction, endloc);
                return [[this.name, "shootRight"], ["beam", "hit"], ["player","hurt"]];
              }
            }
          }
          else if (nextEvent == "shootUp") {
            if (this.inRange([PLAYER.col, PLAYER.row]) == "shootUp") {
              var direction = [0, -1];
              var endloc = [PLAYER.col, PLAYER.row];
              if (PLAYER.current == "shieldDown") {
                BEAM = new bitAttack([this.col, this.row], true, direction, endloc);
                return [[this.name, "shootUp"], ["beam", "bounce"], [this.name, "die"]];
              }
              else {
                BEAM = new bitAttack([this.col, this.row], false, direction, endloc);
                return [[this.name, "shootUp"], ["beam", "hit"], ["player","hurt"]];
              }
            }
          }
          else if (nextEvent == "shootDown") {
            if (this.inRange([PLAYER.col, PLAYER.row]) == "shootDown") {
              var direction = [0, 1];
              var endloc = [PLAYER.col, PLAYER.row];
              if (PLAYER.current == "shieldUp") {
                BEAM = new bitAttack([this.col, this.row], true, direction, endloc);
                return [[this.name, "shootDown"], ["beam", "bounce"], [this.name, "die"]];
              }
              else {
                BEAM = new bitAttack([this.col, this.row], false, direction, endloc);
                return [[this.name, "shootDown"], ["beam", "hit"], ["player","hurt"]];
              }
            }
          }
        }
      }
    }

    this.setCR([this.col,this.row]);
  };

//----------BIT_ATTACK------------//

this.bitAttack = function(cr, bounce=true, direction=[-1,0], endloc=cr) {
  this.name = "beam";
  this.col = cr[0] + direction[0];
  this.row = cr[1] + direction[1];
  this.bspeed = 5;
  this.bounced = false;
  this.hit = false;
  this.bounce = bounce;
  this.direction = direction;
  this.spawned = false;

  this.spawn = function() {
    this.beam = new createjs.Sprite(BEAM_SHEET, "idle");
    STAGE.addChild(this.beam);
    this.beam.x = this.col*50;
    this.beam.y = this.row*50-10;
    this.spawned = true;
  }

  this.setbCR = function(cr) {
    LEVEL_MAP.unoccupy([this.col, this.row]);
    this.col = cr[0];
    this.row = cr[1];
    LEVEL_MAP.occupy(cr, this.beam);
  }

  this.changePosition = function(pos) {
    this.animation = pos;
    this.beam.gotoAndPlay(pos);
  }

  this.nextXY = function() {
    if (this.col*50 - this.beam.x > 10) {
      this.beam.x = this.beam.x + this.bspeed;
    }
    else if (this.col*50 - this.beam.x < -10) {
      this.beam.x = this.beam.x - this.bspeed;
    }
    if (this.row*50-10 - this.beam.y > 10) {
      this.beam.y = this.beam.y + this.bspeed;
    }
    else if (this.row*50-10 - this.beam.y < -10) {
      this.beam.y = this.beam.y - this.bspeed;
    }

    if(this.beam.x - PLAYER.player.x < 40 & PLAYER.isShielding){
      this.bounced = true;
    }
    if(!this.hit && !this.bounced && this.beam.x - PLAYER.player.x < 40) {
      PLAYER.loseHealth();
      this.hit = true;
      console.log("hits player");
      this.remove();
    } else if(!this.hit && this.bounced && BIT.bit.x - this.beam.x < 60) {
      this.hit = true;
      console.log("enemy hit");
      BEAM.remove();
      BIT.health--;
      BIT.die();
    }
  }

  this.animationDone = function() {
    return false;
  }

  this.remove = function() {
    console.log("beam removed?");
    LEVEL_MAP.unoccupy([this.col,this.row]);
    var loc = GAME_ENTITIES.lastIndexOf(BEAM);
    GAME_ENTITIES.splice(loc,1);
    STAGE.removeChild(BEAM.beam);
  }

  this.processAnimation = function(e) {

  }

  this.animationDone = function() {return true;}

  this.processInput = function(e) {}

  this.updateGraphics = function() {
      if(BEAM != undefined) {
        if(!this.bounced && Math.abs(this.col-PLAYER.col) > 0) {
            this.setbCR([this.col-1,this.row]);

        } else if(this.bounced && Math.abs(BIT.col-this.col) > 0) {
          this.setbCR([this.col+1,this.row]);

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
  STAGE.addChild(this.sword);
  this.sword.x = this.col*50;
  this.sword.y = this.row*50;

  this.setCR = function(cr) {
    LEVEL_MAP.unoccupy([this.col, this.row]);
    this.col = cr[0];
    this.row = cr[1];
    LEVEL_MAP.occupy(cr, this.sword);
  }

  this.remove = function() {
    LEVEL_MAP.unoccupy([this.col,this.row]);
    var loc = GAME_ENTITIES.lastIndexOf(SWORD);
    GAME_ENTITIES.splice(loc,1);
    STAGE.removeChild(SWORD.sword);
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
  STAGE.addChild(this.portal);
  this.portal.x = this.col*50.5;
  this.portal.y = this.row*49;

  this.setCR = function(cr) {
    //LEVEL_MAP.unoccupy([this.col, this.row]);
    this.col = cr[0];
    this.row = cr[1];
    //LEVEL_MAP.occupy(cr, this.portal);
  }

  this.remove = function() {
    //LEVEL_MAP.unoccupy([this.col,this.row]);
    var loc = GAME_ENTITIES.lastIndexOf(PORTAL);
    GAME_ENTITIES.splice(loc,1);
    STAGE.removeChild(PORTAL.portal);
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
      alert("woop woop wooooosh!");
      this.remove();
    } else if(!PLAYER.hasSword && PLAYER.col == this.col && PLAYER.row==this.row) {
      alert("get the sword dumby");
    }
  }

  this.setCR([this.col,this.row]);
};
