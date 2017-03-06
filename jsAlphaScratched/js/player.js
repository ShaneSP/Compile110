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
  this.moveRight = function() {
    if (this.map.tileOccupied([this.col+1, this.row]) == false && this.map.tileWalkable([this.col+1, this.row])) {
      this.setCR([this.col+1, this.row]);
    }
  }


  this.setXY();

  // Return Functions
  this.getLocation = function() {return [this.col, this.row]};
}