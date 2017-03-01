function generateBit() {
  var spriteSheetBit = new createjs.SpriteSheet({
    framerate: 1,
    "images": [loader.getResult("bit")],
    "frames": {"height":28, "width": 28, "count": 4, "regX":14, "regY":14, "spacing": 0},
    "animations": {"idle":[0,1,2,3,2,1]}
  });
  var bit = new createjs.Sprite(spriteSheetBit,"idle");
  bit.x = 30;
  bit.y = 200;
}
