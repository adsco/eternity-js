/**
 * Provider of DOM element's values
 * 
 * @todo DataProvider.getValue should make use of different elements parsers
 * one for each used tag
 * 
 * @param {DOMRepository} domRepository - DOM repository
 * @param {ElementCrawler} elementCrawler - element crawler
 */
Eternity.Components.Provider.Data = function(domRepository, elementCrawler){
    /**
     * @type DOMRepository
     */
    var _domRepository = null;
    
    /**
     * @type ElementCrawler
     */
    var _elementCrawler = null;
    
    /**
     * Constructor
     * 
     * @param {DOMRepository} domRepository
     * @param {ElementCrawler} elementCrawler
     */
    var _construct = function(domRepository, elementCrawler){
        _domRepository = domRepository;
        _elementCrawler = elementCrawler;
    };
    
    /**
     * Get DOM element value
     * 
     * @param {String} identifier - element identifier
     * @returns {String}
     */
    this.getValue = function(identifier){
        var element = _domRepository.getSingle(identifier);
        
        if(!element){
            throw new Error('Element with identifier "' + identifier + '" is not found');
        }
        
        return parseInt(element.value == '' ? 0 : element.value);
    };
    
    _construct.call(this, domRepository, elementCrawler);
};