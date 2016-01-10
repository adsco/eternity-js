/**
 * Responsible for finding elements within DOM.
 * Common usage DOMCrawler.getElements({tag: '', id: '', classes: [], attributes: []});
 * 
 * @param {QueryBuilder} queryBuilder - query builder to be used for query creation
 */
function DOMCrawler(queryBuilder){
    /**
     * @type QueryBuilder
     */
    var _queryBuilder = null;
    
    /**
     * Constructor
     * 
     * @param {QueryBuilder} queryBuilder
     */
    var _construct = function(queryBuilder){
        _queryBuilder = queryBuilder;
    };
    
    /**
     * Get elements that match speicific pattern
     * 
     * @param {Object} parent - container selector within which elements should be found
     * @param {Object} pattern - elements selector
     * @returns {element[]}
     */
    this.getElements = function(parent, pattern){
        var parentElement = _getElement(_createQueryString(parent), document),
            elements = _getElements(_createQueryString(pattern), parentElement);
        
        return elements;
    };
    
    /**
     * Create query string for element search
     * 
     * @param {Object} pattern
     * @returns {string} query string
     */
    var _createQueryString = function(pattern){
        var query = _queryBuilder.createQuery(),
            i;
        
        if('undefined' !== typeof pattern.tag){
            query.setTag(pattern.tag);
        }
        
        if('undefined' !== typeof pattern.id){
            query.setId(pattern.id);
        }
        
        if('undefined' !== typeof pattern.classes){
            for(i = 0; i < pattern.classes.length; i++){
                query.addClass(pattern.classes[i]);
            }
        }
        
        if('undefined' !== typeof pattern.attributes){
            for(i = 0; i < pattern.attributes.length; i++){
                query.addAttribute(pattern.attributes);
            }
        }
        
        return query.getQuery();
    };
    
    /**
     * Actual element grabber
     * 
     * @param {string} queryString - query string
     * @param {Element} container - container within search perfromed
     * @returns {Element|null}
     */
    var _getElement = function(queryString, container){
        return container.querySelector(queryString);
    };
    
    /**
     * Same as _getElement but for multiple elements
     * 
     * @param {string} queryString - query string
     * @param {Element} container - parent element of searching elements
     * @returns {Elements[]}
     */
    var _getElements = function(queryString, container){
        return container.querySelectorAll(queryString);
    };
    
    _construct.call(this, queryBuilder);
}