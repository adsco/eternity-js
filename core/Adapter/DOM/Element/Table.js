/**
 * Adapt table behaviour
 * 
 * Should have, view manipulation(fixed number of rows - data should be replaceable)
 * Future optimization needed use limited number of dom rows but store and substitude
 * data in limited rows
 * 
 * @TODO: memorizing cell row and col index is not kinda best way, probably there is
 * another solution
 */
Eternity.Adapter.DOM.Element.Table = function(table, selector) {
    Eternity.Adapter.DOM.Element.Base.call(this);
    
    /**
     * @type Eternity.Adapter.DOM.Element.Table
     */
    var _me = this;
    
    /**
     * @var Element
     */
    var _table = null;
    
    /**
     * @var Array
     */
    var _rows = {};
    
    /**
     * @type Number
     */
    var _maxItems = 10;
    
    /**
     * @type Number
     */
    var _page = 1;
    
    /**
     * @type String
     */
    var EVENT_CHANGE = 'change';
    
    /**
     * Handler that will be invoked on each input change event
     * 
     * @param {Eternity.Adapter.DOM.Element.Event.Base} event
     */
    var _inputChangeHandler = function(event) {
        var source = event.source;
        
        console.log('Change triggered at: ' + source.getAttribute('rowIndex') + ' - ' + source.getAttribute('colIndex'), event);
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
        
        if ('string' !== typeof selector) {
            throw new Error('Selector must be a string');
        }
        
        _initialize(selector);
    };
    
    /**
     * Get cell value
     * 
     * @param {Number} rowIndex - row number, 1 based
     * @param {Number} colIndex - cell number, 1 based
     * @returns {mixed} - cell value
     */
    this.getValue = function(rowIndex, colIndex) {
        var cell = _getCell(rowIndex, colIndex);
        
        if (!cell) {
            throw new Error('Cell at: ' + rowIndex + ' - ' + colIndex + ' doesn\'t exists');
        }
        
        return cell.getValue();
    };
    
    /**
     * Set cell value
     * 
     * @param {Number} rowIndex - row number, 1 based
     * @param {Number} colIndex - cell number, 1 based
     * @param {mixed} value - value to set
     * @returns {Eternity.Adapters.DOM.Element.Table}
     */
    this.setValue = function(rowIndex, colIndex, value) {
        var cell = _getCell(rowIndex, colIndex);
        
        if (!cell) {
            throw new Error('Cell at: ' + rowIndex + ' - ' + colIndex + ' doesn\'t exists');
        }
        
        cell.setValue(value);

        return this;
    };
    
    /**
     * Parse table, retrieve it's cells
     * 
     * @param {String} selector - input selector
     */
    var _initialize = function(selector) {
        var cells;
        var i;
        
        for (i = 0; i < _table.rows.length; i++) {
            cells = _getInputs(_table.rows[i], i + 1, selector);
            if (cells && Object.keys(cells).length) {
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
     * @param {Number} rowIndex - row index
     * @param {String} selector - cell input selector
     * @returns {Object|null} - indexed object or null if no inputs will be found
     */
    var _getInputs = function(row, rowIndex, selector) {
        var inputs = {};
        var element;
        var input;
        var i;
        
        for (i = 0; i < row.cells.length; i++) {
            element = _getInput(row.cells[i], selector);
            
            if (element) {
                input = new Eternity.Adapter.DOM.Element.Input(element);
                input.setAttribute('rowIndex', rowIndex);
                input.setAttribute('colIndex', i + 1);
                
                input.addEventListener('change', _inputChangeHandler);
                
                inputs[i + 1] = input;
            }
        }
        
        return inputs;
    };
    
    /**
     * Extract input from table cell (td element)
     * 
     * @param {Element} cell - table td element
     * @param {String} selector - input selector
     * @returns {Element} - input element found by selector
     */
    var _getInput = function(cell, selector) {
        return cell.querySelector(selector);
    };
    
    /**
     * Get entire
     * 
     * @param {Number} rowIndex - row index where cell exists
     * @param {Number} colIndex - cell index
     * @returns {Eternity.Adapter.DOM.Element.Base|null}
     */
    var _getCell = function(rowIndex, colIndex) {
        var row;
        var cell;
        
        if ('number' !== typeof rowIndex || 'number' !== typeof colIndex) {
            throw new Error('Row and cell must be integer value');
        }
        
        row = _rows[parseInt(rowIndex, 10)];
        
        if (!row) {
            return null;
        }
        
        cell = row[parseInt(colIndex, 10)];
        
        if (!cell) {
            return null;
        }
        
        return cell;
    };
    
    _construct.call(this, table, selector);
};

Eternity.Adapter.DOM.Element.Table.prototype = Object.create(Eternity.Adapter.DOM.Element.Base);
Eternity.Adapter.DOM.Element.Table.prototype.constructor = Eternity.Adapter.DOM.Element.Table;