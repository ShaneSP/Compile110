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
      if (!this.animationsDone()) {
        this.update();
        return;
      }
      if (!this._model._queue.isEmpty()) {
        var inputEvent = this._model._queue.pop();
        for(var i=0; i<GAME_ENTITIES.length; i++) {
    			var gameEntity = GAME_ENTITIES[i];
          if (gameEntity.name == inputEvent[0]) {
            gameEntity.processAnimation(inputEvent[1]);
          }
        }
      } else if (RUNCODE == true){
        $("#runcode").prop("disabled", false);
        $("#clickybuttons").html("CODING PHASE");
      }
      this.update();
    },

    animationsDone : function() {
      var animationsDone = true;
      for(var i=0; i<GAME_ENTITIES.length; i++) {
        var gameEntity = GAME_ENTITIES[i];
        animationsDone = animationsDone && gameEntity.animationDone();
      }
      return animationsDone;
    },

    update : function (a) {
        //TODO: Stage ticker
        for(var i=0; i<GAME_ENTITIES.length; i++) {
    			var gameEntity = GAME_ENTITIES[i];
    			gameEntity.updateGraphics(a);
        }
    },

    processInput : function(inputEvent) {
      // var sameEntity = "";
      for(var i=0; i<GAME_ENTITIES.length; i++) {
  			var gameEntity = GAME_ENTITIES[i];
        // if (gameEntity == sameEntity) {
        //   return;
        // }
        // sameEntity = GAME_ENTITIES[i];
        var animationaction = gameEntity.processInput(inputEvent[1]);
        if (animationaction instanceof Array) {
          for (var i in animationaction) {
            if (animationaction[i][0]!=undefined&&animationaction[i][1]!=undefined) {
              this._model._queue.push(animationaction[i]);
            }
          }
        } else if (animationaction == "leave" && portaling == false) {
          this._model._queue.push(["portal", "leave"]);
        } else  if (inputEvent[0]!=undefined&&animationaction!=undefined){
          this._model._queue.push([inputEvent[0], animationaction]);
        }
      }
    },

    addBit : function() {
      // BIT = new GameEntity([7,5],LEVEL_MAP, "bit", "bit");
      // GAME_ENTITIES[GAME_ENTITIES.length] = BIT;
      BIT.spawn();
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
        _this.runCode();
      }
    })
}

GameController.prototype = {
    runCode : function() {
      $("#runcode").prop("disabled", true);
      $("#clickybuttons").html("COMBAT PHASE");
      var player = this;
      var code = editor.getValue();
      eval(code);
      if(BIT.health>0 && BIT.hasAttacked) {BIT.hasAttacked=false};
      BIT.turn();
    },

    moveRight : function(num=1) {
      for(var i=0; i<num; i++) {
        this._model.inputEvent.notify(["player","wkRight"]);
      }
    },

    moveLeft : function(num=1) {
      for(var i=0; i<num; i++) {
        this._model.inputEvent.notify(["player","wkLeft"]);
      }
    },

    moveUp : function(num=1) {
      for(var i=0; i<num; i++) {
        this._model.inputEvent.notify(["player","wkUp"]);
      }
    },

    moveDown : function(num=1) {
      for(var i=0; i<num; i++) {
        this._model.inputEvent.notify(["player","wkDown"]);
      }
    },

    shieldRight : function() {
      this._model.inputEvent.notify(["player","shRight"]);
    },

    shieldLeft : function() {
      this._model.inputEvent.notify(["player","shLeft"]);
    },

    shieldUp : function() {
      this._model.inputEvent.notify(["player","shUp"]);
    },

    shieldDown : function() {
      this._model.inputEvent.notify(["player","shDown"]);
    },

    attackDown : function() {
      this._model.inputEvent.notify(["player","attackDown"]);
    },

    attackUp : function() {
      this._model.inputEvent.notify(["player","attackUp"]);
    },

    attackRight : function() {
      this._model.inputEvent.notify(["player","attackRight"]);
    },

    attackLeft : function() {
      this._model.inputEvent.notify(["player","attackLeft"]);
    },

    pickUp : function(name) {
      if(name=="sword" && PLAYER.col==SWORD.col && PLAYER.row-SWORD.row==1 && !PLAYER.hasSword) {
        PLAYER.hasSword=true;
        this._model.inputEvent.notify(["player","pickUpSword"]);
      }
    },

    addEnemy : function() {
      this._model.entityAdded.notify();
    },

    unlock : function(code) {
      if(code==1234 || code==5565 || code==1290) {
        this._model.inputEvent.notify(["gate","unlock"]);
      }
    }
};
