var playerclass = function (cr, map, stage, characterSheet) {
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
