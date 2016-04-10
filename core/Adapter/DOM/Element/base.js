/**
 * Element adapter base class, used for each element adapters
 */
Eternity.Adapter.DOM.Element.Base = function() {
    /**
     * @var Object
     */
    this._events = {};
    
    /**
     * Get element value by identifier
     * 
     * @param {Eternity.Adapter.DOM.Identifier.Identifier} identifier - identifier of element
     * @returns {mixed} - element value
     */
    this.getValue = function() {
        throw new Error('getValue must be implemented');
    };
    
    /**
     * Set element value by identifier
     * 
     * @param {Eternity.Adapter.DOM.Identifier.Identifier} identifier - identifier of element
     * @param {mixed} value - value to set
     */
    this.setValue = function(value) {
        throw new Error('setValue must be implemented');
    };
    
    /**
     * Add event listener
     * 
     * @param {String} eventName
     * @param {Function} handler
     */
    this.addEventListener = function(eventName, handler) {
        if (!this._events.hasOwnProperty(eventName)) {
            this._events[eventName] = [];
        }
        
        this._events[eventName].push(handler);
    };
    
    /**
     * Invoke event handlers
     * 
     * @param {Eternity.Adapter.DOM.Event.Base} event - event to dispatch
     */
    this.dispatchEvent = function(event) {
        var events;
        var i;
        
        if (!this._events.hasOwnProperty(event.type)) {
            return false;
        }
        
        events = this._events[event.type];
        
        for (i = 0; i < events.length; i++) {
            events[i](event);
        }
    };
    
    /**
     * Set configuration parameter.
     * 
     * @param {String} key - config key
     * @param {mixed} value - config value
     * @returns {Eternity.Components.Converter.Input}
     */
    this.setConfig = function(key, value) {
        throw new Error('Method setConfig is not implemented');
    };
    
    /**
     * Service injector
     * 
     * @param {String} name - service name
     * @param {mixed} service - service
     * @returns {Eternity.Adapter.DOM.Element.Base}
     */
    this.inject = function(name, service) {
        throw new Error('Method inject is not implemented');
    };
};