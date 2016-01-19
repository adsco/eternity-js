/**
 * Base input resolver
 */
Eternity.Components.Input.Resolver.Resolver = function(resultResolver){
    /**
     * @type Handler[]
     */
    var _handlers = [];
    
    /**
     * @type Result
     */
    var _resultResolver = null;
    
    var _construct = function(resultResolver){
        _resultResolver = resultResolver;
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
     * @param {Element} element - DOM element
     * @param {Event} e - event triggered
     */
    this.resolve = function(element, e){
        var result,
            handlers = _getHandlers(element, e),
            i;
        
        if(handlers.length){
            for(i = 0; i < handlers.length; i++){
                result = handlers[i].handle(element, e);
            
                _resultResolver.resolve(result);
            }
        }
    };
    
    /**
     * Get list of handlers that can handle event triggered
     * 
     * @param {Element} element - DOM element
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
    
    _construct.call(this, resultResolver);
};