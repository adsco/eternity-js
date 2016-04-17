/**
 * String value into float converter
 */
Eternity.Components.Converter.Float = function() {
    Eternity.Components.Converter.Base.call(this);
    
    /**
     * @type Object
     */
    var _locales = {
        ru: {
            from: '.',
            to: ','
        },
        defaults: {
            from: ',',
            to: '.'
        }
    };

    /**
     * Constructor
     */
    var _construct = function(){

    };

    /**
     * Get float value from string value
     * 
     * @param {String|Number} number - number to convert into float
     * @param {Object} [config] - number of digits of final value
     * @returns {Number}
     */
    this.toInternalValue = function(number, config) {
        var float = _parse(number);

        if (config && 'undefined' !== config.digits) {
            return _formatDigits(float, config.digits);
        }

        return float;
    };

    /**
     * Convert number to it's string representation
     * 
     * @param {Number} number - number to convert
     * @param {Object} [config] - preferable locale
     * @returns {String}
     */
    this.toDisplayValue = function(number, config) {
        var float = _parse(number);

        return _localize(float + '', config && 'undefined' !== typeof config.locale ? config.locale : 'ru');
    };

    /**
     * Parse string value
     * 
     * @param {String|Number} number - string number to be converted into float
     * @returns {undefined}
     */
    var _parse = function(number) {
        var float = parseFloat(_localize(number + ''));

        if ('number' !== typeof float) {
            throw new Error('Cannot parse not a numeric value, "' + number + '" given');
        }

        return float;
    };

    /**
     * Format float value to fixed number of digits
     * 
     * @param {Number} number - value to format
     * @param {Number} digits - number of digits
     * @returns {Number}
     */
    var _formatDigits = function(number, digits) {
        var intDigits = parseInt(digits, 10);

        if ('number' !== typeof number) {
            throw new Error('Cannot format digits of not a numeric value, "' + number + '" given');
        }
        
        if ('number' !== typeof intDigits) {
            throw new Error('Digits argument must be a number');
        }

        if (intDigits < 0) {
            throw new Error('Digits cannot be negative value');
        }

        return parseFloat(number.toFixed(intDigits));
    };

    /**
     * Replace commas by dots
     * 
     * @param {String} floatString - string to replace
     * @param {String} locale - locale to which value should be localized
     * @returns {String}
     */
    var _localize = function(floatString, locale) {
        var localizer;

        if ('string' !== typeof floatString) {
            throw new Error('_localize expects argument to be string "' + (typeof(floatString)) +'" given');
        }

        localizer = _getLocale(locale);

        return floatString.replace(localizer.from, localizer.to);
    };

    /**
     * Get locale by code
     * 
     * @param {String} locale - locale code
     * @returns {Object}
     */
    var _getLocale = function(locale){
        if ('undefined' === typeof locale) {
            return _locales.defaults;
        }

        if (_locales.hasOwnProperty(locale)) {
            return _locales[locale];
        } else {
            throw new Error('Locale "' + locale + '" not found');
        }
    };
    
    _construct.call(this);
};

Eternity.Components.Converter.Float.prototype = Object.create(Eternity.Components.Converter.Base);
Eternity.Components.Converter.Float.prototype.constructor = Eternity.Components.Converter.Float;