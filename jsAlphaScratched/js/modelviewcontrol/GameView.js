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
      this.update();
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
          gameEntity.processAnimation(inputEvent[1]);
        }
      }
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
      BIT = new GameEntity([8,5],LEVEL_MAP,"bit");
      GAME_ENTITIES[GAME_ENTITIES.length] = BIT;
    },

    removeEntity : function (name) {
      // if(name==1) {
        SWORD.remove();
      // }
    }

    // processInput : function () {
    //   var animationsDone = true;
    //   for(var i=0; i<GAME_ENTITIES.length; i++) {
    //     var gameEntity = GAME_ENTITIES[i];
    //     animationsDone = animationsDone && gameEntity.animationDone();
    //   }
    //   if (!animationsDone) {
    //     return;
    //   }
    //   if (!this._model._queue.isEmpty()) {
    //     var inputEvent = this._model._queue.pop();
    //     for(var i=0; i<GAME_ENTITIES.length; i++) {
    // 			var gameEntity = GAME_ENTITIES[i];
    //       gameEntity.processInput(inputEvent); //TODO: change gameEntity's processInput()
    //     }
    //     this.update(inputEvent);
    //   }
    // }
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
      if(!BIT.removed && BIT.inRange([PLAYER.col,PLAYER.row])) {
        this._model.inputEvent.notify(["bit","shoot"]);
      }
    },

    moveRight : function() {
      console.log("moveRight");
      this._model.inputEvent.notify(["player","wkRight"]);
      //call in range function

    },

    moveLeft : function() {
      console.log("moveLeft");
      this._model.inputEvent.notify(["player","wkLeft"]);
      // if(BIT!=undefined && BIT.inRange(PLAYER.cr)) {
      //   this._model.inputEvent.notify(["bit","shoot"]);
      // }
    },

    moveUp : function() {
      console.log("moveUp");
      this._model.inputEvent.notify(["player","wkUp"]);
      // if(BIT!=undefined && BIT.inRange(PLAYER.cr)) {
      //   this._model.inputEvent.notify(["bit","shoot"]);
      // }
    },

    moveDown : function() {
      console.log("moveDown");
      this._model.inputEvent.notify(["player","wkDown"]);
      // if(BIT!=undefined && BIT.inRange(PLAYER.cr)) {
      //   this._model.inputEvent.notify(["bit","shoot"]);
      // }
    },

    shieldRight : function() {
      console.log("shieldRight");
      this._model.inputEvent.notify(["player","shRight"]);
      if(BIT!=undefined && BIT.inRange(PLAYER.cr)) {
        this._model.inputEvent.notify(["bit","shoot"]);
      }
    },

    shieldLeft : function() {
      console.log("shieldLeft");
      this._model.inputEvent.notify(["player","shLeft"]);
      // if(BIT!=undefined && BIT.inRange(PLAYER.cr)) {
      //   this._model.inputEvent.notify(["bit","shoot"]);
      // }
    },

    shieldUp : function() {
      console.log("moveUp");
      this._model.inputEvent.notify(["player","shUp"]);
      // if(BIT!=undefined && BIT.inRange(PLAYER.cr)) {
      //   this._model.inputEvent.notify(["bit","shoot"]);
      // }
    },

    shieldDown : function() {
      console.log("shieldDown");
      this._model.inputEvent.notify(["player","shDown"]);
      // if(BIT!=undefined && BIT.inRange(PLAYER.cr)) {
      //   this._model.inputEvent.notify(["bit","shoot"]);
      // }
    },

    pickUp : function(name) {
      if(name=="sword" && PLAYER.col==SWORD.col && PLAYER.row-SWORD.row==1 && !PLAYER.hasSword) {
        PLAYER.hasSword=true;
        this._model.entityRemoved.notify(1);
      }
    },

    addEnemy : function() {
      this._model.entityAdded.notify();
      // if(BIT!=undefined && BIT.inRange(PLAYER.cr)) {
      //   this._model.inputEvent.notify(["bit","shoot"]);
      // }
    }
};
