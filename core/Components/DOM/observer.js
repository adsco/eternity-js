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
     * Internal event handler
     * 
     * @param {Event} e
     */
    var _handle = function(e){
        //this - element that triggered event
        _resolver.resolve(this, e);
    };
    
    /**
     * Constructor
     * 
     * @param {Eternity.Components.DOM.Element.Binder} elementBinder - element event binder
     * @param {Eternity.Components.Input.Resolver.Resolver} resolver - handlers resolver
     */
    var _construct = function(elementBinder, resolver){
        _elementBinder = elementBinder;
        _resolver = resolver;
    };
    
    /**
     * 
     * @param {type} elements
     * @param {type} events
     * @returns {undefined}
     */
    this.observe = function(elements, events){
        var i;

        for(i = 0; i < elements.length; i++){
            _elementBinder.attachListener(elements[i], events, _handle);
        }
    };
    
    _construct.call(this, elementBinder, resolver);
};