var stage, loader, canvas;
var background;
var loaded = false;

function init() {
  canvas = document.getElementById("canvas");
  stage = new createjs.Stage(canvas);
  var rect = new createjs.Rectangle(0, 0, 100, 100);
  stage.addChild(rect);
  loader = new createjs.LoadQueue(false);
  loader.loadFile({id:"floor", src:"assets/grasstile1.png"});
  loaded = true;

}

function load() {
  if(loaded){
    var gfx = new createjs.Graphics().beginBitmapFill(loader.getResult("floor")).drawRect(0,0,stage.canvas.width, stage.canvas.height).endFill();

    background = new createjs.Shape(gfx);
    background.x =0;
    this.stage.addChild(background);

    generateBit();

    createjs.Ticker.setFPS(40);
    createjs.Ticker.addListener(this);
    stage.update();
  }
}
