/**
 * Adapt table behaviour
 * 
 * Should have, listeners for inputs, view manipulation(fixed number of rows - data should be replaceable)
 * Future optimization needed use limited number of dom rows but store and substitude
 * data in limited rows
 */
Eternity.Adapter.DOM.Element.Table = function(table, selector) {
    /**
     * @var Element
     */
    var _table = null;
    
    /**
     * @var String
     */
    var _selector = '';
    
    /**
     * @var Array
     */
    var _rows = {};
    
    /**
     * @var Object
     */
    var _config = {
        //max rows
        maxItems: 10
    };
    
    /**
     * @var Object
     */
    var _state = {
        //current page
        page: 1
    };
    
    /**
     * @var String
     */
    var EVENT_TYPE_CHANGE = 'change';
    
    var _events = {
        change: []
    };
    
    /**
     * Constructor
     * 
     * @param {Element} table - table element
     * @param {String} selector - table cell input selector
     */
    var _construct = function(table, selector) {
        if (!table) {
            throw new Error('Table required');
        }
        
        _table = table;
        
        if ('string' === typeof selector) {
            _selector = selector;
        }
        
        _initialize();
    };
    
    /**
     * Get cell value
     * 
     * @param {Number} rowIndex - row number, 1 based
     * @param {Number} cellIndex - cell number, 1 based
     * @returns {mixed} - cell value
     */
    this.getValue = function(rowIndex, cellIndex) {
        var cell = _getCell(rowIndex, cellIndex);
        
        return cell.value;
    };
    
    /**
     * Set cell value
     * 
     * @param {Number} rowIndex - row number, 1 based
     * @param {Number} cellIndex - cell number, 1 based
     * @param {mixed} value - value to set
     * @returns {Eternity.Adapters.DOM.Element.Table}
     */
    this.setValue = function(rowIndex, cellIndex, value) {
        var cell = _getCell(rowIndex, cellIndex);
        
        cell.value = value;
        
        //notify change
        _notify(cell, rowIndex, cellIndex);

        return this;
    };
    
    this.getCell = function(rowIndex, cellIndex) {
        return _getCell(rowIndex, cellIndex);
    };
    
    /**
     * Temporary solution to trigger change event on cell and table
     * 
     * @param {Element} cell - cell event source
     * @param {Number} rowIndex - cell row index
     * @param {Number} cellIndex - cell cell index
     */
    var _notify = function(cell, rowIndex, cellIndex) {
        var htmlEvent = _createHTMLEvent(EVENT_TYPE_CHANGE);
        var tableEvent = _createCustomEvent(EVENT_TYPE_CHANGE, {target: cell, row: rowIndex, cell: cellIndex});
        
        cell.dispatchEvent(htmlEvent);
        _table.dispatchEvent(tableEvent);
    };
    
    /**
     * Create HTMLEvent
     * 
     * @param {String} type - event type
     * @returns {Event}
     */
    var _createHTMLEvent = function(type) {
        var event = document.createEvent('HTMLEvents');
        
        event.initEvent(type, true, true);
        
        return event;
    };
    
    /**
     * Create custom event
     * 
     * @param {String} type - event type
     * @param {Object} params - event params
     * @returns {Event}
     */
    var _createCustomEvent = function(type, params) {
        var event = new Event(type);
        
        event.params = params;
        
        return event;
    };
    
    /**
     * Parse table, retrieve it's cells
     */
    var _initialize = function() {
        var cells;
        var i;
        
        for (i = 0; i < _table.rows.length; i++) {
            cells = _getInputs(_table.rows[i], _selector);
            if (cells) {
                _rows[i + 1] = cells;
            }
        }
    };
    
    /**
     * Get row inputs by selector, indexed object will be returned,
     * if input will not be found, index will be omitted
     * ex. {1: <input>, 3: <input>, 4: <input>}
     * 
     * @param {Element} row - table row element
     * @param {String} selector - cell input selector
     * @returns {Object|null} - indexed object or null if no inputs wil be found
     */
    var _getInputs = function(row, selector) {
        var inputs = {};
        var empty = true;
        var input;
        var i;
        
        for (i = 0; i < row.cells.length; i++) {
            input = row.cells[0].querySelector(selector);
            
            //@todo more robust input validation
            if (input) {
                inputs[i + 1] = input;
                empty = false;
            }
        }
        
        return empty ? null : inputs;
    };
    
    /**
     * Get entire
     * 
     * @param {Number} rowIndex - row index where cell exists
     * @param {Number} cellIndex - cell index
     * @returns {Element}
     */
    var _getCell = function(rowIndex, cellIndex) {
        var row;
        var cell;
        
        if ('number' !== typeof rowIndex || 'number' !== typeof cellIndex) {
            throw new Error('Row and cell must be integer value');
        }
        
        row = _rows[parseInt(rowIndex, 10)];
        
        if (!row) {
            throw new Error('Row at index: "' + rowIndex + '" is not found');
        }
        
        cell = row[parseInt(cellIndex, 10)];
        
        if (!cell) {
            throw new Error('Cell at row index: "' + rowIndex + '" and cell index: "' + cellIndex + '" is not found');
        }
        
        return cell;
    };
    
    _construct.call(this, table, selector);
};