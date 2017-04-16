//3 TODO

/**
 * The View. View presents the model and provides
 * the UI events. The controller is attached to these
 * events to handle the user interraction.
 */
function GameView(model, elements) {
    this._model = model;
    //html elements
    this._elements = elements;

    this.updatedGraphics = new Event(this);
    this.runCode = new Event(this);

    var _this = this;

    // attach model listeners here
    this._model.inputEvent.attach(function () {
      _this.processInput();
    });

    this._model.entityAdded.attach(function () {
      _this.processInput();
    });

    this._model.entityRemoved.attach(function () {
      _this.processInput();
    });

    //attach listeners to runcode button
    this._elements.button.click(function () {
      _this.runCode.notify();
    });
}

//TODO: setting the CR and updating player position should be done within
//      the gameEntity's processInput()/updateGraphics()

GameView.prototype = {
    show : function () {
      this.processInput();
      this.update();
    },

    update : function (a) {
        //TODO: Stage ticker
        // console.log("inputEvent: " + a);
        for(var i=0; i<GAME_ENTITIES.length; i++) {
    			var gameEntity = GAME_ENTITIES[i];
    			gameEntity.updateGraphics(a); //TODO: change gameEntity's updateGraphics()
        }
    },

    processInput : function () {
      var animationsDone = true;
      for(var i=0; i<GAME_ENTITIES.length; i++) {
        var gameEntity = GAME_ENTITIES[i];
        animationsDone = animationsDone && gameEntity.animationDone();
      }
      if (!animationsDone) {
        return;
      }
      if (!this._model._queue.isEmpty()) {
        var inputEvent = this._model._queue.pop();
        for(var i=0; i<GAME_ENTITIES.length; i++) {
    			var gameEntity = GAME_ENTITIES[i];
          gameEntity.processInput(inputEvent); //TODO: change gameEntity's processInput()
        }
        this.update(inputEvent);
      }
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

    this._view.runCode.attach(function () {
      console.log("attaching runCode");
      _this.runCode();
    })
}

GameController.prototype = {
    runCode : function() {
      var code = editor.getValue();
      eval(code);
    },

    moveRight : function() {
      console.log("moveRight");
      this._model._queue.push("wkRight");
      this._model.inputEvent.notify();
    },

    moveLeft : function() {
      console.log("moveLeft");
      this._model._queue.push("wkLeft");
      this._model.inputEvent.notify();
    }
};
