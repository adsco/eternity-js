/**
 * Validator result handler
 */
Eternity.Components.Output.Handler.Validator = function(domRepository, floater) {
    /**
     * @type String
     */
    var RESULT_TYPE = 'validation-check';

    /**
     * @type Eternity.Components.DOM.Repository
     */
    var _domRepository = null;

    /**
     * @type vendors/Floater
     */
    var _floater = null;

    /**
     * Constructor
     * 
     * @param {Eternity.Components.DOM.Repository} domRepository - dom repository
     * @param {Floater} floater - floating message handler
     */
    var _construct = function(domRepository, floater) {
        _domRepository = domRepository;
        _floater = floater;
    };

    /**
     * Is passed result could be handled by this handler
     * 
     * @param {mixed[]} result - input handler result
     * @returns {Boolean}
     */
    this.supports = function(result) {
        return result.type === RESULT_TYPE;
    };

    /**
     * Handle result
     * 
     * @param {mixed} result
     */
    this.handle = function(result) {
        var field,
            position,
            i;

        for (i = 0; i < result.data.length; i++) {
            if (false === result.data[i].success) {
                field = _domRepository.getSingle(result.data[i].field);
                position = _getAbsolutePosition(field);
                floater.show(position.x, position.y, result.data[i].message);
                console.log('Validation failed for field "' + result.data[i].field + '", error message: "' + result.data[i].message + '"');
            }
        }
    };

    /**
     * Get element's absolute coordinates x and y
     * 
     * @param {Element} element
     * @returns {Object} - x and y coordinates
     */
    var _getAbsolutePosition = function(element) {
        var x = 0,
            y = 0,
            parent = element;

        while (parent) {
            x += parseFloat(parent.offsetLeft);
            y += parseFloat(parent.offsetTop);

            parent = parent.offsetParent;
        }

        return {
            x: x,
            y: y
        };
    };

    _construct.call(this, domRepository, floater);
};