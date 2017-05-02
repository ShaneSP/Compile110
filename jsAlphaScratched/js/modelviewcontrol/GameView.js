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
    this._model.inputEvent.attach(function (sender, args) {
      _this.processInput(args);
    });

    this._model.entityAdded.attach(function () {
      _this.addBit();
    });

    this._model.entityRemoved.attach(function (args) {
      _this.removeEntity(args);
    });

    //attach listeners to runcode button
    this._elements.button.click(function () {
      _this.runCode.notify();
    });
}

GameView.prototype = {
    show : function () {
      if(SPAWN&&!BIT.spawned) {
        this.addBit();
      }
      var animationsDone = true;
      for(var i=0; i<GAME_ENTITIES.length; i++) {
        var gameEntity = GAME_ENTITIES[i];
        animationsDone = animationsDone && gameEntity.animationDone();
        // console.log(gameEntity.name +" is done: " + animationsDone);
      }
      if (!animationsDone) {
        this.update();
        return;
      }
      if (!this._model._queue.isEmpty()) {
        var inputEvent = this._model._queue.pop();
        for(var i=0; i<GAME_ENTITIES.length; i++) {
    			var gameEntity = GAME_ENTITIES[i];
          gameEntity.processAnimation(inputEvent[1]);
        }
      }
      this.update();
    },

    update : function (a) {
        //TODO: Stage ticker
        for(var i=0; i<GAME_ENTITIES.length; i++) {
    			var gameEntity = GAME_ENTITIES[i];
        //   console.log(gameEntity);
    			gameEntity.updateGraphics(a);
        }
    },

    processInput : function(inputEvent) {
      console.log(inputEvent);
      for(var i=0; i<GAME_ENTITIES.length; i++) {
  			var gameEntity = GAME_ENTITIES[i];
        var animationaction = gameEntity.processInput(inputEvent[1]);
        this._model._queue.push([inputEvent[0], animationaction]);
      }
    },

    addBit : function() {
      BIT = new GameEntity([7,5],LEVEL_MAP,"bit");
      GAME_ENTITIES[GAME_ENTITIES.length] = BIT;
    },

    removeEntity : function (name) {
      // if(name==1) {
      if(SWORD!=undefined) {
        SWORD.remove();
      }
      // }
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
      if(RUNCODE) {
        console.log("attaching runCode");
        _this.runCode();
      }
    })
}

GameController.prototype = {
    runCode : function() {
      var player = this;
      var code = editor.getValue();
      eval(code);
      if(BIT.health>0 && BIT.hasAttacked) {BIT.hasAttacked=false};
    },

    moveRight : function() {
      console.log("moveRight");
      this._model.inputEvent.notify(["player","wkRight"]);
    },

    moveLeft : function() {
      console.log("moveLeft");
      this._model.inputEvent.notify(["player","wkLeft"]);
    },

    moveUp : function() {
      console.log("moveUp");
      this._model.inputEvent.notify(["player","wkUp"]);
    },

    moveDown : function() {
      console.log("moveDown");
      this._model.inputEvent.notify(["player","wkDown"]);
    },

    shieldRight : function() {
      console.log("shieldRight");
      this._model.inputEvent.notify(["player","shRight"]);
    },

    shieldLeft : function() {
      console.log("shieldLeft");
      this._model.inputEvent.notify(["player","shLeft"]);
    },

    shieldUp : function() {
      console.log("moveUp");
      this._model.inputEvent.notify(["player","shUp"]);
    },

    shieldDown : function() {
      console.log("shieldDown");
      this._model.inputEvent.notify(["player","shDown"]);
    },

    attackDown : function() {
      console.log("attackDown");
      this._model.inputEvent.notify(["player","attackDown"]);
    },

    attackUp : function() {
      console.log("attackUp");
      this._model.inputEvent.notify(["player","attackUp"]);
    },

    attackRight : function() {
      console.log("attackRight");
      this._model.inputEvent.notify(["player","attackRight"]);
    },

    attackLeft : function() {
      console.log("attackLeft");
      this._model.inputEvent.notify(["player","attackLeft"]);
    },

    pickUp : function(name) {
      if(name=="sword" && PLAYER.col==SWORD.col && PLAYER.row-SWORD.row==1 && !PLAYER.hasSword) {
        PLAYER.hasSword=true;
        this._model.entityRemoved.notify(1);
      }
    },

    addEnemy : function() {
      this._model.entityAdded.notify();
    }
};
