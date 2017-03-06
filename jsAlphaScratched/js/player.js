var playerclass = function (cr, map, stage, characterSheet) {
  this.col = cr[0];
  this.row = cr[1];
  this.map = map;
  this.map.occupy([this.col, this.row], this);
  this.stage = stage;
  this.position = "fcRight";
  this.character = new createjs.Sprite(characterSheet, this.position);
  this.stage.addChild(this.character);

  // Setting up locations
  this.setCR = function(cr) {
    this.map.unoccupy([this.col, this.row]);
    this.col = cr[0];
    this.row = cr[1];
    this.map.occupy(cr, this);
    this.setXY();
  }
  this.setXY = function() {
    this.character.x = this.col*40 - 1;
    this.character.y = this.row*40 - 5;
  }

  // Movement
  this.changePosition = function(pos) {
    if(this.position != pos) {
      this.character.gotoAndPlay(pos);
      var temp = Math.floor((pos - this.position)/5);
      //Need to implement code for ticking to update XY; maybe do translations
      this.changePosition(pos);
    } else {
      this.character.gotoAndPlay(pos); //how to store facing direction?
    }
    //this.position = pos;
    this.stage.update();


  }
  this.moveRight = function() {
    if (this.map.tileOccupied([this.col+1, this.row]) == false && this.map.tileWalkable([this.col+1, this.row])) {
      this.setCR([this.col+1, this.row]);
    }
    this.changePosition("wkRight");
  }
  this.moveLeft = function() {
    if (this.map.tileOccupied([this.col-1, this.row]) == false && this.map.tileWalkable([this.col-1, this.row])) {
      this.setCR([this.col-1, this.row]);
    }
    this.changePosition("wkLeft");
  }
  this.moveUp = function() {
    if (this.map.tileOccupied([this.col, this.row-1]) == false && this.map.tileWalkable([this.col, this.row-1])) {
      this.setCR([this.col, this.row-1]);
    }
    this.changePosition("wkBackward");
  }
  this.moveDown = function() {
    if (this.map.tileOccupied([this.col, this.row+1]) == false && this.map.tileWalkable([this.col, this.row+1])) {
      this.setCR([this.col, this.row+1]);
    }
    this.changePosition("wkForward");
  }

  this.setXY();

  // Return Functions
  this.getLocation = function() {return [this.col, this.row]};
}
