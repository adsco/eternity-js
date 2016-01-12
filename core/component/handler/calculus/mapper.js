/**
 * Calculus handler formula mapper
 */
function Mapper(){
    /**
     * @type mixed[]
     */
    var _fields = [];

    /**
     * Add new formula
     * 
     * @param {String} field - field identifier
     * @param {Function} handler - formula
     * @param {Boolean} replace - if true passed and field already mapped, 
     * will replace field handler, if false passed and field already mapped - throws error
     * @returns {Mapper}
     */
    this.add = function(field, handler, replace){
        var map = this.get(field);
        
        //resolve value, by default false
        replace = 'undefined' === typeof(replace) ? false : replace;
        
        if(map && true !== replace){
            throw new Error('Field "' + field + '" already mapped, pass replace true flag if you want to replace formula');
        } else if(map && true === replace) {
            map.field = field;
            map.handler = handler;
        } else {
            _fields.push({
                field: field,
                handler: handler
            });
        }
        
        return this;
    };
    
    /**
     * Get formula by field identifier
     * @param {String} field
     * @returns {Map|null} - field map or null
     */
    this.get = function(field){
        var i;
        
        for(i = 0; i < _fields.length; i++){
            if(_fields[i].field === field){
                return _fields[i];
            }
        }
        
        return null;
    };
    
    /**
     * Check is field already mapped
     * 
     * @param {String} field - field identifier
     * @returns {Boolean}
     */
    this.isMapped = function(field){
        var fieldMap = this.get(field);
        
        if(fieldMap){
            return true;
        } else {
            return false;
        }
    };
    
    /**
     * Get field handler
     * 
     * @param {String} field - field identifier
     * @returns {Map.handler|null}
     */
    this.getHandler = function(field){
        var map = this.get(field);
        
        return map ? map.handler : null;
    };
}