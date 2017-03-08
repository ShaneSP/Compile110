var monsterclass = function (cr, map, stage, bitSheet, player) {
  this.col = cr[0];
  this.row = cr[1];
  this.map = map;
  this.map.occupy([this.col, this.row], this);
  this.stage = stage;
  this.position = "idle";
  this.finalx = this.col*40 - 1;
  this.finaly = this.row*40 - 5;
  this.character = new createjs.Sprite(bitSheet, this.position);
  this.character.x = this.col*42 - 1;
  this.character.y = this.row*45 - 5;
  this.agrocount = 0;
  this.stage.addChild(this.character);

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

this.tick = function() {
  //sorry for stupid if-statement
  // if((player.col == this.col - 1 && player.row == this.row - 1)
  // || (player.col == this.col - 1 && player.row == this.row + 1)
  // || (player.col == this.col && player.row == this.row + 1)
  // || (player.col == this.col && player.row == this.row - 1)
  // || (player.col == this.col - 1 && player.row == this.row)){
  //   bit.changePosition("agro");
  // }
  if ((player.col == this.col - 1 && player.row == this.row - 1)
  || (player.col == this.col - 1 && player.row == this.row + 1)
  || (player.col == this.col && player.row == this.row + 1)
  || (player.col == this.col && player.row == this.row - 1)
  || (player.col == this.col - 1 && player.row == this.row)) {
    if (this.position == "idle") {
      this.agrocount = this.agrocount + 1;
      if (this.agrocount > 3) {
        this.changePosition("agro");
      }
    }
    else if (this.position == "agro") {
      this.agrocount = this.agrocount + 1;
      if (this.agrocount > 21) {
        this.changePosition("charge");
        this.agrocount = 0;
      }
    }
    else if (this.position == "charge") {
      this.agrocount = this.agrocount + 1;
      if (this.agrocount > 6) {
        this.changePosition("idle");
        this.agrocount = 0;
      }
    }
  }
  else if (this.position != "idle"){
    this.changePosition("idle");
    this.agrocount = 0;
  }
}

this.changePosition = function(pos) {
  this.position = pos;
  this.character.gotoAndPlay(pos);
}

this.setXY();

}
