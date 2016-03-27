/**
 * Calculus result handler
 */
Eternity.Components.Output.Handler.TableValueUpdater = function(domRepository) {
    /**
     * @type String
     */
    var RESULT_TYPE = 'table-update-value';

    /**
     * 
     * @type DOMRepository
     */
    var _domRepository = null;

    /**
     * Constructor
     * 
     * @param {DOMRepository} domRepository
     */
    var _construct = function(domRepository) {
        _domRepository = domRepository;
    };

    /**
     * Is handler would like to handle result given
     * 
     * @param {Result} result
     * @returns {Boolean} true - will handle, false not
     */
    this.supports = function(result) {
        return result.type === RESULT_TYPE;
    };

    /**
     * Handler entry point
     * 
     * @param {Result} result
     */
    this.handle = function(result) {
        var table = _domRepository.getSingle('table-1');
        var cell = table.getCell(parseInt(result.data.row, 10), parseInt(result.data.cell, 10));
        
        cell.value = result.data.value;
    };

    _construct.call(this, domRepository);
};