/**
 * Input handler interface
 */
Eternity.Components.Input.Handler.Handler = function() {
    /**
     * Check is handler can handle given element and event
     * 
     * @param {Element} element - DOM element
     * @param {Event} e - DOM event
     * @returns {Boolean}
     */
    this.supports = function(element, e) {
        throw new Error('Eternity.Components.Input.Handler.Handler.supports() - method MUST be overrided');
    };

    /**
     * Perform some action on element
     * 
     * @param {Element} element - DOM element
     * @param {Event} e - DOM event
     * @param {String} type - handler type
     * @returns {Eternity.Factory.Result}
     */
    this.handle = function(element, e, type) {
        throw new Error('Eternity.Components.Input.Handler.Handler.handle() - method MUST be overrided');
    };
};