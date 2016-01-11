function Resolver(resultResolver){
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
    
    this.resolve = function(element, e, sign){
        var result,
            handler;
        
        handler = _getHandler(sign);
        
        if(handler){
            result = handler.handle(element, e);
            
            _resultResolver.resolve(result);
        }
    };
    
    var _getHandler = function(sign){
        var i;
        
        for(i = 0; i < _handlers.length; i++){
            if(_handlers[i].supports(sign)){
                return _handlers[i];
            }
        }
        
        return null;
    };
    
    _construct.call(this, resultResolver);
}