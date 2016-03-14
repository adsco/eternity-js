/**
 * Class for generating elements, element attributes, etc.
 * For now used for id generation only
 */
Eternity.Components.DOM.Element.Generator = function(domCrawler) {
    /**
     * @var String
     */
    var PREFIX_DEFAULT = 'eternity';
    
    /**
     * @var String
     */
    var PREFIX_DELIMETER_DEFAULT = '-';
    
    /**
     * @var Eternity.Components.DOM.Crawler
     */
    var _domCrawler = null;
    
    /**
     * Constructor
     * 
     * @param {Eternity.Components.DOM.Crawler} domCrawler - dom crawler
     */
    var _construct = function(domCrawler) {
        if (!domCrawler instanceof Eternity.Components.DOM.Crawler) {
            throw new Error('Eternity.Components.DOM.Crawler');
        }
        
        _domCrawler = domCrawler;
    };
    
    /**
     * Element id generator, namespace could be passed in order to differentiate
     * different groups of elements, id will be unique for document
     * 
     * @param {String} namespace - namespace for id
     * @returns {String}
     */
    this.generateId = function(namespace) {
        var ns = 'string' === typeof namespace ? namespace : PREFIX_DEFAULT;
        var index = 0;
        var id = _generateId(ns, index);
        
        //just infinity loop prevention
        var loopLimit = 1000;
        var loopIndex = 0;
                
        while (true) {
            if (domCrawler.getElement(id)) {
                return id;
            }
            
            id = _generateId(ns, ++index);
            
            if (loopIndex >= loopLimit) {
                throw new Error('Probably infinity loop detected');
            }
            
            loopIndex++;
        }
    };
    
    /**
     * Actual id generation
     * 
     * @param {String} namespace - id namespace
     * @param {Number} lastIndex - id index
     * @returns {String}
     */
    var _generateId = function(namespace, lastIndex) {
        var index = isNaN(parseInt(lastIndex)) ? 0 : lastIndex;
        
        return namespace + PREFIX_DELIMETER_DEFAULT + index;
    };
    
    _construct.call(this, domCrawler);
};