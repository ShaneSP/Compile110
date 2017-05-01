var heartcanvas, heartstage;
var background;
var hearts;

var heartbar = function(hearts, topstage) {
  this.stage = topstage;
  this.heartnum = hearts;
  this.fullhearts = hearts;

  this.heartsprite = new createjs.SpriteSheet({
    "images": ["assets/hearts_28px.png"],
    "frames": {"height": 28, "width": 28, "count": 5},
    "animations": {
      "full": [0],
      "empty": [4],
      "draining": {
        "frames": [1, 2, 3, 4],
        "speed": 0.4,
        "next": "empty"
      },
      "increasing": {
        "frames": [3, 2, 1, 0],
        "speed": 0.4,
        "next": "full"
      }
    }
  });

  this.bar = [];

  for(var i=0; i<hearts; i++) {
    var tempbar = new createjs.Sprite(this.heartsprite, "full");
    tempbar.x = 5 + i*24;
    tempbar.y = 0;
    this.bar.push(tempbar);
    this.stage.addChild(this.bar[i]);
  }

  this.removeHeart = function() {
    if (this.fullhearts != 0) {
      this.bar[this.fullhearts-1].gotoAndPlay("draining");
      this.fullhearts = this.fullhearts -1;
    }
  }

  this.addHeart = function() {
    if (this.heartnum > this.fullhearts) {
      this.bar[this.fullhearts].gotoAndPlay("increasing");
      this.fullhearts = this.fullhearts + 1;
    }
  }
}

function setHearts() {

  heartcanvas = document.getElementById("hearts");
  heartstage = new createjs.Stage(heartcanvas);

  background = new createjs.Shape();
  background.graphics.beginFill("#000").drawRect(0, 0, 100, 200);
  heartstage.addChild(background);

  hearts = new heartbar(5, heartstage);

  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.addEventListener("tick", hearttick);
  createjs.Ticker.setInterval(15);
  createjs.Ticker.setFPS(15);

  heartstage.update();

}

function hearttick() {
  heartstage.update();
}
