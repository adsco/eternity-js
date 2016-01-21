/**
 * Base input resolver
 */
Eternity.Components.Input.Resolver.Resolver = function(){
    /**
     * @type Handler[]
     */
    var _handlers = [];
    
    var _construct = function(){
        
    };
    
    /**
     * Add new handler
     * @param {Handler} handler
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
     * @return {Eternity.Components.Input.Handler.Handler}
     */
    this.resolve = function(element, e){
        return _getHandlers(element, e);
    };
    
    /**
     * Get list of handlers that can handle event triggered
     * 
     * @param {Element} element - element
     * @param {Event} e - event triggered
     * @returns {Eternity.Components.Input.Handler.Handler[]}
     */
    var _getHandlers = function(element, e){
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