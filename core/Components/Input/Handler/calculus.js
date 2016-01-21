/**
 * Calculus handler
 */
Eternity.Components.Input.Handler.Calculus = function(dataProvider, mapper, elementCrawler){
    /**
     * @type Handler
     */
    var _me = this;
    
    /**
     * @type String
     */
    var EVENT_TYPE = 'update-value';
    
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
        var identifier = _elementCrawler.getAttribute(element, 'id');
        
        return _mapper.isMapped(identifier);
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
            map = _mapper.getMap(identifier),
            i;
        
        _clearResult();
        
        for(i = 0; i < map.length; i++){
            _calculate(map[i], map[i].target);
        }
        
        return {
            type: EVENT_TYPE,
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
        var map = _mapper.getMapByTarget(field),
            result;
        
        if(map){
            result = map.handler(_me);
            
            _appendResult(map.target, result);
            
            return result;
        } else {
            return _dataProvider.getValue(field);
        }
    };
    
    /**
     * Chaining calculations initiator
     * 
     * @param {Map} map
     * @returns {Boolean}
     */
    var _calculate = function(map, identifier){
        if(map){
            _me.getValue(identifier);
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
        
        return _me;
    };
    
    _construct.call(this, dataProvider, mapper, elementCrawler);
};