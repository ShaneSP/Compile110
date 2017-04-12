var Animation = function(name, fps) {
  this.name = name;
  this.fps = fps;
  this.frameIdxIncrem = Math.floor(FIXED_UPDATES_IN_A_SECOND/this.fps);
  this.gameStateUpdatesCount = -1;

	this.start = function() {
		this.gameStateUpdatesCount = 0;
	};

  this.isOver = function() {
		return this.gameStateUpdatesCount > this.unit.spriteSheet.getNumFrames(this.name) * this.frameIdxIncrem;
	};

  this.onGameStateUpdate = function() {
		if(this.gameStateUpdatesCount>=0) {
			this.gameStateUpdatesCount++;
		}
	};

  this.onGraphicsUpdate = function(context, x, y) {
    console.log("animation graphics update" + this.name);
    //this if-statement is wrong
		if(this.gameStateUpdatesCount>=0) {
      if(this.name == "wkRight") {
        if(!LEVEL_MAP.tileOccupied([PLAYER.col+1,PLAYER.row])){
          ANIMATION_MANAGER.createWalkRightAnimation();
          PLAYER.setCR([PLAYER.col+1,PLAYER.row]);
        }
      } else if(this.name == "fcRight") {
        ANIMATION_MANAGER.createFaceRAnimation();
      }
    }
	};
}

var AnimationManager = function() {
  this.createWalkRightAnimation = function() {
    console.log("animation manager walk right");
    var animation = new Animation("wkRight", 9);
    PLAYER.player.gotoAndPlay("wkRight");
    return animation;
  }

  this.createFaceRAnimation = function() {
    console.log("animation manager face right");
    var animation = new Animation("fcRight", 1);
    PLAYER.player.gotoAndPlay("fcRight");
    return animation;
  }

  this.createFaceLAnimation = function() {
    console.log("animation manager face left");
    var animation = new Animation("fcLeft", 1);
    PLAYER.player.gotoAndPlay("fcLeft");
    return animation;
  }
}
