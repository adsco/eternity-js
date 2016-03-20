/**
 * Element pattern with corresponding event will be passed here.
 * This class will be responsible for value update and data providing.
 * Update handlers will be registered lately in smth like update method
 * where all registered update handlers will be registered
 * 
 * @see trackable-factory.js
 */
Eternity.Components.DOM.Observer = function(elementBinder, router, eventManager) {
    /**
     * @type Eternity.Components.DOM.Observer
     */
    var _me = this;

    /**
     * @type String
     */
    var EVENT_CAPTURED = 'observer.event-captured';

    /**
     * @type ElementBinder
     */
    var _elementBinder = null;

    /**
     * @type Router
     */
    var _router = null;

    /**
     * @type Eternity.Components.EventManager.EventManager
     */
    var _eventManager = null;

    /**
     * Internal event handler
     * 
     * @param {Event} e
     */
    var _handle = function(e) {
        _eventManager.dispatch(EVENT_CAPTURED);
        //this - element that triggered event
        _router.forward(this, e);
    };

    /**
     * Constructor
     * 
     * @param {Eternity.Components.DOM.Element.Binder} elementBinder - element event binder
     * @param {Eternity.Components.Router.Router} router - handlers resolver
     */
    var _construct = function(elementBinder, router, eventManager) {
        _elementBinder = elementBinder;
        _router = router;
        _eventManager = eventManager;
    };

    /**
     * 
     * @param {type} elements
     * @param {type} events
     */
    this.observe = function(elements, events) {
        var i;

        for (i = 0; i < elements.length; i++) {
            _elementBinder.attachListener(elements[i], events, _handle);
        }
    };

    /**
     * Get list of events that could be triggered by Eternity.Components.DOM.Observer
     * 
     * @returns {String[]}
     */
    this.getEvents = function() {
        return [
            EVENT_CAPTURED
        ];
    };

    _construct.call(this, elementBinder, router, eventManager);
};