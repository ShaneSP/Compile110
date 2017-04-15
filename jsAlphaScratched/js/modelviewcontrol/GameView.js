//TODO: implement ListView and ListController

/**
 * The View. View presents the model and provides
 * the UI events. The controller is attached to these
 * events to handle the user interraction.
 */
function GameView(model, elements) {
    this._model = model;
    this._elements = elements;

    var _this = this;

    // attach model listeners here
    

}

GameView.prototype = {
    show : function () {
        this.update();
    },

    update : function () {
        //TODO: Stage ticker
    }
};

/**
 * The Controller. Controller responds to user actions and
 * invokes changes on the model.
 */
function GameController(model, view) {
    this._model = model;
    this._view = view;

    var _this = this;

    this._view.moveRightEvent.attach(function () {
        _this.moveRight();
    });

    this._view.moveLeftEvent.attach(function () {
        _this.moveLeft();
    });
}

GameController.prototype = {
    moveRight : function () {
        console.log("moveRight");
        if (item && LEVEL_MAP.tileWalkable && !LEVEL_MAP.tileOccupied) {
            PLAYER.setCR([PLAYER.col+1,PLAYER.row]);
        }
    },

    moveLeft : function () {
        console.log("moveLeft");
        if (LEVEL_MAP.tileWalkable && !LEVEL_MAP.tileOccupied) {
            PLAYER.setCR([PLAYER.col+1,PLAYER.row]);
        }
    }
};
