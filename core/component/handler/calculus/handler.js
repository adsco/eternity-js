/**
 * Calculus handler
 */
function CalculusHandler(dataProvider, mapper, elementCrawler){
    /**
     * @type Handler
     */
    var me = this;
    
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
     * Constructor
     * 
     * @param {DataProvider} dataProvider - data provider
     * @param {Mapper} mapper - mapper
     * @param {ElementCrawler} elementCrawler - element crawler
     */
    var _construct = function(dataProvider, mapper, elementCrawler){
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
    this.supports = function(element, e){
        var identifier = _elementCrawler.getAttribute(element, 'id'),
            map = _mapper.get(identifier);
        
        return map ? true : false;
    };

    /**
     * Implementation of HandlerBase.handle, @see handler/handler-base.js
     * 
     * @param {Element} element - field that triggered event
     * @param {Event} e - event triggered
     * @returns {Result}
     */
    this.handle = function(element, e){
        var identifier = _elementCrawler.getAttribute(element, 'id'),
            map = _mapper.get(identifier);
        
        _clearResult();
        _calculate(map);
        
        return {
            type: 'update-value',
            data: _result
        };
    };
    
    /**
     * Get value method used in mapper
     * 
     * @param {String} field - element identifier
     * @returns {String|Number}
     */
    this.getValue = function(field){
        var map = _mapper.get(field),
            result;
        
        if(map){
            result = map.handler(me);
            
            _appendResult(map.target, result);
            
            return result;
        } else {
            return _dataProvider.getValue(field);
        }
    };
    
    this.getMyValue = function(field){
        return _dataProvider.getValue(field);
    };
    
    /**
     * Chaining calculations initiator
     * 
     * @param {Map} map
     * @returns {Boolean}
     */
    var _calculate = function(map){
        if(map){
            me.getValue(map.field);
            return true;
        }
        
        return false;
    };
    
    /**
     * Result aggregator
     * 
     * @param {String} field - field identifier
     * @param {String} value - value 
     */
    var _appendResult = function(field, value){
        _result.push({
            field: field,
            value: value
        });
    };
    
    /**
     * Clear _result
     * 
     * @returns {Calculus}
     */
    var _clearResult = function(){
        _result = [];
        
        return me;
    };
    
    _construct.call(this, dataProvider, mapper, elementCrawler);
}