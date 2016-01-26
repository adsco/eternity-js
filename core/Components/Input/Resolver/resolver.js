/**
 * Base input resolver
 */
Eternity.Components.Input.Resolver.Resolver = function(){
    /**
     * @type Handler[]
     */
    var _handlers = [];
    
    /**
     * Constructor
     */
    var _construct = function(){
        
    };
    
    /**
     * Add new handler
     * @param {Eternity.Components.Input.Handler.Handler} handler
     */
    this.registerHandler = function(handler){
        _handlers.push(handler);
        
        return this;
    };
    
    /**
     * Handlers resolver
     * 
     * @param {Element} element - element
     * @param {Event} e - event triggered
     * @param {String} type - handler type requested
     * @return {Eternity.Components.Input.Handler.Handler}
     */
    this.resolve = function(element, e, type){
        return _getHandlers(element, e, type);
    };
    
    /**
     * Get list of handlers that can handle event triggered
     * 
     * @param {Element} element - element
     * @param {Event} e - event triggered
     * @param {String} type - handler type requested
     * @returns {Eternity.Components.Input.Handler.Handler[]}
     */
    var _getHandlers = function(element, e, type){
        var handlers = [],
            i;
        
        for(i = 0; i < _handlers.length; i++){
            if(_handlers[i].supports(element, e)){
                handlers.push(_handlers[i]);
            }
        }
        
        return handlers;
    };
    
    _construct.call(this);
};