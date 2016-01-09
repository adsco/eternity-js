function DOMCrawler(queryBuilder){
    var _queryBuilder = null;
    
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
        var parentElement = _getElement(_createQueryString(parent));
        var elements = _getElements(_createQueryString(pattern), parentElement);
        
        return elements;
    };
    
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
    
    var _getElement = function(selector, container){
        if('undefined' === typeof container){
            container = document;
        }
        
        return container.querySelector(selector);
    };
    
    var _getElements = function(selector, container){
        return container.querySelectorAll(selector);
    };
    
    _construct.call(this, queryBuilder);
}