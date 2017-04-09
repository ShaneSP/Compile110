var FiniteStateMachine = function(unit) {
  this.unit = unit;

  this.statesEnum = {
    SHIELD_RIGHT:9,
    SHIELD_LEFT: 15,
    SHIELD_UP: 21,
    SHIELD_DOWN: 27,
    WALK_RIGHT:35,
    WALK_LEFT:43,
    WALK_UP:51,
    WALK_DOWN:59,
    FACE_U:61,
    FACE_L:63,
    FACE_R:65,
    FACE_D:67
  }

  this.states = new Array();
  this.states[this.statesEnum.SHIELD_RIGHT] = new ShieldRightState(this.unit);
	this.states[this.statesEnum.SHIELD_LEFT] = new ShieldLeftState(this.unit);
	this.states[this.statesEnum.SHIELD_UP] = new ShieldUpState(this.unit);
	this.states[this.statesEnum.SHIELD_DOWN] = new ShieldDownState(this.unit);
	this.states[this.statesEnum.WALK_RIGHT] = new WalkRightState(this.unit);
	this.states[this.statesEnum.WALK_LEFT] = new WalkLeftState(this.unit);
	this.states[this.statesEnum.WALK_UP] = new WalkUpState(this.unit);
	this.states[this.statesEnum.WALK_DOWN] = new WalkDownState(this.unit);
	this.states[this.statesEnum.FACE_U] = new FaceUpState(this.unit);
	this.states[this.statesEnum.FACE_L] = new FaceLeftState(this.unit);
  this.states[this.statesEnum.FACE_R] = new FaceRightState(this.unit);
  this.states[this.statesEnum.FACE_D] = new FaceDownState(this.unit);

  this.actionsHistory = [];
	this.statesHistory = [];

  this.currentState = this.states[this.statesEnum.FACE_R];
	this.currentState.baseState_init();

  this.onUnitProcessInput = function(inputEvent) {
		if((inputEvent.type == INPUT_EVENT_TYPE.down ||
				inputEvent.type == INPUT_EVENT_TYPE.left ||
				inputEvent.type == INPUT_EVENT_TYPE.right ||
        inputEvent.type == INPUT_EVENT_TYPE.up) &&
				inputEvent.state == INPUT_EVENT_STATE.end) {
			//on a motion action (we're ending a motion), don't register/equeue it
      alert(inputEvent.type);
		} else {
			this.actionsHistory.push(inputEvent);
			while(this.actionsHistory.length > USER_INPUT_BUFFER_CAPACITY) {
				this.actionsHistory.shift();//remove oldest input event
			}
		}

		this.currentState.onUnitProcessInput(inputEvent);
  };

  this.onUnitUpdateState = function() {
		var nextState = this.currentState.onUnitUpdateState();
		//when switching between naturally occurring states... :
		if(nextState !==  this.currentState) {
			//before init-ing the next state, put the one we just ended into the state history:
			if(this.currentState !== this.states[this.statesEnum.FACE_U]
        || this.currentState !== this.states[this.statesEnum.FACE_L]
        || this.currentState !== this.states[this.statesEnum.FACE_R]
        || this.currentState !== this.states[this.statesEnum.FACE_D]) {
				this.statesHistory.push(this.currentState);
				while(this.statesHistory.length > STATES_HISTORY_CAPACITY) {
					this.statesHistory.shift();//remove oldest state
				}
			}

			nextState.baseState_init();
		}
		this.currentState = nextState;
  }

  function BaseState(unit) {
  	this.unit = unit;

  	this.baseState_init = function() {
  		this.init();
  	}

  	this.init = function() {};

  	this.onUnitProcessInput = function(inputEvent) {};

  	this.onUnitUpdateState = function() {};

  	this.getState = function(stateEnum) {
  		var state = this.unit.finiteStateMachine.states[stateEnum];
  		return state;
  	};

  	//TODO: generate these functions programmatically:
  	this.getWalkUpState = function() {
  		return this.getState(this.unit.finiteStateMachine.statesEnum.WALK_UP);
  	};

  	this.getWalkRightState = function() {
  		return this.getState(this.unit.finiteStateMachine.statesEnum.WALK_RIGHT);
  	};

  	this.getWalkLeftState = function() {
  		return this.getState(this.unit.finiteStateMachine.statesEnum.WALK_LEFT);
  	};

  	this.getWalkDownState = function() {
  		return this.getState(this.unit.finiteStateMachine.statesEnum.WALK_DOWN);
  	};

  	this.getShieldRightState = function() {
  		return this.getState(this.unit.finiteStateMachine.statesEnum.SHIELD_RIGHT);
  	};

  	this.getShieldLeftState = function() {
  		return this.getState(this.unit.finiteStateMachine.statesEnum.SHIELD_LEFT);
  	};
  	this.getShieldUpState = function() {
  		return this.getState(this.unit.finiteStateMachine.statesEnum.SHIELD_UP);
  	};

  	this.getShieldDownState = function() {
  		return this.getState(this.unit.finiteStateMachine.statesEnum.SHIELD_DOWN);
  	};

    this.getFaceRightState = function() {
  		return this.getState(this.unit.finiteStateMachine.statesEnum.FACE_R);
  	};

    this.getFaceLeftState = function() {
  		return this.getState(this.unit.finiteStateMachine.statesEnum.FACE_L);
  	};

    this.getFaceUpState = function() {
  		return this.getState(this.unit.finiteStateMachine.statesEnum.FACE_U);
  	};

    this.getFaceDownState = function() {
  		return this.getState(this.unit.finiteStateMachine.statesEnum.FACE_D);
  	};
  }

  function BaseMoveState(unit, animation, inputEventType) {
  	$.extend(this,new BaseState(unit));

  	this.stateAnimation = animation;
  	this.stateInputEventType = inputEventType;

  	this.nextState = null;

  	this.init = function() {
  		this.unit.currentAnimation = this.stateAnimation;
  		this.unit.currentAnimation.start();
  	};

  	/*
  	 * Move states, such as Stand, Walk Left/Right, should switch to a new state immediately upon new input from user.
  	 * This is NOT true for Hit States, such as Punch, SimpleKick, RoundhouseKick, etc. where once the state started, it will NOT switch
  	 * to a new state until its animation is over
  	 */
  	this.onUnitProcessInput = function(inputEvent) {
  		if(this.stateInputEventType != null && inputEvent.type == this.stateInputEventType && inputEvent.state == INPUT_EVENT_STATE.end) {
  			this.nextState = this.getFaceRightState();
  		} else if(inputEvent.type == INPUT_EVENT_TYPE.up && inputEvent.state == INPUT_EVENT_STATE.start) {
  			this.nextState = this.getWalkUpState();
  		} else if(inputEvent.type == INPUT_EVENT_TYPE.right && inputEvent.state == INPUT_EVENT_STATE.start) {
  			this.nextState = this.getWalkRightState();
  		} else if(inputEvent.type == INPUT_EVENT_TYPE.left && inputEvent.state == INPUT_EVENT_STATE.start) {
  			this.nextState = this.getWalkLeftState();
  		} else if(inputEvent.type == INPUT_EVENT_TYPE.down && inputEvent.state == INPUT_EVENT_STATE.start) {
  			this.nextState = this.getWalkDownState();
        //MIGHT NOT WANT TO CHANGE STATE WHEN SHIELDING
      } else if(inputEvent.type == INPUT_EVENT_TYPE.shieldR) {
  			this.nextState = this.getShieldRightState();
      } else if(inputEvent.type == INPUT_EVENT_TYPE.shieldL) {
  			this.nextState = this.getShieldLeftState();
      } else if(inputEvent.type == INPUT_EVENT_TYPE.shieldU) {
  			this.nextState = this.getShieldUpState();
      } else if(inputEvent.type == INPUT_EVENT_TYPE.shieldD) {
  			this.nextState = this.getShieldDownState();
      } else if(inputEvent.type == INPUT_EVENT_TYPE.faceR) {
  			this.nextState = this.getFaceRightState();
      } else if(inputEvent.type == INPUT_EVENT_TYPE.faceL) {
  			this.nextState = this.getFaceLeftState();
      } else if(inputEvent.type == INPUT_EVENT_TYPE.faceU) {
  			this.nextState = this.getFaceUpState();
      } else if(inputEvent.type == INPUT_EVENT_TYPE.faceD) {
  			this.nextState = this.getFaceDownState();
      }
  	};
  }

  function BaseStaticState(unit, inputEventType) {
    if(inputEventType == "faceR") {
      $.extend(this,new BaseMoveState(unit, ANIMATION_MANAGER.createFaceRAnimation(), inputEventType));
    } else {
       $.extend(this,new BaseMoveState(unit, ANIMATION_MANAGER.createFaceLAnimation(), inputEventType));
    }

    this.onUnitUpdateState = function() {
      if(this.nextState != null) {
        var tmp = this.nextState;
        this.nextState = null;
        //PLAYER.setCR([PLAYER.col+1,PLAYER.row]);
        return tmp;
      } else {
        PLAYER.setCR([PLAYER.col,PLAYER.row]);
        return this;
      }
    }
  }

  function BaseWalkState(unit, inputEventType) {
    if(inputEventType == "right") {
  	   $.extend(this,new BaseMoveState(unit, ANIMATION_MANAGER.createWalkRightAnimation(), inputEventType));
    } else {
       $.extend(this,new BaseMoveState(unit, ANIMATION_MANAGER.createWalkRightAnimation(), inputEventType));
    }

  	this.onUnitUpdateState = function() {
  		if(this.nextState !=null) {
  			var tmp = this.nextState;
  			this.nextState = null;
        //PLAYER.setCR([PLAYER.col+1,PLAYER.row]);
  			return tmp;
  		} else {
  			PLAYER.setCR([PLAYER.col+1,PLAYER.row]);
  		}
	  };
  }

  function WalkRightState(unit) {
  	 $.extend(this,new BaseWalkState(unit, INPUT_EVENT_TYPE.right));
  }

  function WalkLeftState(unit) {
  	 $.extend(this,new BaseWalkState(unit, INPUT_EVENT_TYPE.left));
  }

  function WalkUpState(unit) {}
  function WalkDownState(unit){}
  function ShieldUpState(unit) {}
  function ShieldDownState(unit) {}
  function ShieldRightState(unit) {}
  function ShieldLeftState(unit) {}
  function FaceUpState(unit) {}
  function FaceDownState(unit) {}
  function FaceRightState(unit) {
    $.extend(this, new BaseStaticState(unit, INPUT_EVENT_TYPE.faceR));
  }
  function FaceLeftState(unit) {
    $.extend(this, new BaseStaticState(unit, INPUT_EVENT_TYPE.faceL));
  }
}
