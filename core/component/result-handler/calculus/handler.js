function Handler(domObserver){
    /**
     * @type String
     */
    var RESULT_TYPE = 'update';
    
    /**
     * 
     * @type DOMObserver
     */
    var _domObserver = null;

    /**
     * Constructor
     * 
     * @param {DOMObserver} domObserver
     */
    var _construct = function(domObserver){
        _domObserver = domObserver;
    };

    /**
     * Is handler would like to handle result given
     * 
     * @param {Result} result
     * @returns {Boolean} true - will handle, false not
     */
    this.supports = function(result){
        return result.type === RESULT_TYPE;
    };
    
    /**
     * Handler entry point
     * 
     * @param {Result} result
     */
    this.handle = function(result){
        var i;
        
        for(i = 0; i < result.data.length; i++){
            _domObserver.update(
                result.data[i].field,
                _decorate(result.data[i].value)
            );
        }
    };
    
    /**
     * Decorate value, 2,2 => 2.2
     * 
     * @param {String} value - string value to decorate
     * @returns {String}
     */
    var _decorate = function(value){
        return value;
    };
    
    _construct.call(this, domObserver);
}