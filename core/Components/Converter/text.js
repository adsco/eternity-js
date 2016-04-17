Eternity.Components.Converter.Text = function() {
    Eternity.Components.Converter.Base.call(this);
    
    /**
     * Convert string to display value
     * 
     * @param {mixed} value - string to convert
     * @param {Object} [config] - additional config
     * @returns {String}
     */
    this.toDisplayValue = function(value, config) {
        return value;
    };
    
    /**
     * Convert string to internal value
     * 
     * @param {mixed} value - value to convert
     * @param {Object} [config] - additional config
     * @returns {String}
     */
    this.toInternalValue = function(value, config) {
        return value;
    };
};

Eternity.Components.Converter.Text.prototype = Object.create(Eternity.Components.Converter.Base);
Eternity.Components.Converter.Text.prototype.constructor = Eternity.Components.Converter.Text;