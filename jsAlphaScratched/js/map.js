var map = function(maplayout, stage, tileSheet) {
  this.mapTiles = {};
  this.stage = stage;
  tiles = new createjs.Sprite(tileSheet);

  // Initialization
  var row, col, tileClone, tileIndex, definTile;

  var board = new createjs.Container;
  board.x = 0;
  board.y = 0;
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
      var tilevalue = Math.floor(Math.random()*6);
      if (maplayout[row][col] == 0) {
        if ((col-1 < 0) && !(row-1 < 0)) {
          if (tilevalue == this.mapTiles["t_" + (row-1) + "_" + (col)].tilevalue) {
            tileClone.gotoAndStop((tilevalue+1)%7);
          }
          else {
            tileClone.gotoAndStop(tilevalue);
          }
        }
        else if (!(col-1 < 0) && (row-1 < 0)) {
          if (tilevalue == this.mapTiles["t_" + (row) + "_" + (col-1)].tilevalue) {
            tileClone.gotoAndStop((tilevalue+1)%7);
          }
          else {
            tileClone.gotoAndStop(tilevalue);
          }
        }
        else if (!(col-1 < 0) && !(row-1 < 0)) {
          if (tilevalue == this.mapTiles["t_" + (row-1) + "_" + (col)].tilevalue || tilevalue == this.mapTiles["t_" + (row) + "_" + (col-1)].tilevalue) {
            tileClone.gotoAndStop((tilevalue+1)%7);
          }
          else {
            tileClone.gotoAndStop(tilevalue);
          }
        }
        else {
          tileClone.gotoAndStop(tilevalue);
        }
      }
      else {
        if ((col-1 < 0) && !(row-1 < 0)) {
          if (tilevalue+7 == this.mapTiles["t_" + (row-1) + "_" + (col)].tilevalue) {
            tileClone.gotoAndStop((tilevalue+1)%7+7);
          }
          else {
            tileClone.gotoAndStop(tilevalue+7);
          }
        }
        else if (!(col-1 < 0) && (row-1 < 0)) {
          if (tilevalue+7 == this.mapTiles["t_" + (row) + "_" + (col-1)].tilevalue) {
            tileClone.gotoAndStop((tilevalue+1)%7+7);
          }
          else {
            tileClone.gotoAndStop(tilevalue+7);
          }
        }
        else if (!(col-1 < 0) && !(row-1 < 0)) {
          if (tilevalue+7 == this.mapTiles["t_" + (row-1) + "_" + (col)].tilevalue || tilevalue == this.mapTiles["t_" + (row) + "_" + (col-1)].tilevalue) {
            tileClone.gotoAndStop((tilevalue+1)%7+7);
          }
          else {
            tileClone.gotoAndStop(tilevalue+7);
          }
        }
        else {
          tileClone.gotoAndStop(tilevalue+7);
        }
      }
      // gotoAndStop/gotoAndPlay changes which tile it is; remember this for animations
      tileClone.x = col * tileSheet._frameWidth;
      tileClone.y = row * tileSheet._frameWidth;
      this.mapTiles["t_" + row + "_" + col] = {
        index: tileIndex,
        walkable: defineTile.walkable(row, col),
        occupied: false,
        tilevalue: tilevalue,
        tile: tileClone
      };
      tileIndex++;
      board.addChild(tileClone);
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
    return this.getTile(cr).walkable;
  }
  this.tileOccupied = function(cr) {
    return this.getTile(cr).occupied;
  }
}
