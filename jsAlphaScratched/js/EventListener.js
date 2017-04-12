function EventListener(inputQueue) {
    var self = this;
    this.inputQueue=inputQueue;

    var qklSelf = this;

    this.event = function(e) {
        var inputEventType = e;
        if(inputEventType != undefined) {
            var timeStamp = new Date().getTime();
            this.inputQueue.push(new InputEvent(inputEventType, INPUT_EVENT_STATE.start, timeStamp));
        }
    }

    this.moveRight = function() {
        this.event(INPUT_EVENT_TYPE.right);
    }

    this.faceRight = function() {
        this.event(INPUT_EVENT_TYPE.faceR);
    }

    this.faceLeft = function() {
        this.event(INPUT_EVENT_TYPE.faceL);
    }
}

function InputEvent(inputEventType, inputEventState, timeStamp) {
    this.type = inputEventType;
    this.state = inputEventState;
    this.timeStamp = timeStamp;
}
