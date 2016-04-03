Eternity.Adapter.DOM.Element.Input = function(element) {
    Eternity.Adapter.DOM.Element.Base.call(this);
    
    /**
     * @type Eternity.Adapter.DOM.Element.Input
     */
    var _me = this;
    
    /**
     * @type Element
     */
    var _element = null;
    
    /**
     * @type Object
     */
    var _attributes = {};
    
    /**
     * Constructor
     * 
     * @param {Element} element
     */
    var _construct = function(element) {
        _element = element;
        
        _initialize();
    };
    
    /**
     * {@inheritDoc}
     */
    this.getValue = function() {
        return _element.value;
    };
    
    /**
     * {@inheritDoc}
     */
    this.setValue = function(value) {
        _element.value = value;
        
        this.dispatchEvent({type: 'change', source: _me, value: value});
        
        return this;
    };
    
    /**
     * Set input attribute
     * 
     * @param {String} attributeName - attribute name
     * @param {mixed} value - attribute value
     * @returns {Eternity.Adapter.DOM.Element.Input}
     */
    this.setAttribute = function(attributeName, value)  {
        _attributes[attributeName] = value;
        
        return this;
    };
    
    /**
     * Get attribute value
     * 
     * @param {String} attributeName - name of attribute
     * @returns {mixed}
     */
    this.getAttribute = function(attributeName) {
        if (!_attributes.hasOwnProperty(attributeName)) {
            return null;
        }
        
        return _attributes[attributeName];
    };
    
    /**
     * Remove attribute from input
     * 
     * @param {String} attributeName - attribute name to remove
     * @returns {Eternity.Adapter.DOM.Element.Input}
     */
    this.removeAttribute = function(attributeName) {
        if (_attributes.hasOwnProperty(attributeName)) {
            delete _attributes[attributeName];
        }
        
        return this;
    };
    
    /**
     * Initialize element:
     * Add event listeners
     */
    var _initialize = function() {
        _element.addEventListener('change', function() {
            _me.dispatchEvent({type: 'change', source: _me, value: _element.value});
        });
    };
    
    _construct.call(this, element);
};

Eternity.Adapter.DOM.Element.Input.prototype = Object.create(Eternity.Adapter.DOM.Element.Base);
Eternity.Adapter.DOM.Element.Input.prototype.constructor = Eternity.Adapter.DOM.Element.Input;
