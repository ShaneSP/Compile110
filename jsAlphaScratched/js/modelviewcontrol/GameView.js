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
        //   console.log(gameEntity);
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
            this._model._queue.push(animationaction[i]);
          }
        } else {
          this._model._queue.push([inputEvent[0], animationaction]);
        }
        // console.log(this._model._queue);
      }
    },

    addBit : function() {
      BIT = new GameEntity([7,5],LEVEL_MAP, "bit", "bit");
      GAME_ENTITIES[GAME_ENTITIES.length] = BIT;
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
        console.log("attaching runCode");
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
      console.log("moveRight");
      for(var i=0; i<num; i++) {
        this._model.inputEvent.notify(["player","wkRight"]);
      }
    },

    moveLeft : function(num=1) {
      console.log("moveLeft");
      for(var i=0; i<num; i++) {
        this._model.inputEvent.notify(["player","wkLeft"]);
      }
    },

    moveUp : function(num=1) {
      console.log("moveUp");
      for(var i=0; i<num; i++) {
        this._model.inputEvent.notify(["player","wkUp"]);
      }
    },

    moveDown : function(num=1) {
      console.log("moveDown");
      for(var i=0; i<num; i++) {
        this._model.inputEvent.notify(["player","wkDown"]);
      }
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
        this._model.inputEvent.notify(["player","pickUpSword"]);
      }
    },

    addEnemy : function() {
      this._model.entityAdded.notify();
    }
};
