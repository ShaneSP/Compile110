var topcanvas, topstage;
var background, fborder;
var krisheadSheet, krishead;

function setTop() {
  topcanvas = document.getElementById("topbar");
  topstage = new createjs.Stage(topcanvas);

  fboarder = new createjs.Shape();
  fboarder.graphics.beginFill("#000").drawRect(0, 0, 400, 100);
  topstage.addChild(fboarder);

  background = new createjs.Shape();
  background.graphics.beginFill("#999").drawRect(4, 4, 392, 92);
  topstage.addChild(background);

  krisheadSheet = new createjs.SpriteSheet({
    "images": ["assets/krishead.png"],
    "frames": {"height": 48, "width": 30, "count": 9},
    "animations": {
      "fwdIdle": {
        "frames": [0, 0],
        "speed": 0.012,
        "next": "fwdBlink"
      },
      "fwdBlink": {
        "frames": [0, 1, 2, 1],
        "speed": 0.3,
        "next": "fwdIdle"
      },
      "rgtIdle": {
        "frames": [3],
        "speed": 0.012,
        "next": "rgtBlink"
      },
      "rgtBlink": {
        "frames": [3, 4, 5, 4],
        "speed": 0.3,
        "next": "rgtIdle"
      },
      "lftIdle": {
        "frames": [6],
        "speed": 0.012,
        "next": "lftBlink"
      },
      "lftBlink": {
        "frames": [6, 7, 8, 7],
        "speed": 0.3,
        "next": "lftIdle"
      }
    }
  });

  krishead = new createjs.Sprite(krisheadSheet, "fwdIdle");
  krishead.x = 15;
  krishead.y = 25;
  topstage.addChild(krishead);

  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.addEventListener("tick", toptick);
  createjs.Ticker.setInterval(15);
  createjs.Ticker.setFPS(15);

  topstage.update();
}

function toptick(event) {
  topstage.update();
}
