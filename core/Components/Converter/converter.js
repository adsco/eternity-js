Eternity.Components.Converter.Converter = function() {
    /**
     * @type {Object}
     */
    var _converters = {};
    
    this.addConverter = function(name, converter) {
        
        _converters[name] = converter;
    };
    
    this.getConverter = function(name) {
        return _converters[name];
    };
    
    /**
     * Convert display value to internal value
     * 
     * @param {String} type - type of output value
     * @param {mixed} value - value to convert
     * @param {Object} config - additional convertion config
     * @returns {this}
     */
    this.toInternalValue = function(type, value, config) {
        var converter = this.getConverter(type);
        
        if (!converter) {
            throw new Error('Cannot convert to internal value: converter "' + type + '" is not found');
        }
        
        return converter.toInternalValue(value, config);
    };
    
    /**
     * Convert internal value to display value
     * 
     * @param {String} type - type of output value
     * @param {mixed} value - value to convert
     * @param {Object} config - additional convertion config
     * @returns {this}
     */
    this.toDisplayValue = function(type, value, config) {
        var converter = this.getConverter(type);
        
        if (!converter) {
            throw new Error('Cannot convert to display value: converter "' + type + '" is not found');
        }
        
        return converter.toDisplayValue(value, config);
    };
};