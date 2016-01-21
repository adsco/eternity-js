/**
 * Resolve result handlers
 */
Eternity.Components.Output.Resolver.Resolver = function(){
    /**
     * @type ResultHandler[]
     */
    var _handlers = [];

    /**
     * Register handler
     * 
     * @param {ResultHandler} handler - handler to register
     * @returns {ResultResolver}
     */
    this.registerHandler = function(handler){
        _handlers.push(handler);
        
        return this;
    };
    
    /**
     * Resolve handlers for given result
     * 
     * @param {Result} result - result object
     */
    this.resolve = function(result){
        return _getHandlers(result);
    };

    /**
     * Get handlers that would like to handle given result
     * 
     * @param {Result} result - result object
     * @returns {ResultHandler[]}
     */
    var _getHandlers = function(result){
        var handlers = [],
            i;
    
        for(i = 0; i < _handlers.length; i++){
            if(_handlers[i].supports(result)){
                handlers.push(_handlers[i]);
            }
        }
        
        return handlers;
    };
};