/**
 * Router responsible for guiding input to proper handler and handling result
 * to result handler
 * 
 * @param {type} inputResolver
 * @param {type} outputResolver
 */
Eternity.Components.Router.Router = function(inputResolver, outputResolver){
    var _events = [
        Eternity.Components.Input.Handler.Types.PRE_HANDLE,
        Eternity.Components.Input.Handler.Types.HANDLE,
        Eternity.Components.Input.Handler.Types.POST_HANDLE
    ];
    
    /**
     * @type Eternity.Components.Input.Resolver.Resolver
     */
    var _inputResolver = null;
    
    /**
     * @type Eternity.Components.Output.Resolver.Resolver
     */
    var _outputResolver = null;
    
    /**
     * Constructor
     * 
     * @param {Eternity.Components.Input.Resolver.Resolver} inputResolver - input resolver
     * @param {Eternity.Components.Output.Resolver.Resolver} outputResolver - output resolver
     */
    var _construct = function(inputResolver, outputResolver){
        _inputResolver = inputResolver;
        _outputResolver = outputResolver;
    };
    
    /**
     * Entry point for handling element/event
     * 
     * @param {Element} element - element
     * @param {Event} e - event
     */
    this.forward = function(element, e){
        var handlers,
            i;
    
        for(i = 0; i < _events.length; i++){
            handlers = _getHandlersBySubscription(element, e, _events[i]);
            
            _handleInput(handlers, element, e);
        }
    };
    
    /**
     * Get handlers subscribed for given event
     * @todo reduce, filtering by subscription, overhead
     * 
     * @param {Element} element - element that triggered event
     * @param {Event} e - triggered event
     * @param {String} event - router event
     * @returns {Eternity.Components.Handler.Handler[]}
     */
    var _getHandlersBySubscription = function(element, e, event){
        var handlers = _inputResolver.resolve(element, e),
            subHandlers = [],
            i;
    
        for(i = 0; i < handlers.length; i++){
            if(handlers[i].getSubscription() === event){
                subHandlers.push(handlers[i]);
            }
        }
        
        return subHandlers;
    };
    
    /**
     * Handle input
     * 
     * @param {Eternity.Components.Input.Handler.Handler[]} handlers - handler
     * @param {Element} element - element
     * @param {Event} e - event
     */
    var _handleInput = function(handlers, element, e){
        var result,
            i;
    
        for(i = 0; i < handlers.length; i++){
            result = handlers[i].handle(element, e);

            _handleResult(result);
        }
    };
    
    /**
     * Handle result
     * 
     * @param {Eternity.Factory.Result} result
     */
    var _handleResult = function(result){
        var handlers = _outputResolver.resolve(result),
            i;
    
        for(i = 0; i < handlers.length; i++){
            handlers[i].handle(result);
        }
    };
    
    _construct.call(this, inputResolver, outputResolver);
};