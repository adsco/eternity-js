/**
 * Calculus handler formula mapper
 */
Eternity.Helper.RuleMapper = function(){
    var _me = this;
    
    /**
     * @type mixed[]
     */
    var _map = {};
    
    /**
     * @type Array
     */
    var _targets = [];

    /**
     * Map new handler
     * 
     * @param {String[]} fields - field identifier,
     * whos value change causes target field value to be changed
     * @param {String} target - field whos value should be updated
     * @param {Function} handler - formula
     * @returns {Mapper}
     */
    this.map = function(fields, target, handler){
        var i;
        
        if(!(fields instanceof Array)){
            throw new Error('Argument fields must be an array of strings');
        }
        
        _addTarget(target);
        
        for(i = 0; i < fields.length; i++){
            _addMap(fields[i], target, handler);
        }
        
        return this;
    };
    
    /**
     * Get formula by field identifier, in other words, does this field 
     * participates in any formulas
     * 
     * @param {String} field - field
     * @returns {Map|null} - field map or null
     */
    this.getMapByInitiator = function(field){
        return _getMap(field);
    };
    
    /**
     * Get map by target field
     * 
     * @param {String} target - target field
     * @returns {JSON}
     */
    this.getMapByTarget = function(target){
        var key,
            i;
    
        if(!_hasTarget(target)){
            return null;
        }
        
        for(key in _map){
            for(i = 0; i < _map[key].length; i++){
                if(_map[key][i].target == target){
                    return _map[key][i];
                }
            }
        }
    };
    
    this.getTargetInitiators = function(target) {
        var initiators = [],
            key;
        
        for (key in _map) {
            initiators = initiators.concat( _getMapInitiators(_map[key], target) );
        }
        
        return initiators;
    };
    
    /**
     * Check is field already mapped
     * 
     * @param {String} field - field identifier
     * @returns {Boolean}
     */
    this.isMapped = function(field){
        return _map[field] ? true : false;
    };
    
    /**
     * Single field add map action
     * 
     * @param {String} field - trigger field id
     * @param {String} target - target field wos value needs to be changed
     * @param {Function} handler - formula
     */
    var _addMap = function(field, target, handler){
        if(!_me.isMapped(field)){
            _createMap(field);
        }
        
        _map[field].push({
            field: field,
            target: target,
            handler: handler
        });
    };
    
    /**
     * Get map for a trigger field
     * 
     * @param {String} field
     * @returns {Array}
     */
    var _getMap = function(field){
        return _map[field] || [];
    };
    
    /**
     * Create new empty map field
     * 
     * @param {String} field - map field identifier
     * @returns {Array}
     */
    var _createMap = function(field){
        if(_map.hasOwnProperty(field)){
            throw new Error('Field "' + field + '" already exists');
        }
        
        _map[field] = [];
        
        return _map[field];
    };
    
    /**
     * Add target to target list
     * 
     * @param {String} target - target field
     */
    var _addTarget = function(target){
        if(_hasTarget(target)){
            throw new Error('Target field "' + target + '" cannot have more than 1 formula');
        }
        
        _targets.push(target);
    };

    /**
     * Check is target field already registered
     * 
     * @param {String} target - target field
     * @returns {Boolean}
     */
    var _hasTarget = function(target){
        return -1 === _targets.indexOf(target) ? false : true;
    };
    
    var _getMapInitiators = function(map, target) {
        var initiators = [],
            i;
        
        for (i = 0; i < map.length; i++) {
            if (map[i].target == target) {
                initiators.push(map[i]);
            }
        }
        
        return initiators;
    };
};