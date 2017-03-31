/*
* @constructor
*/

function GameEntity(startX, startY, width, height) {

    this.startX = startX;
    this.startY = startY;
    this.width = width;
    this.height = height;

    this.name = name;

    this.accumulatedTimeMs = 0;
    this.currentAnimationImageIdx = 0;

    this.currentAnimation = null;

    this.finiteStateMachine = new FiniteStateMachine(this);

    /*
    * @public
    */

    this.processInput = function(consoleInputEvent) {
        this.finiteStateMachine.onUnitProcessInput(consoleInputEvent);
    };

    /*
    * @public
    */

    this.updateState = function() {
        this.finiteStateMachine.onUnitUpdateState();
        this.currentAnimation.onGameStateUpdate();
    };

    /**
	 * @public
	 * @param{Context} canvas
	 */
   
    this.updateGraphics = function(context) {
        this.currentAnimation.onGraphicsUpdate(context, this.startX, this.startY);
    };

};
