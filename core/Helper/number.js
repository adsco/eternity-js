/**
 * Helper for working with numeric values,
 * parsing values and formatting.
 */
Eternity.Helper.Number = function(format, digits){
    /**
     * @type String
     */
    var _format = '';
    
    /**
     * @type Integer
     */
    var _digits = 0;
    
    /**
     * Constructor
     * 
     * @param {String} format - default output format
     * @param {Integer} digits - default parsing number digits
     */
    var _construct = function(format, digits){
        if('undefined' !== typeof(format)){
            _format = format;
        }
        
        if('undefined' !== typeof(digits)){
            _digits = digits;
        }
    };
    
    /**
     * Parse numeric value
     * 
     * @param {String|Number} number - number in string or numeric representation
     * @param {Integer} digits - number of digits of output numeric value
     * @returns {unresolved}
     */
    this.parse = function(number, digits){
        var parsedNumber = _parseNumber(number),
            intDigits = parseInt(digits);
        
        return _round(parsedNumber, isNaN(intDigits) ? _digits : intDigits);
    };
    
    /**
     * Format input number
     * 
     * @param {Number} number - number to format
     * @returns {String}
     */
    this.format = function(number){
        //to be implemented
    };
    
    /**
     * Parse number from string of numeric value
     * 
     * @param {String|Number} number - number to parse
     * @returns {Number}
     */
    var _parseNumber = function(number){
        var parsedNumber = (number + '').replace(',', '.');
        
        if(isNaN(parsedNumber)){
            throw new Error('Not a numeric value "' + number + '"');
        }
        
        return parsedNumber;
    };
    
    /**
     * Round numeric value to given number of digits
     * 
     * @param {Number} number - number to round
     * @param {Integer} digits - number of digits of output number
     * @returns {Number}
     */
    var _round = function(number, digits){
        var value = parseFloat(number);
        
        if(isNaN(value)){
            throw new Error('Can\'t round not a numeric value "' + number + '"');
        }
        
        return parseFloat(value.toFixed(digits));
    };
    
    _construct.call(this, format, digits);
};