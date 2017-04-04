var Animation = function(name, fps, unit) {
  this.unit = unit;
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
      unit.gotoAndPlay(this.name);
    }
	};
}

var AnimationManager = function() {
  this.createWalkAnimation = function() {
    var animation = new Animation("wkRight", 9, this.unit);
    return animation;
  }
}
