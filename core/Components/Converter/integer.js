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
     * Get integer value from string
     * 
     * @param {String} number - number from which integer value should be extracted
     * @returns {Number}
     */
    this.get = function(number) {
        return _parse(number);
    };

    /**
     * Convert integer value into string
     * 
     * @param {Number} intValue - integer value to be converted into string
     * @returns {String}
     */
    this.toString = function(intValue) {
        var value = _parse(intValue);

        return value + '';
    };

    /**
     * Parse integer string value
     * 
     * @param {String|Number} number - parse number or string integer value
     * @returns {Number}
     */
    var _parse = function(number) {
        var intValue = parseInt(number + '', 10);

        if (isNaN(intValue)) {
            throw new Error('Can\'t parse value "' + number + '"');
        }

        return intValue;
    };

    _construct.call(this);
};

Eternity.Components.Converter.Integer.prototype = Object.create(Eternity.Components.Converter.Base);
Eternity.Components.Converter.Integer.prototype.constructor = Eternity.Components.Converter.Integer;