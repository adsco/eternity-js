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
     * @type String[]
     */
    var _roots = [];
    
    var _blocker = null;
    
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
            i;

        _result = [];
        _defineRoots(identifier);
        _setBlocker(identifier);
        for(i = 0; i < _roots.length; i++){
            _me.getValue(_roots[i]);
        };
        
        return _getResult();
    };
    
    /**
     * Method used by mapper to get element's value
     * 
     * @param {String} field - field whos value needs to be retrieved
     * @returns {Integer}
     */
    this.getValue = function(field){
        var map = _mapper.getMapByTarget(field),
            result;
        
//        if(field == _blocker){
//            console.log(map, field, _blocker);
//        }
//        
        console.log(map, field);
        
        if(map && field != _blocker){
            console.log(1);
            result = map.handler(_me);
            _appendResult(field, result);
            
            return result;
        } else {
            return _dataProvider.getValue(field);
        }
    };
    
    /**
     * Recursion entry point, will go down to root element whos value will be changed last
     * 
     * @param {String} field - field that triggered event
     */
    var _defineRoots = function(field){
        _roots = [];
        _getRoots(field);
    };
    
    /**
     * Go 1 level down of element tree
     * 
     * @param {String} field - field that triggered error
     */
    var _getRoots = function(field){
        var targets = _mapper.getMapByInitiator(field),
            i;
    
        if(targets.length){
            for(i = 0; i < targets.length; i++){
                _getRoots(targets[i].target);
            }
        } else {
            _roots.push(field);
        }
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
     * Get accumulated result
     * @returns {Eternity.Components.Input.Handler.Calculus._getResult.calculusAnonym$1}
     */
    var _getResult = function(){
        return {
            type: EVENT_TYPE,
            data: _result
        };
    };
    
    var _setBlocker = function(blocker){
        _blocker = blocker;
    };
    
    _construct.call(this, dataProvider, mapper, elementCrawler);
};