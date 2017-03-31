var playerclass = function (cr, map, stage, characterSheet, fps) {
  this.col = cr[0];
  this.row = cr[1];
  this.map = map;
  this.map.occupy([this.col, this.row], this);
  this.stage = stage;
  this.position = "fcRight";
  this.finalx = this.col*40 - 1;
  this.finaly = this.row*40 - 5;
  this.character = new createjs.Sprite(characterSheet, this.position);
  this.character.x = this.col*40 - 1;
  this.character.y = this.row*40 - 5;
  this.stage.addChild(this.character);
  this.eventqueue = new Queue(6);
  this.currentevent = "";
  this.fps = fps;
  this.frameIdkIncrem = Math.floor(FIXED_UPDATES_IN_A_SECOND/this.fps);

  this.gameStateUpdateCount = -1;

  this.start = function() {
      this.gameStateUpdateCount = 0;
  };

  this.isOver = function() {
    if (!this.currentevent == "" && !this.eventqueue.isEmpty()) {
        //this is wrong, need to know that we've played through the whole animation
        return this.gameStateUpdateCount > this.character.currentAnimationFrame();
    }
  }

  this.onGameStateUpdate = function() {
      if(this.gameStateUpdateCount>=0) {
          this.gameStateUpdateCount++;
      }
  };

  this.onGraphicsUpdate = function(context, x, y) {
      if(this.gameStateUpdateCount>=0) {
          this.tick();
      }
  }

  // Setting up locations
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

  // Updating
  this.tick = function() {
    this.event();
    if (this.finalx - this.character.x > 3) {
      this.character.x = this.character.x + 3;
    }
    else if (this.finalx - this.character.x < -3) {
      this.character.x = this.character.x - 3;
    }
    if (this.finaly - this.character.y > 3) {
      this.character.y = this.character.y + 3;
    }
    else if (this.finaly - this.character.y < -3) {
      this.character.y = this.character.y - 3;
    }
    if (player.position[0] == "w") {
      if (Math.abs(this.finaly - this.character.y) < 4 && Math.abs(this.finalx - this.character.x) < 4) {
        this.character.y = this.finaly;
        this.character.x = this.finalx;
        player.changePosition("fc" + player.position.substring(2, 10));
        this.emptyCurrent();
      }
      else if (Math.abs(this.finaly - this.character.y) < 4) {
        this.character.y = this.finaly;
      }
      else if (Math.abs(this.finalx - this.character.x) < 4) {
        this.character.x = this.finalx;
      }
    }
  }

  this.event = function() {
    if (this.currentevent == "" && this.eventqueue.isEmpty()) {
      return "noEvent";
    }
    if(this.currentevent == "") {
      this.currentevent = this.eventqueue.pop();
      switch(this.currentevent) {
        case "moveRight":
          this.beginRight();
          break;
        case "moveLeft":
          this.beginLeft();
          break;
        case "moveUp":
          this.beginUp();
          break;
        case "moveDown":
          this.beginDown();
          break;
      }
    }
  }

  this.emptyCurrent = function() {
    this.currentevent = "";
  }

  // Movement
  this.changePosition = function(pos) {
    this.position = pos;
    this.character.gotoAndPlay(pos);
  }
  this.beginRight = function() {
    if (this.map.tileOccupied([this.col+1, this.row]) == false && this.map.tileWalkable([this.col+1, this.row])) {
      this.setCR([this.col+1, this.row]);
      this.changePosition("wkRight");
    }
    else {
      this.changePosition("fcRight");
      this.emptyCurrent();
    }
  }
  this.beginLeft = function() {
    if (this.map.tileOccupied([this.col-1, this.row]) == false && this.map.tileWalkable([this.col-1, this.row])) {
      this.setCR([this.col-1, this.row]);
      this.changePosition("wkLeft");
    }
    else {
      this.changePosition("fcLeft");
      this.emptyCurrent();
    }
  }
  this.beginUp = function() {
    if (this.map.tileOccupied([this.col, this.row-1]) == false && this.map.tileWalkable([this.col, this.row-1])) {
      this.setCR([this.col, this.row-1]);
      this.changePosition("wkBackward");
    }
    else {
      this.changePosition("fcBackward");
      this.emptyCurrent();
    }
  }
  this.beginDown = function() {
    if (this.map.tileOccupied([this.col, this.row+1]) == false && this.map.tileWalkable([this.col, this.row+1])) {
      this.setCR([this.col, this.row+1]);
      this.changePosition("wkForward");
    }
    else {
      this.changePosition("fcForward");
      this.emptyCurrent();
    }
  }
  this.moveRight = function() {
    this.eventqueue.push("moveRight");
  }
  this.moveLeft = function() {
    this.eventqueue.push("moveLeft");
  }
  this.moveUp = function() {
    this.eventqueue.push("moveUp");
  }
  this.moveDown = function() {
    this.eventqueue.push("moveDown");
  }

  // this.finishAnimation = function() {
  //   while(player.position[0] != "f") {
  //
  //   }
  // }

  this.setXY();

  // Return Functions
  this.getLocation = function() {return [this.col, this.row]};
}
