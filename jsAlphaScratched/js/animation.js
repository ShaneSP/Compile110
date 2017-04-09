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
		if(this.gameStateUpdatesCount>=0) {
      if(this.name == "wkRight") {
        createWalkAnimation();
      } else if(this.name == "fcRight") {
        createFaceRAnimation();
      }
    }
	};
}

var AnimationManager = function() {
  this.createWalkRightAnimation = function() {
    var animation = new Animation("wkRight", 9);
    PLAYER.player.gotoAndPlay("wkRight");
    return animation;
  }

  this.createFaceRAnimation = function() {
    var animation = new Animation("fcRight", 1);
    PLAYER.player.gotoAndPlay("fcRight");
    return animation;
  }

  this.createFaceLAnimation = function() {
    var animation = new Animation("fcLeft", 1);
    PLAYER.player.gotoAndPlay("fcLeft");
    return animation;
  }
}
