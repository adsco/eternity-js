/**
 * Value converter, used for converting element values.
 * ex. string number into number: 2,6 into 2.6; floats to integer, etc.
 */
Eternity.Components.Converter.Base = function() {
    /**
     * Convert value into display value
     * 
     * @param {mixed} value - value to convert
     * @param {Object} config - config, specific to each conveter
     * @returns {mixed}
     */
    this.toDisplayValue = function(value, config) {
        throw new Error('toDisplayValue method is not implemented');
    };
    
    /**
     * Convert display value to internal value
     * 
     * @param {mixed} value - value to convert
     * @param {Object} config - config, specific to each converter
     * @returns {mixed}
     */
    this.toInternalValue = function(value, config) {
        throw new Error('toInternalValue method is not implemented');
    };
};