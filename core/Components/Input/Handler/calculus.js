/**
 * Calculus handler
 */
Eternity.Components.Input.Handler.Calculus = function(dataProvider, elementCrawler, mapper) {
    /**
     * @type Handler
     */
    var _me = this;
    
    /**
     * @type String
     */
    var RESULT_EVENT_TYPE = 'update-value';
    
    var EVENT_UPDATE_ALL_VALUES = 'update-value-all';
    
    /**
     * @type String
     */
    var _type = null;
    
    /**
     * @type DataProvider
     */
    var _dataProvider = null;
    
    /**
     * @type Mapper
     */
    var _mapper = null;
    
    /**
     * @type ElementCrawler
     */
    var _elementCrawler = null;
    
    /**
     * @type mixed[]
     */
    var _result = [];
    
    /**
     * @type String[]
     */
    var _nodes = [];
    
    /**
     * Constructor
     * 
     * @param {DataProvider} dataProvider - data provider
     * @param {Mapper} mapper - mapper
     * @param {ElementCrawler} elementCrawler - element crawler
     */
    var _construct = function(dataProvider, elementCrawler, mapper) {
        _dataProvider = dataProvider;
        _mapper = mapper;
        _elementCrawler = elementCrawler;
    };
    
    /**
     * Is field should be handled by this handler
     * 
     * @param {Element} element - field identifier
     * @param {Event} e - event triggered
     * @returns {Boolean}
     */
    this.supports = function(element, e) {
        var identifier = _elementCrawler.getAttribute(element, 'id');
        
        //run all calculations
        if (e.type == EVENT_UPDATE_ALL_VALUES) {
            return true;
        }
        
        return _mapper.isMapped(identifier);
    };

    /**
     * Implementation of HandlerBase.handle, @see handler/handler-base.js
     * Logic: stack list of all nodes whos values need to be recalculated
     * then perform up down calculations, caching intermadiate calculation
     * result.
     * 
     * @param {Element} element - field that triggered event
     * @param {Event} e - event triggered
     * @returns {Result}
     */
    this.handle = function(element, e) {
        if (e.type == EVENT_UPDATE_ALL_VALUES) {
            return _runAll();
        } else {
            return _runSingle(element, e);
        }
    };
    
    /**
     * Method used by mapper to get element's value,
     * if cached value for the requested field exists, cached value will be returned
     * 
     * @param {String} field - field whos value needs to be retrieved
     * @returns {Integer}
     */
    this.getValue = function(field) {
        var result = _getFieldResult(field);
        
        if (result) {
            return result.value;
        } else {
            return _dataProvider.getValue(field);
        }
    };
    
    /**
     * Execute all mapped field formulas
     * 
     * @returns {Result}
     */
    var _runAll = function() {
        
    };
    
    /**
     * Execute single field node
     * 
     * @param {Element} element - element that triggered event
     * @param {Event} e - event triggered
     * @returns {Result}
     */
    var _runSingle = function(element, e) {
        var identifier = _elementCrawler.getAttribute(element, 'id');

        //reset all runtime variables
        _reset();
        //build execution queue
        _buildExecutionQueue(identifier);
        //execute stacked formulas
        _calculate();
        
        return _getResult();
    };
    
    /**
     * Nodes whos value must be recalculated
     * 
     * @param {String} field - field that triggered event
     */
    var _buildExecutionQueue = function(field) {
        _getNodes(field);
    };
    
    /**
     * Go 1 level down of element tree
     * 
     * @param {String} field - field that triggered error
     */
    var _getNodes = function(field) {
        var targets = _mapper.getMapByInitiator(field),
            i;
    
        if (targets.length) {
            for(i = 0; i < targets.length; i++){
                _nodes.push(targets[i].target);
                _getNodes(targets[i].target);
            }
        }
    };
    
    /**
     * Result aggregator
     * 
     * @param {String} field - field identifier
     * @param {String} value - value 
     */
    var _appendResult = function(field, value) {
        _result.push({
            field: field,
            value: value
        });
    };
    
    /**
     * Get accumulated result
     * @returns {Eternity.Components.Input.Handler.Calculus._getResult.calculusAnonym$1}
     */
    var _getResult = function() {
        return {
            type: RESULT_EVENT_TYPE,
            data: _result
        };
    };
    
    /**
     * Get calculated value of field
     * 
     * @param {String} field - field identifier
     * @returns {Object|null} - result object or null if value for the requested field
     * has not been calculated
     */
    var _getFieldResult = function(field) {
        var i;
        
        for (i = 0; i < _result.length; i++) {
            if(_result[i].field == field){
                return _result[i];
            }
        }
        
        return null;
    };
    
    /**
     * Execute calculation of stacked nodes
     */
    var _calculate = function() {
        var map,
            i;
        
        for (i = 0; i < _nodes.length; i++) {
            map = _mapper.getMapByTarget(_nodes[i]);
            _appendResult(_nodes[i], map.handler(_me));
        };
    };
    
    /**
     * Reset all recent data stored
     */
    var _reset = function() {
        _nodes = [];
        _result = [];
    };
    
    _construct.call(this, dataProvider, elementCrawler, mapper);
};