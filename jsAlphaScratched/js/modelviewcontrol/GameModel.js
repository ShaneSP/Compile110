//I think this one is done until we add future functionality

function GameModel(entities, inputQueue) {
    window.requestAnimationFrame =
        window.requestAnimationFrame ||        //Chrome
        window.mozRequestAnimationFrame ||     //Firefox
        window.webkitRequestAnimationFrame || //Safari
        window.msRequestAnimationFrame;

    if(!window.requestAnimationFrame) {
      throw new Exception("Failed to get requestAnimationFrame function");
    }

    this._entities = GAME_ENTITIES;
    this._queue = inputQueue;

    this.inputEvent = new Event(this);
    this.entityAdded = new Event(this);
    this.entityRemoved = new Event(this);
}

GameModel.prototype = {
    input : function (e) {
      this.inputEvent.notify({e});
    },
    
    addEntity : function (e) {
      this._entities.push(e);
      this.entityAdded.notify({e});
    },

    removeEntity : function (index) {
      var removed;
      removed = this._entities[index];
      this._entities.splice(index, 1);
      this.entityRemoved.notify({removed});
    }
};
