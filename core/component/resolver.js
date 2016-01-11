function Resolver(){
    /**
     * @type Handler[]
     */
    var _handlers = [];
    
    /**
     * Add new handler
     * @param {Handler} handler
     */
    this.registerHandler = function(handler){
        _handlers.push(handler);
        
        return this;
    };
    
    this.resolve = function(element, e){
        
    };
}