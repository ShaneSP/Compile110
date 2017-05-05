var map = function(maplayout, stage, background, tileSheet) {
  this.mapTiles = {};
  this.stage = stage;
  background = new createjs.Sprite(background);
  tiles = new createjs.Sprite(tileSheet, "shine");

  // Initialization
  var row, col, tileClone, tileIndex, definTile;

  var board = new createjs.Container;
  board.x = 0;
  board.y = 0;
  this.stage.addChild(background);
  this.stage.addChild(board);

  this.mapWidth = maplayout[0].length;
  this.mapHeight = maplayout.length;

  defineTile = {
    walkable: function (col, row) {
      if (maplayout[col][row] == 0) {
        return false;
      } else {
        return true;
      }
    }
  };

  tileIndex = 0;

  for(row = 0; row < this.mapHeight; row++) {
    for(col = 0; col < this.mapWidth; col++) {
      tileClone = tiles.clone();
      tileClone.name = "t_" + row + "_" + col;
      // gotoAndStop/gotoAndPlay changes which tile it is; remember this for animations
      tileClone.x = col * 50;
      tileClone.y = row * 50;
      this.mapTiles["t_" + row + "_" + col] = {
        index: tileIndex,
        walkable: defineTile.walkable(row, col),
        occupied: false,
        tile: tileClone
      };
      tileIndex++;
      board.addChild(tileClone);
      if (defineTile.walkable(row, col)) {
        tileClone.gotoAndPlay("wait");
      } else {
        tileClone.gotoAndPlay("noshine");
      }
    }
  }

  // Movement on board
  this.occupy = function(cr, entity) {
    this.getTile(cr).occupied = entity;
  }
  this.unoccupy = function(cr) {
    this.getTile(cr).occupied = false;
  }

  // Return functions
  this.getTile = function(cr){
    return this.mapTiles["t_" + cr[1] + "_" + cr[0]];
  }
  this.tileWalkable = function(cr) {
    if (this.getTile(cr)==undefined) {
      return false;
    }
    return this.getTile(cr).walkable;
  }
  this.tileOccupied = function(cr) {
    if (this.getTile(cr)==undefined) {
      return false;
    }
    return this.getTile(cr).occupied;
  }
}
