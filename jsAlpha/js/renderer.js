draw: function(){
  var self = this;
  this.context.clearRect(0, 0, this.w, this.h);
    this.context.fillStyle = "rgba(255,0,0,0.6)";
  _(this.map).each(function(row,i){
    _(row).each(function(tile,j){
      if(tile !== 0){ //if tile is not walkable
        self.drawTile(j,i); //draw a rectangle at j,i
      }
    });
  });
},
drawTile: function(x,y){
  this.context.fillRect(
    x * this.tileSize, y * this.tileSize,
    this.tileSize, this.tileSize
  );
}
