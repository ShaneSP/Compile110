/**
 * @constructor
 * @param capacity
 * @returns {Queue}
 */
function Queue(capacity) {

    this.capacity = capacity;
    this.container = [];
    this.size = 0;

    /**
     * @public
     * @param element
     */
    this.push = function(element) {
        if(this.isFull()) {
            return false;
        }
        this.container.push(element);
        this.size++;
        return true;
    };

    this.top = function() {
      if(!this.isEmpty()) {
        return this.container[0];
      }
    }

    /**
     * @public
     */
    this.pop = function() {
        if(this.isEmpty()) {
            return null;
        }
        var element = this.container.shift();
        this.size--;
        return element;
    };

    /**
     * @public
     * @returns {Boolean}
     */
    this.isEmpty = function() {
        return this.size==0;
    };

    /**
     * @public
     * @returns {Boolean}
     */
    this.isFull = function() {
        return this.size==this.capacity;
    };
}
