/**
 * Calculus result handler
 */
function CalculusResultHandler(domRepository){
    /**
     * @type String
     */
    var RESULT_TYPE = 'update-value';
    
    /**
     * 
     * @type DOMRepository
     */
    var _domRepository = null;

    /**
     * Constructor
     * 
     * @param {DOMRepository} domRepository
     */
    var _construct = function(domRepository){
        _domRepository = domRepository;
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
            _domRepository.update(
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
    
    _construct.call(this, domRepository);
}