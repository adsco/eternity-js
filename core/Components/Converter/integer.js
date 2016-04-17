/**
 * String value to integer converter
 */
Eternity.Components.Converter.Integer = function() {
    Eternity.Components.Converter.Base.call(this);
    
    /**
     * Constructor
     */
    var _construct = function() {

    };

    /**
     * Convert value to integer
     * 
     * @param {mixed} value - value to convert to integer
     * @param {Object} cofnig - additional config
     * @returns {Number}
     */
    this.toInternalValue = function(value, config) {
        return _parse(value);
    };

    /**
     * Convert integer value to display value
     * 
     * @param {mixed} value - value to convert to integer display value
     * @param {Object} [config] - additional config
     * @returns {mixed}
     */
    this.toDisplayValue = function(intValue) {
        var value = _parse(intValue);

        return value;
    };

    /**
     * Parse integer string value
     * 
     * @param {String|Number} number - parse number or string integer value
     * @returns {Number}
     */
    var _parse = function(number) {
        var intValue = parseInt(number, 10);

        if (!isFinite(intValue)) {
            return 0;
        }

        return intValue;
    };

    _construct.call(this);
};

Eternity.Components.Converter.Integer.prototype = Object.create(Eternity.Components.Converter.Base);
Eternity.Components.Converter.Integer.prototype.constructor = Eternity.Components.Converter.Integer;