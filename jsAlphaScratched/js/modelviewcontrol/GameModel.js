//I think this one is done until we add future functionality

function GameModel(entities, inputQueue) {
    this._entities = GAME_ENTITIES;
    this._queue = inputQueue;

    this.inputEvent = new Event(this);
    this.entityAdded = new Event(this);
    this.entityRemoved = new Event(this);
    // TODO: ClickEvent
    // this.clickEvent = new ClickEvent(this);
}

GameModel.prototype = {
    input : function (e) {
        self.inputEvent.notify({e});
    },

    addEntity : function (e) {
      this._entities.push(e);
      this.entityAdded.notify({e});
    }
};
