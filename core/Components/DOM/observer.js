/**
 * Element pattern with corresponding event will be passed here.
 * This class will be responsible for value update and data providing.
 * Update handlers will be registered lately in smth like update method
 * where all registered update handlers will be registered
 * 
 * @see trackable-factory.js
 */
Eternity.Components.DOM.Observer = function(elementBinder, resolver){
    
    /**
     * @type ElementBinder
     */
    var _elementBinder = null;
    
    /**
     * @type Resolver
     */
    var _resolver = null;
    
    /**
     * @type Element[]
     */
    var _elements = [];
    
    /**
     * Internal event handler
     * 
     * @param {Event} e
     */
    var _handler = function(e){
        //this - element that triggered event
        _resolver.resolve(this, e);
    };
    
    var _construct = function(elementBinder, resolver){
        _elementBinder = elementBinder;
        _resolver = resolver;
    };
    
    this.observe = function(elements, events){
        var i;
        
        for(i = 0; i < elements.length; i++){
            _elementBinder.attachListener(elements[i], events, _handler);
            _registerElement(elements[i]);
        }
    };
    
    var _registerElements = function(elements){
        var i;
        
        for(i = 0; i < elements.length; i++){
            _registerElement(elements[i]);
        }
    };
    
    var _registerElement = function(element){
        _elements.push(element);
    };
    
    _construct.call(this, elementBinder, resolver);
}