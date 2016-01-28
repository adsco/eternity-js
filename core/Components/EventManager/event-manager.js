/**
 * Simple event manager
 */
Eternity.Components.EventManager.EventManager = function(){
    /**
     * @type Eternity.Components.EventManager.EventManager
     */
    var _me = this;
    
    /**
     * @type Object
     */
    var _events = {};
    
    /**
     * Constructor
     */
    var _construct = function(){
        
    };
    
    /**
     * Register event
     * 
     * @param {String} eventName - event name to register
     */
    this.registerEvent = function(eventName){
        _addEvent(eventName);
    };
    
    /**
     * Register array of events
     * 
     * @param {String[]} eventNames
     * @returns {undefined}
     */
    this.registerEvents = function(eventNames){
        var i;
        
        for(i = 0; i < eventNames.length; i++){
            _me.registerEvent(eventNames[i]);
        }
    };
    
    /**
     * Subscribe for event
     * 
     * @param {String} eventName - event to subscribe to
     * @param {Function} handler - event handler
     */
    this.subscribe = function(eventName, handler){
        var event = _getEvent(eventName);
        
        if(null === event){
            throw new Error('Event "' + eventName + '" is not registered');
        }
        
        event.push(handler);
    };

    /**
     * Dispatch event by name
     * 
     * @param {String} eventName - event name to dispatch
     */
    this.dispatch = function(eventName){
        var event = _getEvent(eventName);
    
        if(null === event){
            throw new Error('Cannot dispatch event "' + eventName + '", event is not registered');
        }
      
        _dispatchEvent(event);
    };
    
    /**
     * Get event by name
     * 
     * @param {String} eventName - event to find
     * @returns {Array}
     */
    var _getEvent = function(eventName){
        if(!_events.hasOwnProperty(eventName)){
            return null;
        }
        
        return _events[eventName];
    };
    
    /**
     * Check is event registered or not
     * 
     * @param {String} eventName - event name to check
     * @returns {Boolean}
     */
    var _hasEvent = function(eventName){
        if(!_events.hasOwnProperty(eventName)){
            return false;
        }
        
        return true;
    };
    
    /**
     * Add event to a list of available events
     * 
     * @param {String} eventName - event name to add
     */
    var _addEvent = function(eventName){
        if('string' !== typeof eventName || eventName.trim().length < 1){
            throw new Error('Event name must be a non empty string');
        }
        
        if(_hasEvent(eventName)){
            throw new Error('Event "' + eventName + '" already registered');
        }
        
        _events[eventName] = [];
    };

    /**
     * Actual event dispatch action
     * 
     * @param {Array} event - list of event handlers to execute
     */
    var _dispatchEvent = function(event){
        var i;
        
        for(i = 0; i < event.length; i++){
            event[i]();
        }
    };
    
    _construct.call(this);
};