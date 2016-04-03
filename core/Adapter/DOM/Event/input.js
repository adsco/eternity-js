Eternity.Adapter.DOM.Event.Input = function(type, source) {
    Eternity.Adapter.DOM.Event.Base.call(this);
    
    /**
     * @var String
     */
    this.type = null;
    
    /**
     * @var Object
     */
    this.source = null;
    
    /**
     * Constructor
     * 
     * @param {String} type - event type
     * @param {Object} source - event source
     */
    var _construct = function(type, source) {
        this.type = type;
        this.source = source;
    };
    
    _construct.call(this, type, source);
};

Eternity.Adapter.DOM.Event.Input.prototype = Object.create(Eternity.Adapter.DOM.Event.Base);
Eternity.Adapter.DOM.Event.Input.prototype.constructor = Eternity.Adapter.DOM.Event.Input;