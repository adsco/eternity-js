Eternity.Components.Worker.Reader.Reader = function(domRepository) {
    /**
     * @var String
     */
    var PROPERTY_ID = 'id';
    
    /**
     * @var String
     */
    var PROPERTY_KEY = 'key';
    
    /**
     * @var Eternity.Components.DOM.Repository
     */
    var _domRepository = null;
    
    /**
     * Constructor
     * 
     * @param {Eternity.Components.DOM.Repository} domRepository - dom repository
     */
    var _construct = function(domRepository) {
        _domRepository = domRepository;
    };
    
    /**
     * Read ids map and return array of map.<key|id> => value pair 
     * 
     * @param {Object[]} ids - array of objects (ex. [{id: 1}, {id: 2, key: 100}])
     * @returns {Object[]}
     */
    this.read = function(ids) {
        var result = {};
        var key;
        var i;
        
        for (i = 0; i < ids.length; i++) {
            key = _getKey(ids[i]);
            
            if (result.hasOwnProperty(key)) {
                throw new Error('Duplicate key detected: ' + key);
            }
            
            result[key] = _domRepository.getValue(key);
        }
        
        return result;
    };
    
    /**
     * Get index key for result
     * 
     * @param {Object} map - object that contains value key
     * @returns {String} - key value
     */
    var _getKey = function(map) {
        var key = map[PROPERTY_ID];
        
        if (map.hasOwnProperty(PROPERTY_KEY)) {
            key = map[PROPERTY_KEY];
        }
        
        return key;
    };
    
    _construct.call(this, domRepository);
};