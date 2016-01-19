/**
 * Storage for references to DOM elements
 */
Eternity.Components.DOM.Repository = function(){
    /**
     * @type Array
     */
    var _elements = [];

    /**
     * @type Array
     */
    var _ids = [];
    
    /**
     * Add element to repository
     * 
     * @param {Element|Element[]} element
     * @returns {DOMRepository}
     */
    this.add = function(element){
        if(element instanceof Array || element instanceof NodeList){
            _addElements(element);
        } else {
            _addElement(element);
        }
    };
    
    /**
     * Get elements from repository
     * 
     * @param {String[]} ids
     * @returns {Element[]|[]}
     */
    this.get = function(ids){
        var elements = [],
            element,
            i;
        
        for(i = 0; i < ids.length; i++){
            if(element = this.getSingle(ids[i])){
                elements.push(element);
            }
        }
        
        return elements;
    };
    
    /**
     * Get single element, first encountered and correct by filter
     * 
     * @param {String} id
     * @returns {Element|null}
     */
    this.getSingle = function(id){
        var i;
        
        for(i = 0; i < _elements.length; i++){
            if(_elements[i].id === id){
                return _elements[i];
            }
        }
        
        return null;
    };
    
    /**
     * Add array of elements
     * 
     * @param {Element[]} elements
     */
    var _addElements = function(elements){
        var i;
        
        for(i = 0; i < elements.length; i++){
            _addElement(elements[i]);
        }
    };
    
    /**
     * Add single element
     * 
     * @param {Element} element
     * @returns {DOMRepository}
     * @throws {Error} if element doesn't have id property or
     * element id already used by another element
     */
    var _addElement = function(element){
        console.log(element);
        if('undefined' === typeof element.id){
            throw new Error('Missing id property for element');
        }
            
        if(-1 !== _ids.indexOf(element.id)){
            throw new Error('Element with id "' + element.id + '" already registered');
        }
        
        _ids.push(element.id);
        _elements.push(element);
    };
};