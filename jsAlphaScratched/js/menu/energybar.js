var energybar = function(bars, topstage) {
  this.stage = topstage;
  this.barnum = bars;
  this.fullbars = bars;

  this.barsprite = new createjs.SpriteSheet({
    "images": ["assets/energy2.png"],
    "frames": {"height": 27, "width": 12, "count": 4},
    "animations": {
      "fullEnd": [0], "emptyEnd": [1], "full": [2], "empty": [3]
    }
  });

  this.bar = [];

  this.start = new createjs.Shape();
  this.start.graphics.beginFill("#000").drawRect(60, 50, 3, 27);
  this.stage.addChild(this.start);

  for(var i=0; i<bars-1; i++) {
    var tempbar = new createjs.Sprite(this.barsprite, "full");
    tempbar.x = 63 + i*12;
    tempbar.y = 50;
    this.bar.push(tempbar);
    this.stage.addChild(this.bar[i]);
  }

  tempbar = new createjs.Sprite(this.barsprite, "fullEnd");
  tempbar.x = 63 + (bars-1)*12;
  tempbar.y = 50;
  this.bar.push(tempbar);
  this.stage.addChild(this.bar[bars-1]);

  this.removeBar = function() {
    if (this.barnum == this.fullbars) {
      this.bar[this.barnum-1].gotoAndPlay("emptyEnd");
      this.fullbars = this.fullbars - 1;
    }
    else if (this.fullbars != 0) {
      this.bar[this.fullbars-1].gotoAndPlay("empty");
      this.fullbars = this.fullbars - 1;
    }
  }

  this.addBar = function() {
    if(this.barnum == this.fullbars + 1) {
      this.bar[this.fullbars].gotoAndPlay("fullEnd");
      this.fullbars = this.fullbars + 1;
    }
    else if(this.barnum > this.fullbars) {
      this.bar[this.fullbars].gotoAndPlay("full");
      this.fullbars = this.fullbars + 1;
    }
  }
}
